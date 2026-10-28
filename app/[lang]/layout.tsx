import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default async function Layout(props: LayoutProps<"/[lang]">) {
  const params = await props.params;
  return (
    <HomeLayout {...baseOptions(params.lang)}>{props.children}</HomeLayout>
  );
}
