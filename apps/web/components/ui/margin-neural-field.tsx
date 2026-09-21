"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; radius: number };

const ACTIVE_FROM = 1100;

export function MarginNeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const staticOnly = motionQuery.matches || Boolean(connection?.saveData);
    const pointer = { x: -1000, y: -1000 };
    let nodes: Node[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let active = false;

    const createNodes = () => {
      const count = Math.max(54, Math.min(92, Math.round((width * height) / 24_000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2.1 + Math.random() * 2.2
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      active = width >= ACTIVE_FROM;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      if (active) createNodes();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (!active) return;
      if (!staticOnly) {
        for (const node of nodes) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 125) {
            const force = (125 - distance) / 125;
            node.vx += (dx / Math.max(distance, 1)) * force * 0.018;
            node.vy += (dy / Math.max(distance, 1)) * force * 0.018;
          }
          node.vx *= 0.9994;
          node.vy *= 0.9994;
          if (Math.abs(node.vx) + Math.abs(node.vy) < 0.055) {
            node.vx += (Math.random() - 0.5) * 0.018;
            node.vy += (Math.random() - 0.5) * 0.018;
          }
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -12) node.x = width + 12;
          else if (node.x > width + 12) node.x = -12;
          if (node.y < -12) node.y = height + 12;
          else if (node.y > height + 12) node.y = -12;
        }
      }
      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const distance = Math.hypot(nodes[first].x - nodes[second].x, nodes[first].y - nodes[second].y);
          if (distance > 165) continue;
          context.beginPath();
          context.moveTo(nodes[first].x, nodes[first].y);
          context.lineTo(nodes[second].x, nodes[second].y);
          context.strokeStyle = `rgba(121, 223, 209, ${0.28 * (1 - distance / 165)})`;
          context.lineWidth = 0.9;
          context.stroke();
        }
      }
      context.shadowColor = "rgba(121, 223, 209, .82)";
      context.shadowBlur = 12;
      for (const node of nodes) {
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(204, 255, 244, 0.9)";
        context.fill();
      }
      context.shadowBlur = 0;
    };

    const animate = () => {
      draw();
      if (!staticOnly && active && !document.hidden) frame = window.requestAnimationFrame(animate);
    };
    const restart = () => {
      window.cancelAnimationFrame(frame);
      resize();
      draw();
      if (!staticOnly && active && !document.hidden) frame = window.requestAnimationFrame(animate);
    };
    const onPointerMove = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    const onVisibility = () => {
      window.cancelAnimationFrame(frame);
      if (!document.hidden && active && !staticOnly) frame = window.requestAnimationFrame(animate);
    };

    restart();
    window.addEventListener("resize", restart);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", restart);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="margin-neural-field" aria-hidden="true" />;
}
