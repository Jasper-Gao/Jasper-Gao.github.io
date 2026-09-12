---
title: "Probability on a Finite or Countable Space"
date: "2026-09-12"
tag: "Math & CS"
summary: "Chapter One Notes of MA-UY 3514 Honors Theory of Probability"
---
# 4 有限或可数空间上的概率

在第 4 章中，我们假设 $\Omega$ 是有限集或可数集，并取 $\sigma$-代数 $\mathcal{A}=2^\Omega$（即 $\Omega$ 的所有子集组成的集合）。

**定理 4.1.** （a）有限或可数集合 $\Omega$ 上的一个概率，由它在各个原子上的取值唯一确定：

$$p\_\omega=P(\\{\omega\\}),\qquad \omega\in\Omega.$$

（b）设 $(p\_\omega)\_{\omega\in\Omega}$ 是一族由有限或可数集合 $\Omega$ 索引的实数。那么，存在唯一的概率 $P$，使得 $P(\\{\omega\\})=p\_\omega$，当且仅当

$$p\_\omega\geq 0,\qquad \sum\_{\omega\in\Omega}p\_\omega=1.$$

当 $\Omega$ 是可数无限集时，$\sum\_{\omega}p\_\omega$ 是无限多个项的和，而这些项事先并没有一个确定的排列顺序：虽然我们可以把 $\Omega$ 中的点逐个编号，但这种编号方式实际上是任意的。因此，我们面对的严格来说并不是一个普通的级数，而是一个“可求和族（summable family）”。在本章的附录中，我们会汇总一些关于可求和族的有用结论。

**证明。** 设 $A\in\mathcal{A}$，则 $A=\bigcup\_{\omega\in A}\\{\omega\\}$，这是有限个或可数个两两不相交的单点集的并。如果 $P$ 是一个概率，由可数可加性可得

$$P(A)=P\left(\bigcup\_{\omega\in A}\\{\omega\\}\right)=\sum\_{\omega\in A}P(\\{\omega\\})=\sum\_{\omega\in A}p\_\omega.$$

因此（a）成立。对于（b），注意如果 $P(\\{\omega\\})=p\_\omega$，那么根据定义 $p\_\omega\geq0$，并且

$$1=P(\Omega)=P\left(\bigcup\_{\omega\in\Omega}\\{\omega\\}\right)=\sum\_{\omega\in\Omega}P(\\{\omega\\})=\sum\_{\omega\in\Omega}p\_\omega.$$

反过来，如果 $p\_\omega$ 满足 $p\_\omega\geq0$ 且 $\sum\_{\omega\in\Omega}p\_\omega=1$，那么我们定义概率 $P$ 为

$$P(A)=\sum\_{\omega\in A}p\_\omega.$$

并约定“空和”等于 $0$。于是 $P(\emptyset)=0$ 且 $P(\Omega)=\sum\_{\omega\in\Omega}p\_\omega=1$。对于可数可加性：当 $\Omega$ 有限时，这是显然的；当 $\Omega$ 可数时，它来自如下结合性：若 $A\_i$ 两两不相交，则

$$\sum\_{i\in I}\sum\_{\omega\in A\_i}p\_\omega=\sum\_{\omega\in\bigcup\_{i\in I}A\_i}p\_\omega.$$

现在先假设 $\Omega$ 是有限集。任何一族总和为 $1$ 的非负数，都给出了 $\Omega$ 上的一个概率。在所有这些例子中，下面这一种尤其重要。

**定义 4.1.** 如果有限集合 $\Omega$ 上的概率 $P$ 满足 $p\_\omega=P(\\{\omega\\})$ 与 $\omega$ 无关，那么称 $P$ 为**均匀概率（uniform probability）**。

在这种情况下，立即有

$$P(A)=\frac{|A|}{|\Omega|}.$$

因此，计算任意事件 $A$ 的概率，就等价于计算 $A$ 中点的个数。在给定的有限集合 $\Omega$ 上，均匀概率有且只有一个。

下面给出两个在应用中非常重要的例子。

### a）超几何分布（Hypergeometric distribution）

一个罐子中有 $N$ 个白球和 $M$ 个黑球。我们进行 $n$ 次不放回抽取，因此 $n\leq N+M$。令 $X$ 表示抽到的白球数，而 $n-X$ 就是抽到的黑球数。我们希望求概率 $P(X=x)$，其中 $x$ 是任意一个固定整数。

由于是不放回抽取，我们也可以假设这 $n$ 个球是一次性抽出的。因此，很自然地把一个结果看作集合 $\\{1,2,\ldots,N+M\\}$ 的一个含有 $n$ 个元素的子集，其中 $N+M$ 个球可以假设被编号为 $1$ 到 $N+M$。也就是说，$\Omega$ 是所有这类含 $n$ 个点的子集组成的集合，而可能结果的总数为

$$|\Omega|=\binom{N+M}{n}=\frac{(N+M)!}{n!(N+M-n)!}.$$

回忆一下，对于整数 $p,q$ 且 $p\leq q$，

$$p!=1\cdot2\cdots(p-1)\cdot p,\qquad \binom{q}{p}=\frac{q!}{p!(q-p)!}.$$

$\binom{q}{p}$ 通常读作“$q$ choose $p$”，可以理解为：从 $q$ 个物品中选择 $p$ 个物品、不考虑选择顺序时，不同选择方式的数量。

接下来，自然可以认为所有可能结果都是等可能的，也就是说 $P$ 是 $\Omega$ 上的均匀概率。量 $X$ 是一个“随机变量（random variable）”，因为当结果 $\omega$ 已知时，我们也就知道抽出了多少个白球，即 $X(\omega)$。集合 $X^{-1}(\\{x\\})$，也记作 $\\{X=x\\}$，当 $x\leq N$ 且 $n-x\leq M$ 时包含 $\binom{N}{x}\binom{M}{n-x}$ 个点，否则它是空集。因此

$$P(X=x)=\begin{cases}\dfrac{\binom{N}{x}\binom{M}{n-x}}{\binom{N+M}{n}},&0\leq x\leq N,\ 0\leq n-x\leq M,\\0,&\text{其他情况}.\end{cases}$$

于是，当 $x$ 变化时，我们得到了 $X$ 的**分布（distribution）**，也称为 $X$ 的**概率律（law）**。这个分布称为**超几何分布**。它很自然地出现在民意调查中：假设有 $N+M$ 名选民，其中 $N$ 人认为“白”，$M$ 人认为“黑”，然后通过询问 $n$ 名选民的意见来进行民意调查（关于多于两种意见的推广，参见练习 4.3）。

### b）二项分布（Binomial distribution）

还是从上面的罐子中抽取 $n$ 个球，但每抽出一个球后都把它放回去，因此 $n$ 可以任意大。我们仍然希望求 $P(X=x)$，其中 $x$ 是 $0$ 到 $n$ 之间的整数。

这里自然的概率空间是笛卡尔积

$$\Omega=\prod\_{i=1}^{n}\Xi^i,$$

其中 $\Xi^i=\\{1,2,\ldots,N+M\\}$ 对所有 $i$ 都成立，即

$$\Omega=\\{1,2,\ldots,N+M\\}^n,$$

并再次采用均匀概率。因此，$\Omega$ 中元素的数量，也就是 $\Omega$ 的基数，为

$$|\Omega|=(N+M)^n.$$

简单计算可知，使 $X(\omega)=x$ 的所有 $\omega$ 组成的集合，其基数为

$$|\\{X=x\\}|=\binom{n}{x}N^xM^{n-x}.$$

因此

$$P(X=x)=\binom{n}{x}\left(\frac{N}{N+M}\right)^x\left(\frac{M}{N+M}\right)^{n-x},\qquad x=0,1,\ldots,n.$$

令 $p=\frac{N}{N+M}$，我们通常把上述结果写成

$$P(X=x)=\binom{n}{x}p^x(1-p)^{n-x},\qquad x=0,1,\ldots,n.$$

这个公式给出了大小为 $n$、参数为 $p$ 的**二项分布**。先验地说，$p$ 可以是 $[0,1]$ 中任意实数（在前面的例子中 $p$ 是有理数，但一般来说 $p$ 可以是 $0$ 到 $1$ 之间的任意实数）。这个在应用中无处不在的分布通常记作 $B(p,n)$。

### c）作为超几何分布极限的二项分布

在上面 a）的情形中，现在假设 $n$ 固定，而 $N$ 和 $M$ 趋于 $+\infty$，并且满足 $\frac{N}{N+M}\to p$（显然 $p\in[0,1]$）。很容易验证

$$P(X=x)\longrightarrow\binom{n}{x}p^x(1-p)^{n-x},\qquad x=0,1,\ldots,n.$$

也就是说，超几何分布“收敛”到二项分布 $B(p,n)$。（与上面的 b）比较，这个结果从直觉上也很明显：当 $N+M$ 很大时，抽取 $n$ 个球时放回与不放回之间并没有太大的区别。）

下面给出一些**可数状态空间**上的例子。

1. 参数 $\lambda>0$ 的**泊松分布（Poisson distribution）**，是在 $\mathbb{N}$ 上由下式定义的概率 $P$：

$$p\_n=e^{-\lambda}\frac{\lambda^n}{n!},\qquad n=0,1,2,3,\ldots.$$

2. 参数 $\alpha\in[0,1)$ 的**几何分布（Geometric distribution）**，是在 $\mathbb{N}$ 上由下式定义的概率：

$$p\_n=(1-\alpha)\alpha^n,\qquad n=0,1,2,3,\ldots.$$

注意，在二项模型中，如果 $n$ 很大，那么理论上 $\binom{n}{j}p^j(1-p)^{n-j}$ 的值是精确已知的，但在实际中它可能很难计算。（例如，它经常超出功能相当强大的手持计算器的计算能力。）不过，如果 $n$ 很大而 $p$ 很小——这种情况经常出现——那么可以使用下面介绍的另一种方法。

假设 $p$ 随 $n$ 变化，并把它记作 $p\_n$。进一步假设

$$\lim\_{n\to\infty}np\_n=\lambda.$$

可以证明（见练习 4.1）

$$\lim\_{n\to\infty}\binom{n}{j}p\_n^j(1-p\_n)^{n-j}=e^{-\lambda}\frac{\lambda^j}{j!}.$$

因此，我们可以很容易地用泊松分布来近似二项概率（在这种情形下）。

## 附录：关于级数的一些有用结论

在本附录中，我们主要在不给出证明的情况下，总结一些关于级数和可求和族的有用结论；这些结果主要用于研究可数状态空间上的概率。关于这些结果及其证明，可以在大多数微积分教材中找到（例如参见文献 [18] 的第 10 章）。

首先确定一些约定。在计算中，我们经常会遇到 $+\infty$（通常简写为 $\infty$）或 $-\infty$。为了使这些计算有意义，我们始终采用以下约定：

$$+\infty+\infty=+\infty,\qquad -\infty-\infty=-\infty,\qquad a+\infty=+\infty,\qquad a-\infty=-\infty\quad(a\in\mathbb{R}).$$

以及

$$0\times\infty=0,\qquad a\in(0,\infty]\Rightarrow a\times\infty=+\infty,\qquad a\in[-\infty,0)\Rightarrow a\times\infty=-\infty.$$

设 $u\_n$ 是一个数列，并考虑它的“部分和” $S\_n=u\_1+\cdots+u\_n$。

**S1：** 如果 $S\_n$ 收敛到一个有限极限 $S$，则称级数 $\sum\_n u\_n$ **收敛（convergent）**，并记作 $S=\sum\_n u\_n$，其中 $S$ 称为该级数的“和”。

**S2：** 如果级数 $\sum\_n|u\_n|$ 收敛，则称级数 $\sum\_n u\_n$ **绝对收敛（absolutely convergent）**。

**S3：** 如果对所有 $n$ 都有 $u\_n\geq0$，那么序列 $S\_n$ 单调递增，因此总是收敛到某个极限 $S\in[0,\infty]$。我们仍然写作 $S=\sum\_n u\_n$，尽管按照 S1 的定义，该级数当且仅当 $S<\infty$ 时才称为收敛。只要采用上面对涉及 $\infty$ 的加法运算所作的约定，各个被加项 $u\_n$ 甚至可以取 $[0,\infty]$ 中的值。

一般来说，一个级数是否收敛取决于各项排列的顺序。不过，在下面两种重要情况下，项的排列顺序不会产生影响，因此在这些情况下我们会使用“可求和族”而不是“级数”这一说法。这两种情况就是下面的 S4 和 S5。

**S4：** 当 $u\_n$ 都是实数且级数绝对收敛时，可以改变各项的排列顺序，而不会改变级数的绝对收敛性，也不会改变级数的和。

**S5：** 当对所有 $n$ 都有 $u\_n\in[0,\infty]$ 时，和 $\sum\_n u\_n$（它可以是有限值，也可以是无限值；参见上面的 S3）不会因为各项排列顺序的改变而改变。

**S6：** 当 $u\_n\in[0,\infty]$，或者级数绝对收敛时，具有如下**结合性（associativity）**。设 $(A\_i)\_{i\in I}$ 是 $\mathbb{N}^*$ 的一个划分，其中 $I=\\{1,2,\ldots,N\\}$（某个整数 $N$），或者 $I=\mathbb{N}^*$。对每个 $i\in I$，定义

$$v\_i=\sum\_{n\in A\_i}u\_n.$$

如果 $A\_i$ 是有限集，那么这是一个普通的有限和；否则 $v\_i$ 本身就是一个级数的和。那么有

$$\sum\_n u\_n=\sum\_{i\in I}v\_i.$$

当 $I=\mathbb{N}^*$ 时，右边的和同样是一个级数。