---
title: "Weak Convergence"
date: "2026-11-09"
tag: "Math & CS"
compact: true
math: true
summary: "Chapter Eighteen Notes of MA-UY 3514 Honors Theory of Probability"
---

## 18 弱收敛

第 17 章讨论了随机变量的四种收敛：处处逐点收敛、几乎必然收敛、$p$ 阶平均收敛（$L^p$ 收敛）和依概率收敛。后三种有别于初等微积分里常见的收敛，但仍属于数学分析的范畴，可以看成通常的逐点收敛的变体。它们在概率论中自然且有用。本章要讨论的**弱收敛**与这四种有根本区别，是概率论和统计学的基础概念。

顾名思义，弱收敛的条件较宽松，随机变量序列更容易有极限。它只关心随机变量取值的概率。发生收敛的是随机变量的**概率分布**，所以弱收敛与逐点收敛及其变体属于不同类型。既然要研究分布的收敛，我们先从 $\mathbb R^d$ 上的概率测度说起，其中 $d\ge1$。

### 定义 18.1（概率测度的弱收敛）

设 $\mu_n$ 和 $\mu$ 是 $\mathbb R^d$ 上的概率测度。如果对每个实值、有界且连续的函数 $f$，都有

$$
\lim_{n\to\infty}\int f(x)\,\mu_n(dx)=\int f(x)\,\mu(dx),
$$

就说 $\mu_n$ **弱收敛**到 $\mu$。

乍看之下，这个定义可能像是排印错误。我们习惯考察 $\lim_{n\to\infty}\int f_n(x)\,\mu(dx)=\int f(x)\,\mu(dx)$，但这里固定的是 $f$，变化的确实是测度。测试函数只取有界 Borel 可测函数中连续的那一部分。

### 定义 18.2（依分布收敛）

设 $(X_n)_{n\ge1}$ 和 $X$ 取值于 $\mathbb R^d$。如果分布测度 $P^{X_n}$ 弱收敛到 $P^X$，就说 $X_n$ **依分布收敛**到 $X$，记为 $X_n\xrightarrow{\mathcal D}X$，也可写作 $X_n\xrightarrow{\mathcal L}X$。

### 定理 18.1（有界连续函数判据）

设 $(X_n)_{n\ge1}$ 和 $X$ 是取值于 $\mathbb R^d$ 的随机变量。$X_n\xrightarrow{\mathcal D}X$ 当且仅当对 $\mathbb R^d$ 上每个有界连续函数 $f$，都有

$$
\lim_{n\to\infty}E\{f(X_n)\}=E\{f(X)\}.
$$

**证明。** 由 $E\{f(X_n)\}=\int f(x)\,P^{X_n}(dx)$ 和 $E\{f(X)\}=\int f(x)\,P^X(dx)$，结合定义 18.1 和 18.2 即可。$\square$

依分布收敛允许 $(X_n)_{n\ge1}$ 和 $X$ 定义在不同的概率空间上。例如在统计学中，一列定义在同一个空间上的随机变量，可能依分布收敛到一个无法在该空间上实现的随机变量。这让弱收敛能够描述其他收敛方式无法描述的极限。

几乎必然收敛、$L^p$ 收敛和依概率收敛都要求 $(X_n)_{n\ge1}$ 和 $X$ 定义在同一个概率空间上。因此，直接比较这些收敛方式之前，需要先确保各变量确实在同一个空间上。若碰巧如此，或可以构造出这样的共同空间，就可以比较。

### 定理 18.2（依概率收敛推出依分布收敛）

设 $(X_n)_{n\ge1}$ 和 $X$ 都定义在固定的概率空间 $(\Omega,\mathcal A,P)$ 上。若 $X_n$ 依概率收敛到 $X$，则 $X_n$ 也依分布收敛到 $X$。

**证明。** 取 $\mathbb R^d$ 上任意有界连续函数 $f$。由定理 17.5，$f(X_n)$ 依概率收敛到 $f(X)$。由于 $f$ 有界，定理 17.4 给出 $f(X_n)$ 在 $L^1$ 中收敛到 $f(X)$。再由（17.1）得 $E\{f(X_n)\}\to E\{f(X)\}$，应用定理 18.1 即得结论。$\square$

### 定理 18.3（极限为常数时的逆命题）

定理 18.2 有一个适用范围很窄的逆命题。设 $(X_n)_{n\ge1}$ 和 $X$ 都定义在固定的概率空间 $(\Omega,\mathcal A,P)$ 上。若 $X_n$ 依分布收敛到 $X$，且 $X$ 几乎必然等于某个常数，则 $X_n$ 也依概率收敛到 $X$。

**证明。** 设 $X=a$ 几乎必然成立。函数 $f(x)=|x-a|/(1+|x-a|)$ 有界且连续，所以定理 18.1 给出 $\lim_{n\to\infty}E\{|X_n-a|/(1+|X_n-a|)\}=0$。由定理 17.1，$X_n$ 依概率收敛到 $a$，也就依概率收敛到 $X$。$\square$

### 定理 18.4（分布函数的连续点判据）

很容易猜想，若 $X_n\xrightarrow{\mathcal D}X$，那么对所有 Borel 集 $A$ 都有 $P(X_n\in A)\to P(X\in A)$。一般情形远非如此，只有某些特殊的集合 $A$ 能保证这一点。这与实值随机变量的分布函数有关。要使 $F_n(x)=P(X_n\le x)$ 对每个实数 $x$ 都收敛到 $F(x)=P(X\le x)$，必须对所有形如 $(-\infty,x]$ 的集合都有上述概率收敛，但连这些集合也无法一概保证。

以下设 $(X_n)_{n\ge1}$ 和 $X$ 为实值随机变量，分布函数分别为 $(F_n)_{n\ge1}$ 和 $F$。下面的定理证明较难，可以略读。如果极限变量 $X$ 的分布函数 $F$ 本身连续，论证会简单许多，这也足以应付很多应用。这里仍给出完整证明。回顾分布函数 $F$ 单调不减且右连续，所以每个 $x$ 的左极限 $F(x-)=\lim_{y\uparrow x}F(y)$ 都存在（见习题 18.4）。

- （a）若 $X_n\xrightarrow{\mathcal D}X$，则对稠密集 $D=\{x:F(x-)=F(x)\}$ 中的每个 $x$，都有 $F_n(x)\to F(x)$。$D$ 也称为 $F$ 的连续点集。
- （b）若在 $\mathbb R$ 的某个稠密子集上，每个 $x$ 都满足 $F_n(x)\to F(x)$，则 $X_n\xrightarrow{\mathcal D}X$。

**证明。** （a）设 $X_n\xrightarrow{\mathcal D}X$。$D$ 的补集是 $F$ 的间断点集，至多可数（见习题 18.4 和 18.5），而可数集的补集在 $\mathbb R$ 中总是稠密的。

固定 $x\in\mathbb R$。对每个整数 $p\ge1$，定义有界连续函数

$$
f_p(y)=
\begin{cases}
1,& y\le x,\\
p(x-y)+1,& x<y<x+1/p,\\
0,& x+1/p\le y,
\end{cases}
$$

$$
g_p(y)=
\begin{cases}
1,& y\le x-1/p,\\
p(x-y),& x-1/p<y<x,\\
0,& x\le y.
\end{cases}
$$

对每个 $p\ge1$，由定理 18.1 得 $E\{f_p(X_n)\}\to E\{f_p(X)\}$ 和 $E\{g_p(X_n)\}\to E\{g_p(X)\}$。又因为 $E\{g_p(X_n)\}\le F_n(x)\le E\{f_p(X_n)\}$，所以

$$
\begin{gathered}
E\{g_p(X)\}\le\liminf_{n\to\infty}F_n(x)\\
\le\limsup_{n\to\infty}F_n(x)\le E\{f_p(X)\}.
\end{gathered}
\tag{18.1}
$$

当 $p\to\infty$ 时，$f_p(y)\to1_{(-\infty,x]}(y)$，且 $g_p(y)\to1_{(-\infty,x)}(y)$。由勒贝格控制收敛定理（定理 9.1（f）），

$$
\begin{aligned}
\lim_{p\to\infty}E\{f_p(X)\}
&=E\{1_{(-\infty,x]}(X)\}\\
&=P(X\le x)=F(x).
\end{aligned}
$$

同理，$\lim_{p\to\infty}E\{g_p(X)\}=F(x-)$，即 $F$ 在 $x$ 的左极限。代入（18.1），得

$$
\begin{gathered}
F(x-)\le\liminf_{n\to\infty}F_n(x)\\
\le\limsup_{n\to\infty}F_n(x)\le F(x).
\end{gathered}
\tag{18.2}
$$

若 $x\in D$，则 $F(x-)=F(x)$，所以 $F_n(x)\to F(x)$。

**（b）** 设在稠密子集 $\Delta\subseteq\mathbb R$ 上有 $F_n(x)\to F(x)$。取任意有界连续函数 $f$ 和 $\varepsilon>0$。选 $r,s\in\Delta$，使

$$
P(X\notin(r,s])=1-F(s)+F(r)\le\varepsilon.
$$

因为 $F$ 在 $-\infty$ 处趋于 $0$、在 $+\infty$ 处趋于 $1$，而 $\Delta$ 稠密，所以可以选出这样的 $r,s$。又由 $F_n$ 在 $\Delta$ 上的收敛，存在 $N_1$，使得 $n\ge N_1$ 时

$$
\begin{aligned}
P(X_n\notin(r,s])&=1-F_n(s)+F_n(r)\\
&\le2\varepsilon.
\end{aligned}
\tag{18.3}
$$

由于 $[r,s]$ 是紧区间，$f$ 在其上一致连续。于是可选有限个点 $r=r_0<r_1<\cdots<r_k=s$，使得 $r_{j-1}\le x\le r_j$ 时有 $|f(x)-f(r_j)|\le\varepsilon$。由 $\Delta$ 的稠密性，可以让所有 $r_j$ 都属于 $\Delta$。令

$$
g(x)=\sum_{j=1}^{k}f(r_j)1_{(r_{j-1},r_j]}(x).
\tag{18.4}
$$

则在 $(r,s]$ 上有 $|f(x)-g(x)|\le\varepsilon$。记 $\alpha=\sup_x|f(x)|$。由于 $g$ 在 $(r,s]$ 外为零，

$$
\begin{gathered}
|E\{f(X_n)\}-E\{g(X_n)\}|\\
\le\alpha P(X_n\notin(r,s])+\varepsilon.
\end{gathered}
\tag{18.5}
$$

把 $X_n$ 换成 $X$，同样的不等式成立。根据（18.4），

$$
\begin{aligned}
E\{g(X_n)\}
&=\sum_{j=1}^k f(r_j)\{F_n(r_j)-F_n(r_{j-1})\},\\
E\{g(X)\}
&=\sum_{j=1}^k f(r_j)\{F(r_j)-F(r_{j-1})\}.
\end{aligned}
$$

所有 $r_j$ 都在 $\Delta$ 中，且只有有限项，所以存在 $N_2$，使得 $n\ge N_2$ 时

$$
|E\{g(X_n)\}-E\{g(X)\}|\le\varepsilon.
\tag{18.6}
$$

当 $n\ge\max(N_1,N_2)$ 时，用三角不等式把 $|E\{f(X_n)\}-E\{f(X)\}|$ 分成从 $f(X_n)$ 到 $g(X_n)$、从 $g(X_n)$ 到 $g(X)$、再从 $g(X)$ 到 $f(X)$ 的三项期望差。结合（18.3）、（18.5）和（18.6），得到

$$
\begin{gathered}
|E\{f(X_n)\}-E\{f(X)\}|\\
\le (2\alpha\varepsilon+\varepsilon)+\varepsilon
   +(\alpha\varepsilon+\varepsilon)
=3\alpha\varepsilon+3\varepsilon.
\end{gathered}
$$

由于 $\varepsilon$ 任意，对所有有界连续 $f$ 都有 $E\{f(X_n)\}\to E\{f(X)\}$。由定理 18.1 即得结论。$\square$


### 例 1（点质量测度）

设 $(\mu_n)_{n\ge1}$ 是 $\mathbb R$ 上一列点质量测度，也称狄拉克测度。也就是说，对每个 $n$ 都有一点 $\alpha_n$，使 $\mu_n(\{\alpha_n\})=1$，且

$$
\mu_n(\{\alpha_n\}^c)=\mu_n(\mathbb R\setminus\{\alpha_n\})=0.
$$

$\mu_n$ 有弱极限 $\mu$ 当且仅当 $\alpha_n$ 收敛到某点 $\alpha$，此时 $\mu$ 是集中在 $\alpha$ 的点质量测度。文献中常用 $\varepsilon_\alpha$ 或 $\delta_\alpha$ 表示在 $\alpha$ 处质量为 $1$ 的测度。注意 $F_n(x)=1_{[\alpha_n,\infty)}(x)$。因此，如果在稠密子集上有 $F_n(x)\to F(x)$，由这些阶跃函数的形式可知，作为分布函数的 $F$ 必为 $1_{[\alpha,\infty)}$，其中 $\alpha=\lim_{n\to\infty}\alpha_n$。

### 例 2（均匀分布收缩到一点）

令

$$
F_n(x)=
\begin{cases}
0,& x\le-1/n,\\
\tfrac12+\tfrac n2 x,& -1/n<x<1/n,\\
1,& x\ge1/n.
\end{cases}
$$

除 $x=0$ 外，每个 $x$ 都满足 $\lim_{n\to\infty}F_n(x)=F(x)=1_{[0,\infty)}(x)$。因此，定理 18.4 中的连续点集为 $D=\mathbb R\setminus\{0\}$。若 $X_n$ 的分布函数为 $F_n$，则 $X_n\xrightarrow{\mathcal D}X$，其中 $X=0$ 几乎必然成立，其分布函数就是 $F$。换句话说，若 $X_n$ 在 $(-1/n,1/n)$ 上均匀分布，则 $X_n$ 弱收敛到常数 $0$。

### 例 3（密度有共同的可积上界）

设 $(X_n)_{n\ge1}$ 和 $X$ 的密度分别为 $f_n$ 和 $f$。分布函数 $F(x)=\int_{-\infty}^x f(u)\,du$ 连续，所以在整个 $\mathbb R$ 上都有 $F(x-)=F(x)$。假设对所有 $n,x$ 都有 $f_n(x)\le g(x)$，且 $\int_{\mathbb R}g(x)\,dx<\infty$，又有 $f_n(x)\to f(x)$ 几乎处处成立。由勒贝格控制收敛定理，$F_n(x)\to F(x)$，从而 $X_n\xrightarrow{\mathcal D}X$。

也可以直接用勒贝格控制收敛定理验证，对任意有界连续函数 $h$ 都有

$$
\begin{aligned}
\lim_{n\to\infty}\int h(x)\,P^{X_n}(dx)
&=\lim_{n\to\infty}\int h(x)f_n(x)\,dx\\
&=\int h(x)\lim_{n\to\infty}f_n(x)\,dx\\
&=\int h(x)f(x)\,dx\\
&=\int h(x)\,P^X(dx).
\end{aligned}
$$

这给出了 $X_n\xrightarrow{\mathcal D}X$ 的另一种证明，也适用于多维情形。实际上，这里得到的收敛比弱收敛稍强，因为以上论证对任意有界可测函数 $h$ 都成立。

### 定理 18.5（密度逐点收敛）

上一个例子还可以推广。即使整个函数序列没有共同的可积控制函数，有时也能交换极限与积分。这里用到每个 $f_n$ 以及 $f$ 的积分都等于 $1$。

设 $(X_n)_{n\ge1}$ 和 $X$ 取值于 $\mathbb R^d$，密度分别为 $f_n$ 和 $f$。如果 $f_n$ 逐点收敛到 $f$，甚至只要求几乎处处收敛，就有 $X_n\xrightarrow{\mathcal D}X$。

**证明。** 取 $\mathbb R^d$ 上的有界可测函数 $h$，令 $\alpha=\sup_x|h(x)|$，并设 $h_1=h+\alpha$、$h_2=\alpha-h$。两者均非负，所以 $h_1f_n$ 和 $h_2f_n$ 也非负。对 $i=1,2$，$h_if_n$ 几乎处处收敛到 $h_if$。由法图引理（见定理 9.1），

$$
\begin{aligned}
E\{h_i(X)\}&=\int f(x)h_i(x)\,dx\\
&\le\liminf_{n\to\infty}\int f_n(x)h_i(x)\,dx\\
&=\liminf_{n\to\infty}E\{h_i(X_n)\}.
\end{aligned}
\tag{18.7}
$$

注意 $E\{h(X_n)\}=E\{h_1(X_n)\}-\alpha=\alpha-E\{h_2(X_n)\}$，把 $X_n$ 换成 $X$ 也一样。依次对 $i=1,2$ 应用（18.7），并利用 $\liminf x_n=-\limsup(-x_n)$，得到

$$
\begin{aligned}
E\{h(X)\}&\le\liminf_{n\to\infty}E\{h(X_n)\},\\
E\{h(X)\}&\ge\limsup_{n\to\infty}E\{h(X_n)\}.
\end{aligned}
$$

因此 $E\{h(X_n)\}\to E\{h(X)\}$，从而定理成立。$\square$

### 定理 18.6（Helly 选取原理）

下面是 Helly 选取原理的一个版本。证明较难，但后面建立弱收敛与特征函数收敛的关系时会用到它。条件（18.8）称为**紧性**，意思是可以选择一个紧集，使所有测度在其补集上的质量一致地任意小。

设 $(\mu_n)_{n\ge1}$ 是 $\mathbb R$ 上一列概率测度，且

$$
\lim_{m\to\infty}\sup_n\mu_n([-m,m]^c)=0.
\tag{18.8}
$$

则存在子序列 $(\mu_{n_k})_{k\ge1}$ 弱收敛。

**证明。** 令 $F_n(x)=\mu_n((-\infty,x])$。对每个固定的 $x\in\mathbb R$，都有 $0\le F_n(x)\le1$，所以由 Bolzano–Weierstrass 定理，总能选出使 $F_{n_k}(x)$ 收敛的子序列。此时子序列可能依赖于 $x$。

为在可数多个点上同时构造极限，先把有理数 $\mathbb Q$ 枚举为 $r_1,r_2,\ldots$。对 $r_1$，选一个子序列 $(n_{1,k})$，使得 $G(r_1)=\lim_{k\to\infty}F_{n_{1,k}}(r_1)$ 存在。再从中选出子序列 $(n_{2,k})$，使 $G(r_2)=\lim_{k\to\infty}F_{n_{2,k}}(r_2)$ 存在。依此类推，对 $r_j$，从 $(n_{j-1,k})$ 中选出子序列 $(n_{j,k})$，并设

$$
G(r_j)=\lim_{k\to\infty}F_{n_{j,k}}(r_j).
$$

取对角子序列 $n_k=n_{k,k}$。对每个固定的 $j$，当 $k\ge j$ 时，$(n_k)$ 的这段尾部是 $(n_{j,k})$ 的子序列。因此 $G(r_j)=\lim_{k\to\infty}F_{n_k}(r_j)$。定义

$$
F(x)=\inf_{\substack{y\in\mathbb Q\\y>x}}G(y).
\tag{18.9}
$$

由于 $\mathbb Q$ 上的 $G$ 单调不减，$F$ 也单调不减，并且按上述构造右连续。给定 $\varepsilon>0$，由假设可选 $m$，使得对所有 $n$ 都有 $\mu_n([-m,m]^c)\le\varepsilon$。因此，当 $x<-m$ 时有 $F_n(x)\le\varepsilon$，当 $x>m$ 时有 $F_n(x)\ge1-\varepsilon$。相同的界也适用于有理数上的 $G$，进而有

$$
\begin{cases}
F(x)\le\varepsilon,&x<-m,\\
F(x)\ge1-\varepsilon,&x\ge m.
\end{cases}
\tag{18.10}
$$

由于 $0\le F\le1$，且 $F$ 右连续、单调不减，由（18.10）可知 $F$ 是一个分布函数，对应于 $\mathbb R$ 上的某个概率测度 $\mu$。

最后，设 $F(x-)=F(x)$。对任意 $\varepsilon>0$，可以选有理数 $y<x<z$，使

$$
\begin{gathered}
F(x)-\varepsilon\le G(y)\le F(x),\\
F(x)\le G(z)\le F(x)+\varepsilon.
\end{gathered}
$$

其中下界可先取 $t<x$，使 $F(t)>F(x)-\varepsilon$，再取有理数 $y\in(t,x)$，于是 $G(y)\ge F(t)$。上界则直接由（18.9）选取 $z$。因此，当 $k$ 足够大时，

$$
\begin{gathered}
F(x)-2\varepsilon\le F_{n_k}(y)\\
\le F_{n_k}(x)\le F_{n_k}(z)\le F(x)+2\varepsilon.
\end{gathered}
\tag{18.11}
$$

取下极限和上极限，保留端点上的有理数极限，得到

$$
\begin{gathered}
F(x)-2\varepsilon\le G(y)\le\liminf_{k\to\infty}F_{n_k}(x),\\
\limsup_{k\to\infty}F_{n_k}(x)\le G(z)\le F(x)+2\varepsilon.
\end{gathered}
$$

令 $\varepsilon\downarrow0$，由夹逼得到 $\lim_{k\to\infty}F_{n_k}(x)=F(x)$。因此，由定理 18.4，$\mu_{n_k}$ 弱收敛到 $\mu$。$\square$

**注 18.1。** 这个定理也有多维版本，证明类似但更复杂。若 $\mu_n$ 是 $\mathbb R^d$ 上的概率测度，只需将（18.8）替换为

$$
\lim_{m\to\infty}\sup_n\mu_n(\{x\in\mathbb R^d:|x|>m\})=0.
\tag{18.12}
$$



### 定理 18.7（有界 Lipschitz 函数判据）

要证明弱收敛，只需在一类适当选取的有界连续函数上验证 $\int f\,d\mu_n\to\int f\,d\mu$。下面用随机变量来表述这个结果。

设 $(X_n)_{n\ge1}$ 和 $X$ 取值于 $\mathbb R$ 或 $\mathbb R^d$。$X_n\xrightarrow{\mathcal D}X$ 当且仅当对每个有界 Lipschitz 连续函数 $g$，都有 $E\{g(X_n)\}\to E\{g(X)\}$。

**证明。** 函数 $g$ 是 Lipschitz 连续的，是指存在常数 $k$，使对所有 $x,y$ 都有 $|g(x)-g(y)|\le k\|x-y\|$。必要性由定理 18.1 立即得到。为证充分性，只需对每个有界连续函数 $f$ 证明 $E\{f(X_n)\}\to E\{f(X)\}$。

固定这样的 $f$，记 $\alpha=\sup_x|f(x)|$。先假设存在一列 Lipschitz 连续函数 $g_i$，满足 $-\alpha\le g_i\le g_{i+1}\le f$，且 $g_i(x)\to f(x)$。那么对每个固定的 $i$，由假设有

$$
\begin{aligned}
\liminf_{n\to\infty}E\{f(X_n)\}
&\ge\liminf_{n\to\infty}E\{g_i(X_n)\}\\
&=E\{g_i(X)\}.
\end{aligned}
$$

对 $g_i(X)+\alpha$ 应用单调收敛定理，得到 $\lim_{i\to\infty}E\{g_i(X)\}=E\{f(X)\}$。于是

$$
\liminf_{n\to\infty}E\{f(X_n)\}\ge E\{f(X)\}.
\tag{18.13}
$$

对 $-f$ 作同样的论证，得到

$$
\limsup_{n\to\infty}E\{f(X_n)\}\le E\{f(X)\}.
\tag{18.14}
$$

结合（18.13）和（18.14），便有 $\lim_{n\to\infty}E\{f(X_n)\}=E\{f(X)\}$。

剩下的就是构造 $g_i$。只要找到一列 Lipschitz 函数 $j_1,j_2,\ldots$，使 $j_k\ge-\alpha$ 且 $\sup_k j_k(x)=f(x)$，取 $g_i(x)=\max\{j_1(x),\ldots,j_i(x)\}$ 即可。必要时先将 $f$ 平移为 $f+\alpha$，构造完成后再减去 $\alpha$，所以可先假定 $f\ge0$。

对 Borel 集 $A$，定义到 $A$ 的距离

$$
d_A(x)=\inf_{y\in A}\|x-y\|.
$$

对非负有理数 $r$ 和正整数 $m$，令

$$
j_{m,r}(x)=r\wedge\bigl(m\,d_{\{y:f(y)\le r\}}(x)\bigr),
$$

其中 $\wedge$ 表示取最小值。如果下标中的集合为空，就约定距离为 $+\infty$，于是 $j_{m,r}$ 是常数 $r$。对非空集 $A$，有 $|d_A(x)-d_A(y)|\le\|x-y\|$，因此 $|j_{m,r}(x)-j_{m,r}(y)|\le m\|x-y\|$，即 $j_{m,r}$ 是 Lipschitz 连续的。此外，$j_{m,r}(x)\le r$，且当 $f(x)\le r$ 时 $j_{m,r}(x)=0$，所以 $0\le j_{m,r}(x)\le f(x)$。

固定 $x$ 和 $\varepsilon>0$。若 $f(x)=0$，则所有 $j_{m,r}(x)$ 都为零。若 $f(x)>0$，选正有理数 $r$，使 $f(x)-\varepsilon<r<f(x)$。由连续性，$x$ 的某个邻域内处处有 $f(y)>r$。因此 $d_{\{y:f(y)\le r\}}(x)>0$，只要 $m$ 足够大，就有 $j_{m,r}(x)=r>f(x)-\varepsilon$。由于正整数与非负有理数都是可数的，可将这些函数枚举为 $(j_i)_{i\ge1}$。上面的论证表明 $\sup_i j_i(x)\ge f(x)$，再由每个 $j_i\le f$ 得 $\sup_i j_i(x)=f(x)$，构造完成。$\square$

### 推论 18.1（有界一致连续函数判据）

设 $(X_n)_{n\ge1}$ 和 $X$ 取值于 $\mathbb R$ 或 $\mathbb R^d$。$X_n\xrightarrow{\mathcal D}X$ 当且仅当对每个有界一致连续函数 $g$，都有 $E\{g(X_n)\}\to E\{g(X)\}$。

**证明。** 一致连续函数是连续函数，所以必要性由定理 18.1 得到。Lipschitz 连续函数一定一致连续，所以充分性由定理 18.7 得到。$\square$

**注 18.2。** 定理 18.7 将弱收敛的测试函数从有界连续函数缩小到有界 Lipschitz 连续函数。还可以进一步缩小到具有紧支集的 $C^\infty$ 函数。参见习题 18.19–18.22。那些习题的解答也表明，$X_n$ 依分布收敛到 $X$，等价于对所有有界 $C^\infty$ 函数 $f$ 都有 $E\{f(X_n)\}\to E\{f(X)\}$。

### 定理 18.8（Slutsky 定理）

这是定理 18.7 的一个推论，在统计学中很有用。设 $(X_n)_{n\ge1}$ 和 $(Y_n)_{n\ge1}$ 是两列取值于 $\mathbb R^d$ 的随机变量，且 $X_n\xrightarrow{\mathcal D}X$，$\|X_n-Y_n\|\xrightarrow{P}0$。则 $Y_n\xrightarrow{\mathcal D}X$。

**证明。** 根据定理 18.7，只需对每个有界 Lipschitz 连续函数 $f$ 证明 $E\{f(Y_n)\}\to E\{f(X)\}$。设 $|f(x)-f(y)|\le k\|x-y\|$ 且 $|f(x)|\le\alpha$。固定 $\varepsilon>0$，记 $A_n=\{\|X_n-Y_n\|>\varepsilon\}$、$Z_n=|f(X_n)-f(Y_n)|$。在 $A_n^c$ 上有 $Z_n\le k\varepsilon$，因此

$$
\begin{aligned}
|E\{f(X_n)-f(Y_n)\}|
&\le E\{Z_n\}\\
&\le k\varepsilon+E\{Z_n1_{A_n}\}\\
&\le k\varepsilon+2\alpha P(A_n).
\end{aligned}
$$

由依概率收敛，$2\alpha P(A_n)\to0$。取上极限，再令 $\varepsilon\downarrow0$，得到 $|E\{f(X_n)-f(Y_n)\}|\to0$。于是

$$
\begin{aligned}
\lim_{n\to\infty}E\{f(Y_n)\}
&=\lim_{n\to\infty}E\{f(X_n)\}\\
&=E\{f(X)\}.
\end{aligned}
$$

所以定理成立。$\square$

### 定理 18.9（可数状态空间上的概率质量判据）

最后考察取值至多可数的随机变量，例如二项、泊松和超几何随机变量。给状态空间赋予离散拓扑后，每个函数都是连续的。如果状态空间 $E$ 本来就包含在 $\mathbb R$ 中，需要区分离散拓扑和从 $\mathbb R$ 继承的拓扑。只有当 $E$ 的每个点在 $E$ 中都是孤立点时，两者才相同。一个充分条件是对每个 $m>0$，$E\cap[-m,m]$ 中不同点之间的距离有正下界，如 $E=\mathbb N$ 或 $E=\mathbb Z$。下面的判据可与定理 18.5 对照。

设 $X_n$ 和 $X$ 取值于同一个至多可数的离散状态空间 $E$。在这个离散拓扑下，$X_n\xrightarrow{\mathcal D}X$ 当且仅当对每个 $j\in E$，都有

$$
\lim_{n\to\infty}P(X_n=j)=P(X=j).
$$

**证明。** 先设 $X_n\xrightarrow{\mathcal D}X$。由有界连续函数判据，对任意有界连续 $f$ 都有 $E\{f(X_n)\}\to E\{f(X)\}$。在离散拓扑下，每个函数都是连续的，所以取 $f(x)=1_{\{j\}}(x)$ 即可。

反过来，设对每个 $j\in E$ 都有 $P(X_n=j)\to P(X=j)$。取任意有界函数 $f$，记 $\alpha=\sup_j|f(j)|$。给定 $\varepsilon>0$，因为 $\sum_{j\in E}P(X=j)=1$，所以存在有限子集 $\Lambda\subseteq E$，使 $\sum_{j\in\Lambda}P(X=j)\ge1-\varepsilon$。由于每一项概率都收敛且 $\Lambda$ 有限，当 $n$ 足够大时，也有 $\sum_{j\in\Lambda}P(X_n=j)\ge1-2\varepsilon$。

注意 $E\{f(X)\}=\sum_{j\in E}f(j)P(X=j)$。对任意取值于 $E$ 的随机变量 $W$，记 $S_\Lambda(W)=\sum_{j\in\Lambda}f(j)P(W=j)$。由上面的尾概率界，对充分大的 $n$ 有

$$
\begin{aligned}
|E\{f(X)\}-S_\Lambda(X)|&\le\alpha\varepsilon,\\
|E\{f(X_n)\}-S_\Lambda(X_n)|&\le2\alpha\varepsilon.
\end{aligned}
\tag{18.15}
$$

由于 $\Lambda$ 有限，

$$
\lim_{n\to\infty}S_\Lambda(X_n)=S_\Lambda(X).
\tag{18.16}
$$

由（18.15）和（18.16）可得

$$
\limsup_{n\to\infty}|E\{f(X_n)\}-E\{f(X)\}|
\le3\alpha\varepsilon.
$$

由于 $\varepsilon$ 任意，对每个有界函数 $f$ 都有 $E\{f(X_n)\}\to E\{f(X)\}$。由有界连续函数判据，$X_n\xrightarrow{\mathcal D}X$。$\square$

### 例 4（泊松分布的参数收敛）

若 $\mu_\lambda$ 表示参数为 $\lambda$ 的泊松分布，则 $\mu_\lambda(j)=e^{-\lambda}\lambda^j/j!$，其中 $j=0,1,2,\ldots$。因此，如果 $\lambda_n\to\lambda$，对每个 $j$ 都有 $\mu_{\lambda_n}(j)\to\mu_\lambda(j)$。由定理 18.9，$\mu_{\lambda_n}$ 弱收敛到 $\mu_\lambda$。

### 例 5（二项分布的参数收敛）

固定试验次数 $n$，令 $\mu_p$ 表示二项分布 $B(p,n)$。若 $p_k\to p$，则与例 4 类似，每一点的概率质量都收敛，由定理 18.9 可知 $\mu_{p_k}$ 弱收敛到 $\mu_p$。

### 例 6（二项分布的泊松极限）

令 $\mu_{n,p}$ 表示二项分布 $B(p,n)$。考虑 $\mu_{n,p_n}$，其中 $np_n\to\lambda>0$。像习题 4.1 那样，将概率质量函数分解。记 $\lambda_n=np_n$，则对 $0\le k\le n$ 以及充分大的 $n$，有

$$
\begin{aligned}
\mu_{n,p_n}(k)
&=\frac{\lambda_n^k}{k!}
  \left(1-\frac{\lambda_n}{n}\right)^n\\
&\quad{}\times\prod_{j=0}^{k-1}\frac{n-j}{n}
  \left(1-\frac{\lambda_n}{n}\right)^{-k}.
\end{aligned}
$$

固定 $k$，乘积与最后一个因子都趋于 $1$，而 $(1-\lambda_n/n)^n\to e^{-\lambda}$，所以

$$
\lim_{n\to\infty}\mu_{n,p_n}(k)
=\frac{\lambda^k}{k!}e^{-\lambda}.
$$

由定理 18.9，$\mu_{n,p_n}$ 弱收敛到参数为 $\lambda=\lim_{n\to\infty}np_n$ 的泊松分布。

*来源：Jean Jacod 与 Philip Protter，Probability Essentials，第 18 章，Springer，2004 年。*
