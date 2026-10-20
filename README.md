# AI 学习

基于 Next.js 16 + Fumadocs 16 + Tailwind v4 + React 19 的 AI 学习文档站。

[![CI](https://github.com/gavin/ai-learning/actions/workflows/ci.yml/badge.svg)](https://github.com/gavin/ai-learning/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 技术栈

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| Next.js | 16 | App Router / 服务端渲染 |
| Fumadocs | 16 | 文档框架（UI / Core / MDX） |
| Tailwind CSS | v4 | 样式 |
| React | 19 | UI |
| TypeScript | 7 | 类型安全 |
| Biome | 2 | Lint / Format |
| Orama | — | 全文搜索（本地） |

## 快速开始

```bash
pnpm install    # 安装依赖
pnpm dev        # 开发服务器 http://localhost:3000
pnpm build      # 生产构建
pnpm start      # 运行生产构建
pnpm types:check  # 类型检查
pnpm lint       # Biome 检查
pnpm format     # Biome 格式化
```

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `content/docs/` | 文档源（`.md` / `.mdx`） |
| `app/(home)/` | 首页与其他非文档页面 |
| `app/docs/` | 文档布局与动态路由 |
| `app/api/search/` | Orama 搜索接口 |
| `app/og/` | OG 图片生成 |
| `app/llms*.txt` | LLM 友好的文本导出 |
| `lib/source.ts` | 内容源适配器（`loader()`） |
| `lib/shared.ts` | 站点配置（名称 / GitHub / 路由） |
| `lib/layout.shared.tsx` | 布局共享配置 |
| `components/mdx.tsx` | MDX 组件映射 |

## 写文档

直接在 `content/docs/` 下新建 `.md` 或 `.mdx` 文件即可。纯文字笔记用 `.md`，
需要嵌入交互组件时用 `.mdx`。用 `meta.json` 控制侧边栏顺序与分组。

## 贡献

欢迎贡献文档与代码！请阅读 [贡献指南](CONTRIBUTING.md)。

## 许可证

[MIT](LICENSE) © Gavin Ray

