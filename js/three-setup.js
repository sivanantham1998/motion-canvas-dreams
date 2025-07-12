
// ===== THREE.JS SETUP FOR 3D DEVELOPER ICON =====

document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is loaded and we're on the index page
    if (typeof THREE !== 'undefined' && document.getElementById('three-container')) {
        console.log('Initializing Three.js scene...');
        init3DScene();
    }
});

function init3DScene() {
    const container = document.getElementById('three-container');
    
    if (!container) {
        console.log('Three.js container not found');
        return;
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x007bff, 0.8, 10);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);
    
    // Create developer-themed 3D objects
    const group = new THREE.Group();
    
    // Monitor/Screen
    const monitorGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
    const monitorMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    monitor.position.set(0, 0.5, 0);
    monitor.castShadow = true;
    monitor.receiveShadow = true;
    group.add(monitor);
    
    // Screen
    const screenGeometry = new THREE.PlaneGeometry(1.8, 1);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x007bff });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.5, 0.06);
    group.add(screen);
    
    // Code lines on screen
    for (let i = 0; i < 5; i++) {
        const lineGeometry = new THREE.PlaneGeometry(Math.random() * 1.2 + 0.4, 0.05);
        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set((Math.random() - 0.5) * 1.2, 0.8 - i * 0.2, 0.061);
        group.add(line);
    }
    
    // Monitor base
    const baseGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.2, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, -0.4, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);
    
    // Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(1.8, 0.1, 0.6);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ color: 0x34495e });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, -0.8, 0.8);
    keyboard.castShadow = true;
    keyboard.receiveShadow = true;
    group.add(keyboard);
    
    // Keys on keyboard
    for (let i = 0; i < 20; i++) {
        const keyGeometry = new THREE.BoxGeometry(0.12, 0.05, 0.12);
        const keyMaterial = new THREE.MeshPhongMaterial({ color: 0x95a5a6 });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        const row = Math.floor(i / 5);
        const col = i % 5;
        key.position.set(
            (col - 2) * 0.2,
            -0.75,
            0.6 + (row - 1.5) * 0.15
        );
        key.castShadow = true;
        group.add(key);
    }
    
    // Coffee cup
    const cupGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.3, 12);
    const cupMaterial = new THREE.MeshPhongMaterial({ color: 0xe74c3c });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.set(-1.5, -0.65, 0.5);
    cup.castShadow = true;
    group.add(cup);
    
    // Coffee
    const coffeeGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 12);
    const coffeeMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
    coffee.position.set(-1.5, -0.52, 0.5);
    group.add(coffee);
    
    // Handle
    const handleGeometry = new THREE.TorusGeometry(0.15, 0.03, 8, 16, Math.PI);
    const handleMaterial = new THREE.MeshPhongMaterial({ color: 0xe74c3c });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(-1.3, -0.65, 0.5);
    handle.rotation.z = Math.PI / 2;
    group.add(handle);
    
    // Mouse
    const mouseGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.5);
    const mouseMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 });
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(1.2, -0.8, 0.6);
    mouse.castShadow = true;
    group.add(mouse);
    
    // Floating code symbols
    const symbols = ['</', '{}', '()', '[]', '!=', '=='];
    const floatingObjects = [];
    
    symbols.forEach((symbol, index) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        
        context.fillStyle = '#007bff';
        context.font = 'Bold 24px Arial';
        context.textAlign = 'center';
        context.fillText(symbol, 32, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture, 
            transparent: true 
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        
        const angle = (index / symbols.length) * Math.PI * 2;
        sprite.position.set(
            Math.cos(angle) * 3,
            Math.sin(angle) * 2 + 1,
            Math.sin(angle) * 2
        );
        sprite.scale.set(0.5, 0.5, 0.5);
        
        scene.add(sprite);
        floatingObjects.push(sprite);
    });
    
    scene.add(group);
    
    // Position camera
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });
    
    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.01;
        
        // Gentle rotation
        group.rotation.y += 0.005;
        
        // Mouse interaction
        group.rotation.x = mouseY * 0.2;
        group.rotation.y += mouseX * 0.01;
        
        // Floating animation for code symbols
        floatingObjects.forEach((obj, index) => {
            const baseAngle = (index / floatingObjects.length) * Math.PI * 2;
            obj.position.x = Math.cos(baseAngle + time) * 3;
            obj.position.y = Math.sin(baseAngle + time * 0.7) * 2 + 1;
            obj.position.z = Math.sin(baseAngle + time * 0.5) * 2;
            
            // Gentle rotation
            obj.material.rotation = time + index;
        });
        
        // Screen flicker effect
        screen.material.color.setHSL(0.6, 1, 0.5 + Math.sin(time * 2) * 0.1);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    function handleResize() {
        const rect = container.getBoundingClientRect();
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height);
    }
    
    window.addEventListener('resize', handleResize);
    
    console.log('Three.js scene initialized successfully!');
}
