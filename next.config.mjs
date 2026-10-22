import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: {
    // Turbopack CSS parser 误报 ::highlight(fd-search)（标准伪元素、上游 bug）；error-recovery 后规则未丢失、功能正常，修复后移除。
    ignoreIssue: [
      {
        path: "**/app/global.css",
        title: /Parsing CSS source code failed/,
        description: /'highlight' is not recognized as a valid pseudo-element/,
      },
    ],
  },
};

export default withMDX(config);
