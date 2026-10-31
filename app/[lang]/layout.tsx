import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default async function Layout(props: LayoutProps<"/[lang]">) {
  return <HomeLayout {...baseOptions()}>{props.children}</HomeLayout>;
}
