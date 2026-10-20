---
title: 机器学习
description: 监督学习、无监督学习与强化学习概述
---

# 机器学习

机器学习让计算机从数据中学习规律，而非显式编程。

## 三大范式

| 范式 | 数据 | 典型任务 |
| --- | --- | --- |
| 监督学习 | 带标签 | 分类、回归 |
| 无监督学习 | 无标签 | 聚类、降维 |
| 强化学习 | 环境反馈 | 决策、控制 |

## 示例：线性回归

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

下一步：进入[神经网络](/docs/fundamentals/neural-networks)了解深度学习基础。
