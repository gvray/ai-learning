# 贡献指南

感谢你对 AI 学习项目的兴趣！欢迎贡献文档、代码或想法。

## 技术栈

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| Next.js | 16 | App Router / 服务端渲染 |
| Fumadocs | 16 | 文档框架（UI / Core / MDX） |
| Tailwind CSS | v4 | 样式 |
| React | 19 | UI |
| TypeScript | 7 | 类型安全 |
| Biome | 2 | Lint / Format |
| Orama | — | 全文搜索（Fumadocs 内置本地索引） |

## 环境准备

需要 Node.js 20+ 与 pnpm 10+。

```bash
git clone <repo-url>
cd ai-learning
pnpm install
pnpm dev          # http://localhost:8001
```

## 常用命令

```bash
pnpm dev          # 开发服务器 http://localhost:8001
pnpm build        # 生产构建
pnpm start        # 运行生产构建
pnpm types:check  # 类型检查
pnpm lint         # Biome 检查
pnpm format       # Biome 格式化
```

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `content/docs/{zh,en}/` | 文档源（`.md` / `.mdx`），按语言分目录 |
| `app/[lang]/page.tsx` | 首页 |
| `app/[lang]/docs/` | 文档布局与动态路由 |
| `app/api/search/route.ts` | 全文搜索接口 |
| `app/[lang]/og/docs/[...slug]/route.tsx` | OG 图片生成 |
| `app/[lang]/llms.mdx/docs/` | LLM 友好的文本导出 |
| `lib/source.ts` | 内容源适配器（`loader()` / schema） |
| `lib/shared.ts` | 站点配置（名称 / GitHub / 路由） |
| `lib/layout.shared.tsx` | 布局共享配置 |
| `lib/i18n.ts` · `lib/locale.ts` | 国际化与语言路由 |
| `components/mdx.tsx` | MDX 组件映射 |
| `components/interactive/` | 嵌入文档的交互组件 |

## 写文档

1. 在 `content/docs/{zh,en}/<板块>/` 下新建 `.md`（纯文字）或 `.mdx`（含交互组件）文件。
2. 文件头声明 frontmatter：

   ```markdown
   ---
   title: 标题
   description: 一句话描述
   ---
   ```

3. 在所在目录的 `meta.json` 的 `pages` 数组里登记新页面，控制侧边栏顺序与分组。
4. 同步更新 `content/docs/{zh,en}/outline.mdx`——它是全站导航的权威来源，`meta.json` 须与之一致；新增页面要补导航，不要删 stub。
5. 中英双语同步：新页面在 `zh/` 与 `en/` 下都应建立对应文件。
6. 提交前运行 `pnpm lint` 与 `pnpm types:check` 确保通过。

### 交互组件

新建的交互组件放在 `components/interactive/`，并在 `components/mdx.tsx` 的组件映射中注册后，即可在 `.mdx` 中使用。

## 贡献代码

1. 从 `main` 拉取功能分支：`git checkout -b feat/your-feature`。
2. 遵循现有代码风格（Biome 自动格式化）。
3. 保证 `pnpm lint`、`pnpm types:check`、`pnpm build` 全部通过。
4. 提交信息建议格式：`feat: ...` / `fix: ...` / `docs: ...`。

## 提交 Pull Request

1. 推送分支并发起 PR，描述改动内容与动机。
2. 关联相关 issue（如有）。
3. 等待 CI 通过与 review。

## 行为准则

请保持尊重与友善。对事不对人。
