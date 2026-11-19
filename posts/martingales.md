---
title: "Martingales"
date: "2026-11-19"
tag: "Mathematics"
compact: true
math: true
summary: "Chapter Twenty-Four Notes of MA-UY 3514 Honors Theory of Probability"
---

## 24 鞅

先回顾强大数定律（定理 20.1）。若 $(X_n)_{n\ge1}$ 独立同分布，$E\{X_n\}=\mu$，且方差有限，记 $S_n=\sum_{j=1}^n X_j$，则 $S_n/n\to\mu$ 几乎必然成立。由于各 $X_n$ 独立，由尾事件零一律（定理 10.6），这个极限必然几乎必然为常数。我们也希望研究能够收敛到一般随机变量的序列。

将强大数定律改写为 $(S_n-n\mu)/n\to0$ 几乎必然成立。令 $\mathcal F_n=\sigma(S_k:0\le k\le n)$，其中 $S_0=0$，则中心化后的和满足

$$
\begin{gathered}
E\{S_{n+1}-(n+1)\mu\mid\mathcal F_n\}\\
=S_n-n\mu.
\end{gathered}
\tag{24.1}
$$

例 24.1 将验证这一点。性质（24.1）引出了在放宽独立性假设后研究收敛的一种方法。

以下固定概率空间 $(\Omega,\mathcal F,P)$，以及一列递增的 $\sigma$-代数 $(\mathcal F_n)_{n\ge0}$，满足 $\mathcal F_n\subseteq\mathcal F_{n+1}\subseteq\mathcal F$。这列 $\sigma$-代数称为**滤过**，表示随时间积累的信息。

### 定义 24.1（鞅）

若随机变量序列 $(X_n)_{n\ge0}$ 满足下列条件，就称其为**鞅**，或关于 $(\mathcal F_n)$ 的鞅。

1. 对每个 $n$，都有 $E\{|X_n|\}<\infty$。
2. 对每个 $n$，$X_n$ 都是 $\mathcal F_n$-可测的。
3. 对每个 $m\le n$，都有 $E\{X_n\mid\mathcal F_m\}=X_m$ 几乎必然成立。

条件 3 已经保证 $X_m$ 几乎必然等于一个 $\mathcal F_m$-可测随机变量，所以它“几乎”蕴含条件 2。条件 2 则明确要求所选取的 $X_m$ 本身可测。

### 例 24.1（独立零均值随机变量的部分和）

设 $(X_n)_{n\ge1}$ 相互独立，且对每个 $n$ 都有 $E\{|X_n|\}<\infty$、$E\{X_n\}=0$。对 $n\ge1$，令 $\mathcal F_n=\sigma(X_k:1\le k\le n)$、$S_n=\sum_{k=1}^n X_k$，并令 $\mathcal F_0=\{\varnothing,\Omega\}$、$S_0=0$。则 $(S_n)_{n\ge0}$ 是关于 $(\mathcal F_n)$ 的鞅。事实上，$S_n$ 可积且 $\mathcal F_n$-可测，并且对 $m\le n$，

$$
\begin{aligned}
E\{S_n\mid\mathcal F_m\}
&=E\{S_m+(S_n-S_m)\mid\mathcal F_m\}\\
&=S_m+E\{S_n-S_m\mid\mathcal F_m\}\\
&=S_m+\sum_{k=m+1}^n E\{X_k\mid\mathcal F_m\}\\
&=S_m+\sum_{k=m+1}^n E\{X_k\}=S_m.
\end{aligned}
$$

最后一步用到 $X_k$ 与 $\mathcal F_m$ 独立，以及 $E\{X_k\}=0$。如果各 $X_n$ 的共同均值为 $\mu\ne0$，对 $X_n-\mu$ 应用上述论证，就得到 $(S_n-n\mu)_{n\ge0}$ 是鞅。

### 例 24.2（条件期望构造的鞅）

设 $Y$ 是 $\mathcal F$-可测的可积随机变量，定义 $X_n=E\{Y\mid\mathcal F_n\}$。则 $X_n$ 是 $\mathcal F_n$-可测的，且 $E\{|X_n|\}\le E\{|Y|\}<\infty$。对 $m\le n$，由条件期望的塔式性质，

$$
\begin{aligned}
E\{X_n\mid\mathcal F_m\}
&=E\{E\{Y\mid\mathcal F_n\}\mid\mathcal F_m\}\\
&=E\{Y\mid\mathcal F_m\}=X_m.
\end{aligned}
$$

因此 $(X_n)$ 是鞅，参见习题 23.1 和 23.2。

### 定义 24.2（闭鞅）

对于鞅 $X=(X_n)_{n\ge0}$，若存在可积随机变量 $Y$，使对每个 $n$ 都有 $X_n=E\{Y\mid\mathcal F_n\}$ 几乎必然成立，就称 $X$ **由 $Y$ 闭合**。

例 24.2 表明，任意可积的 $\mathcal F$-可测随机变量 $Y$ 都能通过 $X_n=E\{Y\mid\mathcal F_n\}$ 构造出一个闭鞅。

### 定理 24.1（鞅的期望恒定）

若 $(X_n)_{n\ge0}$ 是鞅，则 $E\{X_n\}=E\{X_0\}$ 对所有 $n\ge0$ 都成立。

**证明。** 由条件期望的全期望公式和鞅性质，

$$
E\{X_n\}=E\{E\{X_n\mid\mathcal F_0\}\}=E\{X_0\}.
$$

$\square$

期望恒定不足以推出鞅性质。不过，利用停时可以得到一个部分逆命题，见定理 24.7。

### 定义 24.3（停时）

取值于 $\{0,1,2,\ldots\}\cup\{+\infty\}$ 的随机变量 $T$ 称为关于 $(\mathcal F_n)$ 的**停时**，如果对所有 $n\ge0$ 都有 $\{T\le n\}\in\mathcal F_n$。

任意非负整数常数和恒等于 $+\infty$ 的随机变量都是停时。停时可以描述某个事件首次发生的时刻，若事件始终没有发生，则约定该时刻为 $+\infty$。

例如，设 $(X_n)_{n\ge0}$ 是鞅，我们想知道它首次达到或超过 $12$ 的时刻。令

$$
T(\omega)=\inf\{n\ge0:X_n(\omega)\ge12\},
$$

其中约定 $\inf\varnothing=+\infty$。那么

$$
\{T\le n\}=\bigcup_{k=0}^n\{X_k\ge12\}\in\mathcal F_n,
$$

因为 $\{X_k\ge12\}\in\mathcal F_k\subseteq\mathcal F_n$，所以 $T$ 是停时。

“停时”一词来自赌博。赌徒可以根据已发生的输赢决定何时停止游戏。在时刻 $n$ 判断是否已经停止，只能使用截至该时刻的信息，这正是定义 24.3 所表达的条件。

### 定理 24.2（有界停时处的期望）

若存在常数 $c$ 使 $P(T\le c)=1$，就称停时 $T$ **有界**。对于几乎必然有限的停时，定义 $X_T(\omega)=X_{T(\omega)}(\omega)$，即在 $T=n$ 时取 $X_n$ 的值。在零概率事件 $\{T=+\infty\}$ 上约定 $X_T=0$。

若 $(X_n)_{n\ge0}$ 是鞅，$T$ 是由 $c$ 控制的有界停时，则 $E\{X_T\}=E\{X_0\}$。

**证明。** 增大 $c$，可令其为非负整数。由于 $T\le c$ 几乎必然成立，

$$
X_T=\sum_{n=0}^c X_n1_{\{T=n\}}\quad\text{a.s.}
$$

同时 $|X_T|\le\sum_{n=0}^c|X_n|$ 几乎必然成立，所以 $X_T$ 可积。对 $n\ge1$，$\{T=n\}=\{T\le n\}\setminus\{T\le n-1\}\in\mathcal F_n$，而 $\{T=0\}\in\mathcal F_0$。由鞅性质 $X_n=E\{X_c\mid\mathcal F_n\}$，得到

$$
\begin{aligned}
E\{X_T\}
&=\sum_{n=0}^c E\{X_n1_{\{T=n\}}\}\\
&=\sum_{n=0}^c E\{E\{X_c\mid\mathcal F_n\}1_{\{T=n\}}\}\\
&=\sum_{n=0}^c E\{X_c1_{\{T=n\}}\}\\
&=E\left\{X_c\sum_{n=0}^c1_{\{T=n\}}\right\}\\
&=E\{X_c\}=E\{X_0\}.
\end{aligned}
$$

最后一步由定理 24.1 得到。$\square$

### 定义 24.4（停时处的 $\sigma$-代数）

$\mathcal F_n$ 表示截至确定时刻 $n$ 可观测的事件。对于停时 $T$，定义

$$
\begin{gathered}
\mathcal F_T=\{A\in\mathcal F:\\
A\cap\{T\le n\}\in\mathcal F_n\text{ 对每个 }n\ge0\}.
\end{gathered}
$$

它表示截至随机时刻 $T$ 可观测的事件。下面先验证它确实是 $\sigma$-代数。

### 定理 24.3（$\mathcal F_T$ 是 $\sigma$-代数）

若 $T$ 是停时，则 $\mathcal F_T$ 是 $\sigma$-代数。

**证明。** 显然 $\varnothing,\Omega\in\mathcal F_T$。若 $A\in\mathcal F_T$，则

$$
\begin{gathered}
A^c\cap\{T\le n\}\\
=\{T\le n\}\setminus(A\cap\{T\le n\})\in\mathcal F_n,
\end{gathered}
$$

所以 $A^c\in\mathcal F_T$。若对每个 $i\ge1$ 都有 $A_i\in\mathcal F_T$，则

$$
\begin{gathered}
\left(\bigcup_{i=1}^\infty A_i\right)\cap\{T\le n\}\\
=\bigcup_{i=1}^\infty(A_i\cap\{T\le n\})\in\mathcal F_n.
\end{gathered}
$$

因此 $\mathcal F_T$ 对补集和可数并封闭，是 $\sigma$-代数。$\square$

### 定理 24.4（停时与信息的包含关系）

设 $S,T$ 是停时，且对所有样本点都有 $S\le T$，则 $\mathcal F_S\subseteq\mathcal F_T$。

**证明。** 由 $S\le T$ 得 $\{T\le n\}\subseteq\{S\le n\}$。若 $A\in\mathcal F_S$，则

$$
A\cap\{T\le n\}
=(A\cap\{S\le n\})\cap\{T\le n\}.
$$

右端的两个事件都属于 $\mathcal F_n$，所以 $A\cap\{T\le n\}\in\mathcal F_n$，即 $A\in\mathcal F_T$。$\square$

### 定理 24.5（停时取值的可测性）

设 $(X_n)_{n\ge0}$ 中的每个 $X_n$ 都是 $\mathcal F_n$-可测的，$T$ 是满足 $P(T<\infty)=1$ 的停时。取 $X_T=\sum_{k=0}^\infty X_k1_{\{T=k\}}$，在 $\{T=\infty\}$ 上取零，则 $X_T$ 是 $\mathcal F_T$-可测的。

**证明。** 给定 Borel 集 $B$，要证明 $\{X_T\in B\}\in\mathcal F_T$，只需验证对每个 $n$，$\{X_T\in B\}\cap\{T\le n\}\in\mathcal F_n$。事实上，

$$
\begin{gathered}
\{X_T\in B\}\cap\{T\le n\}\\
=\bigcup_{k=0}^n(\{X_T\in B\}\cap\{T=k\})\\
=\bigcup_{k=0}^n(\{X_k\in B\}\cap\{T=k\}).
\end{gathered}
$$

其中每一项都属于 $\mathcal F_k\subseteq\mathcal F_n$。$\square$

### 定理 24.6（Doob 可选抽样定理）

下面的结论把确定时刻的鞅性质推广到有界停时。设 $X=(X_n)_{n\ge0}$ 是鞅，$S,T$ 是由同一常数 $c$ 控制的有界停时，且 $S\le T$ 几乎必然成立，则

$$
E\{X_T\mid\mathcal F_S\}=X_S\quad\text{a.s.}
$$

**证明。** 先处理 $S\le T$ 处处成立的情形。可令 $c$ 为非负整数。$|X_T|$ 和 $|X_S|$ 几乎必然都由可积随机变量 $\sum_{n=0}^c|X_n|$ 控制，因而可积。由定理 24.5，$X_S$ 是 $\mathcal F_S$-可测的。因此，只需证明对每个有界 $\mathcal F_S$-可测随机变量 $Z$，都有 $E\{X_TZ\}=E\{X_SZ\}$。

实际上，只需对 $Z=1_A$、$A\in\mathcal F_S$ 验证。由线性性可以推广到简单随机变量，再由勒贝格控制收敛定理推广到所有有界 $\mathcal F_S$-可测随机变量。

固定 $A\in\mathcal F_S$，定义随机时刻 $R$，在 $A$ 上等于 $S$，在 $A^c$ 上等于 $T$。则

$$
\begin{aligned}
\{R\le n\}&=(A\cap\{S\le n\})\\
&\quad{}\cup(A^c\cap\{T\le n\}).
\end{aligned}
$$

由 $A\in\mathcal F_S$，第一个事件属于 $\mathcal F_n$。又因为 $A^c\in\mathcal F_S\subseteq\mathcal F_T$（定理 24.4），第二个事件也属于 $\mathcal F_n$。所以 $R$ 是停时，且也由 $c$ 几乎必然控制。由定理 24.2，$E\{X_R\}=E\{X_T\}=E\{X_0\}$。但

$$
\begin{aligned}
E\{X_R\}&=E\{X_S1_A+X_T1_{A^c}\},\\
E\{X_T\}&=E\{X_T1_A+X_T1_{A^c}\}.
\end{aligned}
$$

两式相减，得到 $E\{X_S1_A\}=E\{X_T1_A\}$，从而结论成立。

若只有 $S\le T$ 几乎必然成立，取 $T'=S\vee T$。它仍是有界停时，满足 $S\le T'$ 处处成立，且 $X_{T'}=X_T$ 几乎必然成立。对 $S,T'$ 应用刚才的结论即可。$\square$

### 定理 24.7（用有界停时刻画鞅）

这是定理 24.1 的一个部分逆命题。设每个 $X_n$ 都是 $\mathcal F_n$-可测且可积的随机变量。如果对所有有界停时 $T$ 都有 $E\{X_T\}=E\{X_0\}$，则 $(X_n)_{n\ge0}$ 是鞅。

**证明。** 固定 $0\le m<n<\infty$ 和 $A\in\mathcal F_m$，定义

$$
T(\omega)=
\begin{cases}
m,&\omega\in A^c,\\
n,&\omega\in A.
\end{cases}
$$

当 $k<m$ 时，$\{T\le k\}=\varnothing$。当 $m\le k<n$ 时，$\{T\le k\}=A^c\in\mathcal F_m\subseteq\mathcal F_k$。当 $k\ge n$ 时，这个事件为 $\Omega$。所以 $T$ 是有界停时。由假设，

$$
E\{X_0\}=E\{X_T\}
=E\{X_m1_{A^c}+X_n1_A\}.
$$

再对常数停时 $m$ 应用假设，得到

$$
E\{X_0\}=E\{X_m\}
=E\{X_m1_{A^c}+X_m1_A\}.
$$

相减可得 $E\{X_n1_A\}=E\{X_m1_A\}$。这对每个 $A\in\mathcal F_m$ 都成立，且 $X_m$ 是 $\mathcal F_m$-可测的，所以 $E\{X_n\mid\mathcal F_m\}=X_m$ 几乎必然成立。因此 $(X_n)$ 是鞅。$\square$

*来源为 Jean Jacod 与 Philip Protter 的《Probability Essentials》，第 24 章，Springer，2004 年。*

