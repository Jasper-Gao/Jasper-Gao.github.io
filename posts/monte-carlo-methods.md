---
title: "Monte Carlo Methods"
date: "2026-11-14"
tag: "Mathematics"
compact: true
math: true
summary: "Cemgil's Monte Carlo Tutorial Notes"
---

## 1.19.1 引言

蒙特卡洛方法（MC）是一类通过随机抽样计算近似值的数值方法。待估的量常常是难以直接计算的积分，因此也可以把它理解为用随机抽样做高维数值积分。20 世纪 40 年代，von Neumann、Ulam 和 Metropolis 借用赌场的名字为这种方法命名。随着计算能力提升，蒙特卡洛技术广泛用于统计学、计算机科学、运筹学与信号处理。在系统模拟中，我们生成典型的随机输入来了解一个系统或算法在不确定性下的表现。本文讨论的任务通常有一个确定的答案，随机化用于求出这个答案的近似值，例如估计参数、预测观测和比较模型。

本文先用大数定律和中心极限定理说明样本平均为何有效，再讨论反演、变量变换和拒绝采样。接着从有限马尔可夫链的收敛性出发，构造 Metropolis–Hastings 和 Gibbs 采样器，并介绍重要性采样、序贯蒙特卡洛和可逆跳跃。原教程曾用于高年级本科和研究生入门课程，使用一套统一的记号和若干小例子降低概率模型与实际算法之间的学习门槛。

## 1.19.2 蒙特卡洛原理

蒙特卡洛方法的基本思路是从目标分布 $\pi$ 中生成样本 $x^{(1)},\ldots,x^{(N)}$，用它们估计该分布的某些特征。这里的特征是性质足够好的函数 $\varphi$ 在 $\pi$ 下的期望，可以用样本平均值来近似。

$$
E_\pi[\varphi(x)]\approx
\frac1N\sum_{n=1}^N\varphi(x^{(n)})
\equiv \bar E_{\varphi,N}.
$$

随着 $N$ 增大，我们希望估计值 $\bar E_{\varphi,N}$ 趋于真实期望。下一小节会给出具体的测试函数。对于独立同分布的样本，设 $E_\pi[\varphi(x)]=\mu$，$\operatorname{Var}_\pi[\varphi(x)]=\sigma^2<\infty$。强大数定律给出 $\bar E_{\varphi,N}\to\mu$ 几乎必然成立，即 $P(\lim_{N\to\infty}|\bar E_{\varphi,N}-\mu|=0)=1$。

有限随机样本带来的波动总会存在。若 $\sigma^2>0$，中心极限定理说明 $\sqrt N(\bar E_{\varphi,N}-\mu)$ 依分布收敛到 $\mathcal N(0,\sigma^2)$。因此，当 $N$ 足够大时，$\bar E_{\varphi,N}$ 的分布近似为 $\mathcal N(\mu,\sigma^2/N)$。估计量的均值正是目标值，方差随 $N$ 增加而减小。只要能从 $\pi$ 生成独立同分布的样本，就有以下结论。

1. 蒙特卡洛估计有随机波动，但对 $\mu=E_\pi[\varphi(x)]$ 无偏。
2. 估计误差的标准差为 $\sigma/\sqrt N$，因此误差的典型量级为 $O(N^{-1/2})$。
3. 收敛速率中的指数 $1/2$ 与 $x$ 的维数无关。误差常数 $\sigma$ 和采样成本仍可能随维数改变。

第三点很重要。原则上，即使参数空间很大，只要能够获得独立样本，也可能用相对少量的样本求得近似解。实践中的困难通常恰恰是如何从目标分布 $\pi$ 获得这些样本。各种蒙特卡洛方法为此提供不同的采样技术。

### 1.19.2.1 蒙特卡洛原理示例

多次随机试验的平均值往往会逐渐稳定。这里用帕斯卡与费马通信中的一个问题来说明。这些书信被视为现代概率论的起点。法国贵族兼赌徒德梅雷骑士（Chevalier de Méré）原先赌一枚骰子掷四次至少出现一次六点，后来把赌局改成掷两枚骰子共二十四次，赌至少有一次两枚同时为六。他在新赌局里没有占到便宜，于是请帕斯卡解释。

第一种赌局的解析解很简单。四次独立投掷至少出现一次六点的概率为 $1-(5/6)^4\approx0.5177$。这有点像用一枚略有偏向的硬币猜正反面。优势太小，经验不足的对手可能察觉不到，但德梅雷可以像赌场一样，在反复下注时获得正的平均收益。第二种赌局中，二十四次至少出现一次双六的概率为 $1-(35/36)^{24}\approx0.4914$。增加到二十五次，概率就变成 $1-(35/36)^{25}\approx0.5055$，对德梅雷有利。

如果只观察一串输赢结果，我们能否有把握地判断胜率确实偏离 $0.5$？许多实际问题的概率比这里难算得多，甚至无法直接求出。因此，我们关心从蒙特卡洛实验数据估计这些量有多可靠。

反复玩同一种赌局就是一个蒙特卡洛实验。记录每局输赢和总局数，就可以估计获胜概率。先看单骰掷四次的赌局。令 $x_k^{(n)}$ 表示第 $n$ 局第 $k$ 次的点数，一局可记为 $x=(x_1,x_2,x_3,x_4)$。骰子公平，所以 $x_k\sim U(1,6)$，其中 $U(a,b)$ 表示整数 $a$ 到 $b$ 上的均匀分布。各次投掷独立，因此 $\pi$ 是 $\mathcal X=\{1,\ldots,6\}^4$ 上的均匀分布，每局都是 $\mathcal X$ 中随机抽到的一个点。

用 $I\{A\}$ 表示示性函数，事件 $A$ 成立时取 $1$，否则取 $0$。第 $n$ 局的胜负可写为

$$
\varphi(x^{(n)})=
I\left\{\sum_{k=1}^4 I\{x_k^{(n)}=6\}>0\right\}.
$$

这个式子只检查四次投掷中是否至少出现一次六点。因此，德梅雷的获胜概率 $\theta=E_\pi[\varphi(x)]$ 可以用 $\bar E_{\varphi,N}=N^{-1}\sum_{n=1}^N\varphi(x^{(n)})$ 估计。

类似地，对两枚骰子投掷二十四次的赌局，记 $x_{i,k}^{(n)}$ 为第 $n$ 局第 $k$ 次投掷时第 $i$ 枚骰子的点数。令 $B_{i,k}^{(n)}=I\{x_{i,k}^{(n)}=6\}$，则

$$
\begin{gathered}
\varphi(x^{(n)})\\
=I\left\{
\sum_{k=1}^{24}
 B_{1,k}^{(n)}B_{2,k}^{(n)}>0
\right\},\\
\bar E_{\varphi,N}=\frac1N\sum_{n=1}^N\varphi(x^{(n)}).
\end{gathered}
\tag{19.1}
$$

$\varphi(x^{(n)})$ 是伯努利随机变量，均值为 $\theta$，方差为 $\theta(1-\theta)$。由于两者都有限，强大数定律保证当 $N\to\infty$ 时，$\bar E_{\varphi,N}$ 几乎必然趋于 $\theta$。中心极限定理进一步描述了波动的大小。当 $N$ 较大时，估计值近似服从均值为 $\theta$、方差为 $\theta(1-\theta)/N$ 的正态分布。只要能生成独立样本，误差的典型量级就是 $O(N^{-1/2})$，这个速率的指数与待估问题的维数无关。

下面用两枚骰子投掷二十四次的赌局进行模拟。图 19.1 中的轨迹给出式（19.1）在不同 $N$ 下的估计值，随局数增加逐渐靠近真实值。图中的红色边界依据中心极限定理给出的标准差绘制。

![图 19.1。单条模拟轨迹随局数增加逐渐靠近双六赌局的真实胜率。](./assets/images/monte-carlo/fig-19-01.png)

**图 19.1**　估计二十四次投掷中至少出现一次双六的概率。水平实线表示低于 $0.5$ 的真实胜率 $\theta_{\mathrm{true}}$。曲线给出估计值 $\bar E_{\varphi,N}$ 随局数 $N$ 的变化。大数定律说明这样的轨迹最终都会收敛到实线所示的真实胜率。

为了说明中心极限定理的含义，假想每晚玩 $N$ 局，共玩 $K$ 个独立的晚上。用 $\varphi(x^{(n,i)})$ 表示第 $i$ 晚第 $n$ 局的结果，其中 $1\le i\le K$、$1\le n\le N$。第 $i$ 晚观察了前 $N$ 局后的估计值为

$$
\bar E_{\varphi,N}^{(i)}
=\frac1N\sum_{n=1}^N\varphi(x^{(n,i)}).
$$

把各晚的轨迹画在一起，就得到图 19.2。每条轨迹表示一个独立实验中，估计值随已玩局数 $N$ 的变化。随着 $N$ 增大，各条轨迹聚集在越来越窄的带状区域内，符合中心极限定理给出的波动尺度。

![图 19.2。多条独立模拟轨迹汇聚到真实胜率附近，红色虚线给出随样本数缩窄的三倍标准差带。](./assets/images/monte-carlo/fig-19-02.png)

**图 19.2**　用双骰赌局的模拟结果说明中心极限定理。对固定的 $N$，各独立实验的估计值近似服从正态分布，标准差为 $\sigma/\sqrt N$，其中 $\sigma^2=\theta_{\mathrm{true}}(1-\theta_{\mathrm{true}})$。两条红色虚线分别是 $\theta_{\mathrm{true}}-3\sigma/\sqrt N$ 和 $\theta_{\mathrm{true}}+3\sigma/\sqrt N$。一维正态分布在均值两侧各三个标准差内包含超过 99% 的概率质量。图上的模拟轨迹只有偶尔越出这条带。

上面的实验由计算机模拟。在确定性的硬件上生成真正的随机数颇为困难，实际模拟通常用确定性算法产生伪随机数。

### 1.19.2.2 随机数生成

原文借用维基百科伪随机数生成器词条中的一句话，大意是随机数的生成太重要，不能听任偶然。确定性计算机单靠自身无法生成真正的随机数。查随机数表、掷骰子、抛硬币、洗牌或转轮盘都难以满足计算机模拟所需的数量。比较适合计算设备的途径包括采集齐纳二极管或其他模拟电路的热噪声、采集大气噪声，以及对包含随机输入的视频帧计算哈希。模拟中使用的大多数随机数仍由伪随机数生成器产生。这些算法效率高，而且可以用相同的种子重现同一个序列，这对调试蒙特卡洛程序很重要。

一种经典方法是**线性同余生成器**（LCG）。它的理论成熟，实现简单，运行速度快，递推式为

$$
x_{n+1}\equiv ax_n+c\pmod M.
$$

适当选择 $a,c,M$，可以使生成的整数在 $0,\ldots,M-1$ 上表现得近似均匀。参数选择还会影响周期和序列相关性。可用统计检验衡量输出质量，例如 George Marsaglia 开发的 DIEHARD 检验组。

原文接着介绍了 Matsumoto 和 Nishimura 提出的**梅森旋转算法**（Mersenne Twister）。它的周期长、速度快，有多种公开实现，长期用于统计模拟和蒙特卡洛计算。

好的均匀随机数生成器可以给出一个区间上的近似均匀样本。例如，可以把 $0$ 到 $2^{64}-1$ 之间的均匀整数转换成 $[0,1)$ 上近似均匀的双精度数。以下用 $U(0,1)$ 表示这样的均匀随机数生成器，用 $u\sim U(0,1)$ 表示抽到一个样本。理论上用连续均匀分布描述抽样，实际程序返回的是有限精度的浮点数。


## 1.19.3 模拟随机变量的基本方法

以下方法用于生成给定分布的样本，主要讨论一维和二维情形。更全面的处理见 Devroye [16]。

### 1.19.3.1 反演法

设 $F_X(x)=P(X\le x)$。如果 $X$ 有密度 $f_X$，则 $F_X(x)=\int_{-\infty}^x f_X(s)\,ds$。当 $F_X$ 连续且严格递增时，$U=F_X(X)$ 满足 $P(U\le u)=F_X(F_X^{-1}(u))=u$，所以 $U$ 是均匀随机变量。反过来，从 $U(0,1)$ 取样并输出 $F_X^{-1}(U)$，就会得到所需的分布。

离散分布或带原子的分布允许 $F$ 有跳跃。这时用广义逆

$$
F^{-}(u)=\inf\{x:F(x)\ge u\}.
$$

由 $\{F^{-}(U)\le x\}=\{U\le F(x)\}$ 可得 $P(F^{-}(U)\le x)=F(x)$。离散情形下，可以想象把长度为 $1$ 的线段按各个概率质量分割，再返回均匀抽到的点所在区段的标签。

![离散分布的反演抽样。上图给出各点概率，下图给出累计概率。均匀数落入哪个累计概率区间，就返回对应的状态。](./assets/images/monte-carlo/fig-19-03.png)

**图 19.3**　离散分布的反演抽样。上图给出各点概率，下图给出累计概率。均匀数落入哪个累计概率区间，就返回对应的状态。

**例 1（指数分布）。** 速率为 $\lambda$ 的指数分布在 $x\ge0$ 上的密度为 $\lambda e^{-\lambda x}$，分布函数为 $1-e^{-\lambda x}$。因此可用 $X=-\log(1-U)/\lambda$ 取样。由于 $1-U$ 同样均匀，也可直接用 $X=-\log U/\lambda$。

![带有原子的分布函数在原子处有跳跃。给定 u，广义逆取使累计概率至少为 u 的最小位置。](./assets/images/monte-carlo/fig-19-04.png)

**图 19.4**　带有原子的分布函数在原子处有跳跃。给定 u，广义逆取使累计概率至少为 u 的最小位置。

### 1.19.3.2 变量变换

反演法是从容易抽样的分布出发，再变换样本的一个特例。先考虑 $Y=aX+b$，其中 $a\ne0$。当 $a>0$ 时，$F_Y(y)=P(X\le (y-b)/a)$。当 $a<0$ 时，不等号反向。对分布函数求导可得 $f_Y(y)=|a|^{-1}f_X((y-b)/a)$。例如 $X$ 在 $[0,1)$ 上均匀时，$2X-1$ 在 $[-1,1)$ 上均匀。

更一般地，对于可微且可逆的变换 $y=g(x)$，

$$
\begin{gathered}
f_Y(y)\\
=f_X(g^{-1}(y))\,|\det Dg^{-1}(y)|.
\end{gathered}
\tag{19.2}
$$

在一维中，行列式就是逆函数的导数，其绝对值同时适用于递增和递减的情形。二维时它是由 $x_1,x_2$ 对 $y_1,y_2$ 的偏导数组成的矩阵的行列式。下文也写 $y(x)$ 和 $x(y)$，分别表示正向和逆向变换。

**例 2（Box–Müller 方法）。** 独立生成 $X_1\sim\operatorname{Exp}(1/2)$ 和 $X_2\sim U(0,2\pi)$。把 $\sqrt{X_1}$ 看作半径，$X_2$ 看作角度，令

$$
Y_1=\sqrt{X_1}\cos X_2,\qquad
Y_2=\sqrt{X_1}\sin X_2.
$$

逆变换为 $x_1=y_1^2+y_2^2$，$x_2=\operatorname{atan2}(y_2,y_1)\bmod 2\pi$。除去原点和角度分支的零测集，逆变换的雅可比行列式绝对值为 $2$。代入（19.2）后，

$$
f_Y(y_1,y_2)=
\frac{e^{-y_1^2/2}}{\sqrt{2\pi}}
\frac{e^{-y_2^2/2}}{\sqrt{2\pi}}.
$$

联合密度分解成两个标准正态密度，所以得到两个独立的标准正态样本。

### 1.19.3.3 拒绝采样

若目标密度为 $\pi$，选易于抽样的提议密度 $q$ 及常数 $M$，使 $\pi(x)\le Mq(x)$ 对所有 $x$ 成立。先生成 $x\sim q$，再以 $\pi(x)/(Mq(x))$ 的概率接受。若只知道未归一化密度 $\phi=Z\pi$，可直接找出 $\widetilde M$ 使 $\phi(x)\le\widetilde Mq(x)$，并以 $\phi(x)/(\widetilde Mq(x))$ 的概率接受。这样只需要对 $\phi$ 做逐点评估。

对任意密度 $f$，有

$$
f(x)=\int I\{0\le\tau\le f(x)\}\,d\tau.
\tag{19.3}
$$

因此，在曲线 $f$ 以下的区域中均匀取点，再忽略纵坐标 $\tau$，就相当于从 $f$ 抽样。若 $f=\phi/Z$，同样有

$$
\begin{gathered}
Zf(x)=\int I\{0\le\tau\le\phi(x)\}\,d\tau.
\end{gathered}
\tag{19.4}
$$

两边对 $x$ 积分可见 $Z$ 正是曲线 $\phi$ 下方的体积。原文用湖中的鱼打比方，若鱼在水体中均匀分布，从上往下看，水深的地方就会显得更密。

![湖中的鱼。左图展示湖底的形状，右图展示从上方观察的结果。沿深度方向积分后，较深区域的边际密度更大。](./assets/images/monte-carlo/fig-19-05.png)

**图 19.5**　湖中的鱼。左图展示湖底的形状，右图展示从上方观察的结果。沿深度方向积分后，较深区域的边际密度更大。

从 $q$ 抽到 $x$ 后，令 $\tau\mid x\sim U(0,\widetilde Mq(x))$。联合密度在包络以内恒为 $1/\widetilde M$。保留 $\tau\le\phi(x)$ 的点，就在目标曲线下得到均匀点，取其横坐标即得到 $\pi$ 的样本。一次试验的总体接受率为 $Z/\widetilde M$。

![拒绝采样。红点在目标曲线以下，蓝叉在包络与目标之间。给定横坐标，接受概率等于目标曲线高度与包络高度之比。](./assets/images/monte-carlo/fig-19-06.png)

**图 19.6**　拒绝采样。红点在目标曲线以下，蓝叉在包络与目标之间。给定横坐标，接受概率等于目标曲线高度与包络高度之比。

**算法 1（拒绝采样）。** 构造包络 $\widetilde Mq$。每次独立抽取 $x\sim q$ 和 $u\sim U(0,1)$，若 $u\le\phi(x)/(\widetilde Mq(x))$ 则保留 $x$。重复直到得到所需数量的样本。

## 1.19.4 马尔可夫链蒙特卡洛

MCMC 通过模拟转移核为 $K(x'\mid x)$ 的马尔可夫链来处理难以直接抽样的目标 $\pi$。从初值出发，反复按当前状态抽取下一状态。迭代下标 $n$ 表示采样器走了多少步，和时间序列模型中的观测时刻是两回事。一个 MCMC 状态本身可以包含整条时间轨迹。第 $n$ 步的边际分布满足

$$
\pi_n(x)=\int K(x\mid z)\pi_{n-1}(z)\,dz.
$$

简称 $\pi_n=K\pi_{n-1}$。平稳分布满足 $K\pi=\pi$。有限状态链若不可约且非周期，就存在唯一平稳分布，且从任意初始分布出发都收敛到它。不可约表示各状态相互可达，非周期意味着回返时长的最大公约数为 $1$。这里有两个问题。一是怎样分析已有转移核的长期分布，二是怎样为给定 $\pi$ 构造容易模拟的核。

### 1.19.4.1 有限状态链的平稳分布

原文采用**列随机矩阵**约定，$K_{ij}=P(X_n=i\mid X_{n-1}=j)$，因此各列和为 $1$，分布用列向量表示。由全概率公式 $\pi_n=K^n\pi_0$。对于可对角化的 $K=D\Lambda D^{-1}$，有 $K^n=D\Lambda^nD^{-1}$。当 $1$ 是单特征值且其余特征值的模严格小于 $1$ 时，$\Lambda^n$ 只剩第一个对角元素为 $1$。因此 $K^\infty$ 是秩一矩阵，等于对应的右、左特征向量的外积。由于 $\mathbf1^\top K=\mathbf1^\top$，把右特征向量归一化成概率向量 $\pi$ 后，有 $K^\infty=\pi\mathbf1^\top$。所以每一列都是 $\pi$，初始状态的影响消失。

![转移矩阵的一次、二次、五次、十次幂与极限。颜色越深，概率越高。极限矩阵各列相同。此例第二特征值的模约为 0.64。](./assets/images/monte-carlo/fig-19-07.png)

**图 19.7**　转移矩阵的一次、二次、五次、十次幂与极限。颜色越深，概率越高。极限矩阵各列相同。此例第二特征值的模约为 0.64。

有限状态下，总变差距离定义为 $\|P-Q\|_{\mathrm{TV}}=\tfrac12\sum_i|P(i)-Q(i)|$。在上述可对角化情形，$\|K^n\pi_0-\pi\|_{\mathrm{TV}}\le C|\lambda_2|^n$，其中 $\lambda_2$ 是模第二大的特征值。有限不可约非周期链总有某个 $r<1$ 给出几何上界 $Cr^n$。一般状态空间也有相应的收敛理论，但需要额外条件，不能直接套用矩阵分解。

考虑两状态链，每步以概率 $\epsilon$ 原地停留，否则切换状态。

$$
K=\begin{pmatrix}
\epsilon&1-\epsilon\\
1-\epsilon&\epsilon
\end{pmatrix}.
\tag{19.5}
$$

特征值为 $1$ 和 $2\epsilon-1$。当 $0<\epsilon<1$ 时，分布趋于 $(1/2,1/2)^\top$，速度随 $|2\epsilon-1|$ 改变。$\epsilon=1$ 时任何初始分布都保持不变。$\epsilon=0$ 时链交替访问两状态，仍有唯一的均匀平稳分布，但从单一状态出发的边际不收敛。

![两状态链在不同留驻概率下的边际分布。横轴是迭代次数，颜色较深处表示概率较高。上下两端分别展示周期振荡和状态完全断开。](./assets/images/monte-carlo/fig-19-08.png)

**图 19.8**　两状态链在不同留驻概率下的边际分布。横轴是迭代次数，颜色较深处表示概率较高。上下两端分别展示周期振荡和状态完全断开。

### 1.19.4.2 Metropolis–Hastings 方法

若能构造以目标 $\pi$ 为平稳分布的遍历链，可以丢弃初始的一段迭代，再用后续样本估计期望。实际中很难知道有限步后距离平稳还有多远，而且样本依然相关。Metropolis 提出的构造由 Hastings 推广。它只要求能抽样候选 $y\sim q(\cdot\mid x)$ 并计算接受概率，即使 $\pi=\phi/Z$ 中的 $Z$ 未知也可以用。

$$
\alpha(x,y)=\min\left\{1,
\frac{\phi(y)q(x\mid y)}{\phi(x)q(y\mid x)}\right\}.
$$

接受时走到 $y$，否则留在 $x$。即使提议 $q$ 与当前状态无关，接受过程仍使转移依赖当前状态。若 $\rho(x)=\int q(y\mid x)(1-\alpha(x,y))\,dy$，完整的核为

$$
\begin{gathered}
K(dy\mid x)\\
=q(y\mid x)\alpha(x,y)\,dy\\
+\rho(x)\delta_x(dy).
\end{gathered}
\tag{19.6}
$$

**算法 2（Metropolis–Hastings）。** 初始化 $x$。每一步先生成候选 $y$，再抽取独立的均匀数 $u$。若 $u<\alpha(x,y)$，下一状态为 $y$，否则记下当前的 $x$ 作为下一状态。

若 $\pi(dx)K(dy\mid x)=\pi(dy)K(dx\mid y)$，则核满足**细致平衡**。对一侧变量积分即得平稳性。对 MH 的非对角部分，$\pi(x)q(y\mid x)\alpha(x,y)$ 等于 $\min\{\pi(x)q(y\mid x),\pi(y)q(x\mid y)\}$，交换 $x,y$ 后保持不变。拒绝项集中在对角线上，也保持对称。因此 MH 满足细致平衡。这是平稳性的充分条件。

### 1.19.4.3 MH 示例

先考虑 $\{1,\ldots,20\}$ 上的双峰目标 $\phi/Z$。提议以概率 $\nu$ 走一步局部随机游走，左右各半，到边界时将越界候选限制在边界。以概率 $1-\nu$ 从全空间均匀抽样，相当于全局跳转。局部移动容易接受，但可能很难跨过两峰间的低概率区。全局跳转有助于跨峰，也可能提到低概率状态而被拒绝。

![双峰目标及对称提议下的接受概率矩阵。接受概率由候选和当前状态的目标密度之比决定。](./assets/images/monte-carlo/fig-19-09.png)

**图 19.9**　双峰目标及对称提议下的接受概率矩阵。接受概率由候选和当前状态的目标密度之比决定。

![三种混合比例下的提议矩阵与 MH 转移矩阵。上排是提议，下排是把接受和拒绝都计入后的有效转移。](./assets/images/monte-carlo/fig-19-10.png)

**图 19.10**　三种混合比例下的提议矩阵与 MH 转移矩阵。上排是提议，下排是把接受和拒绝都计入后的有效转移。

这个例子可以显式算出 $K$，并比较谱隙 $1-|\lambda_2|$。谱隙越大，有限链的边际通常越快接近平稳。图中 $\nu\approx0.1$ 时较快，而几乎只走局部步时混合较差。真实问题通常很难构造整个转移矩阵，但运行算法只需提议抽样和接受率。原文丢掉前 $100$ 次迭代，用频数估计各状态概率。

$$
\begin{gathered}
\bar\pi_n(x)\\
=\frac{1}{n-100}\sum_{\tau=101}^n I\{x^{(\tau)}=x\}.
\end{gathered}
\tag{19.7}
$$

频数的收敛依据链的遍历定理。样本相关性仍会影响估计量的方差。

![谱隙随局部移动概率变化。这个例子中，少量局部移动略优于完全使用均匀提议。](./assets/images/monte-carlo/fig-19-11.png)

**图 19.11**　谱隙随局部移动概率变化。这个例子中，少量局部移动略优于完全使用均匀提议。

![三种提议下的迭代边际分布与总变差距离。局部移动占比接近 1 时，距离下降较慢。](./assets/images/monte-carlo/fig-19-12.png)

**图 19.12**　三种提议下的迭代边际分布与总变差距离。局部移动占比接近 1 时，距离下降较慢。

![三种提议下的样本轨迹与频数估计。估计使用同一条轨迹，并丢弃前 100 次迭代。](./assets/images/monte-carlo/fig-19-13.png)

**图 19.13**　三种提议下的样本轨迹与频数估计。估计使用同一条轨迹，并丢弃前 100 次迭代。

**例 3（用带噪距离估计物体位置）。** 三个传感器位于已知位置 $s_j$，对未知位置 $x$ 分别观测 $y_j\mid x,s_j\sim\mathcal N(\|x-s_j\|,R)$，其中 $R$ 是观测噪声方差。取平坦先验并假设观测条件独立，后验正比于 $\phi(x)=\prod_{j=1}^3p(y_j\mid x)$。每项似然各自给出一片环形高概率区域，三项相乘后后验才集中到小区域。使用 $q(y\mid x)=\mathcal N(y;x,\sigma^2I)$，提议对称，接受率简化为 $\min(1,\phi(y)/\phi(x))$。相邻样本明显相关，但长轨迹的二维直方图仍能逼近目标。

![传感器与物体的位置。三个圆点是传感器，蓝色方块是真实位置。](./assets/images/monte-carlo/fig-19-14.png)

**图 19.14**　传感器与物体的位置。三个圆点是传感器，蓝色方块是真实位置。

![上方三图是各传感器的似然，下方是结合三项观测后的目标后验。](./assets/images/monte-carlo/fig-19-15.png)

**图 19.15**　上方三图是各传感器的似然，下方是结合三项观测后的目标后验。

![左图为 MH 的位置轨迹，右图用一条更长的轨迹给出二维直方图。](./assets/images/monte-carlo/fig-19-16.png)

**图 19.16**　左图为 MH 的位置轨迹，右图用一条更长的轨迹给出二维直方图。

### 1.19.4.4 Gibbs 采样

如果高维联合密度难以直接抽样，但全条件分布 $\pi(x_d\mid x_{-d})$ 易于抽样，可以逐坐标更新。对应的 MH 提议从全条件分布取样，其余坐标固定。正反提议比恰好抵消目标密度比，所以每次都接受。每个坐标核 $K_d$ 都保持 $\pi$ 不变，因此整轮复合核也保持 $\pi$ 不变。能否从任意初值收敛还要检查状态空间连通性等条件。固定顺序访问叫确定扫描，随机选择坐标叫随机扫描。原文提到 BUGS 可根据一些模型的描述自动生成 Gibbs 采样器。

**算法 3（Gibbs 采样）。** 初始化全部坐标。每轮依次对 $d=1,\ldots,D$ 从全条件抽样。条件中 $1,\ldots,d-1$ 使用本轮刚更新的值，$d+1,\ldots,D$ 使用上一轮的值。

**例 4（计数数据的变点）。** 设变点 $\tau$ 在 $1,\ldots,T$ 上均匀，两段的发生强度分别为 $\lambda_1,\lambda_2$，先验独立且均为形状 $a$、速率 $b$ 的 Gamma 分布。给定参数，观测 $y_t$ 条件独立。$t\le\tau$ 用 $\operatorname{Poisson}(\lambda_1)$，之后用 $\operatorname{Poisson}(\lambda_2)$。目标是 $p(\lambda_1,\lambda_2,\tau\mid y_{1:T})$，此例也可用精确结果检查采样误差。

![变点模型模拟数据。计数为 y_t，虚线是真实强度，在第 26 个时刻由 3.2 降到 1.2。](./assets/images/monte-carlo/fig-19-17.png)

**图 19.17**　变点模型模拟数据。计数为 y_t，虚线是真实强度，在第 26 个时刻由 3.2 降到 1.2。

联合密度是两段泊松概率的乘积再乘上三个先验因子。设 $S_\tau=\sum_{t=1}^\tau y_t$。对数联合密度中，关于 $\lambda_1$ 的项为 $(a+S_\tau-1)\log\lambda_1-(b+\tau)\lambda_1$，$\lambda_2$ 同理。给定两段强度后，$\tau$ 的未归一化对数权重为

$$
\begin{gathered}
S_\tau\log\lambda_1-\tau\lambda_1\\
+(S_T-S_\tau)\log\lambda_2-(T-\tau)\lambda_2.
\end{gathered}
$$

**算法 4（变点模型的 Gibbs 采样）。** 给定当前 $\tau$，从 $\operatorname{Gamma}(a+S_\tau,b+\tau)$ 更新 $\lambda_1$，从 $\operatorname{Gamma}(a+S_T-S_\tau,b+T-\tau)$ 更新 $\lambda_2$。再用新强度计算各候选变点的对数权重，归一化后抽取新的 $\tau$。

原文用 1851 至 1962 年的英国致命煤矿事故数据演示。统计文献常指出，事故强度约在 1890 年、新健康与安全法规颁布后发生改变。后验图显示，年强度约从 $3$ 降到 $1$。

![上图为每年的致命煤矿事故数，下图为变点年份的后验分布。](./assets/images/monte-carlo/fig-19-18.png)

**图 19.18**　上图为每年的致命煤矿事故数，下图为变点年份的后验分布。

![变点前后两段强度的联合后验样本。](./assets/images/monte-carlo/fig-19-19.png)

**图 19.19**　变点前后两段强度的联合后验样本。


## 1.19.5 序贯蒙特卡洛

前面介绍的 MCMC 通常在已取得整批数据后运行。若观测陆续到达且需要实时判断，例如跟踪物体，每来一个观测就重新处理全部数据会越来越慢。**序贯蒙特卡洛**（SMC）是一类在线处理数据的采样方法。在粒子数和每步计算量有界的实现中，可以用固定数量的运算更新当前状态的近似。SMC 常用于状态空间模型。其初始状态为 $X_0\sim p(x_0)$，其余部分为

$$
X_t\mid X_{t-1}\sim p(x_t\mid x_{t-1}).
\tag{19.8}
$$

$$
Y_t\mid X_t\sim p(y_t\mid x_t).
\tag{19.9}
$$

前者是转移模型，后者是观测模型。$t$ 代表数据的自然顺序。线性动力系统和自回归模型可以写成这种形式。预测关心未来观测的分布 $p(y_{T+1}\mid y_{1:T})$，滤波关心当前状态的后验 $p(x_t\mid y_{1:t})$。这里用重要性采样与重采样构造粒子滤波。

### 1.19.5.1 重要性采样

设 $\pi(x)=\phi(x)/Z$，其中 $\phi$ 能逐点计算，但 $Z$ 难以计算。选易抽样的提议 $q$，要求它覆盖目标的支撑集。令 $W(x)=\phi(x)/q(x)$，则 $Z=E_q[W(X)]$，且

$$
E_\pi[\varphi(X)]
=\frac{E_q[W(X)\varphi(X)]}{E_q[W(X)]}.
$$

从 $q$ 生成独立样本 $x^{(1)},\ldots,x^{(N)}$。令 $W^{(i)}=W(x^{(i)})$，归一化权重 $w^{(i)}=W^{(i)}/\sum_j W^{(j)}$，就得到自归一化估计量 $\widehat\mu_N=\sum_i w^{(i)}\varphi(x^{(i)})$。它是两个样本平均的比值。在相应的可积条件下，大数定律保证一致性。有限样本下，这个比值一般有偏。如果 $q$ 在目标质量大的区域抽得太少，则少量样本会承担大部分权重，此时加权近似可能很不稳定。

![重要性采样。上图显示未归一化目标与提议，中图显示修正抽样偏差的权重，下图用加权直方图近似目标。](./assets/images/monte-carlo/fig-19-20.png)

**图 19.20**　重要性采样。上图显示未归一化目标与提议，中图显示修正抽样偏差的权重，下图用加权直方图近似目标。

#### 1.19.5.1.1 重采样

给定带权经验测度 $\sum_i w^{(i)}\delta_{x^{(i)}}$，重采样返回 $M$ 个等权粒子 $\tilde x^{(j)}$，要求其经验测度在给定原粒子后满足

$$
E\left[\frac1M\sum_{j=1}^M\delta_{\tilde x^{(j)}}\right]
=\sum_{i=1}^N w^{(i)}\delta_{x^{(i)}}.
$$

通常取 $M=N$。高权重粒子可能被复制，低权重粒子可能被丢弃。重采样增加一层蒙特卡洛波动，也无法找回此前没有采到的区域。上式保证重采样步骤对原来的加权近似没有系统偏移。

![重要性采样与重采样。从带权粒子出发，有些粒子被复制，有些被丢弃，输出粒子权重相同。](./assets/images/monte-carlo/fig-19-21.png)

**图 19.21**　重要性采样与重采样。从带权粒子出发，有些粒子被复制，有些被丢弃，输出粒子权重相同。

多项式重采样把粒子索引视为分类分布，类别概率为 $w^{(i)}$。独立抽取 $M$ 个均匀数，再通过累计权重的广义逆选择索引。系统重采样只抽一次 $U\sim U(0,1/M)$，然后在 $U+(j-1)/M$ 处取广义逆。两者满足相同的期望条件。系统重采样的输出互相依赖，在许多应用中波动较小，但具体方差也会受粒子顺序影响。

![多项式重采样与系统重采样。两列从上到下给出原权重、累计权重和重采样后各粒子出现的次数。](./assets/images/monte-carlo/fig-19-22.png)

**图 19.22**　多项式重采样与系统重采样。两列从上到下给出原权重、累计权重和重采样后各粒子出现的次数。

### 1.19.5.2 序贯重要性采样

目标是近似 $p(x_{1:t}\mid y_{1:t})=\phi_t(x_{1:t})/Z_t$，其中 $\phi_t=p(y_{1:t},x_{1:t})$，$Z_t=p(y_{1:t})$。普通重要性采样在高维中容易产生权重退化。序贯方法每次给已有轨迹加一个状态，不重新生成此前的部分。允许提议利用新观测，写作

$$
\begin{gathered}
q_t(x_{1:t}\mid y_{1:t})\\
=q_t(x_t\mid x_{1:t-1},y_{1:t})\,
 q_{t-1}(x_{1:t-1}\mid y_{1:t-1}).
\end{gathered}
$$

取 $W_t=\phi_t/q_t$。将分子和分母按时间分解，便能递推权重。下式省略提议对观测的条件记号。

$$
W_t=W_{t-1}v_t,\qquad
v_t=\frac{p(y_t\mid x_t)p(x_t\mid x_{t-1})}
{q_t(x_t\mid x_{1:t-1})}.
$$

给定祖先时，$p(x_t\mid x_{t-1},y_t)$ 能使增量权重相对于这一步的候选抽样没有随机波动，但往往难以抽样。**Bootstrap 滤波器**以模型的转移密度为提议，故 $v_t=p(y_t\mid x_t)$。这样容易实现，但候选生成时没有利用 $y_t$。观测若十分集中，可能只有少量候选落进高概率区域。重采样可以截去低权重轨迹，集中计算资源。粒子因共同祖先而相关，但在适当条件下，固定时刻的估计仍随粒子数增大而一致。

**算法 5（粒子滤波）。**

1. 对第 $i$ 个旧粒子从 $q_t$ 生成候选 $\hat x_t^{(i)}$，计算 $v_t^{(i)}$，并更新 $W_t^{(i)}=W_{t-1}^{(i)}v_t^{(i)}$。
2. 将权重归一化成 $w_t^{(i)}$，计算有效样本量 $\operatorname{ESS}=1/\sum_i(w_t^{(i)})^2$。
3. 若有效样本量超过阈值，保留各自的延长轨迹和权重。否则按归一化权重重采样祖先索引，复制相应的完整延长轨迹，并令所有归一化权重为 $1/N$。若保留未归一化尺度，则每个权重重置为 $\sum_i W_t^{(i)}/N$。

**例 5（缓慢变化的泊松强度）。** 令 $\ell_t$ 为隐含的对数强度，$R$ 为已知的漂移方差。

$$
\begin{gathered}
p(y_t\mid\ell_t)\\
=\exp\{y_t\ell_t-e^{\ell_t}-\log(y_t!)\}.
\end{gathered}
\tag{19.10}
$$

$$
\ell_t\mid\ell_{t-1}\sim\mathcal N(\ell_{t-1},R).
\tag{19.11}
$$

之前的变点模型允许强度突然变化一次。这个模型允许连续缓慢漂移。$R$ 越小，相邻时刻越接近，$R=0$ 时退化为固定强度模型。原文比较了以下两种提议。

- **转移密度提议。** 直接从 $\mathcal N(\ell_{t-1},R)$ 抽候选，令 $v_t=p(y_t\mid\ell_t)$。这是 bootstrap 滤波器，在计算机视觉里也称 condensation 算法。
- **似然提议。** 若 $c_t=\int p(y_t\mid\ell)\,d\ell$ 有限，则令 $q_t(\ell)=p(y_t\mid\ell)/c_t$。这时 $v_t=c_t p(\ell_t\mid\ell_{t-1})$，归一化权重时 $c_t$ 抵消。对本例，换元 $\lambda=e^\ell$ 后，提议下的 $\lambda$ 服从形状 $y_t$、速率 $1$ 的 Gamma 分布，因此这一提议要求 $y_t>0$。当 $y_t=0$ 时 $c_t$ 发散，需要选其他提议。

作为 $\lambda$ 的函数，泊松似然形式上正比于 $\operatorname{Gamma}(y_t+1,1)$ 的密度。若实际从这个 Gamma 分布生成 $\lambda$，再取 $\ell=\log\lambda$，则变换密度比纯似然多出雅可比因子 $e^\ell$。原文最后的权重计算对应这一**对数 Gamma 提议**，此时

$$
v_t\propto
\exp\left\{-\frac{(\ell_t-\ell_{t-1})^2}{2R}-\ell_t\right\}.
$$

选择提议时要在接近滤波分布与抽样成本之间权衡。最新观测越有信息，利用它构造候选的价值通常越大。在固定算力下，简单提议配合更多粒子也可能更划算。

![三粒子的 bootstrap 滤波示意。叉号是观测，方块是真实强度，圆形面积反映粒子权重，连线表示祖先关系。在第 4 步重采样后，权重重置为相等。](./assets/images/monte-carlo/fig-19-23.png)

**图 19.23**　三粒子的 bootstrap 滤波示意。叉号是观测，方块是真实强度，圆形面积反映粒子权重，连线表示祖先关系。在第 4 步重采样后，权重重置为相等。

## 1.19.6 进阶蒙特卡洛方法

**可逆跳跃 MCMC**（RJ-MCMC）把 MH 推广到参数维数可变的状态空间。它常用于模型比较，例如根据数据推断模型的阶数。

### 1.19.6.1 可逆跳跃 MCMC

对候选模型 $k\in\mathcal K$，设参数 $\theta_k\in\mathbb R^{N_k}$，未归一化密度为 $\phi_k(\theta_k)$，其积分为 $Z_k$。给定归一化的模型权重 $\tilde p_k$，联合分布为

$$
\pi(k,\theta_k)=\tilde p_k\,\frac{\phi_k(\theta_k)}{Z_k}.
\tag{19.12}
$$

其中 $p_k$ 为未归一化的模型权重，

$$
\tilde p_k=\frac{p_k}{\sum_{j\in\mathcal K}p_j}.
\tag{19.13}
$$

在贝叶斯模型比较里，若 $p_k$ 表示**先验**模型权重，且 $\phi_k=p(x,\theta_k\mid k)$，则 $Z_k=p(x\mid k)$ 是边际似然。贝叶斯公式给出模型后验 $p(k\mid x)=p_k Z_k/\sum_j p_j Z_j$。将此后验模型概率代替（19.12）里的模型概率，就得到目标

$$
p(k,\theta_k\mid x)=
\frac{p_k\phi_k(\theta_k)}{\sum_j p_j Z_j}.
$$

因此可以构造一条链在不交的空间 $\bigcup_k\{k\}\times\mathbb R^{N_k}$ 上取样，通过模型访问频率估计 $p(k\mid x)$，避免分别计算每个 $Z_k$。困难在于，嵌入高维空间的低维曲面通常有零体积，跨维提议需要同时考虑正向与逆向的概率质量。

假设 $N_{k'}>N_k$。抽取 $N_{k'}-N_k$ 维辅助变量 $u\sim q_k(u)$，用可逆映射 $\theta_{k'}=g_{k\to k'}(\theta_k,u)$ 使两边维数相等。反向应用逆映射，同时恢复 $\theta_k$ 与 $u$。也可以在两边都加入辅助变量，只要增广后的维数相等。正向选模型的概率记为 $q_{k\to k'}$，反向为 $q_{k'\to k}$。原文通常让它们只依赖模型索引。

在增广空间里，若正向输入密度写为 $f_k(\theta_k)q_k(u)$，经变换的密度为 $f_k(\theta_k)q_k(u)/|J|$，其中 $J=\det Dg_{k\to k'}(\theta_k,u)$。比较正反方向的提议时，$f_k$ 抵消，留下 $|J|/q_k(u)$。目标密度比中的共同归一化因子也抵消。因此对升维提议，

$$
\begin{gathered}
r_{k\to k'}=\frac{\phi_{k'}(\theta_{k'})p_{k'}}
                    {\phi_k(\theta_k)p_k}\\
\times\frac{q_{k'\to k}}{q_k(u)q_{k\to k'}}\,|J|.
\end{gathered}
\tag{19.14}
$$

$$
\alpha(k\to k')=\min\{1,r_{k\to k'}\}.
\tag{19.15}
$$

$$
\alpha_{k\to k'}\equiv\alpha(k\to k').
\tag{19.16}
$$

$r_{k\to k'}$ 称为 MH 比率。反向比率为 $1/r_{k\to k'}$，反向接受率为 $\min\{1,1/r_{k\to k'}\}$。取倒数的是比率，接受率仍需截在 $1$。

### 1.19.6.2 可逆跳跃算法

跳转概率是采样算法的设计参数，会影响混合速度。实践中常只允许相邻的模型互跳。$k'=k+1$ 常称增加，$k'=k-1$ 称删除，$k'=k$ 称模型内更新。给定一对可双向到达的模型，确定升维映射、辅助变量的分布及雅可比，就确定了降维的反向构造。

**算法 6（可逆跳跃 MCMC）。**

1. 初始化 $(k,\theta_k)$，按 $q_{k\to k'}$ 选择候选模型索引。
2. 同维且留在原模型时，用普通 MH 提议和接受率。
3. 升维时抽 $u$ 并计算 $g_{k\to k'}(\theta_k,u)$，用（19.14）和（19.15）计算接受率。
4. 降维时用相应升维映射的逆恢复低维参数及辅助变量，用升维比率的倒数计算接受率。
5. 抽独立均匀数。若小于接受率，记录候选模型及参数，否则记录原状态。

**例 6（一维区间与二维椭圆之间的跳转）。** 设 $E_1=\{1\}\times[0,1]$，参数为 $r$。设 $E_2$ 为模型 $2$ 对应的椭圆区域，参数为 $(x,y)$。一维密度 $\phi_1(r)=e^{-\lambda r}$ 在区间外为零。二维密度是截在 $(x/a)^2+(y/b)^2\le1$ 内的高斯核，

$$
\phi_2(x,y)=
\exp\left(-\frac{(x-\mu_x)^2+(y-\mu_y)^2}{2\sigma^2}\right)
$$

在椭圆外取零。设 $Z_1,Z_2$ 为各自积分，两个模型的共同归一化常数为 $p_1Z_1+p_2Z_2$，则

$$
\pi(k,\theta_k)=
\frac{p_k\phi_k(\theta_k)}{p_1Z_1+p_2Z_2}.
\tag{19.17}
$$

![上图是一维与二维模型的目标密度，下图是可逆跳跃采样得到的直方图。原文参数为 λ=1、a=3、b=1、均值为 (1.5,1)、方差为 4、两模型先验权重相等。](./assets/images/monte-carlo/fig-19-24.png)

**图 19.24**　上图是一维与二维模型的目标密度，下图是可逆跳跃采样得到的直方图。原文参数为 λ=1、a=3、b=1、均值为 (1.5,1)、方差为 4、两模型先验权重相等。

![模型索引的后验频数。链停留在每个空间的次数除以总步数，可估计对应模型的后验概率。](./assets/images/monte-carlo/fig-19-25.png)

**图 19.25**　模型索引的后验频数。链停留在每个空间的次数除以总步数，可估计对应模型的后验概率。

#### 1.19.6.2.1 接受概率

**在一维空间内移动。** 独立提议 $r'\sim U(0,1)$。正反提议密度相等，故

$$
\alpha_{1\to1}=\min\{1,\phi_1(r')/\phi_1(r)\}.
\tag{19.18}
$$

**在二维空间内移动。** 提议为对称的高斯随机游走，$\epsilon\sim\mathcal N(0,vI)$。

$$
(x',y')=(x,y)+\epsilon.
\tag{19.19}
$$

$$
\alpha_{2\to2}=\min\left\{1,\frac{\phi_2(x',y')}{\phi_2(x,y)}\right\}.
\tag{19.20}
$$

**从一维跳到二维。** 抽取辅助角度 $u$，其分布与密度为

$$
\begin{gathered}
u\sim U(0,2\pi),\\
q_1(u)=1/(2\pi).
\end{gathered}
\tag{19.21}
$$

令 $x=ar\cos u$、$y=br\sin u$。给定 $r$，提议落在 $(x/a)^2+(y/b)^2=r^2$ 的椭圆上。角度按参数 $u$ 均匀，弧长一般不均匀。雅可比矩阵是

$$
Dg=\begin{pmatrix}
a\cos u&-ar\sin u\\
b\sin u&br\cos u
\end{pmatrix}.
\tag{19.22}
$$

所以 $|\det Dg|=abr$。令 $A=\phi_2(x,y)p_2/(\phi_1(r)p_1)$，$B=q_{2\to1}/q_{1\to2}$，则

$$
\alpha_{1\to2}=\min\{1,A\,B\,2\pi abr\}.
\tag{19.23}
$$

![维数匹配。为一维半径补上均匀辅助角度，经椭圆坐标变换生成二维候选。](./assets/images/monte-carlo/fig-19-26.png)

**图 19.26**　维数匹配。为一维半径补上均匀辅助角度，经椭圆坐标变换生成二维候选。

**从二维跳到一维。** 取 $r=\sqrt{(x/a)^2+(y/b)^2}$，并取 $u=\operatorname{atan2}(y/b,x/a)\bmod 2\pi$。除去原点与角度分支的零测集，这给出逆变换。逆雅可比绝对值为 $1/(abr)$，亦即 $1/\sqrt{x^2b^2+y^2a^2}$。因此

$$
\alpha_{2\to1}=\min\left\{1,\frac{1}{2\pi A B abr}\right\}.
\tag{19.24}
$$

![可逆跳跃路径。虚线是同一空间内被接受的移动，箭头是在一维与二维空间间被接受的跳转。拒绝候选时链停在原状态。](./assets/images/monte-carlo/fig-19-27.png)

**图 19.27**　可逆跳跃路径。虚线是同一空间内被接受的移动，箭头是在一维与二维空间间被接受的跳转。拒绝候选时链停在原状态。

## 1.19.7 开放问题

蒙特卡洛计算的规模随硬件能力增长。大型数据集带来了更复杂的统计模型和更高的推断成本，如何让 MC 方法在这些问题上有效扩展，仍是原文关注的研究问题。作者列举了几条方向：自适应方法可以学习更好的提议 [32]，SMC 可与 MCMC 结合 [33]，无法直接评估似然时可以研究无似然推断 [6]，并行计算也可以加速大规模模拟 [34]。这些是原文成书时对研究前沿的描述。

## 1.19.8 延伸阅读

Grimmett 和 Stirzaker [4] 提供概率基础，Rosenthal [12] 适合继续学习严谨的概率论，Norris [7] 系统讨论马尔可夫链。MacKay [5] 从机器学习角度介绍基本蒙特卡洛方法。MCMC 可参考 Brooks 等 [6] 或 Gilks 等 [18]。SMC、粒子滤波及平滑可参考 Doucet 等 [10, 30]，以及 Liu 和 Chen [8] 与 Liu [20]。

### 术语

| 缩写或术语 | 含义 |
| --- | --- |
| MC | 蒙特卡洛方法，使用随机样本计算数值近似 |
| LLN、CLT | 大数定律、中心极限定理 |
| CDF、广义逆 | 累积分布函数、用于反演抽样的分位数函数 |
| LCG、Mersenne Twister | 线性同余生成器、梅森旋转伪随机数生成器 |
| Box–Müller、Jacobian | 正态变量生成法、雅可比矩阵或其行列式 |
| MCMC、MH、RJ-MCMC | 马尔可夫链蒙特卡洛、Metropolis–Hastings、可逆跳跃 MCMC |
| 转移核、转移矩阵 | 给出从当前状态到下一状态的分布，有限状态时可写成矩阵 |
| 不可约、非周期、遍历 | 状态互通、回返周期为 1，以及本文有限链中二者同时成立 |
| 平稳分布、细致平衡 | 经过一次转移保持不变的分布，以及互逆方向流量相等的条件 |
| 接受概率、拒绝概率 | 采纳当前候选的概率、当前状态被保留的概率 |
| 总变差、谱隙 | 分布之间的距离、本文中为 1 减去次大特征值模 |
| 全条件分布、Gibbs 采样 | 固定其余坐标后的条件分布、依此逐坐标更新的采样器 |
| 确定扫描、随机扫描 | 按固定顺序或随机选择坐标更新 |
| IS、SIS、SMC | 重要性采样、序贯重要性采样、序贯蒙特卡洛 |
| 多项式与系统重采样 | 按累计权重，用独立均匀数或带随机平移的均匀网格选择粒子 |
| 粒子滤波 | 用带权轨迹及重采样递推状态后验 |

### 参考文献

1. N. Metropolis, S. Ulam, The Monte Carlo method, Journal of the Am. Statist. Assoc. 44 (247) (1949) 335–341.
2. N. Metropolis, A. Rosenbluth, M. Rosenbluth, A. Teller, E. Teller, Equations of state calculations by fast computing machines, J. Chem. Phys. 21 (1953) 1087–1091.
3. C. Geyer, Handbook of Markov Chain Monte Carlo, chapter Introduction to Markov Chain Monte Carlo (Chapman & Hall/CRC Handbooks of Modern Statistical Methods) 2011.
4. G.R. Grimmett, D.R. Stirzaker, Probability and Random Processes, Oxford University Press, 2001.
5. D.J.C. MacKay, Information Theory, Inference and Learning Algorithms, Cambridge University Press, 2003.
6. S. Brooks, A. Gelman, G. Jones, X. Meng (eds.), Handbook of Markov Chain Monte Carlo (Chapman & Hall/CRC Handbooks of Modern Statistical Methods) 2011.
7. J.R. Norris, Markov Chains, Cambridge University Press, 1997.
8. J.S. Liu, R. Chen, Sequential Monte Carlo methods for dynamic systems, J. Am. Statist. Assoc. 93 (1998) 1032–1044.
9. A. Doucet, N. de Freitas, N.J. Gordon (eds.), Sequential Monte Carlo Methods in Practice, Springer Verlag, 2001.
10. A. Doucet, A.M. Johansen, Handbook of Nonlinear Filtering, chapter A Tutorial on Particle Filtering and Smoothing: Fifteen years Later, Oxford University Press, 2010.
11. P.J Green, Reversible jump Markov chain Monte Carlo computation and Bayesian model determination, Biometrika 82 (4) (1995) 711-732.
12. Jeffrey S. Rosenthal, A first look at rigorous probability theory, World Scientific, second ed., 2006.
13. Charles M. Grinstead, Laurie J. Snell, Introduction to Probability, American Mathematical Society, fourth ed., July 2006.
14. The marsaglia random number cd-rom with the diehard battery of tests of randomness.
15. M. Matsumoto, T. Nishimura, Mersenne twister: a 623-dimensionally equidistributed uniform pseudorandom number generator, ACM Trans. Model Comput. Simul. 8 (1) (1998) 3–30.
16. Luc Devroye, Non-Uniform Random Variate Generation, 1986.
17. Luke Tierney, Markov chains for exploring posterior distributions, Ann. Statist. 22 (1994) 1701–1762.
18. W.R. Gilks, S. Richardson, D.J Spiegelhalter (Eds.), Markov Chain Monte Carlo in Practice, CRC Press, London, 1996.
19. G.O. Roberts, J.S. Rosenthal, Markov Chain Monte Carlo: Some practical implications of theoretical results, Can. J. Statist. 26 (1998) 5–31.
20. J.S. Liu, Monte Carlo Strategies in Scientific Computing, Springer, 2004.
21. W.K. Hastings, Monte Carlo sampling methods using Markov chains and their applications, Biometrika 57 (1970) 97–109.
22. O. Cappé, E. Moulines, T. Rydén, Inference in Hidden Markov Models, Springer-Verlag, New York, 2005.
23. Luke Tierney, A note on metropolis-hastings kernels for general state spaces, Ann. Appl. Probab. 8 (1998) 1–9.
24. S. Geman, D. Geman. Stochastic Relaxation, Gibbs Distributions and the Bayesian Restoration of Images, in: M.A. Fischler, O. Firschein (Eds.), Readings in Computer Vision: Issues, Problems, Principles, and Paradigms, Kaufmann, Los Altos, CA, 1987, pp. 564–584.
25. A.M. Johansen, L. Evers, N. Whiteley, Monte Carlo Methods, Online Resource, 2008 (Lecture Notes).
26. P. Fearnhead, Exact and Efficient Bayesian inference for multiple changepoint problems, Technical report, Dept. Math. Stat., Lancaster University, 2003.
27. Jarrett, A note on the intervals between coal mining disasters, Biometrika 66 (1979) 191–193.
28. A. Doucet, N. de Freitas, N.J. Gordon (eds.), Sequential Monte Carlo Methods in Practice, Springer-Verlag, New York, 2001.
29. O.Cappe,R.Douc,E.Moulines,Comparisonofresamplingschemesforparticlefiltering,in:4thInternational Symposium on Image and Signal Processing and Analysis (ISPA), Zagrep, Croatia, September 2005.
30. A. Doucet, S. Godsill, C. Andrieu, On sequential Monte Carlo sampling methods for Bayesian filtering, Statist. Comput. 10 (3) (2000) 197-208.
31. Y. Fan, S. Sisson, Handbook of Markov Chain Monte Carlo, Chapter Reversible jump Markov chain Monte Carlo (Chapman & Hall/CRC Handbooks of Modern Statistical Methods) 2011.
32. C. Andrieu, J. Thoms. A tutorial on adaptive mcmc, Statist. Comput. 18 (4) (2008) 343–373.
33. Pierre Del Moral, Arnaud Doucet, Ajay Jasra. Sequential Monte Carlo samplers, J. Roy. Statist. Soc. Ser. B Stat. Methodol. 68 (3) (2006) 411–436.
34. Anthony Lee, Christopher Yau, Michael B Giles, Arnaud Doucet, Christopher C. Holmes, On the utility of graphics cards to perform massively parallel simulation of advanced Monte Carlo methods, May 2009, pp. 4–6.

*来源：A. Taylan Cemgil，A Tutorial Introduction to Monte Carlo Methods, Markov Chain Monte Carlo and Particle Filtering，2014 年，印刷页 1065–1114。图 19.1 至图 19.27 取自原 PDF。*
