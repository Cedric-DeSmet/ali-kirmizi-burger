import * as THREE from 'https://unpkg.com/three@0.171.0/build/three.module.js';

const { createElement: h, useEffect, useRef, useState } = React;
const { createRoot } = ReactDOM;

const ASSETS = {
  hero: './src/assets/hero-bacon-stack.jpg',
  greenFire: './src/assets/menu-green-fire.jpg',
  smokedCheddar: './src/assets/menu-smoked-cheddar.jpg',
  onionMelt: './src/assets/menu-onion-melt.jpg',
  tray: './src/assets/tray-burgers.jpg'
};

const NAV_ITEMS = [
  ['menu', 'menu'],
  ['craft', 'craft'],
  ['visit', 'visit']
];

const COPY = {
  tr: {
    nav: { menu: 'Menü', craft: 'Ustalık', visit: 'Ziyaret' },
    actions: { reserve: 'Rezervasyon', order: 'Sipariş ver', menu: 'Menüyü gör', craft: 'Nasıl yapıyoruz', book: 'Masa ayır', add: 'Siparişe ekle' },
    hero: {
      badge: 'Sıcak plaka, eriyen cheddar',
      title: 'Ali Kırmızı Burger',
      copy: 'Kızgın plakada çıtırlaşan köfte, tereyağlı brioche, eriyen peynir ve bol özel sos. İlk lokmada sıcak ekmek, ikinci lokmada cheddar ve turşu gelir.',
      dropLabel: 'Bu akşam sıcak çıkar',
      dropName: 'Füme Cheddar Burger',
      gameHint: 'Katmanları yakala, burgeri tamamla',
      quickBites: ['7 dakikada masada', 'Bol sos', 'Çıtır patatesle']
    },
    features: [
      ['flame', '260C mühür', 'Kenarlar çıtır, içi sulu'],
      ['chef', 'Günlük brioche', 'Tereyağlı, parlak, yumuşak'],
      ['spark', '9 sos', 'Acı, tatlı, isli ve bol']
    ],
    menu: {
      eyebrow: 'Menü panosu',
      title: 'Sos akar, peynir uzar, karar zorlaşır.',
      copy: 'Her burger sıcak çıkar. Çıtır kenar, eriyen peynir, keskin turşu ve son lokmaya kadar yeterli sos.',
      sides: ['Trüflü patates', 'Çıtır soğan yaprakları', 'Mısır salatası', 'Malt milkshake'],
      comboTitle: 'Yanına iyi gider',
      comboCopy: 'Patatesi sos havuzuna batır, milkshake’i soğuk tut, burgeri iki elle kavra.'
    },
    burgers: [
      {
        name: 'Ali Kırmızı',
        price: '₺420',
        tag: 'İmza',
        description: 'Kuru dinlendirilmiş dana, füme cheddar, karamelize soğan, özel Ali sos.',
        crave: 'İsli cheddar, tatlı soğan ve bol Ali sos.',
        color: 'bg-ember',
        image: ASSETS.smokedCheddar
      },
      {
        name: 'Green Fire',
        price: '₺380',
        tag: 'Acılı',
        description: 'Jalapeno relish, fesleğen aioli, köz poblano, çıtır marul.',
        crave: 'Yeşil acı, ferah aioli ve çıtır marul.',
        color: 'bg-basil',
        image: ASSETS.greenFire
      },
      {
        name: 'Golden Melt',
        price: '₺395',
        tag: 'Favori',
        description: 'Çift smash köfte, Amerikan peyniri, turşu, hardallı tereyağlı brioche.',
        crave: 'Eriyen peynir, keskin turşu ve hardallı tereyağı.',
        color: 'bg-mustard',
        image: ASSETS.onionMelt
      }
    ],
    craft: {
      eyebrow: 'Ustalık',
      title: 'Kokusu önce gelir, burger sonra masaya iner.',
      imageAlt: 'Tepside servis edilen iki Ali Kırmızı burger',
      steps: [
        ['01', 'Mühürle', 'İnce köfteler kızgın plakaya iner; etin kenarı karamelleşir, suyu içeride kalır.'],
        ['02', 'Erit', 'Cheddar köftenin üstünde yayılır, soğan ve turşu burgerin yağını dengeler.'],
        ['03', 'Sosla', 'Her ekmek kapağı özel sosla parlatılır; son lokma kuru kalmaz.'],
        ['04', 'Sıcak ver', 'Burger, patates ve içecek aynı anda çıkar; masa daha ilk kokuda kararını verir.']
      ]
    },
    visit: {
      eyebrow: 'Bize uğra',
      title: 'Kızgın plaka sesi için bir masa kap.',
      details: ['24 Market Caddesi', '11:00 - 23:00 açık', '(555) 019-8824'],
      formTitle: 'Bu akşam rezervasyon',
      placeholders: { name: 'İsim', email: 'E-posta' }
    },
    footer: 'React, Tailwind ve Three.js ile hazırlanmış Ali Kırmızı Burger sitesi.'
  },
  en: {
    nav: { menu: 'Menu', craft: 'Craft', visit: 'Visit' },
    actions: { reserve: 'Reserve', order: 'Order now', menu: 'See menu', craft: 'How we cook', book: 'Book table', add: 'Add to order' },
    hero: {
      badge: 'Hot griddle, melting cheddar',
      title: 'Ali Kırmızı Burger',
      copy: 'Crisp patties from the hot griddle, buttered brioche, melted cheese, and plenty of house sauce. First comes the warm bun, then cheddar and pickles.',
      dropLabel: 'Hot tonight',
      dropName: 'Smoked Cheddar Burger',
      gameHint: 'Grab layers, finish the burger',
      quickBites: ['On the table in 7', 'Extra sauce', 'Crispy fries']
    },
    features: [
      ['flame', '500F sear', 'Crisp edges, juicy center'],
      ['chef', 'Daily brioche', 'Buttery, warm, soft'],
      ['spark', '9 sauces', 'Hot, sweet, smoky, loaded']
    ],
    menu: {
      eyebrow: 'Menu board',
      title: 'Sauce drips, cheese pulls, decisions get harder.',
      copy: 'Every burger is served hot with crisp edges, melted cheese, sharp pickles, and enough sauce for the last bite.',
      sides: ['Truffle fries', 'Crispy onion petals', 'Street corn slaw', 'Malted shakes'],
      comboTitle: 'Good on the side',
      comboCopy: 'Dip the fries, keep the shake cold, and hold the burger with both hands.'
    },
    burgers: [
      {
        name: 'Ali Kirmizi',
        price: '$17',
        tag: 'Signature',
        description: 'Dry-aged beef, smoked cheddar, caramelized onion, house Ali sauce.',
        crave: 'Smoky cheddar, sweet onions, and Ali sauce.',
        color: 'bg-ember',
        image: ASSETS.smokedCheddar
      },
      {
        name: 'Green Fire',
        price: '$15',
        tag: 'Spicy',
        description: 'Jalapeno relish, basil aioli, charred poblanos, crisp lettuce.',
        crave: 'Green heat, cool aioli, and crisp lettuce.',
        color: 'bg-basil',
        image: ASSETS.greenFire
      },
      {
        name: 'Golden Melt',
        price: '$16',
        tag: 'Crowd favorite',
        description: 'Double smash patties, American cheese, pickles, mustard butter bun.',
        crave: 'Melted cheese, sharp pickles, and mustard butter.',
        color: 'bg-mustard',
        image: ASSETS.onionMelt
      }
    ],
    craft: {
      eyebrow: 'The craft',
      title: 'You smell it first, then the burger hits the table.',
      imageAlt: 'Two Ali Kirmizi burgers served in trays',
      steps: [
        ['01', 'Sear', 'Thin patties hit steel hard; the edges caramelize while the center stays juicy.'],
        ['02', 'Melt', 'Cheddar spreads over the patty while onions and pickles balance the richness.'],
        ['03', 'Sauce', 'Every bun gets enough sauce so the final bite never lands dry.'],
        ['04', 'Serve hot', 'Burger, fries, and drink leave together; the table decides before the first bite.']
      ]
    },
    visit: {
      eyebrow: 'Visit us',
      title: 'Book a table for the sound of the griddle.',
      details: ['24 Market Street', 'Open 11am - 11pm', '(555) 019-8824'],
      formTitle: 'Reserve tonight',
      placeholders: { name: 'Name', email: 'Email' }
    },
    footer: 'Ali Kirmizi Burger website made with React, Tailwind, and Three.js.'
  }
};

function Icon({ name, className = '', size = 22 }) {
  const base = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className
  };

  const paths = {
    menu: [h('path', { d: 'M4 6h16' }), h('path', { d: 'M4 12h16' }), h('path', { d: 'M4 18h16' })],
    close: [h('path', { d: 'M18 6 6 18' }), h('path', { d: 'm6 6 12 12' })],
    arrow: [h('path', { d: 'M5 12h14' }), h('path', { d: 'm12 5 7 7-7 7' })],
    bag: [h('path', { d: 'M6 8h12l-1 12H7L6 8Z' }), h('path', { d: 'M9 8a3 3 0 0 1 6 0' })],
    chef: [h('path', { d: 'M6 18h12' }), h('path', { d: 'M7 18v-7' }), h('path', { d: 'M17 18v-7' }), h('path', { d: 'M8 11c-2 0-3-1.4-3-3 0-1.7 1.3-3 3-3 .7-1.8 2.3-3 4-3s3.3 1.2 4 3c1.7 0 3 1.3 3 3 0 1.6-1 3-3 3' })],
    flame: [h('path', { d: 'M8.5 14.5A3.5 3.5 0 0 0 12 21a3.5 3.5 0 0 0 3.5-6.5c-.8-1-1.3-1.9-1.3-3.5-1.9 1-3 2.4-3.4 4-1.1-.7-1.8-1.8-2.3-3.2-.8 1-1.2 1.9-1.2 2.7Z' }), h('path', { d: 'M12 2c.8 2.8-.6 4.1-2.1 5.8' })],
    spark: [h('path', { d: 'M12 2v5' }), h('path', { d: 'M12 17v5' }), h('path', { d: 'M2 12h5' }), h('path', { d: 'M17 12h5' }), h('path', { d: 'm4.9 4.9 3.5 3.5' }), h('path', { d: 'm15.6 15.6 3.5 3.5' }), h('path', { d: 'm19.1 4.9-3.5 3.5' }), h('path', { d: 'm8.4 15.6-3.5 3.5' })],
    star: [h('path', { d: 'm12 2 2.9 6 6.6.9-4.8 4.7 1.2 6.6L12 17.1l-5.9 3.1 1.2-6.6-4.8-4.7 6.6-.9L12 2Z', fill: 'currentColor' })],
    map: [h('path', { d: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z' }), h('circle', { cx: 12, cy: 10, r: 3 })],
    clock: [h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'M12 7v5l3 2' })],
    phone: [h('path', { d: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z' })],
    calendar: [h('path', { d: 'M8 2v4' }), h('path', { d: 'M16 2v4' }), h('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2 }), h('path', { d: 'M3 10h18' })]
  };

  return h('svg', base, paths[name] || paths.spark);
}

function BurgerScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.08, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';
    mount.appendChild(renderer.domElement);

    const burger = new THREE.Group();
    burger.rotation.x = -0.05;
    burger.rotation.y = -0.22;
    burger.rotation.z = -0.035;
    scene.add(burger);

    const makeSliceTexture = (image, crop, options = {}) => {
      const canvas = document.createElement('canvas');
      const scale = 1.45;
      canvas.width = Math.round(crop.w * scale);
      canvas.height = Math.round(crop.h * scale);
      const context = canvas.getContext('2d');
      context.drawImage(image, crop.x, crop.y, crop.w, crop.h, 0, 0, canvas.width, canvas.height);

      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let index = 0; index < pixels.data.length; index += 4) {
        const pixel = index / 4;
        const x = pixel % canvas.width;
        const y = Math.floor(pixel / canvas.width);
        const sideFade = Math.min(1, x / (canvas.width * 0.12), (canvas.width - x) / (canvas.width * 0.12));
        const verticalFade = Math.min(1, y / (canvas.height * 0.2), (canvas.height - y) / (canvas.height * 0.2));
        const edgeFade = Math.max(0, Math.min(1, sideFade * 1.35, verticalFade * 1.2));
        const red = pixels.data[index];
        const green = pixels.data[index + 1];
        const blue = pixels.data[index + 2];
        const brightness = (red + green + blue) / 3;
        const colorRange = Math.max(red, green, blue) - Math.min(red, green, blue);
        if (options.tint) {
          pixels.data[index] = Math.round(red * options.tint[0]);
          pixels.data[index + 1] = Math.round(green * options.tint[1]);
          pixels.data[index + 2] = Math.round(blue * options.tint[2]);
        }
        if (!options.keepDark) {
          if (brightness < 18 && colorRange < 30) {
            pixels.data[index + 3] = 0;
          } else if (brightness < 42 && colorRange < 42) {
            pixels.data[index + 3] = Math.round(pixels.data[index + 3] * Math.max(0.18, (brightness - 18) / 24));
          }
        }
        pixels.data[index + 3] = Math.round(pixels.data[index + 3] * edgeFade);
      }
      context.putImageData(pixels, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.needsUpdate = true;
      return texture;
    };

    const makeBurgerPlane = (image, layer) => {
      const texture = makeSliceTexture(image, layer.crop, { tint: layer.tint, keepDark: layer.keepDark });
      const aspect = layer.crop.w / layer.crop.h;
      const geometry = new THREE.PlaneGeometry(layer.width, layer.width / aspect, 32, 18);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: layer.opacity || 1,
        roughness: 0.54,
        metalness: 0.02,
        depthWrite: layer.depthWrite ?? true,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(layer.x || 0, layer.y, layer.z || 0);
      mesh.rotation.set(layer.rx || 0, layer.ry || 0, layer.rz || 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData.base = { ...mesh.position };
      mesh.userData.hoverOffset = new THREE.Vector3();
      mesh.userData.float = layer.float || 0.03;
      mesh.userData.baseRotationY = layer.ry || 0;
      mesh.userData.slot = layer.slot;
      mesh.renderOrder = layer.slot;
      burger.add(mesh);
      return mesh;
    };

    const fullCrop = { x: 36, y: 112, w: 664, h: 510 };
    const sceneWidth = 4.65;
    const sceneHeight = sceneWidth / (fullCrop.w / fullCrop.h);
    const makeSlice = ({ top, height, lift, z, ry, float }) => ({
      crop: { x: fullCrop.x, y: fullCrop.y + top, w: fullCrop.w, h: height },
      width: sceneWidth,
      x: 0,
      y: ((fullCrop.h / 2) - (top + height / 2)) / fullCrop.h * sceneHeight + lift,
      z,
      rx: -0.04,
      ry,
      rz: -0.035,
      opacity: 1,
      keepDark: true,
      float
    });
    const photoLayers = [
      makeSlice({ top: 0, height: 142, lift: 0.22, z: 0.28, ry: 0.035, float: 0.018 }),
      { ...makeSlice({ top: 112, height: 155, lift: 0.03, z: 0.13, ry: -0.014, float: 0.026 }), x: -0.24 },
      { ...makeSlice({ top: 238, height: 150, lift: -0.13, z: 0.22, ry: 0.024, float: 0.03 }), x: 0.32 },
      makeSlice({ top: 360, height: 150, lift: -0.38, z: 0.04, ry: -0.022, float: 0.02 })
    ].map((layer, slot) => ({ ...layer, slot }));
    const slots = photoLayers.map((layer) => ({
      x: layer.x || 0,
      y: layer.y,
      z: layer.z || 0,
      rx: layer.rx || 0,
      ry: layer.ry || 0,
      rz: layer.rz || 0
    }));

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(2.5, 80),
      new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.32, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -1.72, -0.65);
    shadow.scale.set(1.25, 0.35, 1);
    scene.add(shadow);

    let layerMeshes = [];
    let disposed = false;
    const image = new Image();
    image.onload = () => {
      if (disposed) return;
      layerMeshes = photoLayers.map((layer) => makeBurgerPlane(image, layer));
    };
    image.src = ASSETS.onionMelt;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const dragOffset = new THREE.Vector3();
    const pointerWorld = new THREE.Vector3();
    let activeMesh = null;
    let hoveredMesh = null;
    let activePointerId = null;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const updatePointer = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
    };

    const pointerToBurgerLocal = (event) => {
      updatePointer(event);
      raycaster.ray.intersectPlane(dragPlane, pointerWorld);
      return burger.worldToLocal(pointerWorld.clone());
    };

    const pickSlice = (event) => {
      updatePointer(event);
      const hits = raycaster.intersectObjects(layerMeshes, false);
      return hits.length ? hits[0].object : null;
    };

    const setHover = (mesh) => {
      if (hoveredMesh && hoveredMesh !== mesh) {
        hoveredMesh.userData.hoverOffset.set(0, 0, 0);
      }
      hoveredMesh = mesh;
      renderer.domElement.style.cursor = activeMesh ? 'grabbing' : hoveredMesh ? 'grab' : 'default';
    };

    const onPointerMove = (event) => {
      if (!layerMeshes.length) return;

      if (activeMesh && activePointerId === event.pointerId) {
        const local = pointerToBurgerLocal(event).add(dragOffset);
        activeMesh.position.x = clamp(local.x, -1.25, 1.35);
        activeMesh.position.y = clamp(local.y, -1.4, 1.55);
        activeMesh.position.z = slots[activeMesh.userData.slot].z + 0.62;
        renderer.domElement.style.cursor = 'grabbing';
        return;
      }

      const mesh = pickSlice(event);
      setHover(mesh);
      if (hoveredMesh) {
        const local = pointerToBurgerLocal(event);
        const slot = slots[hoveredMesh.userData.slot];
        hoveredMesh.userData.hoverOffset.set(
          clamp((local.x - slot.x) * 0.16, -0.16, 0.16),
          clamp((local.y - slot.y) * 0.12, -0.08, 0.08),
          0
        );
      }
    };

    const onPointerDown = (event) => {
      const mesh = pickSlice(event);
      if (!mesh) return;

      activeMesh = mesh;
      activePointerId = event.pointerId;
      setHover(mesh);
      const local = pointerToBurgerLocal(event);
      dragOffset.copy(mesh.position).sub(local);
      mesh.renderOrder = 20;
      renderer.domElement.style.cursor = 'grabbing';
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const onPointerUp = (event) => {
      if (!activeMesh || activePointerId !== event.pointerId) return;

      const oldSlot = activeMesh.userData.slot;
      let closestSlot = oldSlot;
      let closestDistance = Infinity;
      slots.forEach((slot, index) => {
        const dx = activeMesh.position.x - slot.x;
        const dy = activeMesh.position.y - slot.y;
        const distance = dx * dx + dy * dy * 1.7;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSlot = index;
        }
      });

      if (closestSlot !== oldSlot) {
        const otherMesh = layerMeshes.find((mesh) => mesh !== activeMesh && mesh.userData.slot === closestSlot);
        if (otherMesh) {
          otherMesh.userData.slot = oldSlot;
          otherMesh.renderOrder = oldSlot;
        }
        activeMesh.userData.slot = closestSlot;
      }

      activeMesh.renderOrder = activeMesh.userData.slot;
      activeMesh = null;
      activePointerId = null;
      renderer.domElement.style.cursor = hoveredMesh ? 'grab' : 'default';
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };

    const onPointerLeave = () => {
      if (activeMesh) return;
      setHover(null);
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);

    const key = new THREE.DirectionalLight('#fff1cc', 3.8);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.PointLight('#dc4f2f', 2.7, 10);
    fill.position.set(-3.6, 1.8, 3);
    scene.add(fill);

    const rim = new THREE.PointLight('#f4b43a', 2.6, 10);
    rim.position.set(3.2, 1.6, -2.6);
    scene.add(rim);
    scene.add(new THREE.HemisphereLight('#fff7ea', '#21130f', 1.85));

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 8.5 : 7.4;
      burger.scale.setScalar(width < 520 ? 0.78 : 1);
      camera.updateProjectionMatrix();
    };

    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      burger.rotation.y = -0.18 + Math.sin(elapsed * 0.75) * 0.065;
      burger.position.y = 0.12 + Math.sin(elapsed * 1.4) * 0.08;
      burger.rotation.x = -0.05 + Math.sin(elapsed * 0.9) * 0.025;
      layerMeshes.forEach((mesh, index) => {
        const slot = slots[mesh.userData.slot];
        const hover = mesh === hoveredMesh && mesh !== activeMesh ? 1 : 0;
        if (mesh !== activeMesh) {
          mesh.position.x += (slot.x + mesh.userData.hoverOffset.x - mesh.position.x) * 0.16;
          mesh.position.y += (slot.y + mesh.userData.hoverOffset.y + Math.sin(elapsed * 1.2 + index * 0.45) * mesh.userData.float + hover * 0.04 - mesh.position.y) * 0.16;
          mesh.position.z += (slot.z + hover * 0.18 - mesh.position.z) * 0.16;
        }
        mesh.rotation.x += (slot.rx - mesh.rotation.x) * 0.12;
        mesh.rotation.y += (slot.ry + Math.sin(elapsed * 0.75 + index) * 0.01 - mesh.rotation.y) * 0.12;
        mesh.rotation.z += (slot.rz - mesh.rotation.z) * 0.12;
      });
      shadow.scale.x = 1.25 + Math.sin(elapsed * 1.4) * 0.04;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(mount);
    requestAnimationFrame(resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerUp);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
    };
  }, []);

  return h('div', { className: 'absolute inset-0' },
    h('div', { className: 'absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-charcoal/35 to-transparent' }),
    h('div', { ref: mountRef, className: 'relative h-full w-full' })
  );
}

function Header({ copy, lang, setLang }) {
  const [navOpen, setNavOpen] = useState(false);
  const nextLang = lang === 'tr' ? 'en' : 'tr';

  const languageToggle = (className = '') => h('button', {
    type: 'button',
    className: `inline-flex items-center rounded-full border border-charcoal/15 bg-white/55 p-1 text-xs font-black shadow-sm transition hover:border-charcoal/35 ${className}`,
    'aria-label': lang === 'tr' ? 'Switch to English' : 'Türkçeye geç',
    onClick: () => setLang(nextLang)
  },
    h('span', { className: `rounded-full px-3 py-2 transition ${lang === 'tr' ? 'bg-charcoal text-cream' : 'text-charcoal/55'}` }, 'TR'),
    h('span', { className: `rounded-full px-3 py-2 transition ${lang === 'en' ? 'bg-charcoal text-cream' : 'text-charcoal/55'}` }, 'EN')
  );

  return h('header', { className: 'fixed inset-x-0 top-0 z-50 border-b border-charcoal/10 bg-cream/90 backdrop-blur-xl' },
    h('nav', { className: 'mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8' },
      h('a', { href: '#top', className: 'flex items-center gap-3', 'aria-label': 'Ali Kırmızı Burger home' },
        h('span', { className: 'flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-cream' }, h(Icon, { name: 'chef' })),
        h('span', null,
          h('span', { className: 'block font-display text-lg font-bold leading-none' }, 'Ali Kırmızı'),
          h('span', { className: 'text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/50' }, 'Burgers')
        )
      ),
      h('div', { className: 'hidden items-center gap-8 md:flex' }, NAV_ITEMS.map(([id, key]) =>
        h('a', { key: id, href: `#${id}`, className: 'text-sm font-bold text-charcoal/70 transition hover:text-charcoal' }, copy.nav[key])
      )),
      h('div', { className: 'hidden items-center gap-3 md:flex' },
        languageToggle(),
        h('a', { href: '#visit', className: 'rounded-full border border-charcoal/20 px-5 py-3 text-sm font-bold transition hover:border-charcoal hover:bg-charcoal hover:text-cream' }, copy.actions.reserve),
        h('a', { href: '#menu', className: 'inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5' }, copy.actions.order, ' ', h(Icon, { name: 'bag', size: 17 }))
      ),
      h('button', { type: 'button', className: 'flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 md:hidden', 'aria-label': 'Toggle navigation', onClick: () => setNavOpen(!navOpen) },
        h(Icon, { name: navOpen ? 'close' : 'menu', size: 20 })
      )
    ),
    navOpen && h('div', { className: 'border-t border-charcoal/10 bg-cream px-4 py-4 md:hidden' },
      h('div', { className: 'flex flex-col gap-2' },
        ...NAV_ITEMS.map(([id, key]) => h('a', { key: id, href: `#${id}`, className: 'rounded-md px-3 py-3 text-base font-bold', onClick: () => setNavOpen(false) }, copy.nav[key])),
        languageToggle('mt-2 justify-center'),
        h('a', { href: '#visit', className: 'mt-2 rounded-full bg-charcoal px-4 py-3 text-center font-bold text-cream', onClick: () => setNavOpen(false) }, copy.actions.reserve)
      )
    )
  );
}

function App() {
  const [lang, setLang] = useState('tr');
  const copy = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'tr' ? 'Ali Kırmızı Burger | İstanbul Burger Restoranı' : 'Ali Kirmizi Burger';
  }, [lang]);

  return h('main', { className: 'min-h-screen overflow-hidden text-charcoal' },
    h(Header, { copy, lang, setLang }),
    h('section', { id: 'top', className: 'relative overflow-hidden bg-charcoal pt-20 text-cream sm:pt-24' },
      h('img', { src: ASSETS.hero, alt: '', className: 'absolute inset-0 h-full w-full object-cover opacity-55' }),
      h('div', { className: 'absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/88 to-charcoal/35' }),
      h('div', { className: 'absolute inset-0 bg-gradient-to-t from-charcoal/78 via-transparent to-charcoal/45' }),
      h('div', { className: 'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-mustard/50 to-transparent' }),
      h('div', { className: 'relative mx-auto grid max-w-7xl items-center gap-2 px-4 pb-4 pt-6 sm:gap-8 sm:px-6 sm:pb-10 sm:pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-8 lg:pt-8' },
        h('div', { className: 'z-10 max-w-2xl' },
          h('div', { className: 'mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-charcoal/55 px-4 py-2 text-sm font-bold text-mustard backdrop-blur' }, h(Icon, { name: 'star', size: 16 }), copy.hero.badge),
          h('h1', { className: 'max-w-[11ch] font-display text-5xl font-bold leading-[0.92] text-cream sm:text-6xl lg:text-7xl' }, copy.hero.title),
          h('p', { className: 'mt-5 max-w-xl text-base leading-7 text-cream/80 sm:mt-6 sm:text-xl sm:leading-8' }, copy.hero.copy),
          h('div', { className: 'mt-6 flex flex-row gap-3 sm:mt-8' },
            h('a', { href: '#menu', className: 'inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-mustard px-4 py-4 text-sm font-black text-charcoal shadow-glow transition hover:-translate-y-0.5 sm:flex-none sm:px-6 sm:text-base' }, copy.actions.menu, ' ', h(Icon, { name: 'arrow', size: 18 })),
            h('a', { href: '#craft', className: 'inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-4 text-sm font-bold text-cream backdrop-blur transition hover:border-white sm:flex-none sm:px-6 sm:text-base' }, copy.actions.craft)
          ),
          h('div', { className: 'mt-5 flex flex-wrap gap-2' },
            copy.hero.quickBites.map((bite) => h('span', { key: bite, className: 'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-extrabold text-cream/85 backdrop-blur' },
              h('span', { className: 'h-2 w-2 rounded-full bg-mustard shadow-[0_0_18px_rgba(244,180,58,0.75)]' }),
              bite
            ))
          )
        ),
        h('div', { className: 'burger-stage relative min-h-[230px] sm:min-h-[500px] lg:min-h-[430px]', 'aria-label': '3D burger showcase' },
          h(BurgerScene),
          h('div', { className: 'absolute -bottom-14 left-1/2 w-[min(92%,420px)] -translate-x-1/2 rounded-md border border-white/70 bg-white/80 p-4 text-charcoal shadow-2xl backdrop-blur-xl sm:-bottom-14 lg:-bottom-12' },
            h('div', { className: 'flex items-center justify-between gap-4' },
              h('div', null, h('p', { className: 'text-xs font-bold uppercase tracking-[0.2em] text-charcoal/50' }, copy.hero.dropLabel), h('p', { className: 'mt-1 font-display text-xl font-bold' }, copy.hero.dropName)),
              h('div', { className: 'rounded-full bg-ember px-4 py-2 text-sm font-black text-white' }, lang === 'tr' ? '₺420' : '$17')
            )
          ),
          h('div', { className: 'pointer-events-none absolute right-2 top-2 rounded-full border border-white/15 bg-charcoal/50 px-3 py-2 text-xs font-bold text-cream/75 backdrop-blur sm:right-8 sm:top-8' },
            copy.hero.gameHint
          )
        )
      ),
      h('div', { className: 'scrollbar-hide relative mx-auto mb-6 flex max-w-7xl gap-3 overflow-x-auto px-4 sm:mb-10 sm:grid sm:grid-cols-3 sm:px-6 lg:px-8' },
        copy.features.map(([icon, value, label]) => h('div', { key: label, className: 'flex min-w-[250px] items-center gap-4 border-t border-cream/20 py-3 sm:min-w-0 sm:py-5' },
          h('span', { className: 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-ember shadow-sm' }, h(Icon, { name: icon })),
          h('span', null, h('span', { className: 'block font-bold text-cream' }, value), h('span', { className: 'text-sm text-cream/70' }, label))
        ))
      )
    ),
    h('section', { id: 'menu', className: 'bg-charcoal py-20 text-cream sm:py-24' },
      h('div', { className: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8' },
        h('div', { className: 'flex flex-col justify-between gap-5 md:flex-row md:items-end' },
          h('div', null, h('p', { className: 'font-bold uppercase tracking-[0.24em] text-mustard' }, copy.menu.eyebrow), h('h2', { className: 'mt-3 font-display text-4xl font-bold sm:text-5xl' }, copy.menu.title)),
          h('p', { className: 'max-w-lg text-cream/70' }, copy.menu.copy)
        ),
        h('div', { className: 'mt-12 grid gap-5 lg:grid-cols-3' },
          copy.burgers.map((burger) => h('article', { key: burger.name, className: 'menu-card group overflow-hidden rounded-lg border border-white/10 p-4 text-charcoal shadow-2xl transition duration-300 hover:-translate-y-1 sm:p-5' },
            h('div', { className: 'flex items-start justify-between gap-4' }, h('span', { className: `rounded-full ${burger.color} px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white` }, burger.tag), h('span', { className: 'font-display text-3xl font-bold' }, burger.price)),
            h('div', { className: 'relative my-5 h-60 overflow-hidden rounded-md bg-charcoal sm:h-64 lg:h-72' },
              h('img', { src: burger.image, alt: `${burger.name} burger`, className: 'h-full w-full object-cover transition duration-700 group-hover:scale-110' }),
              h('div', { className: 'absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-90' }),
              h('div', { className: 'absolute bottom-3 left-3 rounded-full bg-cream px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-ember shadow-lg' }, lang === 'tr' ? 'Sıcak servis' : 'Served hot')
            ),
            h('h3', { className: 'font-display text-2xl font-bold' }, burger.name),
            h('p', { className: 'mt-3 leading-7 text-charcoal/70' }, burger.description),
            h('p', { className: 'mt-4 border-l-4 border-mustard pl-4 text-sm font-extrabold leading-6 text-charcoal' }, burger.crave),
            h('button', { type: 'button', className: 'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-4 text-sm font-black text-cream transition hover:-translate-y-0.5 hover:bg-ember' },
              copy.actions.add,
              h(Icon, { name: 'bag', size: 17 })
            )
          ))
        ),
        h('div', { className: 'scrollbar-hide mt-8 flex gap-3 overflow-x-auto pb-2' }, copy.menu.sides.map((side) => h('span', { key: side, className: 'shrink-0 rounded-full border border-cream/20 px-5 py-3 font-bold text-cream/90' }, side))),
        h('div', { className: 'craving-strip mt-10 overflow-hidden rounded-lg border border-cream/15 bg-cream text-charcoal shadow-2xl md:grid md:grid-cols-[0.9fr_1.1fr]' },
          h('div', { className: 'h-48 overflow-hidden md:h-auto' },
            h('img', { src: ASSETS.tray, alt: '', className: 'h-full w-full object-cover' })
          ),
          h('div', { className: 'p-6 sm:p-8' },
            h('p', { className: 'font-bold uppercase tracking-[0.22em] text-ember' }, copy.menu.comboTitle),
            h('h3', { className: 'mt-3 font-display text-3xl font-bold sm:text-4xl' }, lang === 'tr' ? 'Burgeri yalnız bırakma.' : "Don't leave the burger alone."),
            h('p', { className: 'mt-4 max-w-2xl leading-7 text-charcoal/70' }, copy.menu.comboCopy),
            h('a', { href: '#visit', className: 'mt-6 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 font-black text-white shadow-glow transition hover:-translate-y-0.5' }, copy.actions.reserve, h(Icon, { name: 'arrow', size: 18 }))
          )
        )
      )
    ),
    h('section', { id: 'craft', className: 'py-20 sm:py-24' },
      h('div', { className: 'mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8' },
        h('div', null,
          h('p', { className: 'font-bold uppercase tracking-[0.24em] text-ember' }, copy.craft.eyebrow),
          h('h2', { className: 'mt-3 font-display text-4xl font-bold sm:text-5xl' }, copy.craft.title),
          h('div', { className: 'mt-8 overflow-hidden rounded-lg border border-charcoal/10 bg-charcoal shadow-2xl' },
            h('img', { src: ASSETS.tray, alt: copy.craft.imageAlt, className: 'h-72 w-full object-cover sm:h-96' })
          )
        ),
        h('div', { className: 'grid gap-4 sm:grid-cols-2' }, copy.craft.steps.map(([number, title, stepCopy]) =>
          h('div', { key: title, className: 'rounded-lg border border-charcoal/10 bg-white/60 p-6' },
            h('span', { className: 'font-display text-sm font-bold text-ember' }, number),
            h('h3', { className: 'mt-5 font-display text-2xl font-bold' }, title),
            h('p', { className: 'mt-3 leading-7 text-charcoal/70' }, stepCopy)
          )
        ))
      )
    ),
    h('section', { id: 'visit', className: 'bg-[#f3eadb] py-20 sm:py-24' },
      h('div', { className: 'mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8' },
        h('div', null,
          h('p', { className: 'font-bold uppercase tracking-[0.24em] text-basil' }, copy.visit.eyebrow),
          h('h2', { className: 'mt-3 font-display text-4xl font-bold sm:text-5xl' }, copy.visit.title),
          h('div', { className: 'mt-8 grid gap-4 sm:grid-cols-3' },
            [['map', copy.visit.details[0]], ['clock', copy.visit.details[1]], ['phone', copy.visit.details[2]]].map(([icon, label]) =>
              h('div', { key: label, className: 'flex items-center gap-3 rounded-md bg-white/70 p-4' }, h(Icon, { name: icon, className: 'shrink-0 text-ember', size: 21 }), h('span', { className: 'font-bold' }, label))
            )
          )
        ),
        h('form', { className: 'rounded-lg bg-charcoal p-6 text-cream shadow-2xl sm:p-8' },
          h('div', { className: 'flex items-center gap-3' }, h(Icon, { name: 'calendar', className: 'text-mustard' }), h('h3', { className: 'font-display text-2xl font-bold' }, copy.visit.formTitle)),
          h('div', { className: 'mt-6 grid gap-4' },
            h('input', { className: 'rounded-md border border-white/10 bg-white/10 px-4 py-4 text-cream outline-none placeholder:text-cream/50 focus:border-mustard', placeholder: copy.visit.placeholders.name }),
            h('input', { className: 'rounded-md border border-white/10 bg-white/10 px-4 py-4 text-cream outline-none placeholder:text-cream/50 focus:border-mustard', placeholder: copy.visit.placeholders.email, type: 'email' }),
            h('div', { className: 'grid gap-4 sm:grid-cols-2' }, h('input', { className: 'rounded-md border border-white/10 bg-white/10 px-4 py-4 text-cream outline-none focus:border-mustard', type: 'date' }), h('input', { className: 'rounded-md border border-white/10 bg-white/10 px-4 py-4 text-cream outline-none focus:border-mustard', type: 'time' })),
            h('button', { type: 'button', className: 'mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-mustard px-6 py-4 font-black text-charcoal transition hover:-translate-y-0.5' }, copy.actions.book, ' ', h(Icon, { name: 'arrow', size: 18 }))
          )
        )
      )
    ),
    h('footer', { className: 'bg-charcoal px-4 py-8 text-cream sm:px-6 lg:px-8' },
      h('div', { className: 'mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-cream/60 sm:flex-row' },
        h('p', null, 'Ali Kırmızı Burger'),
        h('p', null, copy.footer)
      )
    )
  );
}

createRoot(document.getElementById('root')).render(h(App));
