---
title: "Random Variables"
date: "2026-09-28"
tag: "Math & CS"
summary: "Chapter Eight Notes of MA-UY 3514 Honors Theory of Probability"
---

# 第八章 随机变量

在第五章中，我们研究了定义在可数概率空间 $(\Omega,\mathcal A,P)$ 上的随机变量。现在我们希望把定义推广到任意抽象空间，无论 $\Omega$ 是否可数。

设 $X$ 将 $\Omega$ 映射到状态空间 $(F,\mathcal F)$。我们通常希望计算 $X$ 落在某个 $A\in\mathcal F$ 中的概率：

$$P(\{\omega:X(\omega)\in A\})=P(X\in A)=P(X^{-1}(A)).$$

为了使 $P(X^{-1}(A))$ 有意义，必须有 $X^{-1}(A)\in\mathcal A$，因为概率测度 $P$ 是定义在 $\mathcal A$ 上的。这就引出了可测函数的概念。

## 定义 8.1

(a) 设 $(E,\mathcal E)$ 和 $(F,\mathcal F)$ 是两个可测空间。函数 $X:E\to F$ 称为关于 $\mathcal E$ 和 $\mathcal F$ **可测（measurable）**，如果对任意 $A\in\mathcal F$ 都有

$$X^{-1}(A)\in\mathcal E.$$

也可以写成 $X^{-1}(\mathcal F)\subset\mathcal E$。

(b) 当 $(E,\mathcal E)=(\Omega,\mathcal A)$ 时，可测函数 $X$ 称为 **随机变量（random variable）**。

(c) 当 $F=\mathbb R$ 时，通常取 $\mathcal F$ 为 $\mathbb R$ 上的 Borel $\sigma$-代数 $\mathcal B$。以后如果没有特别说明，实值随机变量默认取值于 $(\mathbb R,\mathcal B)$。

## 定理 8.1

设 $\mathcal C$ 是 $F$ 的一族子集，并且 $\sigma(\mathcal C)=\mathcal F$。函数 $X:E\to F$ 关于 $\mathcal E$ 和 $\mathcal F$ 可测，当且仅当

$$X^{-1}(C)\in\mathcal E,\qquad C\in\mathcal C.$$

也就是说，如果 $\mathcal F$ 是由 $\mathcal C$ 生成的，那么判断 $X$ 是否可测，只需要检查生成族 $\mathcal C$ 中的集合。

**证明：** 必要性显然。下面证明充分性。假设对所有 $C\in\mathcal C$ 都有 $X^{-1}(C)\in\mathcal E$。注意逆像与可数并、可数交和补集相容：

$$X^{-1}\left(\bigcup_nA_n\right)=\bigcup_nX^{-1}(A_n),\qquad X^{-1}\left(\bigcap_nA_n\right)=\bigcap_nX^{-1}(A_n),$$

以及

$$X^{-1}(A^c)=(X^{-1}(A))^c.$$

定义

$$\mathcal B=\{A\in\mathcal F:X^{-1}(A)\in\mathcal E\}.$$

根据假设 $\mathcal C\subset\mathcal B$，而由上面的三个性质可知 $\mathcal B$ 本身是一个 $\sigma$-代数。因此

$$\mathcal B\supset\sigma(\mathcal C)=\mathcal F.$$

又因为定义上 $\mathcal B\subset\mathcal F$，所以 $\mathcal B=\mathcal F$，从而 $X$ 可测。$\square$

我们已经知道，$\mathbb R$ 上的 Borel $\sigma$-代数可以由区间 $(-\infty,a]$ 生成。因此对于实值函数 $X$，判断它是否可测，不需要检查所有 Borel 集，只需要检查形如 $\{X\leq a\}$ 的事件。

## 推论 8.1

设 $(F,\mathcal F)=(\mathbb R,\mathcal B)$，$(E,\mathcal E)$ 为任意可测空间，且 $X,X_n$ 是定义在 $E$ 上的实值函数。

(a) $X$ 可测，当且仅当对于每个 $a\in\mathbb R$，

$$\{X\leq a\}=X^{-1}((-\infty,a])\in\mathcal E.$$

等价地，也可以要求 $\{X<a\}\in\mathcal E$。

(b) 如果每个 $X_n$ 都可测，则

$$\sup_nX_n,\qquad \inf_nX_n,\qquad \limsup_{n\to\infty}X_n,\qquad \liminf_{n\to\infty}X_n$$

都可测。

(c) 如果每个 $X_n$ 都可测，并且 $X_n\to X$ 逐点收敛，则 $X$ 可测。

**证明：** 对于 (a)，由于

$$\mathcal B=\sigma(\{(-\infty,a]:a\in\mathbb R\}),$$

结论直接由定理 8.1 得到。

对于 (b)，因为每个 $X_n$ 可测，所以 $\{X_n\leq a\}\in\mathcal E$。又有

$$\{\sup_nX_n\leq a\}=\bigcap_n\{X_n\leq a\},$$

因此 $\sup_nX_n$ 可测。类似地，

$$\{\inf_nX_n<a\}=\bigcup_n\{X_n<a\},$$

所以 $\inf_nX_n$ 也可测。进一步，

$$\limsup_{n\to\infty}X_n=\inf_n\sup_{m\geq n}X_m,$$

而

$$\liminf_{n\to\infty}X_n=\sup_n\inf_{m\geq n}X_m,$$

因此两者都可测。

对于 (c)，若 $X_n\to X$，则

$$X=\limsup_{n\to\infty}X_n=\liminf_{n\to\infty}X_n,$$

所以由 (b) 可知 $X$ 可测。$\square$

## 定理 8.2

设 $X:(E,\mathcal E)\to(F,\mathcal F)$ 和 $Y:(F,\mathcal F)\to(G,\mathcal G)$ 都可测，则复合函数

$$Y\circ X:(E,\mathcal E)\to(G,\mathcal G)$$

也可测。

**证明：** 对任意 $A\in\mathcal G$，

$$(Y\circ X)^{-1}(A)=X^{-1}(Y^{-1}(A)).$$

由于 $Y$ 可测，$Y^{-1}(A)\in\mathcal F$；再由 $X$ 可测，$X^{-1}(Y^{-1}(A))\in\mathcal E$。因此 $Y\circ X$ 可测。$\square$

# 拓扑空间与 Borel 可测性

一个 **拓扑空间（topological space）** 是一个集合以及其上一族被称为开集的子集。设 $(E,\mathcal U)$ 是拓扑空间，其中 $\mathcal U$ 表示所有开集。开集族满足：任意多个开集的并仍然是开集，有限多个开集的交仍然是开集。

设 $(E,\mathcal U)$ 和 $(F,\mathcal V)$ 是两个拓扑空间。函数 $f:E\to F$ 称为 **连续（continuous）**，如果每个开集 $A\in\mathcal V$ 的逆像仍然是开集，即

$$f^{-1}(A)\in\mathcal U.$$

拓扑空间 $(E,\mathcal U)$ 上的 Borel $\sigma$-代数定义为

$$\mathcal B=\sigma(\mathcal U).$$

也就是说，它是由所有开集生成的 $\sigma$-代数。注意 $\mathcal U$ 本身通常不是 $\sigma$-代数，因为开集族一般不对补集和可数交封闭。

## 定理 8.3

设 $(E,\mathcal U)$ 和 $(F,\mathcal V)$ 是两个拓扑空间，并令

$$\mathcal E=\sigma(\mathcal U),\qquad \mathcal F=\sigma(\mathcal V).$$

那么任何连续函数 $X:E\to F$ 都是可测函数，也称为 **Borel 可测函数（Borel measurable function）**。

**证明：** 因为 $\mathcal F=\sigma(\mathcal V)$，根据定理 8.1，只需要检查 $F$ 中的开集。对于任意 $O\in\mathcal V$，由于 $X$ 连续，$X^{-1}(O)$ 是 $E$ 中的开集，因此 $X^{-1}(O)\in\mathcal U\subset\mathcal E$。所以 $X$ 可测。$\square$

# 示性函数

对于集合 $A\subset E$，定义 $A$ 的 **示性函数（indicator function）**

$$\mathbf 1_A(x)=\Bigg\lbrace {1,\quad x\in A\atop 0,\quad x\notin A}$$

通常直接写作 $\mathbf 1_A$。这个函数用于表示一个点是否属于集合 $A$。它有时也称为 characteristic function，并写作 $\chi_A$，不过这种术语和记号现在相对少见。

## 定理 8.4

设 $(F,\mathcal F)=(\mathbb R,\mathcal B)$，$(E,\mathcal E)$ 为任意可测空间。

(a) 示性函数 $\mathbf 1_A$ 可测，当且仅当 $A\in\mathcal E$。

(b) 如果 $X_1,\ldots,X_n$ 是实值可测函数，并且 $f:\mathbb R^n\to\mathbb R$ 是 Borel 可测函数，则

$$f(X_1,\ldots,X_n)$$

也是可测函数。

(c) 如果 $X,Y$ 可测，则

$$X+Y,\qquad XY,\qquad X\vee Y,\qquad X\wedge Y$$

都可测；在 $Y\neq0$ 的地方，$X/Y$ 也可测。其中

$$X\vee Y=\max(X,Y),\qquad X\wedge Y=\min(X,Y).$$

**证明：** 对于 (a)，任意 $B\subset\mathbb R$ 的逆像 $(\mathbf 1_A)^{-1}(B)$ 只能是 $\varnothing,A,A^c,E$ 四者之一，因此 $\mathbf 1_A$ 可测当且仅当 $A\in\mathcal E$。

对于 (b)，$\mathbb R^n$ 上的 Borel $\sigma$-代数 $\mathcal B^n$ 可由矩形

$$\prod_{i=1}^n(-\infty,a_i]$$

生成。令 $X=(X_1,\ldots,X_n)$，则

$$X^{-1}\left(\prod_{i=1}^n(-\infty,a_i]\right)=\bigcap_{i=1}^n\{X_i\leq a_i\}\in\mathcal E.$$

所以 $X:E\to(\mathbb R^n,\mathcal B^n)$ 可测。再由定理 8.2，$f\circ X=f(X_1,\ldots,X_n)$ 可测。

对于 (c)，函数

$$f_1(x,y)=x+y,\qquad f_2(x,y)=xy,$$

$$f_3(x,y)=x\vee y,\qquad f_4(x,y)=x\wedge y$$

都是 $\mathbb R^2\to\mathbb R$ 的连续函数，而 $f_5(x,y)=x/y$ 在 $y\neq0$ 时连续。因此由定理 8.3 和 (b)，结论成立。$\square$

# 随机变量的分布

设 $X$ 是概率空间 $(\Omega,\mathcal A,P)$ 上的随机变量，取值于可测空间 $(E,\mathcal E)$。$X$ 的 **分布测度（distribution measure）**，也称为 **律（law）**，定义为

$$P^X(B)=P(X^{-1}(B))=(P\circ X^{-1})(B)=P(\{\omega:X(\omega)\in B\})=P(X\in B),\qquad B\in\mathcal E.$$

这些写法在数学中都会使用，其中最常见的是

$$P^X(B)=P(X\in B).$$

这种写法省略了底层样本点 $\omega$，使我们可以直接在状态空间 $(E,\mathcal E)$ 上研究概率，而不必总是显式处理往往较复杂的样本空间 $\Omega$。有时 $P^X$ 也称为 $P$ 在映射 $X$ 下的 **像（image）**。

## 定理 8.5

随机变量 $X$ 的分布 $P^X$ 是 $(E,\mathcal E)$ 上的概率测度。

也就是说，随机变量

$$X:(\Omega,\mathcal A,P)\to(E,\mathcal E)$$

把定义在样本空间 $\Omega$ 上的概率测度 $P$ 推到了状态空间 $E$ 上，得到概率测度 $P^X$。

# 累积分布函数与概率密度函数

当 $X$ 是实值随机变量时，它的分布 $P^X$ 是 $\mathbb R$ 上的概率测度，并且可以由它的 **累积分布函数（cumulative distribution function, CDF）**

$$F_X(x)=P^X((-\infty,x])=P(X\leq x)$$

完全确定。

如果存在函数 $f_X$，使得对所有 $x\in\mathbb R$，

$$F_X(x)=\int_{-\infty}^xf_X(y)\,dy,$$

则称 $f_X$ 为随机变量 $X$ 的 **概率密度函数（probability density function, PDF）**，也简称为 density。

因此，CDF 给出的是 $P(X\leq x)$，而 PDF 描述概率在实数轴上的密度。随机变量的分布始终存在，但概率密度函数并不一定存在。