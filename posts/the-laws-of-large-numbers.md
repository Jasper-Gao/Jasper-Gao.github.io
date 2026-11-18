---
title: "The Laws of Large Numbers"
date: "2026-11-17"
tag: "Math & CS"
compact: true
math: true
summary: "Chapter Twenty Notes of MA-UY 3514 Honors Theory of Probability"
---

## 20 大数定律

强大数定律是概率论的基本结果之一。它解释了为什么可以用长期频率理解概率（例 1），也有许多直接应用，例如蒙特卡洛估计（例 2）。

设 $(X_n)_{n\ge1}$ 是定义在同一个概率空间上的随机变量序列，记 $S_n=\sum_{j=1}^n X_j$。说明平均值 $S_n/n$ 在某种意义下收敛的定理，称为**大数定律**。这样的定理有很多例子，包括概率空间上的 $L^2$ 遍历定理和 Birkhoff 遍历定理（见定理 20.3）。收敛可以是依概率收敛、$L^p$ 收敛或几乎必然收敛。当结论是几乎必然收敛时，就称为**强大数定律**。

### 定理 20.1（强大数定律）

设 $(X_n)_{n\ge1}$ 是定义在同一概率空间上的独立同分布随机变量序列，记 $\mu=E\{X_j\}$、$\sigma^2=\operatorname{Var}(X_j)<\infty$。令 $S_n=\sum_{j=1}^n X_j$，则

$$
\frac{S_n}{n}=\frac1n\sum_{j=1}^n X_j\longrightarrow\mu
\quad\text{几乎必然且在 }L^2\text{ 中}.
$$

**注 20.1。** 由于各 $X_j$ 同分布，它们有相同的均值和方差，因此统一记作 $\mu,\sigma^2$。$L^2$ 收敛和几乎必然收敛都推出依概率收敛，所以 $S_n/n$ 也依概率收敛到 $\mu$。用切比雪夫不等式可以直接证明这个依概率收敛的结论，通常称为**弱大数定律**。这里它是强大数定律的推论。若加强假设为各 $X_j\in L^3$，定理 20.1 的证明可以简化，教材也常用这种讲法。只要求可积的更强结果见定理 20.2，证明见第 27 章。

**证明。** 用 $Z_j=X_j-\mu$ 替换 $X_j$，则中心化后的平均值为 $S_n/n-\mu$，所以只需证明 $\mu=0$ 的情形。

假设 $\mu=0$，记 $Y_n=S_n/n$，则 $E\{Y_n\}=n^{-1}\sum_{j=1}^n E\{X_j\}=0$。展开平方得 $E\{Y_n^2\}=n^{-2}\sum_{j,k=1}^n E\{X_jX_k\}$。对 $j\ne k$，由独立性有 $E\{X_jX_k\}=E\{X_j\}E\{X_k\}=0$。因此

$$
\begin{aligned}
E\{Y_n^2\}
&=\frac1{n^2}\sum_{j=1}^n E\{X_j^2\}\\
&=\frac{n\sigma^2}{n^2}=\frac{\sigma^2}{n}.
\end{aligned}
\tag{20.1}
$$

所以 $Y_n$ 在 $L^2$ 中收敛到 $0$。由此可知存在一个几乎必然收敛到 $0$ 的子序列。为证明整个序列也几乎必然收敛，我们先选定一个这样的子序列，再控制其相邻两项之间的项。

取平方下标 $n^2$。由（20.1），

$$
\sum_{n=1}^{\infty}E\{Y_{n^2}^2\}
=\sum_{n=1}^{\infty}\frac{\sigma^2}{n^2}<\infty.
$$

由定理 9.2，$\sum_{n=1}^\infty Y_{n^2}^2<\infty$ 几乎必然成立。收敛级数的通项趋于零，所以

$$
\lim_{n\to\infty}Y_{n^2}=0\quad\text{a.s.}
\tag{20.2}
$$

对每个正整数 $n$，取整数 $p=p(n)$，使 $p^2\le n<(p+1)^2$。记相邻平方下标之间的余项为

$$
R_n=Y_n-\frac{p^2}{n}Y_{p^2}
=\frac1n\sum_{j=p^2+1}^{n}X_j.
$$

与（20.1）相同，展开平方后，交叉项的期望为零。由于 $n-p^2\le2p+1$、$p\le\sqrt n$，有

$$
\begin{aligned}
E\{R_n^2\}&=\frac{n-p^2}{n^2}\sigma^2\\
&\le\frac{2p+1}{n^2}\sigma^2\\
&\le\frac{2\sqrt n+1}{n^2}\sigma^2
\le\frac{3\sigma^2}{n^{3/2}}.
\end{aligned}
$$

于是 $\sum_{n=1}^\infty E\{R_n^2\}\le\sum_{n=1}^\infty 3\sigma^2/n^{3/2}<\infty$。再次应用定理 9.2，得到 $\sum_{n=1}^\infty R_n^2<\infty$ 几乎必然成立，因而 $R_n\to0$ 几乎必然成立。又由（20.2），$Y_{p(n)^2}\to0$ 几乎必然成立，且 $p(n)^2/n\to1$。所以 $Y_n=R_n+(p(n)^2/n)Y_{p(n)^2}\to0$ 几乎必然成立。$\square$

### 定理 20.2（Kolmogorov 强大数定律）

设 $(X_j)_{j\ge1}$ 独立同分布，$\mu\in\mathbb R$，并记 $S_n=\sum_{j=1}^n X_j$。则 $S_n/n\to\mu$ 几乎必然成立，当且仅当 $X_1$ 可积且 $E\{X_1\}=\mu$。此时收敛也在 $L^1$ 中成立。

**注 20.2。** Kolmogorov 强大数定律只需要 $X_j\in L^1$，这也是样本平均几乎必然收敛到有限常数所需的最弱矩条件。可以用反向鞅收敛定理证明该结果，参见定理 27.5。

### 定理 20.3（遍历强大数定律）

设 $(\Omega,\mathcal A,P)$ 是概率空间，$T:\Omega\to\Omega$ 是双向可测的双射。若对每个 $A\in\mathcal A$ 都有 $P(T(A))=P(A)$，就说 $T$ 保持测度。等价地，也可写成 $P(T^{-1}(A))=P(A)$。记 $T^2(\omega)=T(T(\omega))$，依此定义 $T^j$。若对所有 $\omega$ 都有 $1_\Lambda(\omega)=1_\Lambda(T(\omega))$，则称集合 $\Lambda$ 在 $T$ 下不变。

假设所有 $T$-不变的可测集的概率都是 $0$ 或 $1$。若 $X\in L^1$，则

$$
\frac1n\sum_{j=1}^n X(T^j(\omega))\longrightarrow E\{X\}
$$

几乎必然且在 $L^1$ 中成立。

定理 20.3 是 Birkhoff 遍历定理的推论。这里用遍历性取代了独立性，因此也称为平稳随机变量序列的强大数定律。

### 例 1（伯努利试验的成功频率）

在第 17 章例 1 中，$(X_j)_{j\ge1}$ 是独立同分布的伯努利随机变量，且 $P(X_j=1)=p$、$P(X_j=0)=q=1-p$。$S_n=\sum_{j=1}^n X_j$ 是 $n$ 次试验的成功次数，$S_n/n$ 则是成功比例。由定理 20.1，

$$
\lim_{n\to\infty}\frac{S_n}{n}
=E\{X_1\}=p\quad\text{a.s.}
\tag{20.3}
$$

这为把 $p$ 解释成成功概率提供了依据。第 2 章的概率公理可以推出（20.3），从而把概率和长期观测频率联系起来。

### 例 2（蒙特卡洛积分）

**蒙特卡洛近似**得名于法国南部附近的摩纳哥公国蒙特卡洛地区，当地以历史悠久的赌场闻名。设 $f$ 是 $[0,1]$ 上的可测函数，且 $\int_0^1|f(x)|\,dx<\infty$。有时积分 $\alpha=\int_0^1 f(x)\,dx$ 没有容易求出的闭式表达，需要用数值方法估计。

取 $(U_j)_{j\ge1}$ 为相互独立、服从 $[0,1]$ 上均匀分布的随机变量，令 $I_n=n^{-1}\sum_{j=1}^n f(U_j)$。由定理 20.2，

$$
\begin{aligned}
\lim_{n\to\infty}I_n
&=E\{f(U_1)\}\\
&=\int_0^1 f(x)\,dx=\alpha
\end{aligned}
$$

几乎必然且在 $L^1$ 中成立。若进一步有 $\int_0^1 |f(x)|^2\,dx<\infty$，则由定理 20.1，收敛也在 $L^2$ 中成立。

因此，只要用计算机的随机数生成器模拟足够多的均匀随机数，就能用 $I_n$ 近似该积分。对于一维积分，这只是众多数值方法之一，通常还有更合适的做法。相同的抽样思想也可用于高维积分，例如在 $\mathbb R^d$ 上估计 $\int_{\mathbb R^d} f(x)\,dx$，此时可按适当的概率密度抽样，并用密度对被积函数加权。

### 例 3（圆周上的无理旋转）

见教材参考文献 [7，第 120 页]。令 $\Omega$ 是半径 $1/(2\pi)$ 的圆周，取 Borel $\sigma$-代数和弧长测度 $P$。圆周的周长为 $1$，可将它与区间 $[0,1)$ 对应起来。取无理数 $\alpha$，令 $T$ 在归一化坐标中加上 $\alpha$ 再取模 $1$，这相当于绕圆心旋转 $2\pi\alpha$ 弧度。

容易验证 $T$ 是双射且保持测度。不变集的概率只能是 $0$ 或 $1$，这一步用到 $\alpha$ 的无理性。因此由定理 20.3，对任意 $X\in L^1$，都有

$$
\begin{gathered}
\lim_{n\to\infty}\frac1n\sum_{j=1}^n X((\omega+j\alpha)\bmod 1)\\
=\int_0^1 X(x)\,dx
\end{gathered}
$$

对 $P$-几乎所有 $\omega$ 成立。

*来源为 Jean Jacod 与 Philip Protter 的《Probability Essentials》，第 20 章，Springer，2004 年。*
