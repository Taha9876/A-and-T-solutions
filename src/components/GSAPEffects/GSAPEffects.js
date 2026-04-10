'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Hover Tilt Card Component ─── */
export function TiltCard({ children, className, style }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformOrigin: 'center center'
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <div 
      ref={cardRef} 
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  );
}

/* ─── Cinematic Reveal Animation ─── */
export function cinematicReveal(target, trigger, delay = 0, stagger = 0.15) {
  if (!target || !trigger) return;
  
  gsap.fromTo(target, 
    { y: 60, opacity: 0, filter: 'blur(10px)', scale: 0.95, rotationX: 10 },
    { 
      y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, rotationX: 0,
      duration: 1.2, 
      ease: 'power3.out',
      stagger: stagger,
      delay,
      scrollTrigger: { 
        trigger: trigger, 
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ─── Hook for automatic Reveal ─── */
export function useCinematicReveal(targetSelector, triggerSelector, delay = 0, stagger = 0.15) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      cinematicReveal(targetSelector, triggerSelector, delay, stagger);
    });
    return () => ctx.revert();
  }, [targetSelector, triggerSelector, delay, stagger]);
}

/* ─── Counter with GSAP ─── */
export function Counter({ value, suffix = '', decimals = 0, label, className, numberClassName }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = decimals > 0
              ? obj.val.toFixed(decimals) + suffix
              : Math.floor(obj.val).toLocaleString() + suffix;
          },
        });
      },
    });
    return () => st.kill();
  }, [value, suffix, decimals]);

  return (
    <div className={className}>
      <div ref={ref} className={numberClassName}>0</div>
      {label && <div style={{ fontSize: '0.8125rem', opacity: 0.6, marginTop: '4px' }}>{label}</div>}
    </div>
  );
}
