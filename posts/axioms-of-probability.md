---
title: "Axioms of Probability"
date: "2026-09-4"
tag: "Math & CS"
summary: "Chapter Two Notes of MA-UY 3514 Honors Theory of Probability"
---
# 概率论与数理统计

概率论的严密体系建立在公理化基础之上。本章首先介绍了样本空间与事件的基本概念，进而通过概率公理（Axioms of Probability）以及一系列由其推导出的性质，阐述了概率在等可能样本空间（Equally Likely Outcomes）及连续集合函数下的运算规律。

## 1. 样本空间与事件 (Sample Space & Events)

### 1.1 样本空间 (Sample Space)
一个随机实验所有可能结果（Outcomes）构成的集合称为样本空间，记作 $S$。
离散样本空间（有限或可数无限）：如抛掷两枚硬币 $S = \{(h,h), (h,t), (t,h), (t,t)\}$。
连续样本空间（不可数无限）：如测量晶体管的寿命 $S = \{x : 0 \le x < \infty\}$。

### 1.2 事件 (Events)
样本空间 $S$ 的任意子集 $E$ 称为事件。若实验的最终结果落入 $E$ 中，则称事件 $E$ 发生。
不可能事件（Null Event）：不包含任何结果的空集，记作 $\emptyset$。
必然事件：样本空间全集 $S$。

### 1.3 事件的集合运算 (Operations on Events)
设 $E, F$ 为样本空间 $S$ 中的两个事件：
并集 (Union, $E \cup F$)：事件 $E$ 或事件 $F$ 发生（包含至少一方）。
交集 (Intersection, $EF$ 或 $E \cap F$)：事件 $E$ 和事件 $F$ 同时发生。
补集/余集 (Complement, $E^c$)：事件 $E$ 不发生，包含所有属于 $S$ 但不属于 $E$ 的结果。
互斥事件 (Mutually Exclusive)：若 $EF = \emptyset$，则称 $E$ 与 $F$ 互斥（不可能同时发生）。
包含关系 ($E \subset F$)：若 $E$ 发生必然导致 $F$ 发生，则称 $E$ 是 $F$ 的子集。

### 1.4 运算律与德·摩根定律 (DeMorgan's Laws)
事件的集合运算满足交换律、结合律与分配律。此外，非常重要的德·摩根定律为：
$$ \left(\bigcup_{i=1}^n E_i\right)^c = \bigcap_{i=1}^n E_i^c, \quad \left(\bigcap_{i=1}^n E_i\right)^c = \bigcup_{i=1}^n E_i^c $$

## 2. 概率公理 (Axioms of Probability)
对于样本空间 $S$ 中的每一个事件 $E$，定义一个实数 $P(E)$ 称为事件 $E$ 的概率，且满足以下三大公理：

### 2.1 概率的三条公理
公理 1（非负性）：对于任意事件 $E$，有
$$ 0 \le P(E) \le 1 $$
公理 2（规范性）：必然事件的概率为
$$ P(S) = 1 $$
公理 3（可列可加性 / Countable Additivity）：对于任意序列两两互斥的事件 $E_1, E_2, E_3, \dots$（即当 $i \neq j$ 时 $E_i E_j = \emptyset$），有
$$ P\left(\bigcup_{i=1}^\infty E_i\right) = \sum_{i=1}^\infty P(E_i) $$

## 3. 概率的基本性质与命题 (Propositions)
由概率公理可直接推导出以下常用性质：

### 3.1 补集公式
$$ P(E^c) = 1 - P(E) $$
推论：空集的概率 $P(\emptyset) = 0$。

### 3.2 容斥原理 (Inclusion-Exclusion Identity)
两事件容斥：
$$ P(E \cup F) = P(E) + P(F) - P(EF) $$
三事件容斥：
$$ P(E \cup F \cup G) = P(E) + P(F) + P(G) - P(EF) - P(EG) - P(FG) + P(EFG) $$
一般化容斥原理：
$$ P\left(\bigcup_{i=1}^n E_i\right) = \sum_{i=1}^n P(E_i) - \sum_{i<j} P(E_i E_j) + \sum_{i<j<k} P(E_i E_j E_k) - \dots + (-1)^{n+1} P(E_1 E_2 \dots E_n) $$

### 3.3 单调性 (Monotonicity)
若 $E \subset F$，则 $P(E) \le P(F)$。
推论：$P(F \setminus E) = P(F E^c) = P(F) - P(E)$。

### 3.4 布尔不等式 (Boole's Inequality / Subadditivity)
对于任意事件序列 $E_1, E_2, \dots, E_n$（不一定互斥）：
$$ P\left(\bigcup_{i=1}^n E_i\right) \le \sum_{i=1}^n P(E_i) $$

## 4. 等可能样本空间 (Equally Likely Outcomes)
设样本空间 $S$ 包含 $N$ 个基本结果，即 $S = \{g_1, g_2, \dots, g_N\}$。假设每个结果发生的可能性相同，即：
$$ P(\{g_1\}) = P(\{g_2\}) = \dots = P(\{g_N\}) = \frac{1}{N} $$
此时，任意包含 $g$ 个基本结果的事件 $E$ 的概率为：
$$ P(E) = \frac{\text{事件 } E \text{ 所包含的样本点个数}}{\text{样本空间 } S \text{ 中的总样本点个数}} = \frac{|E|}{|S|} = \frac{g}{N} $$
注：此类问题的计算高度依赖第一章（Combinatorial Analysis）中的排列组合技巧。

## 5. 连续集合函数与极限 (Probability as a Continuous Set Function)
概率测度可看作定义在事件域上的集合函数。公理 3 保证了概率具有连续性（Continuity）。

### 5.1 单调事件序列 (Monotone Sequences of Events)
递增序列 ($E_n \uparrow E$)：若 $E_1 \subset E_2 \subset E_3 \subset \dots$，定义其极限事件为 $E = \bigcup_{n=1}^\infty E_n$，则：
$$ \lim_{n \to \infty} P(E_n) = P(E) = P\left(\bigcup_{n=1}^\infty E_n\right) $$
递减序列 ($E_n \downarrow E$)：若 $E_1 \supset E_2 \supset E_3 \supset \dots$，定义其极限事件为 $E = \bigcap_{n=1}^\infty E_n$，则：
$$ \lim_{n \to \infty} P(E_n) = P(E) = P\left(\bigcap_{n=1}^\infty E_n\right) $$

## 6. 核心公式
| 定理/公理 | 条件 / 描述 | 数学表达式 |
| :--- | :--- | :--- |
| 公理 1 (非负性) | 任意事件 $E$ | $0 \le P(E) \le 1$ |
| 公理 2 (规范性) | 全集 $S$ | $P(S) = 1$ |
| 公理 3 (可加性) | $E_i$ 两两互斥 ($E_i E_j = \emptyset$) | $P\left(\bigcup_{i=1}^\infty E_i\right) = \sum_{i=1}^\infty P(E_i)$ |
| 补集公式 | 事件 $E$ 的对立事件 | $P(E^c) = 1 - P(E)$ |
| 加法原理 (容斥) | 任意两事件 $E, F$ | $P(E \cup F) = P(E) + P(F) - P(EF)$ |
| 布尔不等式 | 任意事件序列 $E_1, \dots, E_n$ | $P\left(\bigcup_{i=1}^n E_i\right) \le \sum_{i=1}^n P(E_i)$ |
| 古典概型公式 | 有限样本空间，各结果等可能 | $P(E) = \frac{\|E\|}{\|S\|}$ |
| 连续性 (递增极限) | $E_1 \subset E_2 \subset E_3 \subset \dots$ | $\lim_{n \to \infty} P(E_n) = P\left(\bigcup_{n=1}^\infty E_n\right)$ |

---

# 附录：例题(Appendix: Classical Examples & Models)

## A1. 排列组合与等可能样本空间 (Combinatorial Probability)

### 1. 扑克牌概率模型 (Poker Hands)
在标准的 52 张扑克牌中随机抽取 5 张（总组合数为 $\binom{52}{5} = 2,598,960$）：
*   **一对 (One Pair)**：恰好包含一对相同点数和 3 张不同点数的牌。
    $$P(\text{One Pair}) = \frac{\binom{13}{1} \binom{4}{2} \cdot \binom{12}{3} \binom{4}{1}^3}{\binom{52}{5}} \approx 0.42256$$
*   **两对 (Two Pairs)**：包含两组相同点数的牌和 1 张单牌。
    $$P(\text{Two Pairs}) = \frac{\binom{13}{2} \binom{4}{2}^2 \cdot \binom{11}{1} \binom{4}{1}}{\binom{52}{5}} \approx 0.04754$$
*   **三条 (Three of a Kind)**：包含 3 张相同点数的牌和 2 张不同点数的单牌。
    $$P(\text{Three of a Kind}) = \frac{\binom{13}{1} \binom{4}{3} \cdot \binom{12}{2} \binom{4}{1}^2}{\binom{52}{5}} \approx 0.02113$$
*   **四条/炸弹 (Four of a Kind)**：包含 4 张相同点数的牌和 1 张单牌。
    $$P(\text{Four of a Kind}) = \frac{\binom{13}{1} \binom{4}{4} \cdot \binom{12}{1} \binom{4}{1}}{\binom{52}{5}} \approx 0.00024$$

---

### 2. 生日问题 (The Birthday Problem)
**问题描述**：在一个 $k$ 人的房间中，至少有两人生日相同的概率是多少？（假设一年有 365 天，且每天出生概率相同）

*   **求解思路**：利用对立事件（即“所有人的生日都互不相同”）。
*   **公式推导**：
    样本空间总数为 $365^k$。所有人生日都不相同的可能组合数为 $(365)_k = 365 \times 364 \times \dots \times (365 - k + 1)$。
    $$P(\text{至少两人生日相同}) = 1 - \frac{365 \times 364 \times \dots \times (365 - k + 1)}{365^k}$$
*   **核心结论**：
    当 $k = 23$ 时，至少两人生日相同的概率就已超过 **50%** ($P \approx 0.5073$)；当 $k = 50$ 时，概率高居 **97%**。

---

### 3. 分组与球盒问题 (Multinomial Distributions in Probability)
**问题描述**：将 $n$ 个球随机放入 $m$ 个盒子里，或将人员分配到不同组别。

*   **例（分组匹配）**：将 10 对夫妻（共 20 人）随机分成 10 组，每组 2 人。求“没有任何一对夫妻被分在同一组”的概率。
    *   **方法**：先算总分组数 $\frac{20!}{(2!)^{10} 10!}$，再用容斥原理或递推法算出无夫妻同组的组合数。

---

## A2. 容斥原理的应用模型 (Inclusion-Exclusion Applications)

### 4. 经典配对问题 / 错排问题 (The Matching Problem / Derangements)
**问题描述**：$n$ 个人将帽子聚在一起，然后每人随机拿走一顶。求“至少有一个人拿对自己的帽子”的概率 $P(E_n)$。

*   **事件定义**：设 $E_i$ 为“第 $i$ 个人拿对了自己的帽子”。
*   **计算推导**：
    根据容斥原理：
    $$P\left(\bigcup_{i=1}^n E_i\right) = \sum_{i} P(E_i) - \sum_{i<j} P(E_i E_j) + \dots + (-1)^{n+1} P(E_1 E_2 \dots E_n)$$
    其中，单项概率 $P(E_i) = \frac{1}{n}$，双项交集 $P(E_i E_j) = \frac{1}{n(n-1)}$，包含 $k$ 项交集的概率为 $\frac{(n-k)!}{n!} = \frac{1}{(n)_k}$。
    
    代入组合项后展开得到：
    $$P(E_n) = 1 - \frac{1}{2!} + \frac{1}{3!} - \frac{1}{4!} + \dots + (-1)^{n+1} \frac{1}{n!}$$

*   **极限结论 (当 $n \to \infty$ 时)**：
    根据 Taylor 展开式 $e^{-1} = \sum_{k=0}^\infty \frac{(-1)^k}{k!}$，可得：
    $$\lim_{n \to \infty} P(\text{至少一人拿对帽子}) = 1 - e^{-1} \approx 0.6321$$
    $$\lim_{n \to \infty} P(\text{没有任何人拿对帽子}) = e^{-1} \approx 0.3679$$
    > **核心洞察**：当 $n$ 足够大时（如 $n \ge 10$），这个概率几乎与 $n$ 的大小无关，始终保持在约 63.2%。

---

### 5. 优惠券收集者问题 (Coupon Collector's Problem - 概率基础版)
**问题描述**：某种商品内部附赠优惠券，共有 $N$ 种不同的优惠券。若每次购买随机获得其中一种，购买 $k$ 次后集齐所有 $N$ 种优惠券的概率是多少？

*   **求解思路**：
    设 $F_i$ 为“购买 $k$ 次中**没有**拿到第 $i$ 种优惠券”的事件。
    则未集齐的概率为 $P\left(\bigcup_{i=1}^N F_i\right)$。
    应用容斥原理展开即可求得集齐的概率为 $1 - P\left(\bigcup_{i=1}^N F_i\right)$。

---

## A3. 采样与抽样模型 (Sampling Models)

### 6. 超几何抽取：有放回 vs 无放回 (Sampling With/Without Replacement)
**问题描述**：袋中有 $N$ 个球，其中 $M$ 个黑球，$N-M$ 个白球。随机抽取 $n$ 个球。

*   **无放回抽样 (Sampling Without Replacement - 超几何分布)**：
    恰好抽到 $k$ 个黑球的概率：
    $$P(X = k) = \frac{\binom{M}{k} \binom{N-M}{n-k}}{\binom{N}{n}}$$
*   **有放回抽样 (Sampling With Replacement - 二项分布)**：
    设每次抽到黑球概率 $p = \frac{M}{N}$，恰好抽到 $k$ 个黑球的概率：
    $$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

---

### 7. 连续变量与几何概率模型 (Geometric Probability Models)

#### 例 1：线段随机断点问题
在长度为 $L$ 的线段上随机取两点 $X$ 和 $Y$，求这两点将线段分成的三段能构成一个三角形的概率。
*   **求解思路**：
    样本空间 $S = \{(x, y) : 0 \le x \le L, 0 \le y \le L\}$，总面积为 $L^2$。
    根据三角形“两边之和大于第三边”建立关于 $x$ 和 $y$ 的不等式组，在平面直角坐标系中画出可行域，计算可行域图形面积占总面积的比例。
*   **结果**：概率为 $\frac{1}{4}$。

#### 例 2：蒲丰投针问题 (Buffon's Needle Problem)
在绘有等距平行线（间距为 $d$）的平面上，随机投掷一枚长度为 $l$ ($l \le d$) 的针，求针与平行线相交的概率。
*   **核心结论**：
    $$P(\text{相交}) = \frac{2l}{\pi d}$$
*   **应用**：该例题展示了利用随机实验估计圆周率 $\pi$ 的蒙特卡洛方法（Monte Carlo Method）的理论雏形。