import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counter3Ref = useRef<HTMLDivElement>(null);
  const counter2Ref = useRef<HTMLDivElement>(null);
  const counter1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      function animateCounter(counter: HTMLDivElement | null, duration: number, delay = 0) {
        if (!counter) return;
        const numHeight = counter.querySelector('.num')?.clientHeight || 100;
        const totalDistance = (counter.querySelectorAll('.num').length - 1) * numHeight;
        
        gsap.to(counter, {
          y: -totalDistance,
          duration: duration,
          delay: delay,
          ease: 'power2.inOut',
        });
      }

      // Animate numbers
      animateCounter(counter3Ref.current, 5);
      animateCounter(counter2Ref.current, 6);
      animateCounter(counter1Ref.current, 2, 4);

      // Animate digit containers going up
      gsap.to('.digit', {
        top: '-150px',
        stagger: { amount: 0.25 },
        delay: 6,
        duration: 1,
        ease: 'power4.inOut',
      });

      // Animate loaders
      gsap.from('.loader-1', {
        width: 0,
        duration: 6,
        ease: 'power2.inOut',
      });

      gsap.from('.loader-2', {
        width: 0,
        delay: 1.9,
        duration: 2,
        ease: 'power2.inOut',
      });

      gsap.to('.loader', {
        background: 'none',
        delay: 6,
        duration: 0.1,
      });

      gsap.to('.loader-1', {
        rotate: 90,
        y: -50,
        duration: 0.5,
        delay: 6,
      });

      gsap.to('.loader-2', {
        x: -75,
        y: 75,
        duration: 0.5,
        delay: 6,
      });

      gsap.to('.loader', {
        scale: 40,
        duration: 1,
        delay: 7,
        ease: 'power2.inOut',
      });

      gsap.to('.loader', {
        rotate: 45,
        y: 500,
        x: 2000,
        duration: 1,
        delay: 7,
        ease: 'power2.inOut',
      });

      // Fade out screen
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        delay: 7.5,
        ease: 'power1.inOut',
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loading-screen" ref={containerRef}>
      <div className="loader">
        <div className="loader-1 bar"></div>
        <div className="loader-2 bar"></div>
      </div>
      <div className="counter">
        <div className="counter-1 digit" ref={counter1Ref}>
          <div className="num">0</div>
          <div className="num num1offset1">1</div>
        </div>
        <div className="counter-2 digit" ref={counter2Ref}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n, i) => (
            <div key={i} className={`num ${i === 1 ? 'num1offset2' : ''}`}>{n}</div>
          ))}
        </div>
        <div className="counter-3 digit" ref={counter3Ref}>
          {[...Array(2)].flatMap(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).concat(0).map((n, i) => (
            <div key={i} className="num">{n}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
