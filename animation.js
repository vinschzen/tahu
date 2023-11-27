import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;
camera.position.y = 0.45;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('gorengan.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
});

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const animate = () => {
    requestAnimationFrame(animate);

    if (scene.children.length > 0) {
        const model = scene.children[0];
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;

        // Rotate camera around the object
        const angle = Date.now() * 0.0001;
        camera.position.x = Math.sin(angle) * 0.4;
        camera.position.z = Math.cos(angle) * 0.4;
        camera.lookAt(model.position);
    }

    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});