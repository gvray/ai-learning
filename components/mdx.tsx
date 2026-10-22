import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import LinearRegressionTrainer from "@/components/interactive/linear-regression-trainer";
import LearningMap from "@/components/learning-map";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    LinearRegressionTrainer,
    LearningMap,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
