import Link from "next/link";

type Track = "common" | "frontend" | "backend";

type Node = {
  id: string;
  num: string;
  label: string;
  href: string;
  track: Track;
  /** 0–1 vertical position on the map */
  y: number;
  /** column offset: 0 center, -1 left, +1 right */
  col: number;
};

const NODES: Node[] = [
  {
    id: "python",
    num: "①",
    label: "Python for ML",
    href: "/docs/python/environment",
    track: "common",
    y: 0.04,
    col: 0,
  },
  {
    id: "math",
    num: "②",
    label: "数学补位",
    href: "/docs/math/linear-algebra",
    track: "common",
    y: 0.14,
    col: 0,
  },
  {
    id: "ml",
    num: "③",
    label: "机器学习",
    href: "/docs/machine-learning/what-is-ml",
    track: "common",
    y: 0.24,
    col: 0,
  },
  {
    id: "dl",
    num: "④",
    label: "深度学习",
    href: "/docs/deep-learning/neuron",
    track: "common",
    y: 0.34,
    col: 0,
  },
  {
    id: "transformers",
    num: "⑤",
    label: "Transformer 与 LLM",
    href: "/docs/transformers-llm/embedding-intuition",
    track: "common",
    y: 0.44,
    col: 0,
  },
  {
    id: "llm-eng",
    num: "⑥",
    label: "LLM 应用开发",
    href: "/docs/llm-engineering/api-basics",
    track: "common",
    y: 0.56,
    col: 0,
  },
  {
    id: "rag-fe",
    num: "⑦",
    label: "RAG",
    href: "/docs/rag/what-is-rag",
    track: "frontend",
    y: 0.72,
    col: -1,
  },
  {
    id: "rag-be",
    num: "⑦",
    label: "RAG",
    href: "/docs/rag/what-is-rag",
    track: "backend",
    y: 0.72,
    col: 1,
  },
  {
    id: "agent",
    num: "⑧",
    label: "Agent 与 MCP",
    href: "/docs/agent-mcp/what-is-agent",
    track: "backend",
    y: 0.84,
    col: 1,
  },
  {
    id: "deploy",
    num: "⑨",
    label: "部署与推理优化",
    href: "/docs/inference-deployment/serving",
    track: "backend",
    y: 0.96,
    col: 1,
  },
];

const COLOR: Record<Track, string> = {
  common: "var(--map-common)",
  frontend: "var(--map-frontend)",
  backend: "var(--map-backend)",
};

const W = 760;
const H = 620;
const NODE_W = 168;
const NODE_H = 48;

function cx(col: number) {
  return col === 0 ? W / 2 : col < 0 ? W / 2 - 132 : W / 2 + 132;
}
function cy(yFrac: number) {
  return 36 + yFrac * (H - 72);
}

export default function LearningMap() {
  const commonChain = NODES.filter((n) => n.track === "common");
  const feNodes = NODES.filter((n) => n.track === "frontend");
  const beNodes = NODES.filter((n) => n.track === "backend");

  const segments: { from: Node; to: Node; track: Track }[] = [];
  for (let i = 0; i < commonChain.length - 1; i++) {
    segments.push({
      from: commonChain[i],
      to: commonChain[i + 1],
      track: "common",
    });
  }
  // ⑥ 分叉到 ⑦ 前端 / 后端
  if (feNodes[0])
    segments.push({
      from: commonChain[commonChain.length - 1],
      to: feNodes[0],
      track: "frontend",
    });
  if (beNodes[0])
    segments.push({
      from: commonChain[commonChain.length - 1],
      to: beNodes[0],
      track: "backend",
    });
  for (let i = 0; i < beNodes.length - 1; i++) {
    segments.push({ from: beNodes[i], to: beNodes[i + 1], track: "backend" });
  }

  return (
    <div className="not-prose my-6 overflow-x-auto">
      <div className="learning-map-viz rounded-xl border border-fd-border bg-fd-card p-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label="AI 学习路线图"
        >
          <defs>
            <marker
              id="arrow-common"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--map-common)" />
            </marker>
            <marker
              id="arrow-frontend"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--map-frontend)" />
            </marker>
            <marker
              id="arrow-backend"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--map-backend)" />
            </marker>
          </defs>

          {/* 连线 */}
          {segments.map((seg) => {
            const x1 = cx(seg.from.col);
            const y1 = cy(seg.from.y) + NODE_H / 2;
            const x2 = cx(seg.to.col);
            const y2 = cy(seg.to.y) - NODE_H / 2;
            const midY = (y1 + y2) / 2;
            const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
            return (
              <path
                key={`${seg.from.id}-${seg.to.id}`}
                d={d}
                fill="none"
                stroke={COLOR[seg.track]}
                strokeWidth={2.5}
                markerEnd={`url(#arrow-${seg.track})`}
                opacity={0.85}
              />
            );
          })}

          {/* 分叉注释 */}
          <text x={W / 2} y={cy(0.62)} textAnchor="middle" className="map-note">
            共同根基到此后分流
          </text>

          {/* 节点 */}
          {NODES.map((n) => {
            const x = cx(n.col) - NODE_W / 2;
            const y = cy(n.y) - NODE_H / 2;
            return (
              <Link key={n.id + n.col} href={n.href}>
                <g className="map-node" style={{ cursor: "pointer" }}>
                  <rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={NODE_H}
                    rx={8}
                    fill="var(--map-node-fill)"
                    stroke={COLOR[n.track]}
                    strokeWidth={2}
                  />
                  <circle
                    cx={x + 18}
                    cy={cy(n.y)}
                    r={11}
                    fill={COLOR[n.track]}
                  />
                  <text
                    x={x + 18}
                    y={cy(n.y)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="map-num"
                  >
                    {n.num}
                  </text>
                  <text
                    x={x + 36}
                    y={cy(n.y)}
                    dominantBaseline="central"
                    className="map-label"
                  >
                    {n.label}
                  </text>
                </g>
              </Link>
            );
          })}
        </svg>
      </div>

      {/* 图例 */}
      <div className="mt-3 flex flex-wrap gap-4 px-1 text-sm">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="map-swatch"
            style={{ background: "var(--map-common)" }}
          />
          共同根基（前端 + 后端）
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="map-swatch"
            style={{ background: "var(--map-frontend)" }}
          />
          前端路径
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="map-swatch"
            style={{ background: "var(--map-backend)" }}
          />
          后端路径
        </span>
      </div>

      <style>{`
        .learning-map-viz {
          --map-common: #2a78d6;
          --map-frontend: #eb6834;
          --map-backend: #1baf7a;
          --map-node-fill: var(--color-fd-background, #fff);
          color: var(--color-fd-foreground, #0b0b0b);
        }
        .dark .learning-map-viz {
          --map-common: #3987e5;
          --map-frontend: #d95926;
          --map-backend: #199e70;
          --map-node-fill: var(--color-fd-background, #0a0a0a);
        }
        .map-node:hover rect {
          fill: color-mix(in srgb, var(--map-node-fill) 80%, currentColor 12%);
        }
        .map-node:hover {
          opacity: 0.92;
        }
        .map-num {
          fill: #fff;
          font-size: 13px;
          font-weight: 700;
        }
        .map-label {
          fill: currentColor;
          font-size: 13px;
          font-weight: 500;
        }
        .map-note {
          fill: var(--color-fd-muted-foreground, #666);
          font-size: 11px;
        }
        .map-swatch {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
