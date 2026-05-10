import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

type Pointer = {
  x: number;
  y: number;
  down: boolean;
  active: boolean;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function insideEllipse(x: number, y: number, cx: number, cy: number, rx: number, ry: number) {
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

function sampleLine(
  dots: Dot[],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  count: number,
  jitter: number,
  radius = 1.35
) {
  for (let i = 0; i < count; i += 1) {
    const t = i / Math.max(1, count - 1);
    const tx = x1 + (x2 - x1) * t + rand(-jitter, jitter);
    const ty = y1 + (y2 - y1) * t + rand(-jitter, jitter);
    dots.push({ x: tx + rand(-240, 240), y: ty + rand(-180, 180), tx, ty, vx: 0, vy: 0, r: rand(radius * 0.5, radius), a: rand(0.42, 0.92) });
  }
}

function makeCheetahDots(width: number, height: number): Dot[] {
  const dots: Dot[] = [];
  const scale = Math.min(width / 900, height / 460);
  const ox = width / 2 - 420 * scale;
  const oy = height / 2 - 170 * scale;
  const add = (x: number, y: number, r = 1.35) => {
    const tx = ox + x * scale;
    const ty = oy + y * scale;
    dots.push({ x: tx + rand(-260, 260), y: ty + rand(-170, 170), tx, ty, vx: 0, vy: 0, r: rand(r * 0.45, r), a: rand(0.35, 0.95) });
  };

  for (let i = 0; i < 1900; i += 1) {
    const x = rand(120, 680);
    const y = rand(70, 270);
    const body = insideEllipse(x, y, 380, 168, 238, 78);
    const chest = insideEllipse(x, y, 545, 165, 86, 62);
    const hip = insideEllipse(x, y, 195, 176, 92, 62);
    const neck = insideEllipse(x, y, 615, 142, 62, 38);
    const head = insideEllipse(x, y, 690, 132, 70, 43);
    const snout = insideEllipse(x, y, 746, 144, 42, 24);
    const bellyCut = insideEllipse(x, y, 372, 235, 148, 42);
    const backCut = y < 96 && x < 580 && x > 220 && Math.random() > 0.25;
    if ((body || chest || hip || neck || head || snout) && !bellyCut && !backCut) {
      add(x, y, 1.45);
    }
  }

  for (let i = 0; i < 260; i += 1) {
    const t = i / 259;
    const x = 160 - 125 * t + Math.sin(t * Math.PI * 2.1) * 20;
    const y = 172 - 118 * t + Math.sin(t * Math.PI * 1.4) * 18;
    add(x + rand(-10, 10), y + rand(-10, 10), 1.2);
  }

  sampleLine(dots, ox + 260 * scale, oy + 222 * scale, ox + 126 * scale, oy + 356 * scale, 260, 7 * scale, 1.2);
  sampleLine(dots, ox + 334 * scale, oy + 224 * scale, ox + 430 * scale, oy + 354 * scale, 230, 7 * scale, 1.2);
  sampleLine(dots, ox + 525 * scale, oy + 218 * scale, ox + 690 * scale, oy + 352 * scale, 280, 7 * scale, 1.2);
  sampleLine(dots, ox + 594 * scale, oy + 209 * scale, ox + 470 * scale, oy + 350 * scale, 240, 7 * scale, 1.2);

  for (let i = 0; i < 160; i += 1) {
    add(rand(690, 774), rand(126, 160), 0.95);
  }
  add(707, 121, 2.4);

  return dots;
}

export function ParticleCheetah() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<Pointer>({ x: 0, y: 0, down: false, active: false });
  const dragRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let raf = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = makeCheetahDots(rect.width, rect.height);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const pointer = pointerRef.current;
      const drag = dragRef.current;
      if (pointer.down) {
        drag.x += (pointer.x - rect.width / 2 - drag.x) * 0.045;
        drag.y += (pointer.y - rect.height / 2 - drag.y) * 0.045;
      } else {
        drag.x *= 0.94;
        drag.y *= 0.94;
      }

      for (const dot of dots) {
        let targetX = dot.tx + drag.x * 0.22;
        let targetY = dot.ty + drag.y * 0.16;
        if (pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          const radius = pointer.down ? 220 : 120;
          if (distSq < radius * radius) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (1 - dist / radius) * (pointer.down ? 9 : 4.5);
            targetX += (dx / dist) * force * 16;
            targetY += (dy / dist) * force * 16;
          }
        }
        dot.vx += (targetX - dot.x) * 0.034;
        dot.vy += (targetY - dot.y) * 0.034;
        dot.vx *= 0.84;
        dot.vy *= 0.84;
        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx.beginPath();
        ctx.fillStyle = `rgba(245,245,245,${dot.a})`;
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText("[ DRAG THE CHEETAH FIELD ]", 22, rect.height - 24);
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        ...pointerRef.current,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };
    const onPointerDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      pointerRef.current.down = true;
      onPointerMove(event);
    };
    const onPointerUp = () => {
      pointerRef.current.down = false;
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.down = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="particleFrame">
      <canvas ref={canvasRef} aria-label="Interactive particle cheetah" />
    </div>
  );
}
