import Link from "next/link";
import { appName, gitConfig } from "@/lib/shared";

type Lang = "zh" | "en";

type Topic = {
  num: string;
  label: { zh: string; en: string };
  slug: string;
  count: number;
};

type Track = {
  key: "a" | "b" | "c";
  title: { zh: string; en: string };
  goal: { zh: string; en: string };
  topics: Topic[];
};

const TRACKS: Track[] = [
  {
    key: "a",
    title: { zh: "理解 AI 如何工作", en: "Understand How AI Works" },
    goal: {
      zh: "理解数据如何表示、模型如何学习、参数如何更新，以及大语言模型如何生成内容。",
      en: "How data is represented, how models learn, how parameters update, and how LLMs generate.",
    },
    topics: [
      {
        num: "①",
        label: { zh: "Python for ML", en: "Python for ML" },
        slug: "python/environment",
        count: 7,
      },
      {
        num: "②",
        label: { zh: "数学基础", en: "Math Foundations" },
        slug: "math/linear-algebra",
        count: 6,
      },
      {
        num: "③",
        label: { zh: "机器学习", en: "Machine Learning" },
        slug: "machine-learning/what-is-ml",
        count: 10,
      },
      {
        num: "④",
        label: { zh: "深度学习", en: "Deep Learning" },
        slug: "deep-learning/neuron",
        count: 9,
      },
      {
        num: "⑤",
        label: { zh: "Transformer 与 LLM", en: "Transformers & LLM" },
        slug: "transformers-llm/tokenization",
        count: 14,
      },
    ],
  },
  {
    key: "b",
    title: { zh: "构建 AI 应用", en: "Build AI Applications" },
    goal: {
      zh: "将模型能力转化为可靠、可评测、可维护的应用系统。",
      en: "Turn model capabilities into reliable, measurable, maintainable systems.",
    },
    topics: [
      {
        num: "⑥",
        label: { zh: "LLM 应用开发", en: "LLM Engineering" },
        slug: "llm-engineering/api-basics",
        count: 10,
      },
      {
        num: "⑦",
        label: { zh: "RAG 检索增强生成", en: "RAG" },
        slug: "rag/what-is-rag",
        count: 10,
      },
      {
        num: "⑧",
        label: { zh: "Agent 与 MCP", en: "Agents & MCP" },
        slug: "agent-mcp/what-is-agent",
        count: 8,
      },
    ],
  },
  {
    key: "c",
    title: { zh: "理解并运行模型", en: "Understand and Run Models" },
    goal: {
      zh: "理解模型如何在硬件约束下运行，完成模型服务部署、性能分析与优化。",
      en: "How models run under hardware constraints — deploy, profile, and optimize model services.",
    },
    topics: [
      {
        num: "⑨",
        label: { zh: "部署与推理优化", en: "Inference & Deployment" },
        slug: "inference-deployment/local-models",
        count: 7,
      },
    ],
  },
];

const COPY = {
  zh: {
    title: "从原理到部署，系统掌握人工智能",
    subtitle:
      "一条从数学基础到模型服务的学习路径——理解原理、构建应用、运行模型。",
    ctaPrimary: "开始阅读",
    ctaSecondary: "查看完整大纲",
    tracksTitle: "三条学习主线",
    tracksDesc: "从共同根基出发，逐层深入，分流到应用工程与模型部署。",
    articles: "篇",
    footerQuote: "完成一篇文章，不等于掌握一个知识点。",
    footerCopy: `© 2026 Gavin · ${appName}`,
  },
  en: {
    title: "From Principles to Deployment, Master AI Systematically",
    subtitle:
      "A learning path from mathematical foundations to model services — understand principles, build applications, run models.",
    ctaPrimary: "Start reading",
    ctaSecondary: "View full outline",
    tracksTitle: "Three Learning Tracks",
    tracksDesc:
      "Start from shared foundations, go deeper layer by layer, then branch into application engineering and deployment.",
    articles: "articles",
    footerQuote: "Reading an article is not the same as mastering a concept.",
    footerCopy: `© 2026 Gavin · ${appName}`,
  },
} as const;

function doc(lang: Lang, slug: string) {
  return `${lang === "zh" ? "/zh" : ""}/docs/${slug}`;
}

export default async function HomePage(props: PageProps<"/[lang]">) {
  const params = await props.params;
  const lang: Lang = params.lang === "en" ? "en" : "zh";
  const t = COPY[lang];

  return (
    <div className="homepage flex flex-col flex-1">
      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-4 pt-24 pb-16 text-center sm:pt-32">
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-fd-muted-foreground text-pretty">
          {t.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={doc(lang, "python/environment")}
            className="inline-flex items-center rounded-md bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href={doc(lang, "outline")}
            className="inline-flex items-center rounded-md border border-fd-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* Tracks */}
      <section className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
          <header className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t.tracksTitle}
            </h2>
            <p className="mt-3 text-fd-muted-foreground">{t.tracksDesc}</p>
          </header>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TRACKS.map((track) => (
              <div
                key={track.key}
                className={`hp-track hp-track--${track.key}`}
              >
                <div className="flex items-center gap-2">
                  <span className="hp-track-tag">
                    {track.key.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-semibold">{track.title[lang]}</h3>
                </div>
                <p className="mt-3 text-sm text-fd-muted-foreground">
                  {track.goal[lang]}
                </p>
                <ul className="mt-5 space-y-1">
                  {track.topics.map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        href={doc(lang, topic.slug)}
                        className="hp-topic group"
                      >
                        <span className="hp-topic-num">{topic.num}</span>
                        <span className="flex-1">{topic.label[lang]}</span>
                        <span className="hp-topic-count">
                          {topic.count} {t.articles}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 text-center">
          <p className="hp-footer-quote">{t.footerQuote}</p>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-fd-muted-foreground">
            <span>{t.footerCopy}</span>
            <span aria-hidden="true" className="hp-footer-dot" />
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hp-footer-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        .hp-track {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 0.75rem;
          border: 1px solid var(--color-fd-border);
          background: var(--color-fd-card);
          padding: 1.25rem;
          overflow: hidden;
        }
        .hp-track::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 3px;
          background: var(--hp-accent);
        }
        .hp-track--a { --hp-accent: #2a78d6; }
        .hp-track--b { --hp-accent: #1baf7a; }
        .hp-track--c { --hp-accent: #eb6834; }
        .dark .hp-track--a { --hp-accent: #3987e5; }
        .dark .hp-track--b { --hp-accent: #199e70; }
        .dark .hp-track--c { --hp-accent: #d95926; }
        .hp-track-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.4rem;
          background: var(--hp-accent);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .hp-topic {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-radius: 0.5rem;
          padding: 0.5rem 0.6rem;
          font-size: 0.9rem;
          color: var(--color-fd-foreground);
          transition: background-color 0.15s;
        }
        .hp-topic:hover {
          background: var(--color-fd-accent);
        }
        .hp-topic-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.4rem;
          height: 1.4rem;
          flex-shrink: 0;
          border-radius: 9999px;
          border: 1px solid var(--hp-accent);
          color: var(--hp-accent);
          font-size: 0.7rem;
          font-weight: 700;
        }
        .hp-topic-count {
          flex-shrink: 0;
          font-size: 0.75rem;
          color: var(--color-fd-muted-foreground);
        }
        .hp-footer-quote {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-fd-foreground);
        }
        .hp-footer-dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: var(--color-fd-muted-foreground);
          opacity: 0.5;
        }
        .hp-footer-link {
          color: var(--color-fd-muted-foreground);
          transition: color 0.15s;
        }
        .hp-footer-link:hover {
          color: var(--color-fd-foreground);
        }
      `}</style>
    </div>
  );
}
