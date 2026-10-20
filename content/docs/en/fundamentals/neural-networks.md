---
title: Neural Networks
description: Neurons, activation functions, and backpropagation
---

# Neural Networks

Neural networks learn complex representations from data through layered non-linear transformations.

## Core Components

- **Neuron**: weighted sum passed through an activation function
- **Activation function**: ReLU, Sigmoid, Tanh
- **Loss function**: measures the gap between prediction and ground truth
- **Backpropagation**: computes gradients via the chain rule

## Forward Propagation

$$
y = \sigma(Wx + b)
$$

Where $W$ is the weight, $b$ is the bias, and $\sigma$ is the activation function.
