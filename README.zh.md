<p align="center">
  <img src="public/logo.svg" width="120" alt="AI 学习" />
</p>

# AI 学习

从原理到部署，系统掌握人工智能的交互式学习站。

[![CI](https://github.com/gvray/ai-learning/actions/workflows/ci.yml/badge.svg)](https://github.com/gvray/ai-learning/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[English](README.md) | **简体中文**

## 概述

一条从数学基础到模型服务的学习路径——理解原理、构建应用、运行模型。中英双语，穿插可交互的演示与训练组件，每条主线以一个综合项目收束。

**在线文档**：<https://gvray.github.io/ai-learning>

## 三条学习主线

### 主线 A · 理解 AI 如何工作

理解数据如何表示、模型如何学习、参数如何更新，以及大语言模型如何生成内容。

- **Python for ML** — 环境与工具链、数据处理与可视化
- **数学基础** — 线性代数、微积分、概率统计与优化
- **机器学习** — 学习范式、特征工程、模型族与评估方法
- **深度学习** — 神经网络、反向传播与训练过程
- **Transformer 与 LLM** — 分词、注意力、预训练、微调与对齐

### 主线 B · 构建 AI 应用

将模型能力转化为可靠、可评测、可维护的应用系统。

- **LLM 应用开发** — API 调用、提示工程、工具调用与生产可靠性
- **RAG 检索增强生成** — 文档处理、检索、重排、生成与评估
- **Agent 与 MCP** — 推理循环、工具使用、状态管理与多智能体协作

### 主线 C · 理解并运行模型

理解模型如何在硬件约束下运行，完成模型服务部署、性能分析与优化。

- **部署与推理优化** — 本地模型、模型服务、量化、推理引擎与可观测性

完整文章清单见 [大纲源文件](content/docs/zh/outline.mdx)。

## 综合实践项目

三条主线各配一个阶段验收项目：

- **机器学习预测项目**（主线 A）— 数据清洗、特征工程、基线模型、评估与推理
- **RAG 文档问答项目**（主线 B）— 文档解析、检索、重排、引用与评估
- **微调与推理服务项目**（主线 C）— LoRA 微调、部署、性能与吞吐量分析

## 参与

这是一个文档优先的项目。想贡献文档或代码，见 [贡献指南](CONTRIBUTING.md)。

## 许可证

[MIT](LICENSE) © Gavin Ray
