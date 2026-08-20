'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  dx: number;
  dy: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Initialize Stars
    const starCount = Math.floor((width * height) / 7000);
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < Math.min(starCount, 160); i++) {
        const baseAlpha = Math.random() * 0.7 + 0.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          dx: (Math.random() - 0.5) * 0.08,
          dy: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    initStars();

    // Shooting Stars
    let shootingStar: ShootingStar | null = null;
    let lastShootingStarTime = Date.now();

    const spawnShootingStar = () => {
      const now = Date.now();
      if (!shootingStar && now - lastShootingStarTime > 5000 + Math.random() * 4000) {
        lastShootingStarTime = now;
        shootingStar = {
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4, // 45 degrees
          alpha: 1,
          active: true,
        };
      }
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === 'dark';

      // Draw Twinkling Stars
      stars.forEach((star) => {
        // Slow float
        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Twinkle oscillation
        star.alpha = star.baseAlpha + Math.sin(tick * star.twinkleSpeed) * 0.3;
        star.alpha = Math.max(0.1, Math.min(0.95, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.shadowBlur = star.radius > 1.2 ? 4 : 0;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        } else {
          // Subtle soft gray dots for light theme
          ctx.fillStyle = `rgba(100, 100, 110, ${star.alpha * 0.25})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      // Draw Shooting Star in Dark Mode
      if (isDark) {
        spawnShootingStar();
        if (shootingStar && shootingStar.active) {
          const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
          const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;

          const gradient = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            endX,
            endY
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
          shootingStar.alpha -= 0.015;

          if (
            shootingStar.alpha <= 0 ||
            shootingStar.x > width ||
            shootingStar.y > height
          ) {
            shootingStar.active = false;
            shootingStar = null;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: 0.9 }}
    />
  );
}
