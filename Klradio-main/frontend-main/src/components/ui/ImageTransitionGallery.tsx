'use client';

import React, { useEffect, useRef } from 'react';
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Face3,
  Geometry,
  InstancedBufferAttribute,
  InstancedMesh,
  MathUtils,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
  Texture
} from 'three';
import { gsap, Power4 } from 'gsap';

// Helper functions
function limit(val: number, min: number, max: number): number {
  return val < min ? min : (val > max ? max : val);
}

function lerp(a: number, b: number, x: number): number {
  return a + x * (b - a);
}

// AnimatedPlane class (adapted to TypeScript)
class AnimatedPlane {
  renderer: WebGLRenderer;
  screen: any;
  size: number;
  anim: number;
  texture: Texture;
  o3d: Object3D;
  uProgress: { value: number };
  uvScale: Vector2;
  material!: MeshBasicMaterial;
  wSize!: number;
  nx!: number;
  ny!: number;
  icount!: number;
  bGeometry!: BufferGeometry;
  dx!: number;
  dy!: number;
  imesh?: InstancedMesh;

  constructor(params: any) {
    for (const [key, value] of Object.entries(params)) {
      (this as any)[key] = value;
    }
    this.o3d = new Object3D();
    this.uProgress = { value: 0 };
    this.uvScale = new Vector2();

    this.initMaterial();
    this.initPlane();
  }

  initMaterial() {
    this.material = new MeshBasicMaterial({
      side: DoubleSide,
      transparent: true,
      map: this.texture,
      onBeforeCompile: shader => {
        shader.uniforms.progress = this.uProgress;
        shader.uniforms.uvScale = { value: this.uvScale };
        shader.vertexShader = `
          uniform float progress;
          uniform vec2 uvScale;

          attribute vec3 offset;
          attribute vec3 rotation;
          attribute vec2 uvOffset;

          mat3 rotationMatrixXYZ(vec3 r)
          {
            float cx = cos(r.x);
            float sx = sin(r.x);
            float cy = cos(r.y);
            float sy = sin(r.y);
            float cz = cos(r.z);
            float sz = sin(r.z);

            return mat3(
               cy * cz, cx * sz + sx * sy * cz, sx * sz - cx * sy * cz,
              -cy * sz, cx * cz - sx * sy * sz, sx * cz + cx * sy * sz,
                    sy,               -sx * cy,                cx * cy
            );
          }
        ` + shader.vertexShader;

        shader.vertexShader = shader.vertexShader.replace('#include <uv_vertex>', `
          #include <uv_vertex>
          vUv = vUv * uvScale + uvOffset;
        `);

        shader.vertexShader = shader.vertexShader.replace('#include <project_vertex>', `
          mat3 rotMat = rotationMatrixXYZ(progress * rotation);
          transformed = rotMat * transformed;

          vec4 mvPosition = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            mvPosition = instanceMatrix * mvPosition;
          #endif

          mvPosition.xyz += progress * offset;

          mvPosition = modelViewMatrix * mvPosition;
          gl_Position = projectionMatrix * mvPosition;
        `);
      }
    });
  }

  initPlane() {
    const { width, wWidth, wHeight } = this.screen;
    this.wSize = this.size * wWidth / width;
    this.nx = Math.ceil(wWidth / this.wSize) + 1;
    this.ny = Math.ceil(wHeight / this.wSize) + 1;
    this.icount = this.nx * this.ny;

    this.initGeometry();
    this.initUV();
    this.initAnimAttributes();

    if (this.imesh) {
      this.o3d.remove(this.imesh);
    }
    this.imesh = new InstancedMesh(this.bGeometry, this.material, this.icount);
    this.o3d.add(this.imesh);

    const dummy = new Object3D();
    let index = 0;
    let x = -(wWidth - (wWidth - this.nx * this.wSize)) / 2 + this.dx;
    for (let i = 0; i < this.nx; i++) {
      let y = -(wHeight - (wHeight - this.ny * this.wSize)) / 2 + this.dy;
      for (let j = 0; j < this.ny; j++) {
        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        this.imesh.setMatrixAt(index++, dummy.matrix);
        y += this.wSize;
      }
      x += this.wSize;
    }
  }

  initGeometry() {
    const geometry = new Geometry();
    geometry.vertices.push(new Vector3(0, 0, 0));
    geometry.vertices.push(new Vector3(this.wSize, 0, 0));
    geometry.vertices.push(new Vector3(0, this.wSize, 0));
    geometry.vertices.push(new Vector3(this.wSize, this.wSize, 0));
    geometry.faces.push(new Face3(0, 2, 1));
    geometry.faces.push(new Face3(2, 3, 1));

    geometry.faceVertexUvs[0].push([
      new Vector2(0, 0),
      new Vector2(0, 1),
      new Vector2(1, 0)
    ]);
    geometry.faceVertexUvs[0].push([
      new Vector2(0, 1),
      new Vector2(1, 1),
      new Vector2(1, 0)
    ]);

    this.dx = this.wSize / 2;
    this.dy = this.wSize / 2;
    geometry.translate(-this.dx, -this.dy, 0);

    this.bGeometry = new BufferGeometry().fromGeometry(geometry);
  }

  initAnimAttributes() {
    const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;
    const v3 = new Vector3();

    const offsets = new Float32Array(this.icount * 3);
    for (let i = 0; i < offsets.length; i += 3) {
      if (this.anim === 1) v3.set(rndFS(10), rnd(50, 100), rnd(20, 50)).toArray(offsets, i);
      else v3.set(rndFS(20), rndFS(20), rnd(20, 200)).toArray(offsets, i);
    }
    this.bGeometry.setAttribute('offset', new InstancedBufferAttribute(offsets, 3));

    const rotations = new Float32Array(this.icount * 3);
    const angle = Math.PI * 4;
    for (let i = 0; i < rotations.length; i += 3) {
      rotations[i] = rndFS(angle);
      rotations[i + 1] = rndFS(angle);
      rotations[i + 2] = rndFS(angle);
    }
    this.bGeometry.setAttribute('rotation', new InstancedBufferAttribute(rotations, 3));
  }

  initUV() {
    const ratio = this.nx / this.ny;
    if(!this.texture.image) return;
    const tRatio = this.texture.image.width / this.texture.image.height;
    if (ratio > tRatio) this.uvScale.set(1 / this.nx, (tRatio / ratio) / this.ny);
    else this.uvScale.set((ratio / tRatio) / this.nx, 1 / this.ny);
    const nW = this.uvScale.x * this.nx;
    const nH = this.uvScale.y * this.ny;

    const v2 = new Vector2();
    const uvOffsets = new Float32Array(this.icount * 2);
    for (let i = 0; i < this.nx; i++) {
      for (let j = 0; j < this.ny; j++) {
        v2.set(
          this.uvScale.x * i + (1 - nW) / 2,
          this.uvScale.y * j + (1 - nH) / 2
        ).toArray(uvOffsets, (i * this.ny + j) * 2);
      }
    }
    this.bGeometry.setAttribute('uvOffset', new InstancedBufferAttribute(uvOffsets, 2));
  }

  setTexture(texture: Texture) {
    this.texture = texture;
    this.material.map = texture;
    this.initUV();
  }

  resize() {
    this.initPlane();
  }
}

interface ImageTransitionGalleryProps {
  images: { src: string }[];
}


const ImageTransitionGallery: React.FC<ImageTransitionGalleryProps> = ({ images }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    class App {
      renderer!: WebGLRenderer;
      scene!: Scene;
      camera!: PerspectiveCamera;
      screen = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0 };
      loader = new TextureLoader();
      textures: Texture[] = [];
      plane1!: AnimatedPlane;
      plane2!: AnimatedPlane;
      planes!: Object3D;
      progress = 0;
      targetProgress = 0;
      mouse = new Vector2();
      conf = {
        size: 10,
        images: images
      };
      
      constructor() {
        this.init();
      }

      init() {
        this.renderer = new WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });

        this.camera = new PerspectiveCamera(50);
        this.camera.position.z = 150;

        this.updateSize();
        window.addEventListener('resize', this.onResize);

        Promise.all(this.conf.images.map((img, i) => this.loadTexture(img, i))).then(() => {
          this.initScene();
          this.initListeners();

          gsap.fromTo(this.plane1.uProgress,
            { value: -2 },
            { value: 0, duration: 2.5, ease: Power4.easeOut }
          );

          this.animate();
        });
      }

      initScene() {
        this.scene = new Scene();
    
        this.plane1 = new AnimatedPlane({
          renderer: this.renderer, screen: this.screen,
          size: this.conf.size,
          anim: 1,
          texture: this.textures[0]
        });
    
        this.plane2 = new AnimatedPlane({
          renderer: this.renderer, screen: this.screen,
          size: this.conf.size,
          anim: 2,
          texture: this.textures[1]
        });
    
        this.setPlanesProgress(0);
    
        this.planes = new Object3D();
        this.planes.add(this.plane1.o3d);
        this.planes.add(this.plane2.o3d);
        this.scene.add(this.planes);
      }
      
      initListeners() {
        document.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('wheel', this.onWheel);
        document.addEventListener('click', this.onClick);
        document.addEventListener('keyup', this.onKeyup);
      }
      
      onMouseMove = (e: MouseEvent) => {
        this.mouse.x = (e.clientX / this.screen.width) * 2 - 1;
        this.mouse.y = -(e.clientY / this.screen.height) * 2 + 1;
      }

      onWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY > 0) {
          this.targetProgress = limit(this.targetProgress + 1 / 20, 0, this.conf.images.length - 1);
        } else {
          this.targetProgress = limit(this.targetProgress - 1 / 20, 0, this.conf.images.length - 1);
        }
      }
      
      onClick = (e: MouseEvent) => {
        if (e.clientY < this.screen.height / 2) {
          this.navPrevious();
        } else {
          this.navNext();
        }
      }

      onKeyup = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          this.navPrevious();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          this.navNext();
        }
      }

      navNext() {
        if (Number.isInteger(this.targetProgress)) this.targetProgress += 1;
        else this.targetProgress = Math.ceil(this.targetProgress);
        this.targetProgress = limit(this.targetProgress, 0, this.conf.images.length - 1);
      }
    
      navPrevious() {
        if (Number.isInteger(this.targetProgress)) this.targetProgress -= 1;
        else this.targetProgress = Math.floor(this.targetProgress);
        this.targetProgress = limit(this.targetProgress, 0, this.conf.images.length - 1);
      }

      updateProgress() {
        const progress1 = lerp(this.progress, this.targetProgress, 0.1);
        const pdiff = progress1 - this.progress;
        if (pdiff === 0) return;
    
        const p0 = this.progress % 1;
        const p1 = progress1 % 1;
        if ((pdiff > 0 && p1 < p0) || (pdiff < 0 && p0 < p1)) {
          const i = Math.floor(progress1);
          if (this.textures[i]) this.plane1.setTexture(this.textures[i]);
          if (this.textures[i+1]) this.plane2.setTexture(this.textures[i + 1]);
        }
    
        this.progress = progress1;
        this.setPlanesProgress(this.progress % 1);
      }

      setPlanesProgress(progress: number) {
        this.plane1.uProgress.value = progress;
        this.plane2.uProgress.value = -1 + progress;
        this.plane1.material.opacity = 1 - progress;
        this.plane2.material.opacity = progress;
        this.plane1.o3d.position.z = progress;
        this.plane2.o3d.position.z = progress - 1;
      }
    
      animate = () => {
        requestAnimationFrame(this.animate);
    
        this.updateProgress();
    
        const tiltX = lerp(this.planes.rotation.x, -this.mouse.y * 0.2, 0.1);
        const tiltY = lerp(this.planes.rotation.y, this.mouse.x * 0.2, 0.1);
        this.planes.rotation.set(tiltX, tiltY, 0);
    
        this.renderer.render(this.scene, this.camera);
      }
      
      onResize = () => {
        this.updateSize();
      }

      updateSize() {
        const container = canvasRef.current?.parentElement;
        if (!container) return;

        this.screen.width = container.clientWidth;
        this.screen.height = container.clientHeight;
        this.screen.ratio = this.screen.width / this.screen.height;
        
        if (this.renderer && this.camera) {
          this.renderer.setSize(this.screen.width, this.screen.height);
          this.camera.aspect = this.screen.ratio;
          this.camera.updateProjectionMatrix();
          const wsize = this.getRendererSize();
          this.screen.wWidth = wsize[0]; this.screen.wHeight = wsize[1];
        }
        if (this.plane1) this.plane1.resize();
        if (this.plane2) this.plane2.resize();
      }

      getRendererSize() {
        const vFOV = (this.camera.fov * Math.PI) / 180;
        const h = 2 * Math.tan(vFOV / 2) * Math.abs(this.camera.position.z);
        const w = h * this.camera.aspect;
        return [w, h];
      }

      loadTexture(img: {src: string}, index: number) {
        return new Promise<Texture>(resolve => {
          this.loader.load(
            img.src,
            texture => {
              this.textures[index] = texture;
              resolve(texture);
            }
          );
        });
      }

      destroy() {
        window.removeEventListener('resize', this.onResize);
        document.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('wheel', this.onWheel);
        document.removeEventListener('click', this.onClick);
        document.removeEventListener('keyup', this.onKeyup);
      }
    }
    
    appRef.current = new App();

    return () => {
      appRef.current?.destroy();
    };
  }, [images]);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh]">
        <canvas ref={canvasRef} id="canvas"></canvas>
        <style jsx>{`
            #canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: block;
                cursor: pointer;
            }
        `}</style>
    </div>
  );
};

export default ImageTransitionGallery;
