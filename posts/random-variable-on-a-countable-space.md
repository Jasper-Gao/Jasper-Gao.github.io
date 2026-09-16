---
title: "Random Variable on a Countable Space"
date: "2026-09-16"
tag: "Math & CS"
summary: "Chapter Five Notes of MA-UY 3514 Honors Theory of Probability"
---

# 第五章 可数空间上的随机变量

本章再次假设 $\Omega$ 是可数集，并且 $\mathcal A=2^\Omega$。在这种情况下，随机变量 $X$ 被定义为从 $\Omega$ 到某个集合 $T$ 的函数。随机变量表示一个未知量（所以称为“变量”）：它的变化不是代数关系中的变量那样变化（例如 $x^2-9=0$），而是随着随机事件的结果而变化。在随机事件发生之前，我们知道 $X$ 可能取哪些值，但只有当随机事件发生后，才知道它实际取哪一个值。这与代数中的情形类似：我们事先知道 $x$ 可以取任意实数，但只有在解出方程 $x^2-9=0$ 之后，才知道它会取哪个（或哪些）值。

请注意，即使状态空间（或值域空间）$T$ 不是可数的，$\Omega$ 在 $X$ 下的像 $T'$，也就是 $T$ 中所有满足“存在 $\omega\in\Omega$，使得 $X(\omega)=i$”的点 $i$ 所组成的集合，也一定是有限集或可数无限集。

于是，可以在 $X$ 的值域空间 $T'$ 上定义 $X$ 的分布（也称为 $X$ 的律）：

$$
P^X(A)=P(\{\omega:X(\omega)\in A\})=P(X^{-1}(A))=P(X\in A).
$$

显然，该公式在 $T'$ 上定义了一个概率测度，其 $\sigma$-代数是 $T'$ 的所有子集构成的 $2^{T'}$。由于 $T'$ 至多可数，这个概率完全由下列数值决定：

$$
p_j^X=P(X=j)=\sum_{\{\omega:X(\omega)=j\}}p_\omega.
$$

有时，族 $(p_j^X:j\in T')$ 本身也称为 $X$ 的分布或律。当然，

$$
P^X(A)=\sum_{j\in A}p_j^X.
$$

如果 $P^X$ 属于某个已知分布，例如泊松分布，我们就称 $X$ 为泊松随机变量。

## 定义 5.1

设 $X$ 是可数空间 $\Omega$ 上的实值随机变量。$X$ 的期望记为 $E\{X\}$，定义为

$$
E\{X\}=\sum_\omega X(\omega)p_\omega,
$$

前提是这个和有意义。当 $\Omega$ 有限时总是如此；当 $\Omega$ 可数时，如果该级数绝对收敛，或者 $X$ 始终满足 $X\geq 0$，它也有意义。在后一种情况下，上述和以及 $E\{X\}$ 都可能取值 $+\infty$。

这个定义可以作如下解释：将一个试验重复 $n$ 次，记录与这 $n$ 次结果对应的 $X$ 值 $X_1,X_2,\ldots,X_n$，则经验均值

$$
\frac{1}{n}(X_1+\cdots+X_n)
$$

等于

$$
\sum_{\omega\in\Omega}X(\omega)f_n(\{\omega\}),
$$

其中 $f_n(\{\omega\})$ 表示单点集 $\{\omega\}$ 出现的频率。由于 $f_n(\{\omega\})$“收敛”到 $P(\{\omega\})$，所以至少在 $\Omega$ 有限时，经验均值会收敛到上面定义的期望 $E\{X\}$。

定义 $L^1$ 为概率空间 $(\Omega,\mathcal A,P)$ 上所有期望有限的实值随机变量所构成的空间。

下面这些事实很容易得到：

1. $L^1$ 是向量空间，期望算子 $E$ 是线性的。
2. 期望算子 $E$ 是正的：若 $X\in L^1$ 且 $X\geq 0$，则 $E\{X\}\geq 0$。更一般地，若 $X,Y\in L^1$ 且 $X\leq Y$，则 $E\{X\}\leq E\{Y\}$。
3. $L^1$ 包含所有有界随机变量。若 $X\equiv a$，则 $E\{X\}=a$。
4. 若 $X\in L^1$，则其期望只依赖于它的分布。若 $T'$ 是 $X$ 的值域，则

$$
E\{X\}=\sum_{j\in T'}jP(X=j). \tag{5.1}
$$

5. 若 $X=\mathbf 1_A$ 是事件 $A$ 的示性函数，则 $E\{X\}=P(A)$。

注意，如果 $\sum_\omega (X(\omega))^2p_\omega$ 绝对收敛，那么

$$
\begin{aligned}
\sum_\omega |X(\omega)|p_\omega
&\leq \sum_{|X(\omega)|<1}X(\omega)p_\omega
+\sum_{|X(\omega)|\geq 1}X(\omega)p_\omega\\
&\leq \sum_\omega p_\omega
+\sum_\omega (X(\omega))^2p_\omega
<\infty,
\end{aligned}
$$

因此 $X$ 也属于 $L^1$。

下面的定理给出了一族与期望有关的重要不等式。

## 定理 5.1

设 $h:\mathbb R\to[0,\infty)$ 是非负函数，$X$ 是实值随机变量。则对任意 $a>0$，

$$
P\{\omega:h(X(\omega))\geq a\}\leq\frac{E\{h(X)\}}{a}.
$$

**证明：** 由于 $X$ 是随机变量，$Y=h(X)$ 也是随机变量。令

$$
A=Y^{-1}([a,\infty))=\{\omega:h(X(\omega))\geq a\}=\{h(X)\geq a\}.
$$

于是 $h(X)\geq a\mathbf 1_A$，从而

$$
E\{h(X)\}\geq E\{a\mathbf 1_A\}=aE\{\mathbf 1_A\}=aP(A),
$$

结论成立。$\square$

## 推论 5.1（马尔可夫不等式）

$$
P\{|X|\geq a\}\leq\frac{E\{|X|\}}{a}.
$$

**证明：** 在定理 5.1 中取 $h(x)=|x|$ 即得。$\square$

## 定义 5.2

设 $X$ 是实值随机变量，并且 $X^2\in L^1$。$X$ 的方差定义为

$$
\sigma^2=\sigma_X^2\equiv E\{(X-E(X))^2\}.
$$

$X$ 的标准差 $\sigma_X$ 是方差的非负平方根。标准差的主要用途，是用正确且有意义的单位报告统计量。

单位所带来的一个典型问题如下：令 $X$ 表示随机选取的一个家庭中的孩子数，那么方差的单位将是“孩子数的平方”，而标准差 $\sigma_X$ 的单位只是“孩子数”。

如果 $E\{X\}$ 表示 $X$ 的期望值或平均值（通常称为均值），那么 $E\{|X-E(X)|\}=E\{|X-\mu|\}$，其中 $\mu=E\{X\}$，表示与均值之差的平均大小，是衡量 $X$ 的取值有多“分散”的一个指标；也就是说，它衡量各取值相对于均值的偏离。方差则是到均值距离的平方的平均值。平方会缩小较小偏差的影响，并放大较大偏差的影响。不过，与 $E\{|X-\mu|\}$ 相比，方差通常更容易计算，而且往往有更简单的表达式。因此，方差也可以视为随机变量 $X$ 变异程度的一种度量。

## 推论 5.2（切比雪夫不等式）

若 $X^2\in L^1$，则对 $a>0$ 有：

$$
P\{|X|\geq a\}\leq\frac{E\{X^2\}}{a^2}, \tag{a}
$$

以及

$$
P\{|X-E\{X\}|\geq a\}\leq\frac{\sigma_X^2}{a^2}. \tag{b}
$$

**证明：** 这两个不等式都称为切比雪夫不等式。对于 (a)，取 $h(x)=x^2$，由定理 5.1，

$$
P\{|X|\geq a\}=P\{h(X)\geq a^2\}\leq\frac{E\{X^2\}}{a^2}.
$$

对于 (b)，令 $Y=|X-E\{X\}|$，则

$$
\begin{aligned}
P\{|X-E\{X\}|\geq a\}
&=P\{Y\geq a\}\\
&=P\{Y^2\geq a^2\}\\
&\leq\frac{E\{Y^2\}}{a^2}
=\frac{\sigma_X^2}{a^2}.
\end{aligned}
$$

$\square$

推论 5.2 也称为比奈梅–切比雪夫不等式。

# 例子

## 1. 泊松分布

设 $X$ 服从参数为 $\lambda$ 的泊松分布。此时 $X:\Omega\to\mathbb N$，其中 $\mathbb N$ 是自然数集，并且

$$
P(X\in A)=\sum_{j\in A}P(X=j)=\sum_{j\in A}\frac{\lambda^j}{j!}e^{-\lambda}.
$$

$X$ 的期望为

$$
\begin{aligned}
E\{X\}
&=\sum_{j=0}^{\infty}jP(X=j)
=\sum_{j=0}^{\infty}j\frac{\lambda^j}{j!}e^{-\lambda}\\
&=\lambda\sum_{j=1}^{\infty}\frac{\lambda^{j-1}}{(j-1)!}e^{-\lambda}
=\lambda e^\lambda e^{-\lambda}
=\lambda.
\end{aligned}
$$

## 2. 伯努利分布

若 $X$ 只取 0 和 1 两个值，则称 $X$ 服从伯努利分布。$X$ 对应于一个只有两种结果的试验，这两种结果通常称为“成功”和“失败”。一般把 $\{X=1\}$ 对应为“成功”。习惯上记

$$
P(\{X=1\})=p,\qquad P(\{X=0\})=q=1-p.
$$

于是

$$
E\{X\}=1P(X=1)+0P(X=0)=1\cdot p+0\cdot q=p.
$$

## 3. 二项分布

若 $P^X$ 是二项概率，则称 $X$ 服从二项分布。也就是说，对给定且固定的 $n$，$X$ 可以取 $\{0,1,2,\ldots,n\}$ 中的值，并且

$$
P(\{X=k\})=\binom{n}{k}p^k(1-p)^{n-k},
$$

其中 $0\leq p\leq 1$ 固定。

假设我们独立地进行 $n$ 次成功/失败试验。令

$$
Y_i=
\begin{cases}
1, & \text{第 }i\text{ 次试验成功},\\
0, & \text{第 }i\text{ 次试验失败}.
\end{cases}
$$

那么 $X=Y_1+\cdots+Y_n$ 服从二项分布（见第四章）。也就是说，二项随机变量是 $n$ 个伯努利随机变量之和。因此

$$E[X]=E\left[\sum_{i=1}^{n}Y_i\right]=\sum_{i=1}^{n}E[Y_i]=\sum_{i=1}^{n}p=np.$$

也可以直接利用定义、通过组合计算 $E\{X\}$：

$$
E\{X\}=\sum_{i=0}^niP(X=i)=\sum_{i=1}^ni\binom{n}{i}p^i(1-p)^{n-i},
$$

不过这样计算会很麻烦。

## 4. 几何分布

假设我们不断独立重复伯努利试验。与预先选定固定试验次数 $n$ 不同，现在持续试验，直到取得给定次数的成功。令 $X$ 表示第一次成功出现之前的失败次数，则 $X$ 服从参数为 $1-p$ 的几何分布：

$$
P(X=k)=(1-p)^kp,\qquad k=0,1,2,3,\ldots,
$$

其中 $p$ 是成功概率。于是

$$
\begin{aligned}
E\{X\}
&=\sum_{k=0}^{\infty}kP(X=k)
=\sum_{k=0}^{\infty}kp(1-p)^k\\
&=p(1-p)\frac{1}{p^2}
=\frac{1-p}{p}.
\end{aligned}
$$

## 5. 帕斯卡分布（负二项分布）

在与例 4 相同的框架中，如果持续进行独立伯努利试验，直到第 $r$ 次成功出现，就得到帕斯卡分布，也称为负二项分布。如果

$$
P(X=j)=\binom{j+r-1}{r-1}p^r(1-p)^j,\qquad j=0,1,2,\ldots,
$$

则称 $X$ 服从参数为 $r$ 和 $p$ 的负二项分布。$X$ 表示观察到 $r$ 次成功之前所需观察到的失败次数。如果关心所需的总试验次数，记相应随机变量为 $Y$，则

$$
Y=X+r.
$$

注意，若 $X$ 服从负二项分布，则

$$
X=\sum_{i=1}^rZ_i,
$$

其中 $Z_i$ 是参数为 $1-p$ 的几何随机变量。因此

$$
E\{X\}=\sum_{i=1}^rE\{Z_i\}=\frac{r(1-p)}{p}.
$$

## 6. 帕累托分布（泽塔分布）

社会科学中常见的一种分布是帕累托分布，也称为泽塔分布。此时 $X$ 在 $\mathbb N^*$ 中取值，并且

$$
P(X=j)=c\frac{1}{j^{\alpha+1}},\qquad j=1,2,3,\ldots,
$$

其中参数 $\alpha>0$ 固定。常数 $c$ 满足

$$
c\sum_{j=1}^{\infty}\frac{1}{j^{\alpha+1}}=1.
$$

函数

$$
\zeta(s)=\sum_{k=1}^{\infty}\frac{1}{k^s},\qquad s>1,
$$

称为黎曼 $\zeta$ 函数，其数值已有大量表格。因此

$$
c=\frac{1}{\zeta(\alpha+1)},
$$

并且

$$
P(X=j)=\frac{1}{\zeta(\alpha+1)}\frac{1}{j^{\alpha+1}}.
$$

利用黎曼 $\zeta$ 函数，很容易算出均值：

$$
\begin{aligned}
E\{X\}
&=\sum_{j=1}^{\infty}jP(X=j)
=\frac{1}{\zeta(\alpha+1)}
\sum_{j=1}^{\infty}\frac{j}{j^{\alpha+1}}\\
&=\frac{1}{\zeta(\alpha+1)}
\sum_{j=1}^{\infty}\frac{1}{j^\alpha}
=\frac{\zeta(\alpha)}{\zeta(\alpha+1)}.
\end{aligned}
$$

## 7. 离散均匀分布

如果随机变量 $X$ 的状态空间 $E$ 只有有限个点，设为 $n$ 个，并且每个点出现的可能性相同，则称 $X$ 服从均匀分布。当

$$
P(X=j)=\frac{1}{n},\qquad j=1,2,\ldots,n,
$$

称 $X$ 服从参数为 $n$ 的离散均匀分布。利用

$$
\sum_{i=1}^ni=\frac{n(n+1)}{2},
$$

可得

$$
\begin{aligned}
E\{X\}
&=\sum_{j=1}^njP(X=j)
=\sum_{j=1}^nj\frac{1}{n}\\
&=\frac{1}{n}\sum_{j=1}^nj
=\frac{n(n+1)}{2n}
=\frac{n+1}{2}.
\end{aligned}
$$