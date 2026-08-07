---
title: "Alpha-Beta Pruning, Revisited"
date: "2026-06-15"
tag: "Math & CS"
summary: "Notes on why quiescence search and killer heuristics gave my chess engine a 3–5x cut in branch expansion."
---

While building a lightweight chess engine this summer, the single biggest efficiency win didn't come from a smarter evaluation function — it came from *pruning smarter*, not searching harder.

## The core idea

Minimax with alpha-beta pruning cuts branches that cannot influence the final decision. For a search tree of branching factor $b$ and depth $d$, a naive minimax explores roughly

$$
O(b^d)
$$

nodes. With perfect move ordering, alpha-beta pruning reduces this to close to

$$
O\!\left(b^{d/2}\right)
$$

which is the difference between a few seconds and a few hours at tournament depth.

## What actually moved the needle

1. **Transposition tables** — caching positions reached via different move orders avoided re-searching identical subtrees.
2. **Killer heuristics** — trying moves that caused a beta cutoff at the same depth in sibling branches first, dramatically improving move ordering.
3. **Quiescence search** — extending search at "noisy" leaf nodes (captures, checks) to avoid the horizon effect.

A simplified cutoff check looked something like this:

```python
def alphabeta(node, depth, alpha, beta, maximizing):
    if depth == 0 or node.is_terminal():
        return quiescence(node, alpha, beta)

    if maximizing:
        value = float("-inf")
        for child in order_moves(node):
            value = max(value, alphabeta(child, depth - 1, alpha, beta, False))
            alpha = max(alpha, value)
            if alpha >= beta:
                break  # beta cutoff
        return value
```

## Result

Combining all three techniques against a baseline plain alpha-beta implementation gave a **3–5x reduction** in branch expansion at equivalent search depth, measured across a fixed suite of middlegame positions.

> The lesson generalizes past chess: in most search problems, how you order what you look at first matters more than how fast you look.

Next step: experimenting with a lightweight neural evaluation function to replace the current tapered material-and-position heuristic.
