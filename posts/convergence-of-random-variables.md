---
title: "Convergence of Random Variables"
date: "2026-11-08"
tag: "Math & CS"
compact: true
math: true
summary: "Chapter Seventeen Notes of MA-UY 3514 Honors Theory of Probability"
---

## 17 随机变量的收敛

在微积分等基础数学课程中，我们会讨论函数的收敛。设 $f_n:\mathbb R\to\mathbb R$，如果对每个 $x\in\mathbb R$ 都有 $\lim_{n\to\infty}f_n(x)=f(x)$，就说 $f_n$ 逐点收敛到 $f$。随机变量本身也是函数，即 $X:\Omega\to\mathbb R$，其中 $\Omega$ 是一个抽象空间。因此，同样可以定义随机变量的逐点收敛：如果对每个 $\omega\in\Omega$ 都有 $\lim_{n\to\infty}X_n(\omega)=X(\omega)$，就说序列 $X_n:\Omega\to\mathbb R$ 逐点收敛到 $X$。这个定义很自然，但在概率论中却出乎意料地少有用处。下面的例子说明了原因。

### 例 1（抛硬币）

设 $(X_n)$ 是独立同分布的随机变量序列，且 $P(X_n=1)=p$、$P(X_n=0)=1-p$。例如，想象反复抛掷一枚略偏向正面的硬币，此时 $p>\tfrac12$。事件 $\{X_n=1\}$ 表示第 $n$ 次抛出正面，$\{X_n=0\}$ 表示第 $n$ 次抛出反面。从长期来看，我们预期正面所占的比例趋于 $p$，这也印证了模型中正面的概率为 $p$。如果要求逐点收敛，就要有

$$
\lim_{n\to\infty}\frac{X_1(\omega)+\cdots+X_n(\omega)}{n}=p
\quad(\forall\,\omega\in\Omega).
$$

这个要求并不成立。例如，取 $\omega_0=(T,T,T,\ldots)$，即每次都抛出反面。此时

$$
\lim_{n\to\infty}\frac1n\sum_{j=1}^{n}X_j(\omega_0)=0.
$$

更一般地，令 $A=\{\omega:\text{正面只出现有限次}\}$。则对每个 $\omega\in A$ 都有

$$
\lim_{n\to\infty}\frac1n\sum_{j=1}^{n}X_j(\omega)=0.
$$

事件 $A$ 极不可能发生。事实上，习题 17.13 可以证明 $P(A)=0$。最终我们会在第 20 章的强大数定律中证明

$$
P\left(\left\{\omega:
\lim_{n\to\infty}\frac1n\sum_{j=1}^{n}X_j(\omega)=p
\right\}\right)=1.
$$

概率论中典型的情形正是如此：收敛对几乎所有 $\omega$ 成立，即使对某些 $\omega$ 不成立。这里“几乎所有”是指收敛成立的样本点集合具有概率 $1$。

**本章约定。** 所有随机变量都定义在同一个固定的概率空间 $(\Omega,\mathcal A,P)$ 上，取值于 $\mathbb R$ 或 $\mathbb R^n$。用 $|x|$ 表示 $x\in\mathbb R^n$ 的欧几里得范数。

### 定义 17.1（几乎必然收敛）

如果随机变量序列 $(X_n)_{n\ge1}$ 满足 $P(N)=0$，其中

$$
N=\left\{\omega:\lim_{n\to\infty}X_n(\omega)\ne X(\omega)\right\},
$$

就说 $X_n$ **几乎必然收敛**到 $X$。这里 $N$ 也包括极限不存在的样本点。回顾一下，$N$ 称为零测集或可忽略集。其补集

$$
N^c=\Lambda=\left\{\omega:\lim_{n\to\infty}X_n(\omega)=X(\omega)\right\}
$$

满足 $P(\Lambda)=1$。我们通常把几乎必然收敛简记为 $\lim_{n\to\infty}X_n=X\ \text{a.s.}$。定义前的抛硬币例子就是几乎必然收敛的一个实例。

当逐点收敛无法在每个样本点上成立时，几乎必然收敛自然就出现了。同样，当几乎必然收敛也不成立时，还会自然地遇到另外两种收敛。这两种收敛也可以用来证明几乎必然收敛。

### 定义 17.2（$L^p$ 收敛）

设 $1\le p<\infty$。如果 $|X_n|,|X|\in L^p$，且

$$
\lim_{n\to\infty}E\{|X_n-X|^p\}=0,
$$

就说随机变量序列 $(X_n)_{n\ge1}$ 在 $L^p$ 中收敛到 $X$，也称 $p$ 阶平均收敛，记为 $X_n\xrightarrow{L^p}X$。

最重要的两种情形是 $p=1$ 和 $p=2$。当 $p=1$ 且所有随机变量都是一维的，利用 $\bigl||x|-|y|\bigr|\le|x-y|$，可得

$$
\begin{aligned}
|E\{X_n-X\}|&\le E\{|X_n-X|\},\\
\bigl|E\{|X_n|\}-E\{|X|\}\bigr|&\le E\{|X_n-X|\}.
\end{aligned}
$$

所以

$$
X_n\xrightarrow{L^1}X
\quad\Longrightarrow\quad
\begin{aligned}
E\{X_n\}&\to E\{X\},\\
E\{|X_n|\}&\to E\{|X|\}.
\end{aligned}
\tag{17.1}
$$

类似地，当 $p\in(1,\infty)$ 且 $X_n\xrightarrow{L^p}X$ 时，$E\{|X_n|^p\}\to E\{|X|^p\}$。$p=2$ 的情形见习题 17.14。

### 定义 17.3（依概率收敛）

如果对任意 $\varepsilon>0$，都有

$$
\lim_{n\to\infty}P\bigl(\{\omega:|X_n(\omega)-X(\omega)|>\varepsilon\}\bigr)=0,
$$

就说随机变量序列 $(X_n)_{n\ge1}$ **依概率收敛**到 $X$。上式也写作 $\lim_{n\to\infty}P(|X_n-X|>\varepsilon)=0$，依概率收敛记为 $X_n\xrightarrow{P}X$。

按照极限的 $\varepsilon$–$\delta$ 定义，也可以这样表述：对任意 $\varepsilon>0$ 和 $\delta>0$，存在 $N=N(\varepsilon,\delta)$，使所有 $n\ge N$ 都满足 $P(|X_n-X|>\varepsilon)<\delta$。

在讨论各种收敛之间的关系之前，先给出一个简洁而实用的判据。

### 定理 17.1（依概率收敛的判据）

$X_n\xrightarrow{P}X$ 当且仅当

$$
\lim_{n\to\infty}E\left\{\frac{|X_n-X|}{1+|X_n-X|}\right\}=0.
$$

**证明。** 把 $X_n$ 换成 $X_n-X$，不妨取 $X=0$。这样只需证明 $X_n\xrightarrow{P}0$ 等价于 $\lim_{n\to\infty}E\{|X_n|/(1+|X_n|)\}=0$。

先设 $X_n\xrightarrow{P}0$。对任意 $\varepsilon>0$，都有 $\lim_{n\to\infty}P(|X_n|>\varepsilon)=0$。记 $1_A$ 为事件 $A$ 的示性函数，则

$$
\begin{aligned}
\frac{|X_n|}{1+|X_n|}
&\le \frac{|X_n|}{1+|X_n|}1_{\{|X_n|>\varepsilon\}}
   +\varepsilon 1_{\{|X_n|\le\varepsilon\}}\\
&\le 1_{\{|X_n|>\varepsilon\}}+\varepsilon.
\end{aligned}
$$

取期望得 $E\{|X_n|/(1+|X_n|)\}\le E\{1_{\{|X_n|>\varepsilon\}}\}+\varepsilon=P(|X_n|>\varepsilon)+\varepsilon$，因此

$$
\limsup_{n\to\infty}E\left\{\frac{|X_n|}{1+|X_n|}\right\}\le\varepsilon.
$$

由于 $\varepsilon$ 任意且期望非负，该期望趋于 $0$。

反过来，设 $\lim_{n\to\infty}E\{|X_n|/(1+|X_n|)\}=0$。函数 $f(x)=x/(1+x)$ 在 $[0,\infty)$ 上严格递增，因此

$$
\begin{aligned}
\frac{\varepsilon}{1+\varepsilon}1_{\{|X_n|>\varepsilon\}}
&\le \frac{|X_n|}{1+|X_n|}1_{\{|X_n|>\varepsilon\}}\\
&\le \frac{|X_n|}{1+|X_n|}.
\end{aligned}
$$

取期望再取上极限，得到

$$
\begin{aligned}
\frac{\varepsilon}{1+\varepsilon}\limsup_{n\to\infty}P(|X_n|>\varepsilon)
&\le \lim_{n\to\infty}E\left\{\frac{|X_n|}{1+|X_n|}\right\}\\
&=0.
\end{aligned}
$$

对每个固定的 $\varepsilon>0$，这就给出 $\lim_{n\to\infty}P(|X_n|>\varepsilon)=0$。$\square$

**注。** 该定理可以写成 $X_n\xrightarrow{P}X$ 当且仅当 $E\{f(|X_n-X|)\}\to0$，其中 $f(x)=|x|/(1+|x|)$。英文原文中的 *iff* 是 *if and only if*（当且仅当）的缩写。仔细看证明可知，只要 $f$ 在 $[0,\infty)$ 上有界、连续且单调不减，并满足 $f(0)=0$、$x>0$ 时 $f(x)>0$，同样的等价关系就成立。例如，$X_n\xrightarrow{P}X$ 等价于 $E\{|X_n-X|\wedge1\}\to0$，也等价于 $E\{\arctan(|X_n-X|)\}\to0$，其中 $\wedge$ 表示取最小值。

### 定理 17.2（三种收敛的关系）

下面的定理说明，依概率收敛是几乎必然收敛、$L^p$ 收敛和依概率收敛这三种收敛中最弱的一种。设 $(X_n)_{n\ge1}$ 是随机变量序列。

- （a）若 $X_n\xrightarrow{L^p}X$，则 $X_n\xrightarrow{P}X$。
- （b）若 $X_n\xrightarrow{\text{a.s.}}X$，则 $X_n\xrightarrow{P}X$。

**证明。** （a）回顾任意事件 $A$ 都满足 $P(A)=E\{1_A\}$。在事件 $\{|X_n-X|>\varepsilon\}$ 上，有 $|X_n-X|^p/\varepsilon^p>1$，因此

$$
\begin{aligned}
P(|X_n-X|>\varepsilon)
&=E\{1_{\{|X_n-X|>\varepsilon\}}\}\\
&\le E\left\{\frac{|X_n-X|^p}{\varepsilon^p}
   1_{\{|X_n-X|>\varepsilon\}}\right\}\\
&=\frac1{\varepsilon^p}E\{|X_n-X|^p1_{\{|X_n-X|>\varepsilon\}}\}\\
&\le\frac1{\varepsilon^p}E\{|X_n-X|^p\}.
\end{aligned}
$$

最后一步可以去掉示性函数，因为 $|X_n-X|^p\ge0$。对固定的 $\varepsilon>0$，右端在 $n\to\infty$ 时趋于 $0$，所以结论成立。

（b）由于 $|X_n-X|/(1+|X_n-X|)\le1$，由勒贝格控制收敛定理（9.1（f））可得

$$
\begin{gathered}
\lim_{n\to\infty}E\left\{\frac{|X_n-X|}{1+|X_n-X|}\right\}\\
=E\left\{\lim_{n\to\infty}\frac{|X_n-X|}{1+|X_n-X|}\right\}
=E\{0\}=0.
\end{gathered}
$$

再应用定理 17.1 即可。$\square$

定理 17.2 的逆命题一般不成立，但有两条部分逆命题。其中较微妙的一条涉及几乎必然收敛。

### 定理 17.3（依概率收敛序列的子序列）

若 $X_n\xrightarrow{P}X$，则存在一列子序列下标 $(n_k)$，使得 $\lim_{k\to\infty}X_{n_k}=X$ 几乎必然成立。

**证明。** 根据定理 17.1，$E\{|X_n-X|/(1+|X_n-X|)\}\to0$。选取子序列下标 $n_k$，使 $E\{|X_{n_k}-X|/(1+|X_{n_k}-X|)\}<2^{-k}$。于是

$$
\sum_{k=1}^{\infty}E\left\{\frac{|X_{n_k}-X|}{1+|X_{n_k}-X|}\right\}<\infty.
$$

由定理 9.2，$\sum_{k=1}^{\infty}|X_{n_k}-X|/(1+|X_{n_k}-X|)<\infty$ 几乎必然成立。收敛级数的通项必趋于 $0$，因而 $\lim_{k\to\infty}|X_{n_k}-X|=0\ \text{a.s.}$。$\square$

**注 17.1。** 利用 Borel–Cantelli 定理（定理 10.5），也可以较简单地证明定理 17.3。

### 例 2（依概率收敛但不几乎必然收敛）

$X_n\xrightarrow{P}X$ 不一定推出 $X_n$ 几乎必然收敛到 $X$。取 $\Omega=[0,1]$，$\mathcal A$ 为 $[0,1]$ 上的 Borel $\sigma$-代数，$P$ 为 $[0,1]$ 上的均匀概率测度，即勒贝格测度在 $[0,1]$ 上的限制。取 $[0,1]$ 中任意长度为 $a_n$ 的区间 $A_n$，并令 $X_n=1_{A_n}$。对 $0<\varepsilon<1$，有 $P(|X_n|>\varepsilon)=a_n$，而对 $\varepsilon\ge1$，该概率为 $0$。只要 $a_n\to0$，便有 $X_n\xrightarrow{P}0$。

具体地，令 $X_{n,j}$ 为区间 $[(j-1)/n,j/n]$ 的示性函数，其中 $1\le j\le n$、$n\ge1$。先按 $n$ 递增排列，对于每个固定的 $n$ 再按 $j$ 递增排列，得到序列 $(Y_m)$：

$$
\begin{gathered}
(Y_1,Y_2,Y_3,Y_4)=(X_{1,1},X_{2,1},X_{2,2},X_{3,1}),\\
(Y_5,Y_6,Y_7,\ldots)=(X_{3,2},X_{3,3},X_{4,1},\ldots).
\end{gathered}
$$

对每个 $\omega$ 和每个 $n$，都至少存在一个 $j$ 使 $X_{n,j}(\omega)=1$。当 $n\ge3$ 时，也至少有一个 $j$ 使 $X_{n,j}(\omega)=0$。因此 $\limsup_{m\to\infty}Y_m=1$、$\liminf_{m\to\infty}Y_m=0$ 几乎必然成立，故 $(Y_m)$ 不几乎必然收敛。但随着 $m\to\infty$，对应区间的长度 $1/n$ 趋于 $0$，所以 $Y_m$ 依概率收敛到 $0$。

### 定理 17.4（有控制条件时的 $L^p$ 收敛）

这是定理 17.2 的第二条部分逆命题。若 $X_n\xrightarrow{P}X$，且对所有 $n$ 都有 $|X_n|\le Y$，其中 $Y\in L^p$，则 $|X|\in L^p$，且 $X_n\xrightarrow{L^p}X$。

**证明。** 因为 $E\{|X_n|^p\}\le E\{Y^p\}<\infty$，所以 $X_n\in L^p$。对 $\varepsilon>0$，有

$$
\begin{aligned}
\{|X|>Y+\varepsilon\}
&\subseteq\{|X|>|X_n|+\varepsilon\}\\
&\subseteq\{|X|-|X_n|>\varepsilon\}\\
&\subseteq\{|X-X_n|>\varepsilon\}.
\end{aligned}
$$

因此，对每个 $n$ 都有 $P(|X|>Y+\varepsilon)\le P(|X-X_n|>\varepsilon)$。令 $n\to\infty$，由依概率收敛可知右端趋于 $0$，故对每个 $\varepsilon>0$ 都有 $P(|X|>Y+\varepsilon)=0$。由概率的下连续性得到

$$
P(|X|>Y)
=\lim_{m\to\infty}P(|X|>Y+1/m)=0.
$$

由此可知 $|X|\le Y$ 几乎必然成立，因此 $X\in L^p$。

假设 $X_n$ 在 $L^p$ 中不收敛到 $X$。那么对某个 $\varepsilon>0$，存在子序列 $(X_{n_k})$，使得对所有 $k$ 都有 $E\{|X_{n_k}-X|^p\}\ge\varepsilon$。这条子序列仍然依概率收敛到 $X$。由定理 17.3，可再选出一条几乎必然收敛到 $X$ 的子序列 $(X_{n_{k_j}})$。随着 $j\to\infty$，$X_{n_{k_j}}-X$ 几乎必然趋于 $0$，且其绝对值始终由 $2Y$ 控制。由勒贝格控制收敛定理，$E\{|X_{n_{k_j}}-X|^p\}\to0$，这与所选子序列的期望始终至少为 $\varepsilon$ 矛盾。$\square$

### 定理 17.5（连续映射）

下面的定理很基础，也值得记住。设 $f$ 是连续函数。

- （a）若 $\lim_{n\to\infty}X_n=X\ \text{a.s.}$，则 $\lim_{n\to\infty}f(X_n)=f(X)\ \text{a.s.}$
- （b）若 $X_n\xrightarrow{P}X$，则 $f(X_n)\xrightarrow{P}f(X)$。

**证明。** （a）设 $N=\{\omega:\lim_{n\to\infty}X_n(\omega)\ne X(\omega)\}$，其中包括极限不存在的样本点。由假设知 $P(N)=0$。对任意 $\omega\notin N$，由 $f$ 的连续性可得

$$
\lim_{n\to\infty}f(X_n(\omega))
=f\left(\lim_{n\to\infty}X_n(\omega)\right)=f(X(\omega)).
$$

这对 $N$ 之外的每个 $\omega$ 都成立，因此所求的收敛几乎必然成立。

（b）固定 $\varepsilon>0$，记 $B_n=\{|f(X_n)-f(X)|>\varepsilon\}$。对每个 $k>0$，有

$$
B_n\subseteq (B_n\cap\{|X|\le k\})\cup\{|X|>k\}.
\tag{17.2}
$$

连续函数 $f$ 在紧区间 $[-k-1,k+1]$ 上一致连续。因此存在 $\delta\in(0,1]$，使该区间内的 $x,y$ 只要满足 $|x-y|\le\delta$，就有 $|f(x)-f(y)|\le\varepsilon$。在 $|X|\le k$ 且 $|X_n-X|\le\delta$ 时，$X_n$ 和 $X$ 都在这个区间内。因此

$$
\begin{aligned}
B_n\cap\{|X|\le k\}
&\subseteq\{|X_n-X|>\delta,\ |X|\le k\}\\
&\subseteq\{|X_n-X|>\delta\}.
\end{aligned}
$$

结合（17.2），得到

$$
B_n\subseteq\{|X_n-X|>\delta\}\cup\{|X|>k\}.
\tag{17.3}
$$

由次可加性 $P(A\cup B)\le P(A)+P(B)$，

$$
P(B_n)\le P(|X_n-X|>\delta)+P(|X|>k).
$$

当 $k\to\infty$ 时，事件 $\{|X|>k\}$ 递减到空集，所以 $P(|X|>k)\to0$。对任意 $\gamma>0$，选取足够大的 $k$，使 $P(|X|>k)<\gamma$。固定 $k$ 后，即可取（17.3）中相应的 $\delta$。于是

$$
\begin{aligned}
\limsup_{n\to\infty}P(B_n)
&\le\lim_{n\to\infty}P(|X_n-X|>\delta)+\gamma\\
&=\gamma.
\end{aligned}
$$

由于 $\gamma>0$ 任意，所求结论成立。$\square$
