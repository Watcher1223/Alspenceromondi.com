import { useEffect, useRef } from "react";

type Kind = "coat" | "spot" | "eye";
type Group = "body" | "head" | "tail" | "frontA" | "frontB" | "rearA" | "rearB";

type Particle = {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  kind: Kind;
  group: Group;
  t: number;
  seed: number;
  size: number;
  alpha: number;
};

type Pointer = {
  x: number;
  down: boolean;
  startX: number;
  startAngle: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const TAU = Math.PI * 2;

function ellipse(x: number, y: number, cx: number, cy: number, rx: number, ry: number) {
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

function addParticle(points: Particle[], x: number, y: number, z: number, kind: Kind, group: Group, size = 1.35, t = 0) {
  points.push({
    x,
    y,
    z,
    sx: x + rand(-220, 220),
    sy: y + rand(-160, 160),
    vx: 0,
    vy: 0,
    kind,
    group,
    t,
    seed: rand(0, TAU),
    size: rand(size * 0.55, size * 1.15),
    alpha: rand(0.55, 0.98),
  });
}

function addLine(points: Particle[], group: Group, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, count: number, kind: Kind) {
  for (let i = 0; i < count; i += 1) {
    const t = i / Math.max(1, count - 1);
    addParticle(
      points,
      x1 + (x2 - x1) * t + rand(-7, 7),
      y1 + (y2 - y1) * t + rand(-7, 7),
      z1 + (z2 - z1) * t + rand(-10, 10),
      kind,
      group,
      1.45,
      t
    );
  }
}

function cheetahParticles(): Particle[] {
  const points: Particle[] = [];

  for (let i = 0; i < 2600; i += 1) {
    const x = rand(-315, 315);
    const y = rand(-95, 95);
    const longBody = ellipse(x, y, -55, -4, 290, 72);
    const chest = ellipse(x, y, 206, -2, 90, 74);
    const hip = ellipse(x, y, -260, 6, 88, 62);
    const waistCut = ellipse(x, y, -45, 67, 160, 30);
    const backCut = y < -68 && x > -220 && x < 160 && Math.random() > 0.32;
    if ((longBody || chest || hip) && !waistCut && !backCut) {
      addParticle(points, x, y, rand(-48, 48), "coat", "body", 1.28);
    }
  }

  for (let i = 0; i < 740; i += 1) {
    const x = rand(180, 410);
    const y = rand(-112, 42);
    const neck = ellipse(x, y, 240, -40, 88, 46);
    const head = ellipse(x, y, 338, -58, 72, 42);
    const snout = ellipse(x, y, 401, -48, 44, 25);
    const earA = ellipse(x, y, 310, -105, 21, 29);
    const earB = ellipse(x, y, 357, -102, 18, 25);
    if (neck || head || snout || earA || earB) {
      addParticle(points, x, y, rand(-34, 34), "coat", "head", 1.18);
    }
  }
  addParticle(points, 360, -67, -28, "eye", "head", 3.4);

  for (let i = 0; i < 620; i += 1) {
    const t = i / 619;
    const curl = Math.sin(t * Math.PI * 1.35);
    const x = -338 - 190 * t;
    const y = -4 - 72 * t - curl * 58;
    const z = Math.sin(t * Math.PI * 2.1) * 54;
    addParticle(points, x + rand(-9, 9), y + rand(-9, 9), z + rand(-10, 10), i > 520 ? "spot" : "coat", "tail", 1.16, t);
  }

  addLine(points, "frontA", 180, 48, -28, 350, 138, -20, 360, "coat");
  addLine(points, "frontA", 350, 138, -20, 470, 110, -16, 210, "coat");
  addLine(points, "frontB", 236, 44, 30, 118, 148, 36, 320, "coat");
  addLine(points, "frontB", 118, 148, 36, 14, 132, 40, 190, "coat");
  addLine(points, "rearA", -238, 52, -25, -395, 138, -20, 330, "coat");
  addLine(points, "rearA", -395, 138, -20, -505, 126, -16, 190, "coat");
  addLine(points, "rearB", -165, 50, 32, -40, 156, 36, 330, "coat");
  addLine(points, "rearB", -40, 156, 36, 86, 138, 42, 200, "coat");

  for (let cluster = 0; cluster < 64; cluster += 1) {
    const cx = rand(-280, 250);
    const cy = rand(-48, 42);
    const rz = rand(-46, 46);
    for (let i = 0; i < rand(9, 18); i += 1) {
      addParticle(points, cx + rand(-13, 13), cy + rand(-10, 10), rz + rand(-7, 7), "spot", "body", 1.7);
    }
  }

  for (let cluster = 0; cluster < 14; cluster += 1) {
    const cx = rand(285, 398);
    const cy = rand(-82, -36);
    for (let i = 0; i < rand(6, 10); i += 1) {
      addParticle(points, cx + rand(-9, 9), cy + rand(-8, 8), rand(-26, 26), "spot", "head", 1.35);
    }
  }

  return points;
}

function animatedLocal(p: Particle, time: number) {
  const run = time * 0.006;
  const phase = run + (p.group === "frontB" || p.group === "rearA" ? Math.PI : 0);
  let x = p.x;
  let y = p.y;
  let z = p.z;

  if (p.group === "frontA" || p.group === "frontB" || p.group === "rearA" || p.group === "rearB") {
    const swing = Math.sin(phase) * 42;
    const lift = Math.max(0, Math.cos(phase)) * -34;
    const footBias = p.t * p.t;
    x += swing * footBias;
    y += lift * footBias + Math.sin(phase + p.t * 2.2) * 8;
    z += Math.cos(phase) * 14 * footBias;
  }

  if (p.group === "tail") {
    y += Math.sin(run * 0.9 + p.t * 4.8) * 18 * p.t;
    z += Math.cos(run * 0.8 + p.t * 4.2) * 18 * p.t;
  }

  if (p.group === "body" || p.group === "head") {
    y += Math.sin(run * 2.0 + p.seed) * 2.2;
  }

  return { x, y, z };
}

export function ParticleCheetah() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<Pointer>({ x: 0, down: false, startX: 0, startAngle: 0 });
  const angleRef = useRef(0.08);
  const velocityRef = useRef(0.003);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = cheetahParticles();
    let raf = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#060606";
      ctx.fillRect(0, 0, rect.width, rect.height);

      if (!pointerRef.current.down) {
        angleRef.current += velocityRef.current;
        velocityRef.current *= 0.992;
        if (Math.abs(velocityRef.current) < 0.0018) velocityRef.current = 0.0018;
      }

      const angle = angleRef.current;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const scale = Math.min(rect.width / 900, rect.height / 470);
      const cx = rect.width / 2;
      const cy = rect.height / 2 + 12;
      const depth = 720;

      const projected = particles.map((p) => {
        const local = animatedLocal(p, time);
        const rx = local.x * cos - local.z * sin;
        const rz = local.x * sin + local.z * cos;
        const perspective = depth / (depth + rz);
        const tx = cx + rx * scale * perspective;
        const ty = cy + local.y * scale * perspective;
        p.vx += (tx - p.sx) * 0.08;
        p.vy += (ty - p.sy) * 0.08;
        p.vx *= 0.74;
        p.vy *= 0.74;
        p.sx += p.vx;
        p.sy += p.vy;
        return { p, z: rz, size: p.size * perspective * scale * 1.35 };
      }).sort((a, b) => a.z - b.z);

      for (const item of projected) {
        const { p } = item;
        ctx.beginPath();
        const shade = Math.max(0.35, Math.min(1, 0.72 + item.z / 900));
        if (p.kind === "spot") {
          ctx.fillStyle = `rgba(${22 * shade}, ${12 * shade}, ${5 * shade}, ${Math.min(0.95, p.alpha + 0.12)})`;
        } else if (p.kind === "eye") {
          ctx.fillStyle = "rgba(255,255,255,0.95)";
        } else {
          ctx.fillStyle = `rgba(${250 * shade}, ${166 * shade}, ${54 * shade}, ${p.alpha})`;
        }
        ctx.arc(p.sx, p.sy, Math.max(0.55, item.size), 0, TAU);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText("[ DRAG TO ROTATE 360° / RUNNING POINT CLOUD ]", 22, rect.height - 24);
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const onPointerDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      pointerRef.current = {
        x: event.clientX,
        down: true,
        startX: event.clientX,
        startAngle: angleRef.current,
      };
    };
    const onPointerMove = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer.down) return;
      const dx = event.clientX - pointer.startX;
      angleRef.current = pointer.startAngle + dx * 0.012;
      velocityRef.current = dx * 0.00008;
      pointer.x = event.clientX;
    };
    const onPointerUp = () => {
      pointerRef.current.down = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div className="particleFrame">
      <canvas ref={canvasRef} aria-label="Interactive running cheetah point cloud" />
    </div>
  );
}
