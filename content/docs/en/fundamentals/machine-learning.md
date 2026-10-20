---
title: Machine Learning
description: Supervised, unsupervised, and reinforcement learning overview
---

# Machine Learning

Machine learning lets computers learn patterns from data rather than through explicit programming.

## Three Paradigms

| Paradigm | Data | Typical Tasks |
| --- | --- | --- |
| Supervised | Labeled | Classification, regression |
| Unsupervised | Unlabeled | Clustering, dimensionality reduction |
| Reinforcement | Environment feedback | Decision, control |

## Example: Linear Regression

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

Next: dive into [neural networks](/en/docs/fundamentals/neural-networks) for deep learning basics.
