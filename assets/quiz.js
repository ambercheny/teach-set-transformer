(function () {
  "use strict";

  const DEFAULT_OPTIONS = ["Invariant", "Equivariant", "Order-sensitive"];

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function readOptions(root) {
    const raw = root.getAttribute("data-options");
    if (!raw) return DEFAULT_OPTIONS;
    return raw
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function readQuestions(root) {
    const json = root.querySelector('script[type="application/json"]');
    if (json) {
      const parsed = JSON.parse(json.textContent);
      return Array.isArray(parsed) ? parsed : parsed.questions;
    }

    return Array.from(root.querySelectorAll("[data-question]")).map((node) => ({
      prompt: node.getAttribute("data-question"),
      answer: node.getAttribute("data-answer"),
      explanation: node.getAttribute("data-explanation") || "",
    }));
  }

  function buildQuestion(question, options, index) {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "exercise quiz-question";

    const legend = document.createElement("legend");
    legend.textContent = question.prompt;
    fieldset.appendChild(legend);

    const optionList = document.createElement("div");
    optionList.className = "quiz-options";

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.hidden = true;
    feedback.setAttribute("aria-live", "polite");

    options.forEach((option) => {
      const id = `quiz-${index}-${normalize(option).replace(/[^a-z0-9]+/g, "-")}`;
      const label = document.createElement("label");
      label.className = "panel";
      label.setAttribute("for", id);

      const input = document.createElement("input");
      input.type = "radio";
      input.id = id;
      input.name = `quiz-${index}`;
      input.value = option;

      input.addEventListener("change", () => {
        const isCorrect = normalize(option) === normalize(question.answer);
        feedback.hidden = false;
        feedback.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
        feedback.textContent = isCorrect
          ? `Correct. ${question.explanation || "That classification matches the definition."}`
          : `Try again. ${question.explanation || "Use the glossary definitions to compare the input and output after shuffling."}`;
      });

      label.append(input, document.createTextNode(` ${option}`));
      optionList.appendChild(label);
    });

    fieldset.append(optionList, feedback);
    return fieldset;
  }

  function initQuiz(root) {
    if (root.dataset.quizReady === "true") return;
    root.dataset.quizReady = "true";

    const options = readOptions(root);
    const questions = readQuestions(root) || [];
    const mount = root.querySelector("[data-quiz-mount]") || root;

    Array.from(root.querySelectorAll("[data-question]")).forEach((node) => {
      node.hidden = true;
    });

    questions.forEach((question, index) => {
      mount.appendChild(buildQuestion(question, options, index));
    });
  }

  function initAll() {
    document.querySelectorAll("[data-quiz]").forEach(initQuiz);
  }

  window.CourseQuiz = {
    init: initQuiz,
    initAll,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
