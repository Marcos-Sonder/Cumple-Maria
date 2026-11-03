import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// ========================================
// 1. CONFIGURACIÓN INICIAL
// ========================================

const container = document.getElementById("cakeContainer");
const cakeMessage = document.getElementById("cakeMessage");

console.log("Contenedor:", container);
console.log("Ancho:", container?.clientWidth);
console.log("Alto:", container?.clientHeight);

if (!container) {
    console.error("No se encontró el contenedor del pastel.");
} else {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(0, 5, 10);
    camera.lookAt(0, 1.8, 0);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // ========================================
    // 2. ILUMINACIÓN
    // ========================================

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xffd447, 100, 30);
    mainLight.position.set(0, 7, 5);
    scene.add(mainLight);

    const pinkLight = new THREE.PointLight(0xf4b6c9, 70, 20);
    pinkLight.position.set(-5, 3, 3);
    scene.add(pinkLight);

    const orangeLight = new THREE.PointLight(0xff7a18, 70, 20);
    orangeLight.position.set(5, 3, -3);
    scene.add(orangeLight);

    // ========================================
    // 3. GRUPO PRINCIPAL DEL PASTEL
    // ========================================

    const cake = new THREE.Group();
    scene.add(cake);

    // Materiales
    const pinkMaterial = new THREE.MeshStandardMaterial({
        color: 0xf4b6c9,
        roughness: 0.35,
        metalness: 0.05
    });

    const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xfff9f5,
        roughness: 0.4
    });

    const orangeMaterial = new THREE.MeshStandardMaterial({
        color: 0xff7a18,
        roughness: 0.35
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xd9b56d,
        metalness: 0.75,
        roughness: 0.25
    });

    // Función para crear niveles del pastel
    function createCakeTier(radius, height, y, material) {

        const geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            height,
            64
        );

        const tier = new THREE.Mesh(geometry, material);

        tier.position.y = y;
        tier.castShadow = true;
        tier.receiveShadow = true;

        cake.add(tier);

        return tier;
    }

    // Tres niveles
    createCakeTier(2.1, 0.9, 0.5, pinkMaterial);
    createCakeTier(1.55, 0.8, 1.35, whiteMaterial);
    createCakeTier(1.05, 0.7, 2.1, orangeMaterial);

    // ========================================
    // 4. DETALLES DORADOS
    // ========================================

    function createGoldRing(radius, y) {

        const geometry = new THREE.TorusGeometry(
            radius,
            0.045,
            12,
            80
        );

        const ring = new THREE.Mesh(geometry, goldMaterial);

        ring.rotation.x = Math.PI / 2;
        ring.position.y = y;

        cake.add(ring);
    }

    createGoldRing(2.1, 0.95);
    createGoldRing(1.55, 1.75);
    createGoldRing(1.05, 2.45);

    // ========================================
    // 5. DECORACIONES DEL PASTEL
    // ========================================

    function addDecoration(x, y, z, color, size = 0.09) {

        const geometry = new THREE.SphereGeometry(size, 16, 16);

        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.3,
            metalness: 0.1
        });

        const decoration = new THREE.Mesh(geometry, material);

        decoration.position.set(x, y, z);

        cake.add(decoration);
    }

    const decorationColors = [
        0xffd447,
        0xff7a18,
        0xfff9f5,
        0xf4b6c9
    ];

    // Decoraciones del nivel inferior
    for (let i = 0; i < 16; i++) {

        const angle = (i / 16) * Math.PI * 2;

        addDecoration(
            Math.cos(angle) * 2.05,
            0.65,
            Math.sin(angle) * 2.05,
            decorationColors[i % 4]
        );
    }

    // Decoraciones del nivel medio
    for (let i = 0; i < 12; i++) {

        const angle = (i / 12) * Math.PI * 2;

        addDecoration(
            Math.cos(angle) * 1.5,
            1.45,
            Math.sin(angle) * 1.5,
            decorationColors[i % 4]
        );
    }

    // Decoraciones del nivel superior
    for (let i = 0; i < 8; i++) {

        const angle = (i / 8) * Math.PI * 2;

        addDecoration(
            Math.cos(angle) * 1,
            2.2,
            Math.sin(angle) * 1,
            decorationColors[i % 4]
        );
    }

    // ========================================
    // 6. BASE DEL PASTEL
    // ========================================

    const baseGeometry = new THREE.CylinderGeometry(
        2.3,
        2.3,
        0.15,
        64
    );

    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0xd9b56d,
        metalness: 0.7,
        roughness: 0.3
    });

    const base = new THREE.Mesh(baseGeometry, baseMaterial);

    base.position.y = 0.075;
    base.castShadow = true;
    base.receiveShadow = true;

    cake.add(base);

    // ========================================
    // 7. VELAS Y LLAMAS
    // ========================================

    const candles = [];

    const candleMaterial = new THREE.MeshStandardMaterial({
        color: 0xfff9f5,
        roughness: 0.4
    });

    const candlePositions = [
        [-0.65, 0, -0.35],
        [0, 0, -0.55],
        [0.65, 0, -0.35],
        [-0.35, 0, 0.35],
        [0.35, 0, 0.35]
    ];

    candlePositions.forEach((position) => {

        const candle = new THREE.Group();

        const candleGeometry = new THREE.CylinderGeometry(
            0.055,
            0.055,
            0.65,
            16
        );

        const candleMesh = new THREE.Mesh(
            candleGeometry,
            candleMaterial
        );

        candleMesh.position.y = 0.325;
        candle.add(candleMesh);

        // Llama
        const flameGeometry = new THREE.SphereGeometry(
            0.105,
            20,
            20
        );

        const flameMaterial = new THREE.MeshBasicMaterial({
            color: 0xffa21a
        });

        const flame = new THREE.Mesh(
            flameGeometry,
            flameMaterial
        );

        flame.position.y = 0.76;
        flame.scale.set(0.75, 1.4, 0.75);

        candle.add(flame);

        // Luz de la llama
        const flameLight = new THREE.PointLight(
            0xffa21a,
            2,
            2
        );

        flameLight.position.y = 0.8;
        candle.add(flameLight);

        candle.position.set(
            position[0],
            2.45,
            position[2]
        );

        cake.add(candle);

        candles.push({
            group: candle,
            flame: flame,
            light: flameLight,
            active: true
        });
    });

    // ========================================
    // 8. APAGAR LAS VELAS AL HACER CLIC
    // ========================================

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    renderer.domElement.addEventListener("pointerdown", (event) => {

        const rect = renderer.domElement.getBoundingClientRect();

        pointer.x = (
            (event.clientX - rect.left) / rect.width
        ) * 2 - 1;

        pointer.y = -(
            (event.clientY - rect.top) / rect.height
        ) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);

        const activeFlames = candles
            .filter(candle => candle.active)
            .map(candle => candle.flame);

        const intersections = raycaster.intersectObjects(activeFlames);

        if (intersections.length > 0) {

            const selectedFlame = intersections[0].object;

            const selectedCandle = candles.find(
                candle => candle.flame === selectedFlame
            );

            if (selectedCandle && selectedCandle.active) {

                selectedCandle.active = false;
                selectedCandle.flame.visible = false;
                selectedCandle.light.visible = false;

                checkCandles();
            }
        }
    });

    // ========================================
    // 9. MENSAJE CUANDO SE APAGUEN LAS VELAS
    // ========================================

    function checkCandles() {

        const remaining = candles.filter(
            candle => candle.active
        ).length;

        if (cakeMessage) {

            if (remaining === 0) {

                cakeMessage.textContent =
                    "¡Feliz cumpleaños Maria! Que Dios Te bendiga y todos tus deseos se cumplan ✨";

                createConfetti();

            } else {

                cakeMessage.textContent =
                    `¡Muy bien! Quedan ${remaining} velitas.`;
            }
        }
    }

    if (cakeMessage) {
        cakeMessage.textContent =
            "Haz clic en cada llama para apagarla ✨";
    }

    // ========================================
    // 10. CONFETI
    // ========================================

    let confettiPieces = [];

    function createConfetti() {

        if (confettiPieces.length > 0) return;

        const colors = [
            0xff7a18,
            0xffd447,
            0xf4b6c9,
            0xfff9f5,
            0xd9b56d
        ];

        for (let i = 0; i < 120; i++) {

            const geometry = new THREE.BoxGeometry(
                0.07,
                0.12,
                0.025
            );

            const material = new THREE.MeshStandardMaterial({
                color: colors[i % colors.length],
                roughness: 0.4
            });

            const piece = new THREE.Mesh(geometry, material);

            piece.position.set(
                (Math.random() - 0.5) * 7,
                4 + Math.random() * 4,
                (Math.random() - 0.5) * 5
            );

            piece.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            scene.add(piece);

            confettiPieces.push({
                mesh: piece,
                speed: 0.025 + Math.random() * 0.035,
                rotation: 0.02 + Math.random() * 0.04
            });
        }
    }

    // ========================================
    // 11. ANIMACIÓN DEL PASTEL
    // ========================================

    const clock = new THREE.Clock();

    function animate() {

        requestAnimationFrame(animate);

        const elapsed = clock.getElapsedTime();

        // Rotación suave
        cake.rotation.y = Math.sin(elapsed * 0.35) * 0.12;

        // Movimiento flotante
        cake.position.y = Math.sin(elapsed * 1.2) * 0.07;

        // Movimiento de las llamas
        candles.forEach((candle, index) => {

            if (candle.active) {

                candle.flame.scale.y =
                    1.4 + Math.sin(elapsed * 10 + index) * 0.15;

                candle.flame.scale.x =
                    0.75 + Math.sin(elapsed * 8 + index) * 0.08;

                candle.light.intensity =
                    1.8 + Math.sin(elapsed * 12 + index) * 0.4;
            }
        });

        // Caída del confeti
        confettiPieces.forEach(piece => {

            piece.mesh.position.y -= piece.speed;

            piece.mesh.rotation.x += piece.rotation;
            piece.mesh.rotation.z += piece.rotation;

            if (piece.mesh.position.y < -1) {
                piece.mesh.position.y = 6 + Math.random() * 3;
            }
        });

        renderer.render(scene, camera);
    }

    animate();

    // ========================================
    // 12. ADAPTACIÓN A PANTALLAS
    // ========================================

    window.addEventListener("resize", () => {

        const width = container.clientWidth;
        const height = container.clientHeight;

        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

}

// ========================================
// 13. MÚSICA DE FONDO
// ========================================

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

if (backgroundMusic && musicButton) {

    const musicIcon = musicButton.querySelector("i");

    // Intentar iniciar la música al entrar
    backgroundMusic.volume = 0.4;

    backgroundMusic.play()
        .then(() => {
            musicIcon.className = "fas fa-volume-up";
        })
        .catch(() => {
            musicIcon.className = "fas fa-music";
        });

    // Botón para activar o pausar
    musicButton.addEventListener("click", async () => {

        if (backgroundMusic.paused) {

            try {
                await backgroundMusic.play();
                musicIcon.className = "fas fa-volume-up";
            } catch (error) {
                console.log("No se pudo iniciar la música:", error);
            }

        } else {

            backgroundMusic.pause();
            musicIcon.className = "fas fa-volume-mute";
        }
    });
}
