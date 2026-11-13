---
title: "Characteristic Function"
date: "2026-11-13"
tag: "Math & CS"
compact: true
math: true
summary: "Chapters 13 and 19 Notes of MA-UY 3514 Honors Theory of Probability"
---

## 13 特征函数

数学中常用的一种方法是先把对象变换到另一个空间，在那里求解或研究它的性质，再把结果变换回来。拉普拉斯变换和傅里叶变换是其中两种重要的变换。它们广泛用于微分方程，在概率论中也可以用来分析随机变量，例如计算矩，以及简洁地证明中心极限定理（见第 21 章）。傅里叶变换是两者中较复杂、用途也更广的一种。

对 $x=(x_1,\ldots,x_n)$、$y=(y_1,\ldots,y_n)\in\mathbb R^n$，用 $\langle x,y\rangle$ 表示内积，即 $\langle x,y\rangle=\sum_{j=1}^n x_jy_j$。微积分里也常写作 $x\cdot y$，称为点积。

### 定义 13.1（概率测度的傅里叶变换）

设 $\mu$ 是 $\mathbb R^n$ 上的概率测度。其**傅里叶变换**是定义在 $\mathbb R^n$ 上的函数

$$
\hat\mu(u)=\int e^{i\langle u,x\rangle}\,\mu(dx).
$$

这里 $i=\sqrt{-1}$。被积函数是复值函数，可通过分别积分实部和虚部来定义积分。由指数、余弦和正弦的幂级数展开，可验证欧拉公式

$$
\begin{gathered}
e^{i\langle u,x\rangle}\\
=\cos(\langle u,x\rangle)+i\sin(\langle u,x\rangle).
\end{gathered}
\tag{13.1}
$$

特别地，$|e^{i\langle u,x\rangle}|=1$。余弦和正弦两项都是有界 Borel 函数，因而可积。所以定义 13.1 可以写成

$$
\begin{aligned}
\hat\mu(u)
&=\int\cos(\langle u,x\rangle)\,\mu(dx)\\
&\quad{}+i\int\sin(\langle u,x\rangle)\,\mu(dx).
\end{aligned}
$$

事实上，分别处理实部和虚部，就能把第 9 章的结论推广到复值函数。下文将直接使用这些结论。模长不等式 $\bigl|\int f\,d\mu\bigr|\le\int |f|\,d\mu$ 在复值情形下需要多一步论证。

### 定义 13.2（随机变量的特征函数）

设 $X$ 是取值于 $\mathbb R^n$ 的随机变量。它的**特征函数** $\varphi_X$ 定义为 $\varphi_X(u)=E\{e^{i\langle u,X\rangle}\}$，其中 $u\in\mathbb R^n$。记 $P^X$ 为 $X$ 的分布测度，则

$$
\begin{aligned}
\varphi_X(u)&=\int e^{i\langle u,x\rangle}\,P^X(dx)\\
&=\widehat{P^X}(u).
\end{aligned}
\tag{13.2}
$$

因此，特征函数就是分布测度的傅里叶变换，总是存在。

### 定理 13.1（有界性与连续性）

若 $\mu$ 是 $\mathbb R^n$ 上的概率测度，则 $\hat\mu$ 有界且连续，并且 $\hat\mu(0)=1$。

**证明。** 傅里叶变换的存在性已由定义 13.1 的讨论得到。由于 $|e^{i\langle u,x\rangle}|=1$，

$$
\begin{aligned}
|\hat\mu(u)|&\le\int |e^{i\langle u,x\rangle}|\,\mu(dx)\\
&=\int 1\,\mu(dx)=1.
\end{aligned}
$$

在 $u=0$ 时，被积函数恒等于 $1$，故 $\hat\mu(0)=\int 1\,\mu(dx)=1$。最后，若 $u_p\to u$，则 $e^{i\langle u_p,x\rangle}$ 逐点趋于 $e^{i\langle u,x\rangle}$，且模长始终为 $1$。由勒贝格控制收敛定理（定理 9.1（f）），$\hat\mu(u_p)\to\hat\mu(u)$。$\square$

事实上还可以证明 $\hat\mu$ 一致连续，本节用到的只是连续性。

### 定理 13.2（导数与矩）

设 $X$ 取值于 $\mathbb R^n$，且对某个正整数 $m$ 有 $E\{|X|^m\}<\infty$。则 $\varphi_X$ 具有直到 $m$ 阶的连续偏导数，且

$$
\begin{gathered}
\frac{\partial^m\varphi_X(u)}
     {\partial u_{j_1}\cdots\partial u_{j_m}}\\
=i^m E\{X_{j_1}\cdots X_{j_m}e^{i\langle u,X\rangle}\}.
\end{gathered}
$$

**证明。** 用概率测度的傅里叶变换来表述。取 $\mu=P^X$，由（13.2）可知，只需在 $\int |x|^m\,\mu(dx)<\infty$ 的条件下，证明 $\hat\mu$ 有直到 $m$ 阶的连续偏导数，且

$$
\begin{gathered}
\frac{\partial^m\hat\mu(u)}
     {\partial u_{j_1}\cdots\partial u_{j_m}}\\
=i^m\int x_{j_1}\cdots x_{j_m}e^{i\langle u,x\rangle}\,\mu(dx).
\end{gathered}
$$

先证 $m=1$。设 $t_p$ 是任意趋于 $0$ 的非零实数序列，$v$ 是第 $j$ 个坐标方向的单位向量，即 $v_j=1$，其余分量为零。只要下列差商的极限存在且与所选序列无关，它就等于 $\hat\mu$ 在 $u$ 处关于 $u_j$ 的偏导数。

$$
\begin{gathered}
\frac{\hat\mu(u+t_pv)-\hat\mu(u)}{t_p}\\
=\int e^{i\langle u,x\rangle}
  \frac{e^{it_px_j}-1}{t_p}\,\mu(dx).
\end{gathered}
\tag{13.3}
$$

其中 $x_j$ 是 $x$ 的第 $j$ 个分量。对每个 $x$，$\bigl(e^{it_px_j}-1\bigr)/t_p\to ix_j$。由 $|e^{is}-1|=2|\sin(s/2)|\le |s|$，差商的模不超过 $|x_j|\le |x|$，因而也满足原证明使用的界 $2|x|$。根据假设，$\int 2|x|\,\mu(dx)<\infty$。由控制收敛定理，（13.3）收敛到 $i\int x_j e^{i\langle u,x\rangle}\,\mu(dx)$，所以

$$
\frac{\partial\hat\mu(u)}{\partial u_j}
=i\int x_j e^{i\langle u,x\rangle}\,\mu(dx).
\tag{13.4}
$$

再用控制收敛定理，如定理 13.1 一样，可证（13.4）中的偏导数连续。高阶情形逐次应用同样的论证即可，因为 $1+|x|^m$ 控制了各阶所需的坐标乘积。$\square$

一个直接的应用是计算随机变量的矩。实值随机变量 $X$ 的 $k$ 阶矩为 $E\{X^k\}$。由定理 13.2，若 $E\{|X|\}<\infty$，则一阶矩为

$$
E\{X\}=-i\varphi_X'(0).
\tag{13.5}
$$

若 $E\{X^2\}<\infty$，则二阶矩为

$$
E\{X^2\}=-\varphi_X''(0).
\tag{13.6}
$$

### 例 13.1（伯努利分布）

若 $X$ 服从参数为 $p$ 的伯努利分布，则

$$
\begin{aligned}
\varphi_X(u)&=E\{e^{iuX}\}\\
&=e^{iu\cdot0}(1-p)+e^{iu}p\\
&=\boxed{pe^{iu}+1-p}.
\end{aligned}
$$

### 例 13.2（二项分布）

若 $X$ 服从二项分布 $B(p,n)$，由二项式定理，

$$
\begin{aligned}
\varphi_X(u)
&=\sum_{j=0}^n\binom nj e^{iuj}p^j(1-p)^{n-j}\\
&=\boxed{(pe^{iu}+1-p)^n}.
\end{aligned}
$$

也可把 $X$ 写成 $\sum_{j=1}^nY_j$，其中 $Y_1,\ldots,Y_n$ 是相互独立的伯努利 $(p)$ 随机变量。由独立性，

$$
\begin{aligned}
\varphi_X(u)
&=E\left\{e^{iu\sum_{j=1}^nY_j}\right\}\\
&=E\left\{\prod_{j=1}^ne^{iuY_j}\right\}\\
&=\prod_{j=1}^n E\{e^{iuY_j}\}\\
&=\prod_{j=1}^n\varphi_{Y_j}(u)
=(pe^{iu}+1-p)^n.
\end{aligned}
$$

### 例 13.3（泊松分布）

若 $X$ 服从参数为 $\lambda$ 的泊松分布，则

$$
\begin{aligned}
\varphi_X(u)
&=\sum_{k=0}^\infty e^{iuk}P(X=k)\\
&=e^{-\lambda}\sum_{k=0}^\infty
   e^{iuk}\frac{\lambda^k}{k!}\\
&=e^{-\lambda}\sum_{k=0}^\infty\frac{(\lambda e^{iu})^k}{k!}\\
&=e^{-\lambda}e^{\lambda e^{iu}}
=\boxed{e^{\lambda(e^{iu}-1)}}.
\end{aligned}
$$

### 例 13.4（均匀分布）

若 $X$ 在 $(-a,a)$ 上均匀分布，其中 $a>0$，则对 $u\ne0$ 有

$$
\begin{aligned}
\varphi_X(u)
&=\frac1{2a}\int_{-a}^a e^{iux}\,dx\\
&=\frac{e^{iua}-e^{-iua}}{2aiu}\\
&=\frac{2i\sin(au)}{2aiu}
=\boxed{\frac{\sin(au)}{au}}.
\end{aligned}
$$

最后一步用到欧拉公式和余弦的偶性。在 $u=0$ 处，特征函数的值为 $1$，也正是右端的极限。

### 例 13.5（标准正态分布）

标准正态分布的特征函数可以用围道积分与留数定理来计算，也可以用解析延拓（见第 14 章习题 17）。下面给出一种只用实变量微积分的方法。设 $X\sim N(0,1)$，则

$$
\begin{aligned}
\varphi_X(u)
&=\frac1{\sqrt{2\pi}}\int_{\mathbb R} e^{iux}e^{-x^2/2}\,dx\\
&=\frac1{\sqrt{2\pi}}\int_{\mathbb R}\cos(ux)e^{-x^2/2}\,dx\\
&\quad{}+\frac{i}{\sqrt{2\pi}}
      \int_{\mathbb R}\sin(ux)e^{-x^2/2}\,dx.
\end{aligned}
$$

函数 $\sin(ux)e^{-x^2/2}$ 是可积奇函数，所以最后一个积分为零，只剩余弦积分。由定理 13.2，可对 $u$ 求导。再用分部积分，边界项为零，得到

$$
\begin{aligned}
\varphi_X'(u)
&=\frac1{\sqrt{2\pi}}\int_{\mathbb R}-x\sin(ux)e^{-x^2/2}\,dx\\
&=-\frac{u}{\sqrt{2\pi}}\int_{\mathbb R}\cos(ux)e^{-x^2/2}\,dx\\
&=-u\varphi_X(u).
\end{aligned}
$$

乘以积分因子 $e^{u^2/2}$，可见 $\bigl(e^{u^2/2}\varphi_X(u)\bigr)'=0$，即 $\varphi_X(u)=C e^{-u^2/2}$。由 $\varphi_X(0)=1$ 得 $C=1$，所以 $\boxed{\varphi_X(u)=e^{-u^2/2}}$。

### 定理 13.3（仿射变换）

设 $X$ 取值于 $\mathbb R^n$，$a\in\mathbb R^m$，$A$ 是 $m\times n$ 矩阵。对任意 $u\in\mathbb R^m$，有

$$
\varphi_{a+AX}(u)=e^{i\langle u,a\rangle}\varphi_X(A^*u),
$$

其中 $A^*$ 表示 $A$ 的转置。

**证明。** 由 $\langle u,AX\rangle=\langle A^*u,X\rangle$，有 $e^{i\langle u,a+AX\rangle}=e^{i\langle u,a\rangle}e^{i\langle A^*u,X\rangle}$。对两边取期望即可。$\square$

### 例 13.6（一般正态分布）

若 $X\sim N(\mu,\sigma^2)$ 且 $\sigma>0$，容易验证 $Y=(X-\mu)/\sigma\sim N(0,1)$（见习题 14.18）。写成 $X=\mu+\sigma Y$，由定理 13.3 和例 13.5 得

$$
\boxed{\varphi_X(u)=e^{iu\mu-u^2\sigma^2/2}}.
$$

### 例 13.7（指数分布）

若 $X$ 服从速率为 $\lambda>0$ 的指数分布，则

$$
\begin{aligned}
\varphi_X(u)&=\int_0^\infty e^{iux}\lambda e^{-\lambda x}\,dx\\
&=\int_0^\infty\lambda e^{(iu-\lambda)x}\,dx.
\end{aligned}
$$

先在有限区间 $[0,b]$ 上求原函数，再利用 $|e^{(iu-\lambda)b}|=e^{-\lambda b}\to0$，就得到 $\varphi_X(u)=\lambda/(\lambda-iu)$。也可以分别积分实部和虚部。设 $A_u=\lambda/(\lambda^2+u^2)$，下面两式分别是 $\lambda e^{-\lambda x}\cos(ux)$ 和 $\lambda e^{-\lambda x}\sin(ux)$ 的原函数。

$$
\begin{gathered}
A_u e^{-\lambda x}(-\lambda\cos(ux)+u\sin(ux)),\\
A_u e^{-\lambda x}(-u\cos(ux)-\lambda\sin(ux)).
\end{gathered}
$$

两式在 $x\to\infty$ 时都趋于零。在 $x=0$ 分别取值 $-\lambda A_u$ 和 $-uA_u$，所以余弦积分等于 $\lambda A_u$，正弦积分等于 $uA_u$。因此

$$
\varphi_X(u)=\frac{\lambda^2}{\lambda^2+u^2}
+i\frac{\lambda u}{\lambda^2+u^2}
=\boxed{\frac{\lambda}{\lambda-iu}}.
$$

### 例 13.8（Gamma 分布）

利用复分析中的围道积分和留数定理，可以证明当 $X$ 服从形状参数为 $\alpha$、速率参数为 $\beta$ 的 Gamma 分布时，

$$
\boxed{\varphi_X(u)=\frac{\beta^\alpha}{(\beta-iu)^\alpha}}.
$$

对于非整数 $\alpha$，这里的复数幂取右半平面上的主值。习题 14.19 给出了不用围道积分的计算方法。


## 19 弱收敛与特征函数

弱收敛是概率论与统计学中的核心概念。极限定理为许多统计方法提供理论依据，也有许多其他应用。下面的定理把概率测度的弱收敛与其特征函数的收敛联系起来。

### 定理 19.1（Lévy 连续性定理）

设 $(\mu_n)_{n\ge1}$ 是 $\mathbb R^d$ 上一列概率测度，$(\hat\mu_n)_{n\ge1}$ 是相应的傅里叶变换，也称特征函数。

- （a）若 $\mu_n$ 弱收敛到概率测度 $\mu$，则对每个 $u\in\mathbb R^d$，都有 $\hat\mu_n(u)\to\hat\mu(u)$。
- （b）若对每个 $u\in\mathbb R^d$ 都有 $\hat\mu_n(u)\to f(u)$，且 $f$ 在 $0$ 处连续，则存在 $\mathbb R^d$ 上的概率测度 $\mu$，使 $f=\hat\mu$，并且 $\mu_n$ 弱收敛到 $\mu$。

**证明。** （a）设 $\mu_n$ 弱收敛到 $\mu$。对固定的 $u$，函数 $x\mapsto e^{i\langle u,x\rangle}$ 的实部和虚部都是有界连续函数，所以由弱收敛，

$$
\begin{gathered}
\hat\mu_n(u)=\int e^{i\langle u,x\rangle}\,\mu_n(dx)\\
\longrightarrow
\int e^{i\langle u,x\rangle}\,\mu(dx)=\hat\mu(u).
\end{gathered}
$$

**（b）** 定理对任意 $d$ 成立，这里给出 $d=1$ 的证明。设对每个 $u$ 都有 $\hat\mu_n(u)\to f(u)$。先证明 $(\mu_n)$ 的紧性（见定理 18.6）。对任意 $\alpha>0$，由 Fubini 定理（定理 10.3，具体可参见习题 10.14），有

$$
\begin{aligned}
\int_{-\alpha}^{\alpha}\hat\mu_n(u)\,du
&=\int_{-\alpha}^{\alpha}
  \int_{\mathbb R}e^{iux}\,\mu_n(dx)\,du\\
&=\int_{\mathbb R}
  \left(\int_{-\alpha}^{\alpha}e^{iux}\,du\right)\mu_n(dx).
\end{aligned}
$$

由 $e^{iux}=\cos(ux)+i\sin(ux)$，内层积分的实部来自余弦项。正弦项关于 $u$ 是奇函数，在对称区间上的积分为零，所以

$$
\int_{-\alpha}^{\alpha}\hat\mu_n(u)\,du
=\int_{\mathbb R}\frac{2\sin(\alpha x)}{x}\,\mu_n(dx),
$$

其中 $x=0$ 处的被积函数按连续延拓取值 $2\alpha$。由于 $\int_{-\alpha}^{\alpha}1\,du=2\alpha$，可得

$$
\begin{gathered}
\frac1\alpha\int_{-\alpha}^{\alpha}(1-\hat\mu_n(u))\,du\\
=2-\int_{\mathbb R}\frac{2\sin(\alpha x)}{\alpha x}\,\mu_n(dx)\\
=2\int_{\mathbb R}\left(1-\frac{\sin(\alpha x)}{\alpha x}\right)\mu_n(dx).
\end{gathered}
$$

函数 $2(1-\sin v/v)$ 总是非负的，并且在 $|v|\ge2$ 时至少为 $1$。因此上式至少等于

$$
\begin{gathered}
\int_{\mathbb R}1_{[-2,2]^c}(\alpha x)\,\mu_n(dx)\\
=\int_{\mathbb R}1_{[-2/\alpha,\,2/\alpha]^c}(x)\,\mu_n(dx)\\
=\mu_n([-2/\alpha,\,2/\alpha]^c).
\end{gathered}
$$

令 $\beta=2/\alpha$，得到尾部概率的估计

$$
\begin{gathered}
\mu_n([-\beta,\beta]^c)\\
\le\frac{\beta}{2}\int_{-2/\beta}^{2/\beta}
  (1-\hat\mu_n(u))\,du.
\end{gathered}
\tag{19.1}
$$

给定 $\varepsilon>0$。因为 $\hat\mu_n(0)=1$，所以 $f(0)=1$。由 $f$ 在 $0$ 处连续，可选 $\alpha>0$，使得 $|u|\le2/\alpha$ 时 $|1-f(u)|\le\varepsilon/4$。于是

$$
\begin{gathered}
\left|\frac{\alpha}{2}\int_{-2/\alpha}^{2/\alpha}(1-f(u))\,du\right|\\
\le\frac{\alpha}{2}\int_{-2/\alpha}^{2/\alpha}\frac{\varepsilon}{4}\,du
=\frac{\varepsilon}{2}.
\end{gathered}
\tag{19.2}
$$

由于 $|\hat\mu_n(u)|\le1$，由勒贝格控制收敛定理（定理 9.1（f）），

$$
\begin{gathered}
\lim_{n\to\infty}\int_{-2/\alpha}^{2/\alpha}(1-\hat\mu_n(u))\,du\\
=\int_{-2/\alpha}^{2/\alpha}(1-f(u))\,du.
\end{gathered}
$$

因此存在 $N$，使得对所有 $n\ge N$，上面两个积分的差的模不超过 $\varepsilon/\alpha$。乘上 $\alpha/2$，再结合（19.2），就得到

$$
\frac{\alpha}{2}\int_{-2/\alpha}^{2/\alpha}
  (1-\hat\mu_n(u))\,du\le\varepsilon.
$$

由（19.1），对所有 $n\ge N$ 都有 $\mu_n([-\alpha,\alpha]^c)\le\varepsilon$。对于有限多个 $n<N$，分别选取 $\alpha_n$，使 $\mu_n([-\alpha_n,\alpha_n]^c)\le\varepsilon$。令 $a=\max(\{\alpha\}\cup\{\alpha_n:1\le n<N\})$，则

$$
\mu_n([-a,a]^c)\le\varepsilon
\qquad\text{对所有 }n.
\tag{19.3}
$$

也就是说，对每个 $\varepsilon>0$ 都有某个 $a>0$ 使 $\sup_n\mu_n([-a,a]^c)\le\varepsilon$。因此

$$
\lim_{m\to\infty}\sup_n\mu_n([-m,m]^c)=0,
$$

所以 $(\mu_n)$ 是紧的。由定理 18.6，可以选出一个弱收敛到 $\mu$ 的子序列 $(\mu_{n_k})_{k\ge1}$。根据本定理（a），对每个 $u$ 有 $\hat\mu_{n_k}(u)\to\hat\mu(u)$，因此 $f(u)=\hat\mu(u)$。这就证明了 $f$ 是某个概率测度的傅里叶变换。

接下来用反证法证明整个序列弱收敛到 $\mu$。令 $F_n(x)=\mu_n((-\infty,x])$、$F(x)=\mu((-\infty,x])$，并记 $D=\{x:F(x-)=F(x)\}$ 为 $F$ 的连续点集。若 $\mu_n$ 不弱收敛到 $\mu$，由定理 18.4，至少存在一点 $x\in D$，使得 $F_n(x)$ 不收敛到 $F(x)$。于是可取一个子序列，必要时再取子序列，使得 $F_{n_k}(x)\to b$，其中 $b\ne F(x)$。

由紧性和定理 18.6，可从 $(\mu_{n_k})$ 中再选出弱收敛到 $\nu$ 的子序列 $(\mu_{n_{k_j}})_{j\ge1}$。同样由（a）可得 $\hat\mu_{n_{k_j}}(u)\to\hat\nu(u)$，而原序列的特征函数逐点趋于 $f$，故 $\hat\nu=f=\hat\mu$。由特征函数的唯一性（定理 14.1），$\nu=\mu$。因此，由定理 18.4 和 $x\in D$，$F_{n_{k_j}}(x)\to F(x)$。但这个子序列也必须趋于 $b\ne F(x)$，矛盾。$\square$

**注 19.1。** 定理 19.1（a）还可以加强。若 $\mu_n$ 弱收敛到 $\mathbb R^d$ 上的概率测度 $\mu$，则 $\hat\mu_n$ 在 $\mathbb R^d$ 的每个紧子集上一致收敛到 $\hat\mu$。

### 例（泊松分布的正态极限）

设 $(X_n)_{n\ge1}$ 是一列泊松随机变量，$X_n$ 的参数为 $\lambda_n=n$。令

$$
Z_n=\frac{X_n-n}{\sqrt n}.
$$

则 $Z_n\xrightarrow{\mathcal D}Z$，其中 $Z\sim N(0,1)$。为证明这一点，由例 13.3，

$$
\begin{aligned}
\varphi_{Z_n}(u)
&=E\left\{e^{iu(X_n-n)/\sqrt n}\right\}\\
&=e^{-iu\sqrt n}E\left\{e^{iuX_n/\sqrt n}\right\}\\
&=e^{-iu\sqrt n}\exp\bigl(n(e^{iu/\sqrt n}-1)\bigr).
\end{aligned}
$$

固定 $u$，对 $e^z$ 作泰勒展开，得到

$$
e^{iu/\sqrt n}-1
=\frac{iu}{\sqrt n}-\frac{u^2}{2n}
 -\frac{iu^3}{6n^{3/2}}+O(n^{-2}).
$$

将展开式代入，线性项 $iu\sqrt n$ 与前面的 $-iu\sqrt n$ 抵消。其余高阶项可以写成 $-h(u,n)/\sqrt n$，其中对固定 $u$，$h(u,n)$ 随 $n$ 保持有界。于是

$$
\varphi_{Z_n}(u)=e^{-u^2/2}e^{-h(u,n)/\sqrt n}
\longrightarrow e^{-u^2/2}.
$$

由例 13.5，$e^{-u^2/2}$ 是标准正态分布的特征函数，在原点连续。根据定理 19.1（b），$Z_n$ 依分布收敛到 $Z$。

*来源：Jean Jacod 与 Philip Protter，Probability Essentials，第 13、19 章，Springer，2004 年。*
