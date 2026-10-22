"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const TRUE_W = 0.6;
const TRUE_B = 1.5;

function generatePoints() {
  const pts: { x: number; y: number }[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < 16; i++) {
    const x = (i / 15) * 9 + 0.5;
    const noise = (rand() - 0.5) * 2.2;
    pts.push({ x, y: TRUE_W * x + TRUE_B + noise });
  }
  return pts;
}

const W = 380;
const H = 280;
const PAD = 34;
const X_MAX = 10;
const Y_MAX = 10;

function toPx(x: number, y: number) {
  return {
    px: PAD + (x / X_MAX) * (W - PAD * 2),
    py: H - PAD - (y / Y_MAX) * (H - PAD * 2),
  };
}

export default function LinearRegressionTrainer() {
  const points = useMemo(generatePoints, []);
  const [params, setParams] = useState({ w: 0, b: 0 });
  const [lr, setLr] = useState(0.05);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const loss = useMemo(() => {
    let sum = 0;
    for (const p of points) {
      const d = params.w * p.x + params.b - p.y;
      sum += d * d;
    }
    return sum / points.length;
  }, [params, points]);

  const trainStep = useCallback(() => {
    setParams(({ w, b }) => {
      let gw = 0;
      let gb = 0;
      for (const p of points) {
        const err = w * p.x + b - p.y;
        gw += err * p.x;
        gb += err;
      }
      const n = points.length;
      return {
        w: w - lr * (gw / n) * 2,
        b: b - lr * (gb / n) * 2,
      };
    });
    setStep((s) => s + 1);
  }, [lr, points]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(trainStep, 80);
    return () => clearInterval(id);
  }, [running, trainStep]);

  const reset = () => {
    setRunning(false);
    setParams({ w: 0, b: 0 });
    setStep(0);
  };

  const a = toPx(0, params.b);
  const b2 = toPx(X_MAX, params.w * X_MAX + params.b);

  return (
    <div className="not-prose my-6 rounded-xl border border-fd-border bg-fd-card p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="线性回归训练可视化"
      >
        {/* 网格 */}
        {Array.from({ length: 11 }, (_, i) => {
          const gx = toPx(i, 0).px;
          const gy = toPx(0, i).py;
          return (
            <g key={`g-${i}`} className="text-fd-muted-foreground/30">
              <line x1={gx} y1={PAD} x2={gx} y2={H - PAD} stroke="currentColor" strokeWidth={0.5} />
              <line x1={PAD} y1={gy} x2={W - PAD} y2={gy} stroke="currentColor" strokeWidth={0.5} />
            </g>
          );
        })}
        {/* 坐标轴 */}
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} className="stroke-fd-border" strokeWidth={1.5} />
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} className="stroke-fd-border" strokeWidth={1.5} />
        {/* 散点 */}
        {points.map((p, i) => {
          const { px, py } = toPx(p.x, p.y);
          return <circle key={`p-${i}`} cx={px} cy={py} r={3.5} className="fill-blue-500" />;
        })}
        {/* 当前拟合直线 */}
        <line x1={a.px} y1={a.py} x2={b2.px} y2={b2.py} className="stroke-rose-500" strokeWidth={2.5} />
      </svg>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-fd-muted-foreground">学习率</span>
            <code className="text-fd-foreground">{lr.toFixed(3)}</code>
          </div>
          <input
            type="range"
            min={0.001}
            max={0.5}
            step={0.001}
            value={lr}
            onChange={(e) => setLr(Number(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm">
          <div>
            <div className="text-fd-muted-foreground text-xs">步数</div>
            <div>{step}</div>
          </div>
          <div>
            <div className="text-fd-muted-foreground text-xs">w / b</div>
            <div>
              {params.w.toFixed(2)} / {params.b.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-fd-muted-foreground text-xs">损失</div>
            <div>{loss.toFixed(3)}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={trainStep}
          className="rounded-md bg-fd-primary px-3 py-1.5 text-sm text-fd-primary-foreground hover:opacity-90"
        >
          训练一步
        </button>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="rounded-md border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-muted"
        >
          {running ? "暂停" : "自动训练"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-fd-border px-3 py-1.5 text-sm hover:bg-fd-muted"
        >
          重置
        </button>
      </div>
      <p className="mt-3 text-xs text-fd-muted-foreground">
        真实关系 y = {TRUE_W}x + {TRUE_B}。试试把学习率拉到 0.3 以上，看直线如何震荡甚至飞走。
      </p>
    </div>
  );
}
