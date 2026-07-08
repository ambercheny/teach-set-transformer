# Set Transformer Teaching Plan

This workspace is for teaching Set Transformer in the context of unordered flow cytometry cell-event data and RBC prediction.

## Mission

The learner wants to understand Set Transformer well enough to explain why it fits unordered flow cytometry cell-event data and evaluate whether it is appropriate for RBC prediction.

See [MISSION.md](MISSION.md).

## Reference Sources

1. [Lee 2019](<Lee 2019 (Set Transformer).pdf>): the original Set Transformer paper.
2. [Zhang 2022](<Zhang 2022 (permutation invariance DL and RBC).pdf>): modifies Deep Sets and Set Transformer with clean-path residual connections and set norm to improve training stability for deep permutation-invariant models.

## Learner Background

1. The learner has basic PyTorch knowledge.
2. The learner has no prior understanding of attention, transformers, or flow cytometry.
3. Lessons should therefore introduce each concept from the motivation upward, without assuming transformer vocabulary.

## Key Concepts To Teach

1. Sets vs sequences.
2. Why flow cytometry cell events are naturally treated as unordered sets.
3. Permutation-invariant functions.
4. Permutation-equivariant functions.
5. Sample-level prediction vs event-level representation.
6. Deep Sets as the baseline architecture for permutation-invariant learning.
7. Why simple pooling can discard interactions between set elements.
8. Attention basics: queries, keys, values, attention weights, and weighted sums.
9. Set Transformer architecture:
   - Multihead Attention Block (MAB)
   - Set Attention Block (SAB)
   - Induced Set Attention Block (ISAB)
   - Pooling by Multihead Attention (PMA)
10. How SAB and ISAB preserve permutation equivariance.
11. How PMA produces permutation-invariant outputs.
12. Why ISAB reduces attention cost from `O(n^2)` to `O(nm)`.
13. Why Set Transformer is relevant for RBC prediction from flow cytometry data.
14. Zhang 2022 improvements:
   - gradient vanishing and exploding in deep permutation-invariant networks
   - clean-path equivariant residual connections
   - layer norm risks for real-valued set elements
   - set norm as a normalization method tailored to sets
15. Practical modeling concerns:
   - variable set sizes
   - padding and masking
   - large event counts
   - preserving clinically meaningful real-valued scale information

## Deliverables

Create two short, self-contained HTML lessons in `lessons/`.

Each lesson should:

1. teach one tightly scoped skill;
2. cite Lee 2019 and/or Zhang 2022 where relevant;
3. include at least one interactive retrieval or classification exercise;
4. link to supporting reference documents;
5. end with a small check that tests durable understanding, not just recognition.

## Lesson 1: Permutation Invariance For Flow Cytometry

Goal: make the learner able to distinguish invariant, equivariant, and order-sensitive functions, and explain why RBC flow cytometry inputs should be modeled as sets.

Cover:

1. What a set is, compared with a sequence.
2. What a flow cytometry event represents.
3. Why reordering cell events should not change a sample-level RBC prediction.
4. Permutation invariance: the sample-level output stays the same.
5. Permutation equivariance: per-event outputs reorder with the input.
6. Deep Sets as the simplest invariant baseline: encode each event, pool, then decode.
7. Why pooling alone may be too weak when event interactions matter.

Interactive components:

1. Reorder a small table of cell events and show that a sample-level invariant summary is unchanged.
2. Contrast invariant output with equivariant per-event output.
3. Quiz: classify toy functions as invariant, equivariant, or neither.

Primary references:

1. Lee 2019, Sections 1 and 2.1.
2. Zhang 2022, Section 2.

## Lesson 2: How Set Transformer Builds An Invariant Predictor

Goal: make the learner able to explain the Set Transformer encoder-decoder structure and identify where equivariance and invariance happen.

Cover:

1. Attention intuition before formal notation.
2. Queries, keys, values, and attention weights.
3. MAB as the reusable attention block.
4. SAB as self-attention over all set elements.
5. ISAB as a scalable approximation using inducing points.
6. PMA as learned pooling.
7. Encoder: SAB or ISAB layers produce permutation-equivariant event representations.
8. Decoder: PMA aggregates event representations into a permutation-invariant sample representation.
9. How the architecture maps onto RBC prediction from flow cytometry events.
10. Why Zhang 2022 changes the architecture for deeper models.

Interactive components:

1. Visualize mean pooling vs attention pooling on a small set of synthetic cell events.
2. Show how inducing points reduce pairwise comparisons for large sets.
3. Quiz: identify which block is equivariant, invariant, or unrestricted.
4. Mini architecture trace: follow a batch of `n` events through SAB/ISAB, PMA, and final prediction.

Primary references:

1. Lee 2019, Sections 2.2, 3.1, 3.2, and 3.3.
2. Zhang 2022, Sections 3 and 4.

## Reference Documents To Create

Create these printable HTML references in `reference/`:

1. `glossary.html`: set, event, sample, invariant, equivariant, attention, MAB, SAB, ISAB, PMA, clean path, set norm.
2. `permutation-invariance.html`: definitions, examples, and common mistakes.
3. `set-transformer-architecture.html`: compact architecture diagram and block summary.
4. `flow-cytometry-as-sets.html`: mapping from cytometry events to model inputs and sample-level targets.
5. `set-norm-and-clean-paths.html`: why Zhang 2022 modifies Deep Sets and Set Transformer.

## Assets To Create

Create reusable lesson components in `assets/`:

1. `course.css`: shared print-friendly styling for lessons and references.
2. `quiz.js`: small reusable quiz component with immediate feedback.
3. `permutation-demo.js`: table reordering and invariant/equivariant output demo.
4. `attention-pooling-demo.js`: simple visualization of mean pooling vs learned attention-style weighting.

## Recommended Build Order

1. Create `RESOURCES.md` from the two local PDFs.
2. Create the shared assets, starting with `assets/course.css`.
3. Create `reference/glossary.html`.
4. Build Lesson 1.
5. Create `reference/set-transformer-architecture.html`.
6. Build Lesson 2.
7. Create a learning record summarizing what the learner has practiced and what should come next.

## Success Criteria

After the two lessons, the learner should be able to:

1. explain why flow cytometry cell-event order should not affect a sample-level RBC prediction;
2. distinguish permutation invariance from permutation equivariance;
3. describe the Deep Sets baseline;
4. explain why Set Transformer adds attention over set elements;
5. identify MAB, SAB, ISAB, and PMA in the architecture;
6. explain where Set Transformer is equivariant and where it becomes invariant;
7. explain why Zhang 2022 introduces clean paths and set norm;
8. name practical risks when applying Set Transformer to large real-valued cytometry event sets.
