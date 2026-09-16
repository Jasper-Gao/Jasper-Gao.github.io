---
title: "Conditional Probability and Independence"
date: "2026-09-15"
tag: "Math & CS"
summary: "Chapter Three Notes of MA-UY 3514 Honors Theory of Probability"
---

# 3 条件概率与独立性

设 $A$ 和 $B$ 是定义在一个概率空间上的两个事件。令 $f\_n(A)$ 表示事件 $A$ 发生的次数除以 $n$。直观上，当 $n$ 越来越大时，$f\_n(A)$ 应该越来越接近 $P(A)$。非正式地说，我们应该有

$$
\\lim\_{n\\to\\infty}f\_n(A)=P(A).
$$

（见第 1 章）。

现在假设我们已经知道事件 $B$ 发生了。令 $P(A\\mid B)$ 表示“在已知 $B$ 已经发生的条件下，$A$ 发生的概率”。那么 $P(A\\mid B)$ 应该是多少呢？如果我们考察 $f\_n(A)$，那么再去统计 $A\\cap B^c$ 发生的情况就没有意义了，因为我们已经知道 $B$ 发生了。因此，如果我们只统计那些 $A$ 和 $B$ 同时发生的情况，其次数就是 $nf\_n(A\\cap B)$。现在，试验的总次数应该变成 $B$ 发生的次数（其他所有试验都因为 $B$ 没有发生而被舍弃）。因此，相关试验的次数就是 $nf\_n(B)$。于是我们应该有

$$
P(A\\mid B)\\approx\\frac{nf\_n(A\\cap B)}{nf\_n(B)}=\\frac{f\_n(A\\cap B)}{f\_n(B)},
$$

而“令 $n$ 趋于极限”便引出了稍后给出的定义 3.2。

接下来，设想事件 $A$ 和 $B$ 是“独立的”，其含义是：知道 $B$ 已经发生这一信息，完全不会改变我们对 $A$ 发生概率的判断。那么我们应该有 $P(A\\mid B)=P(A)$；这意味着

$$
\\frac{P(A\\cap B)}{P(B)}=P(A),\\qquad\\text{或者}\\qquad P(A\\cap B)=P(A)P(B).
$$

这引出了下面的定义 3.1；为了能够处理有限个事件组成的集合，这一定义稍微复杂一些。

**定义 3.1.** （a）两个事件 $A$ 和 $B$ 是**独立的（independent）**，如果

$$
P(A\\cap B)=P(A)P(B).
$$

（b）一个（可能无限的）事件族 $(A\_i)\_{i\\in I}$ 是一个**独立事件族（independent collection）**，如果对于 $I$ 的每一个有限子集 $J$，都有

$$
P\\left(\\bigcap\_{i\\in J}A\_i\\right)=\\prod\_{i\\in J}P(A\_i).
$$

事件族 $(A\_i)\_{i\\in I}$ 也常被称为**相互独立的（mutually independent）**。

**警告：** 如果事件 $(A\_i)\_{i \\in I}$ 是相互独立的，那么它们一定是两两独立的；但反过来并不成立。如果对于所有 $i,j$ 且 $i \\neq j$，$A\_i$ 和 $A\_j$ 都相互独立，那么称 $(A\_i)\_{i \\in I}$ 是**两两独立的（pairwise independent）**。

**定理 3.1.** 如果 $A$ 和 $B$ 独立，那么 $A$ 与 $B^c$、$A^c$ 与 $B$、以及 $A^c$ 与 $B^c$ 也都独立。

**证明。** 对于 $A$ 和 $B^c$，

$$
\\begin{aligned}
P(A\\cap B^c)
&=P(A)-P(A\\cap B) \\\\
&=P(A)-P(A)P(B) \\\\
&=P(A)(1-P(B)) \\\\
&=P(A)P(B^c).
\\end{aligned}
$$

其他结论的证明与此类似。

**例子：**

1. 抛一枚硬币 3 次。如果 $A\_i$ 是一个只取决于第 $i$ 次抛掷结果的事件，那么通常将模型 $(A\_i)\_{1\\leq i\\leq3}$ 视为相互独立的。

2. 从一副 52 张的扑克牌中随机抽取一张。令 $A=\\{\\text{抽到的牌是红桃}\\}$，$B=\\{\\text{抽到的牌是 Queen}\\}$。这个实验的一个自然模型是规定抽到任意一张牌的概率都是 $\\frac{1}{52}$。根据可加性，

$$
\\begin{aligned}
P(A)
&=\\frac{13}{52},\\qquad P(B) \\\\
&=\\frac{4}{52},\\qquad P(A\\cap B) \\\\
&=\\frac{1}{52},
\\end{aligned}
$$

   因此 $A$ 和 $B$ 是独立的。

3. 令 $\\Omega=\\{1,2,3,4\\}$，并令 $\\mathcal{A}=2^\\Omega$。设 $P(i)=\\frac14$，其中 $i=1,2,3,4$。令 $A=\\{1,2\\}$，$B=\\{1,3\\}$，$C=\\{2,3\\}$。那么 $A,B,C$ 是两两独立的，但它们并不是相互独立的。

**定义 3.2.** 设 $A,B$ 是事件，且 $P(B)>0$。在给定 $B$ 的条件下 $A$ 的 **条件概率（conditional probability）** 定义为

$$
P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}.
$$

**定理 3.2.** 假设 $P(B)>0$。

（a）$A$ 和 $B$ 独立，当且仅当

$$
P(A\\mid B)=P(A).
$$

（b）映射 $A\\mapsto P(A\\mid B)$，从 $\\mathcal{A}$ 映射到 $[0,1]$，定义了 $\\mathcal{A}$ 上的一个新的概率测度，称为“**给定 $B$ 的条件概率测度（conditional probability measure given $B$）**”。

**证明。** 在定理之前的讨论中，我们已经证明了（a）。对于（b），固定 $B$，定义 $Q(A)=P(A\\mid B)$。我们需要证明 $Q$ 满足定义 2.3 中的条件（1）和（2）。首先，

$$
\\begin{aligned}
Q(\\Omega)
&=P(\\Omega\\mid B) \\\\
&=\\frac{P(\\Omega\\cap B)}{P(B)} \\\\
&=\\frac{P(B)}{P(B)} \\\\
&=1.
\\end{aligned}
$$

因此 $Q$ 满足条件（1）。对于条件（2），注意如果 $(A\_n)\_{n\\geq1}$ 是 $\\mathcal{A}$ 中一列两两不相交的事件，那么 $(A\_n\\cap B)\_{n\\geq1}$ 同样也是两两不相交的。因此

$$
\\begin{aligned}
Q\\left(\\bigcup\_{n=1}^{\\infty}A\_n\\right)
&=P\\left(\\left.\\bigcup\_{n=1}^{\\infty}A\_n\\right|B\\right) \\\\
&=\\frac{P\\left(\\left(\\bigcup\_{n=1}^{\\infty}A\_n\\right)\\cap B\\right)}{P(B)} \\\\
&=\\frac{P\\left(\\bigcup\_{n=1}^{\\infty}(A\_n\\cap B)\\right)}{P(B)}.
\\end{aligned}
$$

并且，由于序列 $(A\_n\\cap B)\_{n\\geq1}$ 两两不相交，

$$
\\begin{aligned}
Q\\left(\\bigcup\_{n=1}^{\\infty}A\_n\\right)
&=\\sum\_{n=1}^{\\infty}\\frac{P(A\_n\\cap B)}{P(B)} \\\\
&=\\sum\_{n=1}^{\\infty}P(A\_n\\mid B) \\\\
&=\\sum\_{n=1}^{\\infty}Q(A\_n).
\\end{aligned}
$$

下面的定理将有限个事件的独立性与条件概率联系起来。

**定理 3.3.** 如果 $A\_1,\\ldots,A\_n\\in\\mathcal{A}$，并且

$$
P(A\_1\\cap\\cdots\\cap A\_{n-1})>0,
$$

那么

$$
\\begin{aligned}
P(A\_1\\cap\\cdots\\cap A\_n)
&=P(A\_1)P(A\_2\\mid A\_1) \\\\
&\\quad\\cdot P(A\_3\\mid A\_1\\cap A\_2)\\cdots \\\\
&\\quad\\cdot P(A\_n\\mid A\_1\\cap\\cdots\\cap A\_{n-1}).
\\end{aligned}
$$

**证明。** 我们使用数学归纳法。当 $n=2$ 时，该定理就是定义 3.2。假设该定理对于 $n-1$ 个事件成立。令

$$
B=A\_1\\cap\\cdots\\cap A\_{n-1}.
$$

根据定义 3.2，

$$
P(B\\cap A\_n)=P(A\_n\\mid B)P(B);
$$

接下来利用归纳假设中的 $P(B)$：

$$
\\begin{aligned}
P(B)&=P(A\_1)P(A\_2\\mid A\_1)\\cdots \\\\
&\\quad\\cdot P(A\_{n-1}\\mid A\_1\\cap\\cdots\\cap A\_{n-2}),
\\end{aligned}
$$

于是便得到了结论。

如果一个事件族 $(E\_n)$ 满足：对每个 $n$，$E\_n\\in\\mathcal{A}$；这些事件两两不相交；对每个 $n$，都有 $P(E\_n)>0$；并且

$$
\\bigcup\_nE\_n=\\Omega,
$$

那么称 $(E\_n)$ 是 $\\Omega$ 的一个**划分（partition）**。

**定理 3.4（划分公式，Partition Equation）.** 设 $(E\_n)\_{n\\geq1}$ 是 $\\Omega$ 的一个有限或可数划分。那么对于任意 $A\\in\\mathcal{A}$，

$$
P(A)=\\sum\_nP(A\\mid E\_n)P(E\_n).
$$

**证明。** 注意到

$$
\\begin{aligned}
A
&=A\\cap\\Omega \\\\
&=A\\cap\\left(\\bigcup\_nE\_n\\right) \\\\
&=\\bigcup\_n(A\\cap E\_n).
\\end{aligned}
$$

由于 $E\_n$ 两两不相交，因此 $(A\\cap E\_n)\_{n\\geq1}$ 也两两不相交，所以

$$
\\begin{aligned}
P(A)
&=P\\left(\\bigcup\_n(A\\cap E\_n)\\right) \\\\
&=\\sum\_nP(A\\cap E\_n) \\\\
&=\\sum\_nP(A\\mid E\_n)P(E\_n).
\\end{aligned}
$$

**定理 3.5（贝叶斯定理，Bayes' Theorem）.** 设 $(E\_n)$ 是 $\\Omega$ 的一个有限或可数划分，并假设 $P(A)>0$。那么

$$
P(E\_n\\mid A)=\\frac{P(A\\mid E\_n)P(E\_n)}{\\sum\_mP(A\\mid E\_m)P(E\_m)}.
$$

**证明。** 根据定理 3.4，分母满足

$$
\\sum\_mP(A\\mid E\_m)P(E\_m)=P(A).
$$

因此该公式变为

$$
\\frac{P(A\\mid E\_n)P(E\_n)}{P(A)}=\\frac{P(A\\cap E\_n)}{P(A)}=P(E\_n\\mid A).
$$

贝叶斯定理本身相当简单，但它在概率论和统计学中都有非常深远的影响。例如，可参见练习 3.6。
