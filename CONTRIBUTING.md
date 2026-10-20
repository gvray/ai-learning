# 贡献指南

感谢你对 AI 学习项目的兴趣！欢迎贡献文档、代码或想法。

## 环境准备

需要 Node.js 20+ 与 pnpm 10+。

```bash
git clone <repo-url>
cd ai-learning
pnpm install
pnpm dev
```

打开 http://localhost:3000 查看效果。

## 如何贡献

### 修正或新增文档

1. 在 `content/docs/` 下新建 `.md`（纯文字）或 `.mdx`（含交互组件）文件。
2. 文件头使用 frontmatter 声明标题与描述：

   ```markdown
   ---
   title: 标题
   description: 一句话描述
   ---
   ```

3. 用所在目录的 `meta.json` 的 `pages` 数组控制侧边栏顺序。
4. 提交前运行 `pnpm lint` 与 `pnpm types:check` 确保通过。

### 贡献代码

1. 从 `main` 拉取功能分支：`git checkout -b feat/your-feature`。
2. 遵循现有代码风格（Biome 自动格式化）。
3. 保证 `pnpm lint`、`pnpm types:check`、`pnpm build` 全部通过。
4. 提交信息使用清晰描述，建议格式：`feat: ...` / `fix: ...` / `docs: ...`。

## 提交 Pull Request

1. 推送分支并发起 PR，描述改动内容与动机。
2. 关联相关 issue（如有）。
3. 等待 CI 通过与 review。

## 行为准则

请保持尊重与友善。对事不对人。
