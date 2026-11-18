---
title: "The Central Limit Theorem"
date: "2026-11-17"
tag: "Math & CS"
compact: true
math: true
summary: "Chapter Twenty-One Notes of MA-UY 3514 Honors Theory of Probability"
---

## 21 中心极限定理

中心极限定理从简单的假设推出精确的结果，是许多统计方法的理论基础。设 $X_1,X_2,\ldots$ 独立同分布，均值为 $\mu$，方差为有限的 $\sigma^2$，记 $S_n=\sum_{j=1}^n X_j$。当 $n$ 很大时，$S_n$ 的分布可用 $N(n\mu,n\sigma^2)$ 近似。

这个结论只用到了独立同分布和有限方差，对单个 $X_j$ 的分布形状没有进一步要求。因此，如果可以把所研究的量视为许多这样的随机变量之和，就可以用正态分布近似它。再用数据和统计方法估计 $\mu$ 与 $\sigma^2$，便可确定这个近似分布。

### 定理 21.1（经典中心极限定理）

设 $(X_j)_{j\ge1}$ 独立同分布，$E\{X_j\}=\mu$、$\operatorname{Var}(X_j)=\sigma^2$，其中 $0<\sigma^2<\infty$。记 $S_n=\sum_{j=1}^n X_j$，则

$$
Y_n=\frac{S_n-n\mu}{\sigma\sqrt n}
\xrightarrow{\mathcal D} Z,\qquad Z\sim N(0,1).
$$

如果 $\sigma^2=0$，则对每个 $j$ 都有 $X_j=\mu$ 几乎必然成立，所以 $S_n/n=\mu$ 几乎必然成立。

**证明。** 令 $\varphi$ 表示 $X_j-\mu$ 的特征函数。由同分布性，它与 $j$ 无关。再由独立性，和的特征函数等于各项特征函数的乘积（定理 15.2）。因此

$$
\begin{aligned}
\varphi_{Y_n}(u)
&=\varphi_{\sum_{j=1}^n(X_j-\mu)}
   \left(\frac{u}{\sigma\sqrt n}\right)\\
&=\prod_{j=1}^n\varphi_{X_j-\mu}
   \left(\frac{u}{\sigma\sqrt n}\right)\\
&=\left(\varphi\left(\frac{u}{\sigma\sqrt n}\right)\right)^n.
\end{aligned}
\tag{21.1}
$$

由于 $E\{X_j-\mu\}=0$ 且 $E\{(X_j-\mu)^2\}=\sigma^2$，由定理 13.2，$\varphi$ 有两个连续导数，且

$$
\begin{aligned}
\varphi'(u)&=iE\{(X_j-\mu)e^{iu(X_j-\mu)}\},\\
\varphi''(u)&=-E\{(X_j-\mu)^2e^{iu(X_j-\mu)}\}.
\end{aligned}
$$

所以 $\varphi(0)=1$、$\varphi'(0)=0$、$\varphi''(0)=-\sigma^2$。在 $u=0$ 处作泰勒展开（见习题 14.4），有

$$
\varphi(u)=1-\frac{\sigma^2u^2}{2}+u^2h(u),
\tag{21.2}
$$

其中由 $\varphi''$ 的连续性可知 $h(u)\to0$（$u\to0$）。固定 $u$，令 $a_n=\varphi(u/(\sigma\sqrt n))-1$。由（21.2），

$$
na_n=-\frac{u^2}{2}
+\frac{u^2}{\sigma^2}h\left(\frac{u}{\sigma\sqrt n}\right)
\longrightarrow-\frac{u^2}{2}.
$$

因此 $a_n=O(n^{-1})$。当 $n$ 足够大时，可在 $1$ 附近取复对数的主值，利用 $\log(1+a_n)=a_n+O(|a_n|^2)$，得到 $n\log(1+a_n)\to-u^2/2$。由（21.1），

$$
\varphi_{Y_n}(u)=e^{n\log(1+a_n)}
\longrightarrow e^{-u^2/2}.
$$

由 Lévy 连续性定理（定理 19.1），$Y_n$ 收敛到以 $e^{-u^2/2}$ 为特征函数的分布。这个特征函数唯一确定分布（定理 14.1），而例 13.5 给出它对应的正是 $N(0,1)$。$\square$

### 样本平均的波动尺度

设 $(X_j)_{j\ge1}$ 独立同分布，均值为 $\mu=E\{X_1\}$，方差有限。由强大数定律，

$$
\frac{S_n}{n}\longrightarrow\mu
\quad\text{几乎必然且在 }L^2\text{ 中}.
\tag{21.3}
$$

为使样本平均足够接近 $\mu$，样本量 $n$ 要有多大？由（21.3），几乎必然且在 $L^2$ 意义下都有

$$
\left|\frac{S_n}{n}-\mu\right|\longrightarrow0.
\tag{21.4}
$$

这就引出了收敛速率的问题。例如，能否找到 $\alpha\ne0$，使 $n^\alpha|S_n/n-\mu|$ 几乎必然收敛到某个非零常数 $c$？

在 $0<\sigma^2<\infty$ 的情形，中心极限定理给出三种情况。若 $\alpha<1/2$，缩放后的误差依概率趋于 $0$。若 $\alpha>1/2$，其绝对值依概率趋于无穷。若 $\alpha=1/2$，则

$$
\sqrt n\left(\frac{S_n}{n}-\mu\right)
\xrightarrow{\mathcal D}N(0,\sigma^2).
$$

在临界尺度 $\alpha=1/2$，如果缩放后的误差依概率收敛到某个随机变量，那么从任意子序列都能抽出进一步的子序列几乎必然收敛到同一个极限。对固定的 $m$，去掉前 $m$ 项只改变一个趋于零的量，因此该极限可以用 $X_{m+1},X_{m+2},\ldots$ 表示。由 Kolmogorov 零一律，极限只能几乎必然为常数，这与非退化的正态极限矛盾。对误差取绝对值也有相同结论。因而 $n^{-1/2}$ 描述的是样本平均误差的典型波动尺度。

### 定理 21.2（独立非同分布情形）

可以放宽定理 21.1 的同分布假设。设 $(X_j)_{j\ge1}$ 相互独立，且对每个 $j$ 都有 $E\{X_j\}=0$、$\sigma_j^2=\operatorname{Var}(X_j)$。记 $S_n=\sum_{j=1}^n X_j$，$s_n^2=\sum_{j=1}^n\sigma_j^2$。假设 $s_n^2\to\infty$，并且对某个 $\varepsilon>0$ 满足 Lyapunov 条件

$$
\frac{\sum_{j=1}^n E\{|X_j|^{2+\varepsilon}\}}
     {s_n^{2+\varepsilon}}\longrightarrow0.
$$

则 $S_n/s_n\xrightarrow{\mathcal D}Z$，其中 $Z\sim N(0,1)$。

**译注。** 原文在这里给出的条件是 $\sup_j E\{|X_j|^{2+\varepsilon}\}<\infty$ 和 $\sum_{j=1}^\infty\sigma_j^2=\infty$，两者不足以推出结论。反例是相互独立的 $X_j$ 分别以概率 $1/(2j^3)$ 取 $j$ 和 $-j$，其余时候取 $0$。此时 $E\{|X_j|^3\}=1$、$\sigma_j^2=1/j$，但 $\sum_j P(X_j\ne0)<\infty$。由 Borel–Cantelli 引理，几乎必然只有有限项非零，因此 $S_n/s_n\to0$ 几乎必然成立。上面采用了能保证正态极限的 Lyapunov 条件。原文所用的特征函数证明思路仍适用，此时各项泰勒余项的总贡献由 Lyapunov 条件控制。

经典中心极限定理的假设可以用不同方式放宽，因此有多种中心极限定理。它们都在适当条件下得到归一化随机和的正态极限。鞅理论可以进一步放宽条件（见定理 27.7）。也可以利用混合条件，把独立性放宽为某种渐近独立性，这需要更复杂的论证。

### 定理 21.3（多维中心极限定理）

定理 21.1 有一个 $d$ 维版本，证明思路基本相同。设 $(X_j)_{j\ge1}$ 是取值于 $\mathbb R^d$ 的独立同分布随机向量，且各分量的二阶矩有限。令 $\mu=E\{X_j\}$，协方差矩阵为 $Q=(q_{k,\ell})_{1\le k,\ell\le d}$，其中 $q_{k,\ell}=\operatorname{Cov}(X_j^k,X_j^\ell)$，$X_j^k$ 表示第 $k$ 个分量。令 $S_n=\sum_{j=1}^n X_j$，则

$$
\frac{S_n-n\mu}{\sqrt n}\xrightarrow{\mathcal D}Z,
\qquad Z\sim N(0,Q).
$$

$Q$ 可以是奇异矩阵，所以中心极限定理也能得到没有密度的高斯极限。$\mathbb R^d$ 上的高斯随机向量具有密度，当且仅当其协方差矩阵可逆。

### 例 1（二项分布的正态近似）

设 $(X_j)_{j\ge1}$ 独立同分布，$P(X_j=1)=p$、$P(X_j=0)=q=1-p$。则 $S_n=\sum_{j=1}^n X_j$ 服从二项分布 $B(p,n)$，且 $E\{X_j\}=p$、$\operatorname{Var}(X_j)=pq=p(1-p)$。由强大数定律，$S_n/n\to p$ 几乎必然成立。当 $0<p<1$ 时，由定理 21.1，

$$
\frac{S_n-np}{\sqrt{np(1-p)}}\xrightarrow{\mathcal D}Z,
\qquad Z\sim N(0,1).
$$

### 例 2（经验分布函数）

设 $(X_j)_{j\ge1}$ 是独立同分布且属于 $L^2$ 的随机变量，共同的分布函数 $F$ 未知。为了估计它，对固定的 $x$ 令 $Y_j(x)=1_{\{X_j\le x\}}$。这些示性函数也是独立同分布的，并且都属于 $L^2$。定义

$$
F_n(x)=\frac1n\sum_{j=1}^n Y_j(x).
$$

$F_n$ 称为**经验分布函数**。它依赖于样本结果 $\omega$，也可写成 $F_n(x,\omega)$。对每个固定的 $x$，由强大数定律，$F_n(x)$ 几乎必然且在 $L^2$ 中收敛到

$$
\begin{aligned}
E\{Y_1(x)\}&=E\{1_{\{X_1\le x\}}\}\\
&=P(X_1\le x)=F(x).
\end{aligned}
$$

还可以得到更强的结论 $\sup_x|F_n(x)-F(x)|\to0$ 几乎必然成立，这就是 **Glivenko–Cantelli 定理**。中心极限定理则描述固定 $x$ 处的误差。由于

$$
\begin{gathered}
\sqrt n(F_n(x)-F(x))\\
=\sqrt n\bigl(F_n(x)-E\{Y_1(x)\}\bigr)\\
=\frac{\sum_{j=1}^n Y_j(x)-nE\{Y_1(x)\}}{\sqrt n},
\end{gathered}
$$

由定理 21.1，它依分布收敛到 $N(0,\sigma^2(x))$，其中 $\sigma^2(x)=\operatorname{Var}(Y_1(x))=F(x)(1-F(x))$。若 $F(x)\in\{0,1\}$，则误差几乎必然为零，对应方差为零的退化极限。

给定样本量 $n$，还可以问经验分布函数在固定点的误差分布离它的正态近似有多远。中心极限定理给出该误差的波动尺度，下面的 Berry–Esseen 定理进一步量化了正态近似的误差。

### 定理 21.4（Berry–Esseen 定理）

设 $(X_j)_{j\ge1}$ 独立同分布，且 $E\{|X_1|^3\}<\infty$。记 $\mu=E\{X_1\}$、$\sigma^2=\operatorname{Var}(X_1)>0$，并令

$$
G_n(x)=P\left(\frac{S_n-n\mu}{\sigma\sqrt n}\le x\right).
$$

令 $\Phi$ 为 $N(0,1)$ 的分布函数。存在普适常数 $c$，使

$$
\sup_x|G_n(x)-\Phi(x)|
\le c\,\frac{E\{|X_1-\mu|^3\}}{\sigma^3\sqrt n}.
$$

**译注。** 分子是三阶绝对中心矩。若已将 $X_1$ 中心化，它就是原文写的 $E\{|X_1|^3\}$。

这个定理的证明超出了本书的范围。教材参考文献 [8，第 108 页] 给出了 $c=3$ 时的证明。教材还列出参考文献 [24] 中的 $0.7975$、I. S. Shiganov 给出的上界 $0.7655$，以及 Esseen 建立的下界，并记录当时的范围 $0.4097\le c\le0.7655$。

*来源为 Jean Jacod 与 Philip Protter 的《Probability Essentials》，第 21 章，Springer，2004 年。*
