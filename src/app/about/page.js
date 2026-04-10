'use client';

'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { TiltCard, Counter, useCinematicReveal } from '@/components/GSAPEffects/GSAPEffects';
import styles from './page.module.css';

import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';

const GlobeModel = () => {
    const globeRef = useRef();
    const innerRef = useRef();
    
    // materials
    const mat = useMemo(() => new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.1 }), []);
    const innerMat = useMemo(() => new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.15 }), []);
    const textMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
    
    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        if(globeRef.current) {
            globeRef.current.rotation.y += 0.0015;
            globeRef.current.rotation.x += 0.0003;
        }
        if(innerRef.current) {
            innerRef.current.rotation.y -= 0.001;
        }
        // color shift
        const t = (Math.sin(time) + 1) / 2;
        mat.color.lerpColors(new THREE.Color(0xFFFFFF), new THREE.Color(0x666666), t);
        innerMat.color.lerpColors(new THREE.Color(0x333333), new THREE.Color(0xAAAAAA), t);
        textMat.color.lerpColors(new THREE.Color(0xFFFFFF), new THREE.Color(0x888888), t);
    });

    return (
        <group>
            {/* Outer Globe and Attached 3D Text Core */}
            <group ref={globeRef}>
                <mesh material={mat}>
                    <sphereGeometry args={[1.6, 64, 64]} />
                </mesh>
                <Center>
                    <Text3D 
                        font="https://unpkg.com/three/examples/fonts/helvetiker_bold.typeface.json"
                        size={0.65}
                        height={0.15}
                        curveSegments={12}
                        material={textMat}
                        bevelEnabled
                        bevelThickness={0.02}
                        bevelSize={0.01}
                        bevelSegments={3}
                    >
                        A&T
                    </Text3D>
                </Center>
            </group>
            
            {/* Inner Globe */}
            <mesh ref={innerRef} material={innerMat}>
                <sphereGeometry args={[1.5, 32, 32]} />
            </mesh>
        </group>
    )
}

const GlobeScene = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <GlobeModel />
      </Canvas>
    </div>
  );
};

export default function AboutPage() {
  // Apply Animations across the entire page
  useCinematicReveal(`.${styles.content} > *`, `.${styles.split}`);
  useCinematicReveal(`.${styles.visual}`, `.${styles.split}`, 0.3);
  useCinematicReveal(`.section-header > *`, `.${styles.valuesSection}`);
  useCinematicReveal(`.${styles.valueCard}`, `.${styles.valuesGrid}`, 0.15);
  useCinematicReveal(`.${styles.ctaSection} > *`, `.${styles.ctaSection}`, 0.2);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className="container">
          
          <div className={styles.split}>
            <div className={styles.content}>
              <span className="label color-shift-text">Strategic Roadmap</span>
              <h1 className={styles.title}>
                The Future of <span className="gradient-text">Enterprise.</span>
              </h1>
              <p className={styles.desc}>
                A&T Solutions was established to bridge the gap between legacy infrastructure and the autonomous future. We don&apos;t just install AI; we engineer digital intelligence layers.
              </p>
              <p className={styles.desc}>
                Our mission is to empower organizations with Silicon Valley-grade cognitive systems that operate 24/7, enabling human talent to focus on high-impact creativity and strategy.
              </p>
              
              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <Counter value={2025} numberClassName={styles.statVal} />
                  <span className={styles.statLabel}>Inception</span>
                </div>
                <div className={styles.statItem}>
                  <Counter value={18} suffix="+" numberClassName={styles.statVal} />
                  <span className={styles.statLabel}>Global Hubs</span>
                </div>
                <div className={styles.statItem}>
                  <Counter value={100} suffix="%" numberClassName={styles.statVal} />
                  <span className={styles.statLabel}>Digital First</span>
                </div>
              </div>
            </div>

            <div className={styles.visual}>
              <GlobeScene />
            </div>
          </div>

          <div className={styles.valuesSection}>
            <div className="section-header">
              <span className="label color-shift-text">Operational DNA</span>
              <h2 className="section-title">Core Philosophies</h2>
            </div>
            
            <div className={styles.valuesGrid}>
              <TiltCard className={styles.valueCard}>
                <div className={`${styles.valueIcon} color-shift-bg`}>In</div>
                <h3>Hyper-Innovation</h3>
                <p>We push the boundaries of LLM reasoning and generative voice tech to provide a 10x competitive edge.</p>
              </TiltCard>
              <TiltCard className={styles.valueCard}>
                <div className={`${styles.valueIcon} color-shift-bg`}>Re</div>
                <h3>Atomic Reliability</h3>
                <p>Uptime is our religion. Our systems are built on redundant failover architectures with 99.99% availability.</p>
              </TiltCard>
              <TiltCard className={styles.valueCard}>
                <div className={`${styles.valueIcon} color-shift-bg`}>Tr</div>
                <h3>Deep Transparency</h3>
                <p>Absolute visibility. Every interaction is logged, transcribed, and analyzed for continuous optimization.</p>
              </TiltCard>
              <TiltCard className={styles.valueCard}>
                <div className={`${styles.valueIcon} color-shift-bg`}>Sp</div>
                <h3>Agile Velocity</h3>
                <p>Standard deployments in 72 hours. We believe speed is the ultimate business advantage.</p>
              </TiltCard>
            </div>
          </div>

        </div>

        <section className={styles.ctaSection}>
          <h2 className={`${styles.ctaTitle} gradient-text`}>Engineered for Excellence.</h2>
          <Link href="/contact" className="btn btn-primary btn-lg">Partner With Us</Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

