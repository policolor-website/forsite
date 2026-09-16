"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import Image from "next/image";

// ============================================
// FORSITE ROMANIA
// Robot 3D + 4 secțiuni servicii
// Background negru, font alb + roșu
// Imagini din forsite.ro
// ============================================

const SERVICES = [
  {
    title: "Creare Magazin Online",
    description:
      "Dezvoltăm magazine online personalizate, optimizate pentru conversii și ușor de administrat. Integrări plăți, curier, stocuri.",
    image: "/images/magazin-online.jpg",
    features: ["Integrare plăți", "Gestiune stocuri", "SEO optimizat", "Mobile friendly"],
  },
  {
    title: "Creare Site de Prezentare",
    description:
      "Site-uri de prezentare moderne care reflectă identitatea brandului tău și atrag clienți noi.",
    image: "/images/site-prezentare.avif",
    features: ["Design personalizat", "Viteză încărcare", "SEO on-page", "Responsive"],
  },
  {
    title: "Creare Aplicații iOS",
    description:
      "Aplicații mobile native pentru iPhone și iPad, de la concept până la publicare în App Store.",
    image: "/images/ios.avif",
    features: ["Swift / React Native", "App Store", "Notificări push", "Offline mode"],
  },
  {
    title: "Creare Aplicații Android",
    description:
      "Aplicații mobile pentru Android, optimizate pentru toate dispozitivele și versiunile.",
    image: "/images/android.jpg",
    features: ["Kotlin / React Native", "Google Play", "Material Design", "Performance"],
  },
];

// Track conversions — uses gtag_report_conversion (official Google Ads) + GA4 events
function trackCallConversion() {
  if (typeof window !== "undefined") {
    if (typeof (window as any).gtag_report_conversion === "function") {
      (window as any).gtag_report_conversion();
    }
    if ((window as any).gtag) {
      (window as any).gtag("event", "phone_call", {
        event_category: "engagement",
        event_label: "call_button_click",
      });
    }
  }
}

function trackWhatsAppConversion() {
  if (typeof window !== "undefined") {
    if (typeof (window as any).gtag_report_conversion === "function") {
      (window as any).gtag_report_conversion("https://wa.me/40785598779");
    }
    if ((window as any).gtag) {
      (window as any).gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "whatsapp_button_click",
      });
    }
  }
}

// Hook: reveal on scroll
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// Section component
function ServiceSection({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { ref, visible } = useReveal();
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="py-20 px-6"
      style={{ backgroundColor: isEven ? "#000000" : "#0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Image */}
          <div
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-green-600/20 ${
              isEven ? "md:order-1" : "md:order-2"
            }`}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority={index < 2}
            />
          </div>

          {/* Text */}
          <div className={isEven ? "md:order-2" : "md:order-1"}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {service.title}
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              {service.description}
            </p>
            <ul className="grid grid-cols-2 gap-3">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <svg
                    className="w-5 h-5 text-green-600 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="tel:0785598779" onClick={trackCallConversion}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Sună acum
              </a>
              <a
                href="https://wa.me/40785598779" onClick={trackWhatsAppConversion} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200"
                style={{ backgroundColor: "#25D366", color: "white" }}
              >
                <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <span className="text-white font-bold text-sm tracking-wide">
                FARA PLATA IN AVANS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const [robotScreenPos, setRobotScreenPos] = useState({ x: 50, y: 25 });

  // ============================================
  // Three.js — Robot 3D
  // ============================================
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    // Mobile: farther camera for smaller robot
    const isMobile = window.innerWidth < 768;
    camera.position.set(0, 1.5, isMobile ? 6 : 4);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    // Environment for PBR
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const redLight = new THREE.DirectionalLight(0x00ff00, 0.3);
    redLight.position.set(-5, 5, -3);
    scene.add(redLight);

    // Load robot
    const loader = new GLTFLoader();
    let robot: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let runAction: THREE.AnimationAction | null = null;
    let idleAction: THREE.AnimationAction | null = null;

    loader.load(
      "/robot.glb",
      (gltf) => {
        robot = gltf.scene;
        const box = new THREE.Box3().setFromObject(robot);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = (isMobile ? 1.5 : 2) / maxDim;
        robot.scale.setScalar(scale);
        robot.position.set(0, 0, 0);
        robot.rotation.y = 0;
        scene.add(robot);

        mixer = new THREE.AnimationMixer(robot);
        gltf.animations.forEach((clip) => {
          if (clip.name.includes("Run")) {
            runAction = mixer!.clipAction(clip);
            runAction.setLoop(THREE.LoopRepeat, Infinity);
          } else if (clip.name.includes("idle")) {
            idleAction = mixer!.clipAction(clip);
            idleAction.setLoop(THREE.LoopRepeat, Infinity);
          }
        });
        if (idleAction) idleAction.play();
      },
      undefined,
      (err) => console.error("Error loading robot:", err)
    );

    // Animation loop
    const clock = new THREE.Clock();
    let isRunning = false;
    let targetX = -2;
    let targetRotationY = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      if (mixer) mixer.update(delta);
      if (robot) {
        const lerpFactor = window.innerWidth < 768 ? 0.008 : 0.02;
        robot.position.x += (targetX - robot.position.x) * lerpFactor;
        robot.rotation.y += (targetRotationY - robot.rotation.y) * 0.05;
        if (isRunning) {
          robot.position.y = Math.abs(Math.sin(elapsed * 12)) * 0.2;
        } else {
          robot.position.y += (0 - robot.position.y) * 0.1;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      // Adjust camera distance on resize
      const mobile = window.innerWidth < 768;
      camera.position.set(0, 1.5, mobile ? 6 : 4);
      camera.lookAt(0, 1, 0);
    };
    window.addEventListener("resize", onResize);
    requestAnimationFrame(onResize);

    // Robot control
    (window as any).__robotControl = {
      setRunning: (running: boolean) => {
        isRunning = running;
        if (running) {
          if (runAction && idleAction) {
            idleAction.fadeOut(0.15);
            runAction.reset().fadeIn(0.15).play();
          }
        } else {
          if (runAction && idleAction) {
            runAction.fadeOut(0.15);
            idleAction.reset().fadeIn(0.15).play();
          }
        }
      },
      setTargetX: (x: number) => {
        targetX = x;
        if (robot) {
          targetRotationY = x > robot.position.x ? Math.PI / 2 : -Math.PI / 2;
        }
      },
      faceCamera: () => {
        targetRotationY = 0;
      },
      getScreenPos: () => {
        if (!robot) return null;
        const vec = new THREE.Vector3();
        vec.setFromMatrixPosition(robot.matrixWorld);
        vec.y += 1.5;
        vec.project(camera);
        return {
          x: (vec.x * 0.5 + 0.5) * 100,
          y: (vec.y * 0.5 + 0.5) * 100,
        };
      },
    };

    return () => {
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pmremGenerator.dispose();
      delete (window as any).__robotControl;
    };
  }, []);

  // ============================================
  // Auto-scroll + welcome bubbles
  // ============================================
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Disable manual scroll
    const preventScroll = (e: Event) => e.preventDefault();
    scrollContainer.addEventListener("wheel", preventScroll, { passive: false });
    scrollContainer.addEventListener("touchmove", preventScroll, { passive: false });
    scrollContainer.style.overflow = "hidden";

    const TOTAL_SECTIONS = SERVICES.length + 2; // hero + services + CTA
    let sectionIndex = 0;
    let phase: "idle" | "running" = "idle";
    let direction: 1 | -1 = 1;
    const SECTION_HEIGHT = window.innerHeight;
    const PAUSE_DURATION = 2500;
    const RUN_DURATION = 3000;

    let phaseTimer = PAUSE_DURATION; // Skip first pause — start running immediately
    let scrollStartY = 0;
    let scrollTargetY = 0;
    let recapRafId: number;
    let bubbleRafId: number;

    const ctrl = () => (window as any).__robotControl;

    // Welcome bubbles
    const trackBubblePos = () => {
      const c = (window as any).__robotControl;
      if (c) {
        const pos = c.getScreenPos();
        if (pos) {
          const containerVh = window.innerWidth < 768 ? 30 : 50;
          setRobotScreenPos({ x: pos.x, y: (pos.y / 100) * containerVh });
        }
      }
      bubbleRafId = requestAnimationFrame(trackBubblePos);
    };

    const showBubble = (text: string) => {
      setBubble(text);
      bubbleRafId = requestAnimationFrame(trackBubblePos);
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => showBubble("Bine ai venit! Pornim imediat!"), 1500));
    timers.push(setTimeout(() => setBubble("Te voi ghida"), 3500));
    timers.push(setTimeout(() => {
      setBubble(null);
      cancelAnimationFrame(bubbleRafId);
    }, 5500));

    const tick = () => {
      phaseTimer += 16;

      if (phase === "idle") {
        if (phaseTimer >= PAUSE_DURATION) {
          if (direction === 1 && sectionIndex < TOTAL_SECTIONS - 1) {
            phase = "running";
            phaseTimer = 0;
            scrollStartY = sectionIndex * SECTION_HEIGHT;
            scrollTargetY = (sectionIndex + 1) * SECTION_HEIGHT;
            ctrl()?.setRunning(true);
            ctrl()?.setTargetX(2);
          } else if (direction === -1 && sectionIndex > 0) {
            phase = "running";
            phaseTimer = 0;
            scrollStartY = sectionIndex * SECTION_HEIGHT;
            scrollTargetY = (sectionIndex - 1) * SECTION_HEIGHT;
            ctrl()?.setRunning(true);
            ctrl()?.setTargetX(-2);
          } else if (direction === 1 && sectionIndex === TOTAL_SECTIONS - 1) {
            direction = -1;
            phaseTimer = 0;
          } else if (direction === -1 && sectionIndex === 0) {
            direction = 1;
            phaseTimer = 0;
          }
        }
      } else if (phase === "running") {
        const progress = Math.min(phaseTimer / RUN_DURATION, 1);
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        const scrollY = scrollStartY + (scrollTargetY - scrollStartY) * eased;
        scrollContainer.scrollTo({ top: scrollY, behavior: "auto" });

        if (progress >= 1) {
          sectionIndex += direction;
          phase = "idle";
          phaseTimer = 0;
          setCurrentSection(sectionIndex);
          ctrl()?.setRunning(false);
          ctrl()?.setTargetX(direction === 1 ? -2 : 2);
          ctrl()?.faceCamera();

          // Recap bubble at last section — then reverse direction
          if (sectionIndex === TOTAL_SECTIONS - 1) {
            setBubble("Si acum recapitulam");
            const trackRecap = () => {
              const c = (window as any).__robotControl;
              if (c) {
                const pos = c.getScreenPos();
                if (pos) {
                  const containerVh = window.innerWidth < 768 ? 30 : 50;
                  setRobotScreenPos({ x: pos.x, y: (pos.y / 100) * containerVh });
                }
              }
              recapRafId = requestAnimationFrame(trackRecap);
            };
            recapRafId = requestAnimationFrame(trackRecap);
            // After 3s: hide bubble and start going up immediately
            setTimeout(() => {
              setBubble(null);
              cancelAnimationFrame(recapRafId);
              direction = -1;
              phase = "running";
              phaseTimer = 0;
              scrollStartY = sectionIndex * SECTION_HEIGHT;
              scrollTargetY = (sectionIndex - 1) * SECTION_HEIGHT;
              ctrl()?.setRunning(true);
              ctrl()?.setTargetX(-2);
            }, 3000);
          }
        }
      }

      requestAnimationFrame(tick);
    };

    ctrl()?.setRunning(false);
    ctrl()?.setTargetX(-2);
    ctrl()?.faceCamera();

    const startTimeout = setTimeout(() => {
      requestAnimationFrame(tick);
    }, 5500); // Start after welcome bubbles

    return () => {
      clearTimeout(startTimeout);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(bubbleRafId);
      cancelAnimationFrame(recapRafId);
      scrollContainer.removeEventListener("wheel", preventScroll);
      scrollContainer.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  return (
    <div ref={scrollRef} className="fixed inset-0 overflow-y-scroll" style={{ scrollBehavior: "auto" }}>
      {/* Robot 3D — small at bottom on mobile, larger on desktop */}
      <div
        ref={mountRef}
        className="fixed bottom-0 left-0 w-full pointer-events-none z-50"
        style={{ height: "30vh" }}
      />

      {/* Speech bubble */}
      {bubble && (
        <div
          className="fixed z-[60] pointer-events-none transition-all duration-100"
          style={{
            left: `${robotScreenPos.x}%`,
            bottom: `${robotScreenPos.y + 2}vh`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="relative bg-white text-black px-5 py-3 rounded-2xl shadow-xl text-sm font-medium whitespace-nowrap animate-[fadeInUp_0.3s_ease-out]">
            {bubble}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white rotate-45" />
          </div>
        </div>
      )}

      {/* Sticky call button — mobile only, LEFT side */}
      <a
        href="tel:0785598779" onClick={trackCallConversion}
        className="md:hidden fixed bottom-5 left-4 z-[70] bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-600/30"
        aria-label="Sună acum"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>

      {/* Sticky WhatsApp button — mobile only, RIGHT side */}
      <a
        href="https://wa.me/40785598779" onClick={trackWhatsAppConversion} target="_blank" rel="noopener noreferrer"
        className="md:hidden fixed bottom-5 right-4 z-[70] p-4 rounded-full shadow-2xl"
        style={{ backgroundColor: "#25D366" }}
        aria-label="WhatsApp"
      >
        <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center px-6 bg-black">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Forsite Romania
          </h1>
          <p className="text-xl md:text-2xl text-green-600 mb-4 font-semibold">
            Creare magazine online, site-uri și aplicații mobile
          </p>
          <div className="max-w-xl mx-auto mb-8 bg-gray-900 border-2 border-green-600 rounded-2xl p-6 text-center">
            <p className="text-xl md:text-2xl font-extrabold text-green-600 mb-2 block">
              Plătești doar când ești <span className="text-white">100% mulțumit</span>.
            </p>
            <p className="text-lg md:text-xl font-extrabold text-white block">
              Nu-ți place? Nu plătești nimic!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0785598779" onClick={trackCallConversion}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Sună acum: 0785 598 779
            </a>
            <a
              href="https://wa.me/40785598779" onClick={trackWhatsAppConversion} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-sm transition-colors duration-200"
              style={{ backgroundColor: "#25D366", color: "white" }}
            >
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      {SERVICES.map((service, i) => (
        <ServiceSection key={i} service={service} index={i} />
      ))}

      {/* CTA */}
      <section className="h-screen flex items-center justify-center px-6 bg-black">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hai să discutăm
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Sună acum și primești ofertă gratuită în câteva minute
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0785598779" onClick={trackCallConversion}
              className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-base hover:bg-green-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              0785 598 779
            </a>
            <a
              href="https://wa.me/40785598779" onClick={trackWhatsAppConversion} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-lg font-bold text-base transition-colors duration-200"
              style={{ backgroundColor: "#25D366", color: "white" }}
            >
              <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
