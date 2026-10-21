---
title: "联合分布随机变量：联合、条件、卷积与变量变换"
date: "2026-10-20"
tag: "Math & CS"
compact: true
math: true
summary: "Ross《A First Course in Probability》第六章笔记：联合与边缘分布、独立性、卷积、条件分布、次序统计量、Jacobian 变换及可交换性，附关键证明与典型例子。"
---

本文整理 Sheldon Ross, *A First Course in Probability*, 10th edition，第六章 **Jointly Distributed Random Variables**（正文页码 237–290；所用 PDF 第 380–453 页）。沿用原书 6.1–6.8 的结构，以定义、核心结论和推导为主，例子作适当取舍。下文的定理编号仅用于本文。

本章的主线是：**联合分布描述多个变量如何一起变化；边缘化消去变量；条件化固定信息；变量变换把已知分布转化为新分布。** 独立性使其中许多计算可以分解。

## 6.1 联合分布函数与边缘分布

### 联合 CDF：最一般的描述

实值随机变量 $X,Y$ 的**联合累积分布函数**定义为

$$
F_{X,Y}(x,y)=P(X\le x,\,Y\le y).
$$

它既适用于离散变量，也适用于连续变量及其他类型的联合分布。对 $a_1<a_2,\ b_1<b_2$，容斥给出矩形概率：

$$
\begin{aligned}
&P(a_1<X\le a_2,\ b_1<Y\le b_2)\\
&=F(a_2,b_2)-F(a_1,b_2)\\
&\quad-F(a_2,b_1)+F(a_1,b_1).
\end{aligned}
$$

**推导。** 先从 $\{X\le a_2,Y\le b_2\}$ 中减去左侧和下侧多余的区域，再把被重复减去的左下角加回来。联合 CDF 因而确定所有这类矩形的概率，并进一步确定整个联合分布。

边缘 CDF 由极限得到：

$$
F_X(x)=\lim_{y\to\infty}F_{X,Y}(x,y),\qquad
F_Y(y)=\lim_{x\to\infty}F_{X,Y}(x,y).
$$

注意，合法的二维 CDF 除了分别单调、右连续及满足相应边界极限，还必须使上面的每一个矩形增量非负；仅有分别单调并不够。

### 离散情形：联合 PMF 与求和

定义联合概率质量函数

$$
p_{X,Y}(x,y)=P(X=x,Y=y).
$$

它满足 $p_{X,Y}(x,y)\ge0$ 且 $\sum_x\sum_y p_{X,Y}(x,y)=1$。任意事件区域 $A$ 的概率为

$$
P((X,Y)\in A)=\sum_{(x,y)\in A}p_{X,Y}(x,y).
$$

**边缘化就是把另一个变量的所有可能值加起来：**

$$
p_X(x)=\sum_y p_{X,Y}(x,y),\qquad
p_Y(y)=\sum_x p_{X,Y}(x,y).
$$

这来自不交分解 $\{X=x\}=\bigcup_y\{X=x,Y=y\}$。若联合 PMF 列成表，边缘 PMF 就是行和、列和。

**例：不放回抽球。** 袋中有 3 个红球、4 个白球、5 个蓝球，等概率抽出 3 个；令 $X,Y$ 分别表示红球和白球的个数。则

$$
p_{X,Y}(i,j)=
\frac{\binom3i\binom4j\binom5{3-i-j}}{\binom{12}3},
\qquad i,j\ge0,\quad i+j\le3.
$$

其余位置的概率为零。把白球和蓝球合并，立即得到

$$
p_X(i)=\frac{\binom3i\binom9{3-i}}{\binom{12}3},
\qquad i=0,1,2,3.
$$

这既是求和公式的应用，也是多元超几何分布的一个例子。

### 联合连续情形：密度与积分区域

若存在非负函数 $f_{X,Y}$，使任意 Borel 集 $A\subseteq\mathbb R^2$ 都满足

$$
P((X,Y)\in A)=\iint_A f_{X,Y}(x,y)\,dx\,dy,
$$

则称 $X,Y$ **联合连续**，$f_{X,Y}$ 为联合概率密度。必须有

$$
\int_{-\infty}^{\infty}\int_{-\infty}^{\infty}
f_{X,Y}(x,y)\,dx\,dy=1.
$$

相应地，

$$
F_{X,Y}(a,b)=\int_{-\infty}^b\int_{-\infty}^a
f_{X,Y}(x,y)\,dx\,dy.
$$

在密度连续等适当条件下，可反过来求导：

$$
f_{X,Y}(x,y)=\frac{\partial^2}{\partial x\,\partial y}F_{X,Y}(x,y).
$$

密度的局部意义是

$$
P(x<X<x+\Delta x,\ y<Y<y+\Delta y)
\approx f_{X,Y}(x,y)\Delta x\Delta y.
$$

因此，密度值不是某一点的概率；联合连续时，每个点的概率都是零。对另一个坐标积分可得边缘密度：

$$
f_X(x)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dy,\qquad
f_Y(y)=\int_{-\infty}^{\infty}f_{X,Y}(x,y)\,dx.
$$

**例：圆盘内均匀取点。** 若 $(X,Y)$ 在半径为 $R$ 的圆盘内按面积均匀分布，则

$$
f_{X,Y}(x,y)=\frac1{\pi R^2}\mathbf1_{\{x^2+y^2<R^2\}}.
$$

固定 $x$，纵向截面的长度为 $2\sqrt{R^2-x^2}$，故

$$
f_X(x)=\frac{2\sqrt{R^2-x^2}}{\pi R^2},\qquad |x|<R,
$$

其余为零；$Y$ 的边缘密度同理。**在圆盘内均匀，并不意味着每个坐标都均匀。** 若 $D=\sqrt{X^2+Y^2}$，则由面积比

$$
F_D(d)=\frac{d^2}{R^2},\quad
f_D(d)=\frac{2d}{R^2}\quad(0<d<R),\qquad
E[D]=\frac{2R}{3}.
$$

这也展示了求函数分布的通用方法：先把 $\{g(X,Y)\le t\}$ 转换成平面区域，积分得到 CDF，再求导。

**一个必要区分。** 联合连续推出各变量连续，反向一般不成立。例如 $X\sim\operatorname{Unif}(0,1)$ 且 $Y=X$，两个边缘都有密度，但全部概率集中在直线 $y=x$ 上，不存在相对于平面面积的联合密度。

### 多维推广与多项分布

对 $X_1,\ldots,X_r$，定义

$$
F(x_1,\ldots,x_r)=P(X_1\le x_1,\ldots,X_r\le x_r).
$$

边缘化时，对不需要的坐标求和或积分即可。

**多项分布。** 做 $n$ 次独立且同分布的试验，每次落入 $r$ 类之一，各类概率为 $p_1,\ldots,p_r$，且 $\sum_i p_i=1$。若 $N_i$ 是第 $i$ 类的出现次数，则

$$
P(N_1=n_1,\ldots,N_r=n_r)
=\frac{n!}{\prod_{i=1}^r n_i!}\prod_{i=1}^r p_i^{n_i},
\qquad \sum_{i=1}^r n_i=n.
$$

**推导。** 每一种满足这些次数的具体序列，其概率都是 $\prod_i p_i^{n_i}$；满足次数要求的序列共有 $n!/\prod_i n_i!$ 个。

合并类别可得

$$
N_i\sim\operatorname{Bin}(n,p_i),\qquad
\sum_{i\in I}N_i\sim\operatorname{Bin}\left(n,\sum_{i\in I}p_i\right).
$$

各个计数通常不独立，因为它们的总和固定为 $n$。

## 6.2 独立随机变量

### 定义与等价判据

$X,Y$ 独立，指对任意 Borel 集 $A,B$，

$$
P(X\in A,Y\in B)=P(X\in A)P(Y\in B).
$$

等价地，以下相应判据成立：

| 分布的表示 | 独立性判据 |
| --- | --- |
| 联合 CDF，适用于一般情形 | $F_{X,Y}(x,y)=F_X(x)F_Y(y)$，对所有 $x,y$ |
| 离散 PMF | $p_{X,Y}(x,y)=p_X(x)p_Y(y)$，对所有 $x,y$ |
| 联合 PDF | $f_{X,Y}(x,y)=f_X(x)f_Y(y)$，几乎处处 |

**定理 1：因子分解判据。** 若联合密度在整个平面上可写为

$$
f_{X,Y}(x,y)=h(x)g(y),
$$

其中 $h,g$ 非负且可积，则 $X,Y$ 独立；反向显然成立。

**证明。** 记 $H=\int h(x)\,dx,\ G=\int g(y)\,dy$。归一化给出 $HG=1$，而边缘密度为 $f_X=Gh,\ f_Y=Hg$，所以

$$
f_X(x)f_Y(y)=HGh(x)g(y)=f_{X,Y}(x,y).
$$

离散情形把积分改为求和即可。这个判据的好处是，不必事先算出边缘分布。

**支撑集也属于密度公式。** 例如

$$
f(x,y)=24xy\,\mathbf1_{\{x>0,\ y>0,\ x+y<1\}}
$$

虽然 $24xy$ 本身可以分解，但约束 $x+y<1$ 将两个坐标联系起来，不能忽略。事实上，

$$
f_X(x)=12x(1-x)^2,\qquad 0<x<1,
$$

$f_Y$ 同形；两个边缘在 $(0,1)$ 都为正，而联合密度在 $x+y>1$ 的区域为零，故不独立。

对 $n$ 个变量，相互独立要求

$$
P(X_1\in A_1,\ldots,X_n\in A_n)
=\prod_{i=1}^nP(X_i\in A_i).
$$

**两两独立不足以推出相互独立。** 例如独立公平比特 $B_1,B_2$ 与 $B_3=(B_1+B_2)\bmod2$，任意两个独立，但三个变量有确定关系。无限变量族的独立性定义为每个有限子族相互独立。对相互独立的变量，不相交两组变量的可测函数仍然独立。

### 典型结构：Poisson 分流

设总人数 $N\sim\operatorname{Pois}(\lambda)$。每人独立地以概率 $p$ 进入 A 类，否则进入 B 类，分类也独立于 $N$。令两类人数为 $X,Y$，则 $X+Y=N$。

$$
\begin{aligned}
P(X=i,Y=j)
&=P(N=i+j)\binom{i+j}{i}p^i(1-p)^j\\
&=\frac{e^{-\lambda p}(\lambda p)^i}{i!}
\frac{e^{-\lambda(1-p)}[\lambda(1-p)]^j}{j!}.
\end{aligned}
$$

因此

$$
X\sim\operatorname{Pois}(\lambda p),\qquad
Y\sim\operatorname{Pois}(\lambda(1-p)),\qquad X\perp Y.
$$

这个结论特别依赖总数是 Poisson。若总数固定为 $n$，则 $Y=n-X$；当 $n\ge1,\ 0<p<1$ 时，两者不独立。

### 几何概率与独立性

**Buffon 投针。** 平行线间距为 $d$，针长 $\ell\le d$。设针中点到最近直线的距离 $U\sim\operatorname{Unif}(0,d/2)$，针与直线法线的夹角 $\Theta\sim\operatorname{Unif}(0,\pi/2)$，两者独立。针与线相交当且仅当 $U\le(\ell/2)\cos\Theta$，所以

$$
P(\text{相交})
=\frac4{\pi d}\int_0^{\pi/2}\int_0^{(\ell/2)\cos\theta}du\,d\theta
=\frac{2\ell}{\pi d}.
$$

这里“随机投针”具体对应了两个均匀变量及其独立性的建模假设。

**补充：旋转对称如何导出正态。** 原书还说明，独立坐标与旋转不变性合在一起，会对密度施加强约束。考虑处处为正、可微的密度，并设

$$
f_X(x)f_Y(y)=q(x^2+y^2).
$$

对 $x$ 求对数导数，当 $x\ne0$ 时，

$$
\frac{f_X'(x)}{2x f_X(x)}
=\frac{q'(x^2+y^2)}{q(x^2+y^2)}.
$$

左边只依赖 $x$。任取两个非零 $x$，可选择相应的 $y$ 使半径平方相同，故左边必须为常数。于是 $(\log f_X)'=cx$，从而 $f_X(x)=Ce^{cx^2/2}$。可积性要求 $c<0$；对 $Y$ 同理，旋转对称又要求两者方差相同。因此得到两个独立同分布的零均值正态变量。

## 6.3 独立随机变量之和：卷积

### 卷积公式及其推导

设 $X,Y$ 独立且连续，$S=X+Y$。先固定 $Y=y$，则

$$
\begin{aligned}
F_S(s)
&=P(X+Y\le s)\\
&=\int_{-\infty}^{\infty}F_X(s-y)f_Y(y)\,dy.
\end{aligned}
$$

对 $s$ 求导，得到密度的**卷积**：

$$
\boxed{f_S(s)=\int_{-\infty}^{\infty}f_X(s-y)f_Y(y)\,dy.}
$$

离散情形为

$$
p_S(s)=\sum_x p_X(x)p_Y(s-x).
$$

独立性允许把联合分布分解成乘积。若不独立，在联合密度存在时应使用

$$
f_S(s)=\int_{-\infty}^{\infty}f_{X,Y}(x,s-x)\,dx,
$$

不能直接套用两个边缘密度的卷积。计算时，积分区间由两个因子的支撑集共同决定。

### 均匀变量之和与一个出现 $e$ 的例子

若 $X,Y$ 独立且都服从 $\operatorname{Unif}(0,1)$，则

$$
f_{X+Y}(s)=\int_0^1\mathbf1_{\{0<s-y<1\}}\,dy
=\begin{cases}
s,&0<s\le1,\\
2-s,&1<s<2,\\
0,&\text{otherwise}.
\end{cases}
$$

这就是三角形密度：积分值是区间 $(0,1)$ 与 $(s-1,s)$ 的交集长度。

更一般地，令 $S_n=U_1+\cdots+U_n$，其中 $U_i$ 独立且均匀分布于 $(0,1)$。在 $0\le x\le1$ 上，

$$
P(S_n\le x)=\frac{x^n}{n!}.
$$

**归纳证明。** $n=1$ 时显然。若对 $n-1$ 成立，则

$$
P(S_n\le x)
=\int_0^x\frac{(x-u)^{n-1}}{(n-1)!}\,du
=\frac{x^n}{n!}.
$$

注意 $x>1$ 时不能继续使用这一简单公式。

设不断累加这些均匀变量，直到和第一次超过 1：

$$
T=\min\{n\ge1:S_n>1\}.
$$

由于各项非负，$\{T>n\}=\{S_n\le1\}$，故 $P(T>n)=1/n!$，其中 $n=0$ 时也成立。用非负整数变量的尾和公式，

$$
E[T]=\sum_{n=0}^{\infty}P(T>n)
=\sum_{n=0}^{\infty}\frac1{n!}=e.
$$

也可以得到 $P(T=n)=(n-1)/n!$，$n\ge1$。

### Gamma 分布相加与卡方分布

本文采用 **shape–rate** 参数：

$$
X\sim\operatorname{Gamma}(\alpha,\lambda)
\quad\Longleftrightarrow\quad
f_X(x)=\frac{\lambda^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\lambda x},
\quad x>0.
$$

这里 $\alpha>0,\lambda>0$，$\lambda$ 是率参数；若使用尺度参数，则尺度为 $1/\lambda$。

**定理 2：Gamma 的可加性。** 若 $X,Y$ 独立，分别服从 $\operatorname{Gamma}(\alpha,\lambda)$ 和 $\operatorname{Gamma}(\beta,\lambda)$，则

$$
X+Y\sim\operatorname{Gamma}(\alpha+\beta,\lambda).
$$

**证明。** 对 $s>0$，卷积后令 $y=su$：

$$
\begin{aligned}
f_{X+Y}(s)
&=\frac{\lambda^{\alpha+\beta}e^{-\lambda s}}
{\Gamma(\alpha)\Gamma(\beta)}
\int_0^s(s-y)^{\alpha-1}y^{\beta-1}\,dy\\
&=\frac{\lambda^{\alpha+\beta}e^{-\lambda s}s^{\alpha+\beta-1}}
{\Gamma(\alpha)\Gamma(\beta)}B(\alpha,\beta),
\end{aligned}
$$

其中

$$
B(\alpha,\beta)=\int_0^1u^{\alpha-1}(1-u)^{\beta-1}\,du
=\frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}.
$$

代入即可。也可先认出密度关于 $s$ 的形式，再由总积分为 1 确定归一化常数；6.7 会从联合变换再次得到 Beta–Gamma 恒等式。

两个重要推论：

- 若 $X_i$ 独立且服从 $\operatorname{Exp}(\lambda)$，则 $\sum_{i=1}^nX_i\sim\operatorname{Gamma}(n,\lambda)$，表示等待第 $n$ 个事件的总时间。
- 若 $Z_i$ 独立且服从 $N(0,1)$，则 $\sum_{i=1}^nZ_i^2\sim\chi_n^2=\operatorname{Gamma}(n/2,1/2)$。

第二点来自两分支变量变换：对 $w>0$，

$$
f_{Z^2}(w)=\frac{f_Z(\sqrt w)+f_Z(-\sqrt w)}{2\sqrt w}
=\frac{w^{-1/2}e^{-w/2}}{\sqrt{2\pi}},
$$

即 $Z^2\sim\operatorname{Gamma}(1/2,1/2)$。因此

$$
f_{\chi_n^2}(w)=\frac{w^{n/2-1}e^{-w/2}}{2^{n/2}\Gamma(n/2)},
\qquad w>0.
$$

Gamma 可加性要求**率参数相同**。

### 正态变量相加：配方法的核心

**定理 3。** 若 $X_i$ 相互独立且 $X_i\sim N(\mu_i,\sigma_i^2)$，则

$$
\sum_{i=1}^n X_i\sim N\left(\sum_{i=1}^n\mu_i,\sum_{i=1}^n\sigma_i^2\right).
$$

**两变量情形的证明。** 设 $X\sim N(\mu_X,a)$，$Y\sim N(\mu_Y,b)$，其中 $a,b>0$。卷积中令

$$
t=s-\mu_X-\mu_Y,\qquad z=y-\mu_Y.
$$

指数中的二次式可配为

$$
\frac{(t-z)^2}{a}+\frac{z^2}{b}
=\frac{a+b}{ab}\left(z-\frac{bt}{a+b}\right)^2
+\frac{t^2}{a+b}.
$$

因此

$$
\begin{aligned}
f_{X+Y}(s)
&=\frac{e^{-t^2/[2(a+b)]}}{2\pi\sqrt{ab}}
\int_{-\infty}^{\infty}
e^{-\frac{a+b}{2ab}(z-\frac{bt}{a+b})^2}\,dz\\
&=\frac1{\sqrt{2\pi(a+b)}}e^{-t^2/[2(a+b)]}.
\end{aligned}
$$

这就是均值 $\mu_X+\mu_Y$、方差 $a+b$ 的正态密度。多变量情形由归纳得到。

进一步，对常数 $c_i$，独立正态变量的线性组合满足

$$
\sum_i c_iX_i\sim N\left(\sum_i c_i\mu_i,\sum_i c_i^2\sigma_i^2\right),
$$

总方差为零时理解为常量分布。特别地，独立正态变量之差的方差也是相加。若 $L_i=e^{X_i}$，则独立对数正态变量的乘积仍为对数正态，因为 $\log\prod_iL_i=\sum_iX_i$。

### Poisson 与二项分布的可加性

独立的 $X\sim\operatorname{Pois}(\lambda_1)$、$Y\sim\operatorname{Pois}(\lambda_2)$ 满足

$$
\begin{aligned}
P(X+Y=n)
&=e^{-(\lambda_1+\lambda_2)}
\sum_{k=0}^n\frac{\lambda_1^k\lambda_2^{n-k}}{k!(n-k)!}\\
&=e^{-(\lambda_1+\lambda_2)}\frac{(\lambda_1+\lambda_2)^n}{n!}.
\end{aligned}
$$

故 $X+Y\sim\operatorname{Pois}(\lambda_1+\lambda_2)$。最后一步是二项式定理。

若独立的 $X\sim\operatorname{Bin}(n,p)$、$Y\sim\operatorname{Bin}(m,p)$，则

$$
X+Y\sim\operatorname{Bin}(n+m,p).
$$

可以把它看成 $n+m$ 次独立、成功率相同的 Bernoulli 试验；代数证明则使用 Vandermonde 恒等式

$$
\sum_i\binom ni\binom m{k-i}=\binom{n+m}k.
$$

**二项分布的这个可加性要求相同的 $p$。** 不同成功率的 Bernoulli 变量之和一般不服从二项分布。

## 6.4 条件分布：离散情形

当 $p_Y(y)>0$，定义

$$
p_{X\mid Y}(x\mid y)
=P(X=x\mid Y=y)=\frac{p_{X,Y}(x,y)}{p_Y(y)}.
$$

固定 $y$ 后，这是关于 $x$ 的 PMF，因此 $\sum_xp_{X\mid Y}(x\mid y)=1$。相应的条件 CDF 为

$$
F_{X\mid Y}(a\mid y)=\sum_{x\le a}p_{X\mid Y}(x\mid y).
$$

联合、条件与边缘之间有两个基本恒等式：

$$
p_{X,Y}(x,y)=p_{X\mid Y}(x\mid y)p_Y(y),
$$

$$
p_X(x)=\sum_y p_{X\mid Y}(x\mid y)p_Y(y).
$$

独立等价于：对每个 $p_Y(y)>0$ 的 $y$，条件分布 $p_{X\mid Y}(\cdot\mid y)$ 都等于边缘分布 $p_X$。

### 独立 Poisson 变量，给定总和后变成二项分布

设 $X,Y$ 是独立 Poisson 变量，参数为 $\lambda_1,\lambda_2>0$。对于 $k=0,\ldots,n$，

$$
\begin{aligned}
P(X=k\mid X+Y=n)
&=\frac{P(X=k)P(Y=n-k)}{P(X+Y=n)}\\
&=\binom nk
\left(\frac{\lambda_1}{\lambda_1+\lambda_2}\right)^k
\left(\frac{\lambda_2}{\lambda_1+\lambda_2}\right)^{n-k}.
\end{aligned}
$$

即

$$
X\mid(X+Y=n)\sim\operatorname{Bin}
\left(n,\frac{\lambda_1}{\lambda_1+\lambda_2}\right).
$$

这是 6.2 中 Poisson 分流的反向描述。无条件时 $X,Y$ 独立，给定总和后，它们通常变得依赖。

### 多项分布的条件化与序列的等可能性

若 $(N_1,\ldots,N_r)\sim\operatorname{Mult}(n;p_1,\ldots,p_r)$，给定后 $r-k$ 类计数为 $n_{k+1},\ldots,n_r$，并记

$$
m=\sum_{j=k+1}^r n_j,\qquad q=\sum_{i=1}^k p_i>0,
$$

则在条件事件概率为正时，剩余计数的条件分布为

$$
(N_1,\ldots,N_k)\mid(N_{k+1}=n_{k+1},\ldots,N_r=n_r)
\sim\operatorname{Mult}\left(n-m;\frac{p_1}q,\ldots,\frac{p_k}q\right).
$$

即剩余的 $n-m$ 次结果只能落入前 $k$ 类，把这几类的概率重新归一化即可。

另一个常用结论：$n$ 次独立 Bernoulli$(p)$ 试验，给定恰好成功 $k$ 次后，所有 $\binom nk$ 种成功位置等可能。因为每种具体排列原来的概率都是 $p^k(1-p)^{n-k}$，所以

$$
P(\text{某个指定排列}\mid\text{成功总数}=k)=\frac1{\binom nk}.
$$

这使“给定总数”的问题可以转化为等概率抽取位置的问题。

## 6.5 条件分布：连续情形与混合情形

### 条件密度并不是把两个点概率相除

联合密度存在时，对 $f_Y(y)>0$ 的位置定义

$$
\boxed{f_{X\mid Y}(x\mid y)=\frac{f_{X,Y}(x,y)}{f_Y(y)}.}
$$

它关于 $x$ 的积分为 1，且

$$
P(X\in A\mid Y=y)=\int_A f_{X\mid Y}(x\mid y)\,dx.
$$

因为 $P(Y=y)=0$，不能把这里理解成 $P(X\in A,Y=y)/P(Y=y)$。在适当连续性条件下，可通过缩小条件区间来理解：

$$
\begin{aligned}
P(X\in A\mid y<Y<y+\Delta y)
&=\frac{\int_y^{y+\Delta y}\int_A f_{X,Y}(x,v)\,dx\,dv}
{\int_y^{y+\Delta y}f_Y(v)\,dv}\\
&\longrightarrow\frac{\int_Af_{X,Y}(x,y)\,dx}{f_Y(y)}.
\end{aligned}
$$

更一般地，条件密度只在边缘分布意义下几乎处处确定；$f_Y(y)=0$ 处不能直接使用比值公式。相应的分解与边缘化公式为

$$
f_{X,Y}(x,y)=f_{X\mid Y}(x\mid y)f_Y(y),
$$

$$
f_X(x)=\int_{-\infty}^{\infty}f_{X\mid Y}(x\mid y)f_Y(y)\,dy.
$$

**例。** 若 $f(x,y)=\frac{12}{5}x(2-x-y)$，$0<x,y<1$，则

$$
f_Y(y)=\frac{12}{5}\int_0^1x(2-x-y)\,dx
=\frac25(4-3y).
$$

所以

$$
f_{X\mid Y}(x\mid y)=\frac{6x(2-x-y)}{4-3y},
\qquad 0<x<1,\quad0<y<1.
$$

### 二元正态：条件分布仍为正态

设 $\sigma_X,\sigma_Y>0$，$-1<\rho<1$。用标准化坐标

$$
u=\frac{x-\mu_X}{\sigma_X},\qquad
v=\frac{y-\mu_Y}{\sigma_Y},
$$

二元正态密度写为

$$
f_{X,Y}(x,y)=\frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}
\exp\left[-\frac{u^2-2\rho uv+v^2}{2(1-\rho^2)}\right].
$$

关键配方为

$$
u^2-2\rho uv+v^2=(u-\rho v)^2+(1-\rho^2)v^2.
$$

对固定的 $y$，与 $x$ 无关的部分归入归一化常数，于是

$$
\boxed{X\mid(Y=y)\sim N\left(
\mu_X+\rho\frac{\sigma_X}{\sigma_Y}(y-\mu_Y),\,
\sigma_X^2(1-\rho^2)\right).}
$$

同理可交换 $X,Y$ 的角色。对 $y$ 积分，或交换配方的方向，还可得到边缘分布

$$
X\sim N(\mu_X,\sigma_X^2),\qquad
Y\sim N(\mu_Y,\sigma_Y^2).
$$

在这一**联合二元正态**模型中，$X,Y$ 独立当且仅当 $\rho=0$。不能只凭“两个边缘都正态”就套用该结论；$|\rho|=1$ 的退化情形也不具有上面这个二维密度。

### 从条件密度推出 Student $t$ 分布

令 $Z\sim N(0,1)$、$W\sim\chi_\nu^2$，且二者独立，其中 $\nu$ 为正整数。定义

$$
T=\frac{Z}{\sqrt{W/\nu}}.
$$

固定 $W=w$ 后，$T\mid(W=w)\sim N(0,\nu/w)$，故

$$
f_{T\mid W}(t\mid w)=\sqrt{\frac{w}{2\pi\nu}}
e^{-t^2w/(2\nu)}.
$$

乘上 $\chi_\nu^2$ 的密度并对 $w$ 积分：

$$
\begin{aligned}
f_T(t)
&=\frac{1}{\sqrt{2\pi\nu}\,2^{\nu/2}\Gamma(\nu/2)}
\int_0^\infty w^{(\nu+1)/2-1}
e^{-\frac12(1+t^2/\nu)w}\,dw\\
&=\frac{\Gamma((\nu+1)/2)}{\sqrt{\pi\nu}\,\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2},
\qquad t\in\mathbb R.
\end{aligned}
$$

最后一步使用 $\int_0^\infty w^{a-1}e^{-cw}\,dw=\Gamma(a)/c^a$。这就是自由度为 $\nu$ 的 Student $t$ 密度。$\nu=1$ 时，它退化为标准 Cauchy 密度 $1/[\pi(1+t^2)]$。

### 连续参数、离散观测：Bayes 更新

若 $\Theta$ 连续、观测 $K$ 离散，则

$$
f_{\Theta\mid K}(\theta\mid k)
=\frac{P(K=k\mid\Theta=\theta)f_\Theta(\theta)}{P(K=k)},
$$

其中分母由全概率公式计算：

$$
P(K=k)=\int P(K=k\mid\Theta=\theta)f_\Theta(\theta)\,d\theta.
$$

原书的例子取 $\Theta\sim\operatorname{Unif}(0,1)$。给定 $\Theta=\theta$ 后做 $n$ 次独立 Bernoulli$(\theta)$ 试验，观察到 $k$ 次成功，则

$$
f_{\Theta\mid K}(\theta\mid k)\propto\theta^k(1-\theta)^{n-k},
\qquad0<\theta<1,
$$

因此

$$
\Theta\mid(K=k)\sim\operatorname{Beta}(k+1,n-k+1).
$$

**推广。** 若先验为 $\operatorname{Beta}(\alpha,\beta)$，相同计算给出后验 $\operatorname{Beta}(\alpha+k,\beta+n-k)$：成功与失败分别更新两个参数。

### 给定落在某集合：截断并归一化

若 $P(X\in A)>0$，则

$$
f_{X\mid X\in A}(x)=
\frac{f_X(x)\mathbf1_A(x)}{\int_Af_X(u)\,du}.
$$

离散情形完全类似。原书以 Pareto 分布说明这一点：若

$$
P(X>x)=\left(\frac ax\right)^\lambda,\qquad x\ge a>0,
$$

则对 $x_0>a$、$x\ge x_0$，

$$
P(X>x\mid X>x_0)
=\frac{(a/x)^\lambda}{(a/x_0)^\lambda}
=\left(\frac{x_0}{x}\right)^\lambda.
$$

故条件分布仍为 Pareto，下界由 $a$ 改为 $x_0$，形状参数 $\lambda$ 不变。这是阈值截断下的结构，区别于指数分布关于剩余寿命 $X-x_0$ 的无记忆性。

## 6.6 次序统计量

设 $X_1,\ldots,X_n$ 独立同分布，具有连续 CDF $F$ 和密度 $f$。将样本排序，记

$$
X_{(1)}\le X_{(2)}\le\cdots\le X_{(n)}.
$$

连续性保证并列值的概率为零。**原样本独立，排序后的变量通常不独立。**

### 全部次序统计量的联合密度

**定理 4。** 在 $x_1<\cdots<x_n$ 上，

$$
f_{X_{(1)},\ldots,X_{(n)}}(x_1,\ldots,x_n)
=n!\prod_{i=1}^nf(x_i),
$$

其余位置为零。

**推导。** 在递增的 $x_1,\ldots,x_n$ 附近取互不相交的小区间。要使排序后的样本分别落入这些区间，原始样本可以按任意一种排列落入；共有 $n!$ 种互斥方式，每一种的概率近似为 $\prod_i f(x_i)\,dx_i$。

### 第 $k$ 小的值：二项计数给出 CDF

事件 $\{X_{(k)}\le x\}$ 等价于“至少 $k$ 个样本不超过 $x$”。因此

$$
F_{X_{(k)}}(x)=\sum_{j=k}^n\binom nj[F(x)]^j[1-F(x)]^{n-j}.
$$

**定理 5。** 第 $k$ 个次序统计量的密度为

$$
\boxed{f_{X_{(k)}}(x)=\frac{n!}{(k-1)!(n-k)!}
[F(x)]^{k-1}[1-F(x)]^{n-k}f(x).}
$$

也可以直接计数：$k-1$ 个值在 $x$ 左侧，1 个落在 $(x,x+dx)$，其余 $n-k$ 个在右侧，分组数为 $n!/[(k-1)!1!(n-k)!]$。

最大值与最小值是两个常用特例：

$$
\begin{aligned}
F_{X_{(n)}}(x)&=[F(x)]^n,&
f_{X_{(n)}}(x)&=n[F(x)]^{n-1}f(x),\\
F_{X_{(1)}}(x)&=1-[1-F(x)]^n,&
f_{X_{(1)}}(x)&=n[1-F(x)]^{n-1}f(x).
\end{aligned}
$$

若原分布为 $\operatorname{Unif}(0,1)$，则

$$
X_{(k)}\sim\operatorname{Beta}(k,n-k+1),\qquad
E[X_{(k)}]=\frac{k}{n+1}.
$$

**例：三个均匀样本的中位数。** $M=X_{(2)}$ 的密度为 $6x(1-x)$，$0<x<1$，所以

$$
P\left(\frac14<M<\frac34\right)
=\int_{1/4}^{3/4}6x(1-x)\,dx=\frac{11}{16}.
$$

### 两个次序统计量的联合分布

对 $1\le i<j\le n$、$x<y$，令

$$
C_{i,j}=\frac{n!}{(i-1)!(j-i-1)!(n-j)!}.
$$

则

$$
\begin{aligned}
f_{X_{(i)},X_{(j)}}(x,y)
&=C_{i,j}[F(x)]^{i-1}f(x)\\
&\quad\cdot[F(y)-F(x)]^{j-i-1}f(y)[1-F(y)]^{n-j}.
\end{aligned}
$$

推导仍是分组计数，这次把样本分成五组：在 $x$ 左边、在 $x$ 附近、在 $(x,y)$ 之间、在 $y$ 附近、在 $y$ 右边，人数分别为 $i-1,1,j-i-1,1,n-j$。

### 极差与最小间距

设 $n\ge2$，极差为 $R=X_{(n)}-X_{(1)}$。取上式 $i=1,j=n$，有

$$
f_{X_{(1)},X_{(n)}}(x,y)
=n(n-1)[F(y)-F(x)]^{n-2}f(x)f(y),\quad x<y.
$$

在 $x<y\le x+r$ 上积分，得到对 $r\ge0$，

$$
\begin{aligned}
P(R\le r)
&=n(n-1)\int_{-\infty}^{\infty}f(x)
\int_x^{x+r}[F(y)-F(x)]^{n-2}f(y)\,dy\,dx\\
&=n\int_{-\infty}^{\infty}[F(x+r)-F(x)]^{n-1}f(x)\,dx.
\end{aligned}
$$

第二步令 $u=F(y)-F(x)$。对于均匀样本，$0\le r\le1$ 时

$$
P(R\le r)=nr^{n-1}-(n-1)r^n,
$$

$$
f_R(r)=n(n-1)r^{n-2}(1-r),\quad0<r<1,
$$

即 $R\sim\operatorname{Beta}(n-1,2)$。

原书另一个几何应用是：$n$ 个独立均匀点落在单位线段上，要求任意两点的距离至少为 $d$。只需要求相邻次序统计量相差至少为 $d$。令

$$
y_i=x_i-(i-1)d,
$$

原区域变为 $0<y_1<\cdots<y_n<1-(n-1)d$，Jacobian 为 1。其体积为 $[1-(n-1)d]^n/n!$，乘以次序统计量密度 $n!$，得到

$$
P(\text{所有点间距至少为 }d)
=[1-(n-1)d]^n,
\qquad0\le d\le\frac1{n-1}.
$$

超过该上界时概率为零。这里没有额外要求端点到最近样本点的距离至少为 $d$。

## 6.7 随机变量函数的联合分布

### Jacobian 变量变换公式

令

$$
U=g_1(X,Y),\qquad V=g_2(X,Y).
$$

假设变换在所考虑的开支撑区域内一一对应、连续可微，且 Jacobian 非零；其逆写为

$$
x=h_1(u,v),\qquad y=h_2(u,v).
$$

**定理 6。** 变换后的联合密度为

$$
\boxed{f_{U,V}(u,v)=f_{X,Y}(h_1(u,v),h_2(u,v))
\left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|.}
$$

等价地，若用正向 Jacobian

$$
J(x,y)=\det\begin{pmatrix}
\partial g_1/\partial x&\partial g_1/\partial y\\
\partial g_2/\partial x&\partial g_2/\partial y
\end{pmatrix},
$$

则密度乘上 $1/|J(x,y)|$，并把 $x,y$ 换成逆变换。**公式只在原支撑集的像上成立，其余位置为零。**

**原理。** 同一小区域的概率在换坐标前后不变：

$$
f_{U,V}(u,v)\,du\,dv=f_{X,Y}(x,y)\,dx\,dy,
$$

而 $dx\,dy=|\det D h(u,v)|\,du\,dv$。Jacobian 的绝对值描述面积缩放。若不是全局一一对应，需要划分为可逆分支并把各分支的密度贡献相加。$n$ 维情况完全类似，将 $2\times2$ 行列式换成 $n\times n$ 行列式。

### 例一：和与差

令 $U=X+Y,\ V=X-Y$，则

$$
x=\frac{u+v}{2},\qquad y=\frac{u-v}{2},\qquad
\left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|=\frac12.
$$

因此

$$
f_{U,V}(u,v)=\frac12f_{X,Y}\left(\frac{u+v}{2},\frac{u-v}{2}\right).
$$

若 $X,Y$ 是独立标准正态，则

$$
f_{U,V}(u,v)=\frac1{4\pi}e^{-(u^2+v^2)/4}
=\left(\frac{e^{-u^2/4}}{\sqrt{4\pi}}\right)
\left(\frac{e^{-v^2/4}}{\sqrt{4\pi}}\right).
$$

故 $U,V$ 独立且都服从 $N(0,2)$。原来各自独立的变量，经过两个共享输入的函数后，仍可能独立，但这里依赖正态结构。

若 $X,Y$ 改为独立的 $\operatorname{Unif}(0,1)$，则 $f_{U,V}=1/2$ 仅在

$$
0<u+v<2,\qquad0<u-v<2
$$

这个菱形区域内成立，所以和与差并不独立。支撑区域再次成为关键。

### 例二：极坐标、Rayleigh 与 Box–Muller

设 $X,Y$ 独立且服从 $N(0,1)$，令

$$
X=R\cos\Theta,\qquad Y=R\sin\Theta,
\qquad R>0,\quad0\le\Theta<2\pi.
$$

原点及角度切线是零概率边界，可在其余区域应用变换。逆向 Jacobian 为

$$
\left|\det\frac{\partial(x,y)}{\partial(r,\theta)}\right|=r.
$$

故

$$
f_{R,\Theta}(r,\theta)=\frac1{2\pi}r e^{-r^2/2}
=\underbrace{r e^{-r^2/2}}_{f_R(r)}\underbrace{\frac1{2\pi}}_{f_\Theta(\theta)}.
$$

于是 $R\perp\Theta$，$\Theta\sim\operatorname{Unif}(0,2\pi)$，而 $R$ 服从 Rayleigh 分布。再令 $W=R^2$，

$$
f_W(w)=\frac12e^{-w/2},\quad w>0,
\qquad W\sim\operatorname{Exp}(1/2)=\chi_2^2.
$$

反过来，这给出生成标准正态的 **Box–Muller 变换**。取独立的 $U_1,U_2\sim\operatorname{Unif}(0,1)$，令

$$
\begin{aligned}
Z_1&=\sqrt{-2\log U_1}\cos(2\pi U_2),\\
Z_2&=\sqrt{-2\log U_1}\sin(2\pi U_2).
\end{aligned}
$$

则 $Z_1,Z_2$ 是独立标准正态变量。理由是 $-2\log U_1\sim\operatorname{Exp}(1/2)$，且独立于均匀角度 $2\pi U_2$。

### 例三：Gamma 的总量与比例独立

设 $X\sim\operatorname{Gamma}(\alpha,\lambda)$、$Y\sim\operatorname{Gamma}(\beta,\lambda)$ 独立。定义

$$
S=X+Y,\qquad V=\frac{X}{X+Y}.
$$

逆变换及其 Jacobian 为

$$
x=sv,\quad y=s(1-v),\qquad
\left|\det\frac{\partial(x,y)}{\partial(s,v)}\right|=s,
$$

新支撑集为 $s>0,\ 0<v<1$。代入得到

$$
\begin{aligned}
f_{S,V}(s,v)
&=\frac{\lambda^{\alpha+\beta}}{\Gamma(\alpha)\Gamma(\beta)}
e^{-\lambda s}s^{\alpha+\beta-1}v^{\alpha-1}(1-v)^{\beta-1}\\
&=\left[\frac{\lambda^{\alpha+\beta}}{\Gamma(\alpha+\beta)}
s^{\alpha+\beta-1}e^{-\lambda s}\right]
\left[\frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}
v^{\alpha-1}(1-v)^{\beta-1}\right].
\end{aligned}
$$

于是

$$
S\sim\operatorname{Gamma}(\alpha+\beta,\lambda),\qquad
V\sim\operatorname{Beta}(\alpha,\beta),\qquad S\perp V.
$$

对第二个因子积分必须等于 1，便再次得到

$$
B(\alpha,\beta)=\frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}.
$$

其含义是：若两部分工作时间分别是同率 Gamma 变量，**总工作时间与第一部分占总量的比例独立**。不同率参数一般不具有该分解。

### 例四：指数等待时间与均匀次序统计量

令 $X_i$ 独立且服从 $\operatorname{Exp}(\lambda)$，设累计时间

$$
T_i=X_1+\cdots+X_i,\qquad i=1,\ldots,n.
$$

逆变换 $X_1=T_1,\ X_i=T_i-T_{i-1}$ 的 Jacobian 为 1。因为指数中的和发生望远镜消去，

$$
f_{T_1,\ldots,T_n}(t_1,\ldots,t_n)
=\lambda^ne^{-\lambda t_n},\qquad0<t_1<\cdots<t_n.
$$

对前 $n-1$ 个坐标积分得到

$$
f_{T_n}(t)=\frac{\lambda^nt^{n-1}e^{-\lambda t}}{(n-1)!},\qquad t>0.
$$

所以给定 $T_n=t$，

$$
f_{T_1,\ldots,T_{n-1}\mid T_n}(t_1,\ldots,t_{n-1}\mid t)
=\frac{(n-1)!}{t^{n-1}},
\quad0<t_1<\cdots<t_{n-1}<t.
$$

这恰好是 $n-1$ 个独立 $\operatorname{Unif}(0,t)$ 变量的次序统计量密度。注意结论是**有序后的联合分布相同**，这些累计时间本身并非相互独立。

## 6.8 可交换随机变量

### 定义与独立同分布的关系

若对任意排列 $\pi$，

$$
(X_1,\ldots,X_n)\overset d=
(X_{\pi(1)},\ldots,X_{\pi(n)}),
$$

则称 $X_1,\ldots,X_n$ **可交换（exchangeable）**。这里 $\overset d=$ 表示同分布。

离散情形，等价于联合 PMF 对坐标置换不变；存在联合密度时，等价于密度几乎处处对称。可交换性描述的是**整个联合分布的对称性**。

$$
\text{独立同分布}\ \Longrightarrow\ \text{可交换}
\ \Longrightarrow\ \text{各边缘同分布}.
$$

两步的逆向一般都不成立。第一步来自 $\prod_i p(x_i)$ 或 $\prod_i f(x_i)$ 的对称性；第二步来自对联合分布边缘化。

### 不放回抽样：可交换却不独立

袋中有 $n$ 个球，其中 $k$ 个特殊球。逐一不放回抽完，令 $I_i$ 表示第 $i$ 个抽出的球是否特殊。对含恰好 $k$ 个 1 的任一序列，

$$
P(I_1=i_1,\ldots,I_n=i_n)
=\frac{k!(n-k)!}{n!}=\frac1{\binom nk}.
$$

其余序列概率为零。因此整个序列可交换，每个 $I_i\sim\operatorname{Bernoulli}(k/n)$。但当 $0<k<n$ 时，

$$
P(I_2=1\mid I_1=1)=\frac{k-1}{n-1}\ne\frac kn,
$$

故不独立。可交换性不会消除“抽走一个特殊球会影响后续抽样”这一依赖。

### Pólya 罐模型：强化也能保持可交换

初始有 $a$ 个红球、$b$ 个蓝球，$a,b>0$。每次等概率抽一个球，放回并额外加入一个同色球；令 $I_i$ 表示第 $i$ 次是否抽到红球。

定义上升阶乘 $c^{\overline m}=c(c+1)\cdots(c+m-1)$，并令 $c^{\overline0}=1$。对任一长度为 $n$、含 $r$ 个 1 的具体序列，

$$
P(I_1=i_1,\ldots,I_n=i_n)
=\frac{a^{\overline r}b^{\overline{n-r}}}{(a+b)^{\overline n}}.
$$

**推导。** 每出现一个红球，红球概率的分子依次使用 $a,a+1,\ldots,a+r-1$；蓝球同理；分母依次为 $a+b,\ldots,a+b+n-1$。乘积只依赖两种颜色的总次数，与出现顺序无关，故可交换。

因此不论 $i$ 多大，$P(I_i=1)=a/(a+b)$。然而

$$
P(I_2=1\mid I_1=1)=\frac{a+1}{a+b+1}>\frac a{a+b},
$$

所以强化带来依赖，同时保留了边缘分布与顺序对称性。

### 均匀次序统计量的间距

令 $U_1,\ldots,U_n$ 独立且均匀分布于 $(0,1)$，定义

$$
D_1=U_{(1)},\qquad D_i=U_{(i)}-U_{(i-1)},\quad i=2,\ldots,n.
$$

逆变换为 $U_{(i)}=D_1+\cdots+D_i$，Jacobian 为 1，故

$$
f_{D_1,\ldots,D_n}(d_1,\ldots,d_n)
=n!\,\mathbf1_{\{d_i>0,\ \sum_i d_i<1\}}.
$$

公式与支撑区域都关于 $d_1,\ldots,d_n$ 对称，所以这些间距可交换。它们并不独立，因为受到总和小于 1 的共同限制。

参考：Sheldon Ross, *A First Course in Probability*, 10th ed., Chapter 6, §§6.1–6.8, pp. 237–290。本文以重新组织的中文表述与推导整理，未逐题收录章末习题。
