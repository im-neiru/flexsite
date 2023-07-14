import { onCleanup, onMount } from "solid-js";
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
  PCFSoftShadowMap
} from "three";

export function HyperBackground() {
  let surface:
    | HTMLCanvasElement
    | ((el: HTMLCanvasElement) => void)
    | undefined;

  let frameId: number | undefined;

  onMount(() => {
    if (surface !== undefined) {
      let renderer = new WebGLRenderer({
        canvas: surface as HTMLCanvasElement
      });
      renderer.setSize(
        (surface as HTMLCanvasElement).clientWidth,
        (surface as HTMLCanvasElement).clientHeight
      );

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

  let camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;

  let scene = new Scene();
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: 0xff0000 });
  let cube = new Mesh(geometry, material);

  const light = new DirectionalLight(0xffffff, 1);
  const ambient = new AmbientLight(0x101010);
  light.position.set(0, 1, 0);
  light.castShadow = true;

  scene.add(light);
  scene.add(ambient);
  scene.add(cube);

  const handleRender = (renderer: WebGLRenderer) => {
    function animate() {
      frameId = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.02;
      cube.visible = true;

      renderer.render(scene, camera);
    }
    animate();
  };

  return <canvas ref={surface} class="hyper-background" />;
}
