import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from 'https://cdn.skypack.dev/tween';
import postprocessing from 'https://cdn.jsdelivr.net/npm/postprocessing@6.33.3/+esm'
import { BloomEffect, EffectComposer, EffectPass, RenderPass, ShaderPass} from 'https://cdn.jsdelivr.net/npm/postprocessing@6.33.3/+esm';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.38;
camera.position.y = 0.45;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
let model;

loader.load('scene.gltf', (gltf) => {
    model = gltf.scene;
    scene.add(model);
});
    
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const animate = () => {
    requestAnimationFrame(animate);

    if (model) {
        // model.rotation.x += 0.01;
        model.rotation.y += 0.003;

        // Rotate camera around the object
        // const angle = Date.now() * 0.0001;
        // camera.position.x = Math.sin(angle) * 0.35;
        // camera.position.z = Math.cos(angle) * 0.35;
        camera.lookAt(model.position);
    }

    TWEEN.update();

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

window.showContent = function(section) {
    const sections = ['home', 'about', 'products'];
    sections.forEach((s) => {
        const element = document.getElementById(s);
        if (s === section) {
            element.style.opacity = 1;
        } else {
            element.style.opacity = 0;
        }
    });    

    const targetPosition = new THREE.Vector3();

    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        if (item.innerHTML.toLowerCase() == section) 
        {
            item.parentNode.classList.add('active')
        }
        else {
            item.parentNode.classList.remove('active')
        }
    });

    switch (section) {
            case 'home':
                targetPosition.set(0, 0.38, 0.45);
                break;
            case 'about':
                targetPosition.set(0, 0.4, 0);
                break;
            case 'products':            
                targetPosition.set(0, 0.5, 1);
                break;
        };

    new TWEEN.Tween(camera.position)
        .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, 3000) 
        .easing(TWEEN.Easing.Quadratic.InOut) 
        .start();
    }

    const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const brightnessContrastPass = new ShaderPass(THREE.BrightnessContrastShader);
        brightnessContrastPass.uniforms.brightness.value = 0.1; // Adjust brightness
        brightnessContrastPass.uniforms.contrast.value = 1.5; // Adjust contrast
        composer.addPass(brightnessContrastPass);


        function render() {

            composer.render();

            requestAnimationFrame(render);
        }

        render();