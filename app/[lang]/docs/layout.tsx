import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default async function Layout(props: LayoutProps<"/[lang]/docs">) {
  const params = await props.params;
  return (
    <DocsLayout tree={source.getPageTree(params.lang)} {...baseOptions()}>
      {props.children}
    </DocsLayout>
  );
}
