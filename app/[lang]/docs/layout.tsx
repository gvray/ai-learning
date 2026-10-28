import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default async function Layout(props: LayoutProps<"/[lang]/docs">) {
  const params = await props.params;
  return (
    <DocsLayout
      tree={source.getPageTree(params.lang)}
      {...baseOptions(params.lang)}
      // 外层 HomeLayout 顶部已显示品牌,侧边栏不再重复
      nav={{ title: null }}
    >
      {props.children}
    </DocsLayout>
  );
}
