// 3D Space Planet Animation

let scene, camera, renderer, planet;
let isInitialized = false;

// Initialize the Three.js scene
function initPlanet() {
    if (isInitialized) return;
    isInitialized = true;
    
    // Get the container element
    const container = document.getElementById('planet-container');
    if (!container) return;
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 2;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create planet
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('images/moon-texture.jpg', () => {
        // Texture loaded callback
        animate();
    });
    
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
        metalness: 0.2,
    });
    
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the planet
    if (planet) {
        planet.rotation.y += 0.001;
    }
    
    // Render the scene
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Handle window resize
function onWindowResize() {
    const container = document.getElementById('planet-container');
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create planet container if it doesn't exist
    if (!document.getElementById('planet-container')) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            // Create starfield background
            const starfield = document.createElement('div');
            starfield.className = 'starfield';
            const stars = document.createElement('div');
            stars.className = 'stars';
            starfield.appendChild(stars);
            document.body.insertBefore(starfield, document.body.firstChild);
            
            // Create planet container
            const planetContainer = document.createElement('div');
            planetContainer.id = 'planet-container';
            planetContainer.className = 'planet-container';
            heroSection.appendChild(planetContainer);
            
            // Initialize the planet
            initPlanet();
        }
    } else {
        initPlanet();
    }
});