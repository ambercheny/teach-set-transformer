# Set Transformer Resources

This file is the source list for the Set Transformer teaching workspace. Lessons and reference documents should draw knowledge from these resources instead of relying on memory.

## Knowledge

- [Paper: _Set Transformer: A Framework for Attention-based Permutation-Invariant Neural Networks_ — Lee et al. 2019](<Lee 2019 (Set Transformer).pdf>)
  Primary source for Set Transformer. Use for: set-input motivation, permutation invariance and equivariance, Deep Sets-style pooling baselines, attention basics, MAB, SAB, ISAB, PMA, the encoder-decoder structure, and the claim that SAB/ISAB are permutation equivariant while PMA makes the full model permutation invariant.

- [Paper: _Set Norm and Equivariant Skip Connections: Putting the Deep in Deep Sets_ — Zhang et al. 2022](<Zhang 2022 (permutation invariance DL and RBC).pdf>)
  Primary source for the Flow-RBC application and the Set Transformer++ modifications. Use for: Flow-RBC task framing, hematocrit prediction from red blood cell measurements, permutation invariance in single-cell data, gradient vanishing/exploding in deep permutation-invariant networks, clean-path equivariant residual connections, layer norm risks for real-valued set elements, set norm, and why absolute scale can matter biologically.

## Wisdom

- No community resources have been added yet.
  The current workspace uses only local PDFs. Add communities later only if the learner wants real-world critique or discussion outside the lessons.

## Gaps

- Flow cytometry fundamentals.
  The learner has no prior flow cytometry background. Zhang 2022 explains the Flow-RBC task, but it is not a beginner reference for flow cytometry instrumentation, events, gating, debris, doublets, or how per-event feature tables are produced.

- Implementation reference.
  The two papers establish the concepts, but they are not a step-by-step PyTorch implementation guide. A later lesson may need either local code examples or an approved external implementation source.

- Flow-RBC data and code details.
  Zhang 2022 mentions open-source data and code, but this workspace has not accessed the internet. If future lessons need exact feature names, preprocessing details, or repository code, ask the user before using external resources.
