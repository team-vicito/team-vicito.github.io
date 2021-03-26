import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.min.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@v0.119.1/examples/jsm/loaders/GLTFLoader.min.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@v0.119.1/examples/jsm/controls/OrbitControls.min.js";

let scene, renderer, camera, raycaster, mouse;
let lights = [];

const initializeLights = () => {
  const ambientLight = new THREE.AmbientLight(0xAAAAAA, 0.5);
  scene.add(ambientLight);

  lights[0] = new THREE.DirectionalLight(0xFFFFFF, 0.5);
  lights[0].position.set(500, 500, 0);
  scene.add(lights[0]);

  lights[1] = new THREE.DirectionalLight(0xFFFFFF, 0.5);
  lights[1].position.set(-500, 500, 0);
  scene.add(lights[1]);

  lights[2] = new THREE.DirectionalLight(0xFFFFFF, 0.5);
  lights[2].position.set(0, -500, 0);
  scene.add(lights[2]);
}

const initializeScene = () => {
  let controls, loader;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(localStorage.getItem("currentTheme") == "dark" ? 0x121212 : 0xFFFFFF);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  document.getElementById("main").appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
  camera.rotation.set(-0.4, -0.7, -0.2);
  camera.position.set(-45, 25, 55);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  initializeLights();

  loader = new GLTFLoader();
  loader.load("../assets/model/scene.glb", (gltf) => {
    const box = new THREE.Box3();
    box.setFromObject(gltf.scene);
    box.getCenter(controls.target);

    scene.add(gltf.scene);
    render();
  });
}

const raycast = (event, mousex, mousey) => {
  const touchlist = event.changedTouches;

  // can be simplified
  if (touchlist) {
    mouse.x = mousex || (touchlist[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = mousey || -(touchlist[0].clientY / window.innerHeight) * 2 + 1;
  } else {
    mouse.x = mousex || (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = mousey || -(event.clientY / window.innerHeight) * 2 + 1;
  }

  render();
  raycaster.setFromCamera(mouse, camera);
  const intersectingElements = raycaster.intersectObjects(scene.children, true);

  console.log(intersectingElements[0]);

  return intersectingElements[0];
}

const checkShowDetailsFunction = () => {
  try {
    if (showDetailsAbout) return true;
  } catch (_) {
    return false;
  }
}

const mouseMove = (event) => {
  const intersected = raycast(event);
  const canvas = document.querySelector("canvas");

  canvas.style.cursor = "grab";

  if (!checkShowDetailsFunction()) return;
  if (intersected) canvas.style.cursor = "pointer";
}

const mouseClick = (event) => {
  const intersected = raycast(event);

  if (!checkShowDetailsFunction()) return;
  if (intersected) showDetailsAbout(intersected.object.name);
}

const render = () => {
  renderer.render(scene, camera);
  console.log(camera);
}

window.addEventListener("mousedown", mouseClick, true);
window.addEventListener("touchstart", mouseClick, true);
//window.addEventListener("mousemove", mouseMove, true);

try {
  initializeScene();
} catch (error) {
  console.error(error);

  document.querySelectorAll(".error").forEach((elem) => {
    elem.style.display = "block";
  });
  document.querySelectorAll(".info").forEach((elem) => {
    elem.style.display = "none";
  });
}

window.enableLightHelpers = () => {
  lights.forEach((light) => {
    let helper = new THREE.DirectionalLightHelper(light, 5);
    scene.add(helper);
  });

  render();
}
