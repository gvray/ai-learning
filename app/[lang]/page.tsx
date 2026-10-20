import Link from "next/link";

const content = {
  zh: {
    title: "AI 学习",
    subtitle: "从基础到前沿，系统学习人工智能与机器学习。",
    cta: "开始阅读",
    cta2: "入门指南",
  },
  en: {
    title: "AI Learning",
    subtitle:
      "From fundamentals to the frontier — learn AI and ML systematically.",
    cta: "Start reading",
    cta2: "Getting started",
  },
};

export default async function HomePage(props: PageProps<"/[lang]">) {
  const params = await props.params;
  const t = content[params.lang as keyof typeof content] ?? content.zh;

  return (
    <div className="flex flex-col items-center justify-center text-center flex-1 gap-6 px-4">
      <div className="flex flex-col gap-3 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {t.title}
        </h1>
        <p className="text-lg text-fd-muted-foreground">{t.subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={params.lang === "en" ? "/en/docs" : "/docs"}
          className="inline-flex items-center rounded-md bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
        >
          {t.cta}
        </Link>
        <Link
          href={
            params.lang === "en"
              ? "/en/docs/getting-started/introduction"
              : "/docs/getting-started/introduction"
          }
          className="inline-flex items-center rounded-md border border-fd-border px-5 py-2.5 text-sm font-medium hover:bg-fd-accent"
        >
          {t.cta2}
        </Link>
      </div>
    </div>
  );
}
