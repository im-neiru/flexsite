import { createSignal, onCleanup, onMount } from "solid-js";
import "../scss/background.scss";
import {
  AmbientLight,
  DirectionalLight,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  PCFSoftShadowMap,
  PointsMaterial,
  Points,
  TorusGeometry,
  SphereGeometry,
  IcosahedronGeometry
} from "three";

export function HyperBackground() {
  let surface:
    | HTMLCanvasElement
    | ((el: HTMLCanvasElement) => void)
    | undefined;

  let frameId: number | undefined;
  let [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 });

  let camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  onMount(() => {
    if (surface !== undefined) {
      let renderer = new WebGLRenderer({
        canvas: surface as HTMLCanvasElement
      });

      const updateSize = () => {
        camera = new PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );

        camera.position.z = 5;

        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", updateSize);

      updateSize();

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = PCFSoftShadowMap;
      handleRender(renderer);
    }

    onCleanup(() => {
      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
      }
    });
  });

  camera.position.z = 5;

  let scene = new Scene();
  const geometrySphere = new IcosahedronGeometry(2, 6);
  const geometryTorus = new TorusGeometry(4, 0.6, 16, 48);
  const material = new PointsMaterial({
    color: 0xe5e5e5,
    size: 0.015,
    sizeAttenuation: true,
    fog: true
  });
  let sphere = new Points(geometrySphere, material);
  let torus = new Points(geometryTorus, material);

  const light = new DirectionalLight(0x00ffff, 1);
  const ambient = new AmbientLight(0x2020c0);
  light.position.set(0, 1, 0);
  light.castShadow = true;

  scene.add(light);
  scene.add(ambient);
  scene.add(sphere);
  scene.add(torus);

  const handleRender = (renderer: WebGLRenderer) => {
    function animate() {
      frameId = requestAnimationFrame(animate);
      let rx =
        ((mousePosition().x - window.innerWidth / 2) / window.innerWidth) *
        0.02;
      let ry =
        ((mousePosition().y - window.innerHeight / 2) / window.innerHeight) *
        0.02;

      sphere.rotation.x += rx;
      sphere.rotation.y -= ry;
      sphere.rotation.z += 0.02;

      torus.rotation.x += rx;
      torus.rotation.y -= ry;
      torus.rotation.z += 0.03;

      sphere.visible = true;

      renderer.render(scene, camera);
    }
    animate();
  };

  window.onmousemove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  return <canvas ref={surface} class="hyper-background" />;
}
