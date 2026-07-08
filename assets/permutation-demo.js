(function () {
  "use strict";

  const BASE_ROWS = [
    { id: "cell-1", volume: 82, hemoglobin: 28, scatter: 41, signal: 0.42 },
    { id: "cell-2", volume: 91, hemoglobin: 32, scatter: 44, signal: 0.55 },
    { id: "cell-3", volume: 76, hemoglobin: 25, scatter: 38, signal: 0.31 },
    { id: "cell-4", volume: 88, hemoglobin: 30, scatter: 43, signal: 0.49 },
  ];

  function cloneRows(rows) {
    return rows.map((row) => ({ ...row }));
  }

  function formatNumber(value) {
    return Number(value).toFixed(2);
  }

  function mean(rows, key) {
    return rows.reduce((total, row) => total + row[key], 0) / rows.length;
  }

  function invariantSummary(rows) {
    return {
      meanVolume: mean(rows, "volume"),
      meanHemoglobin: mean(rows, "hemoglobin"),
    };
  }

  function equivariantScores(rows) {
    return rows.map((row) => ({
      id: row.id,
      score: row.volume * 0.01 + row.hemoglobin * 0.02 + row.signal,
    }));
  }

  function shuffle(rows) {
    const next = cloneRows(rows);
    for (let index = next.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    }
    return next;
  }

  function rotate(rows) {
    if (rows.length < 2) return cloneRows(rows);
    return rows.slice(1).concat(rows[0]);
  }

  function renderTable(container, rows) {
    container.innerHTML = "";

    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Synthetic event rows. Each row is treated as one retained cell event.";
    table.appendChild(caption);

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Event</th>
        <th>Volume</th>
        <th>Hemoglobin</th>
        <th>Scatter</th>
        <th>Signal</th>
      </tr>
    `;

    const tbody = document.createElement("tbody");
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.volume}</td>
        <td>${row.hemoglobin}</td>
        <td>${row.scatter}</td>
        <td>${formatNumber(row.signal)}</td>
      `;
      tbody.appendChild(tr);
    });

    table.append(thead, tbody);
    container.appendChild(table);
  }

  function renderOutputs(container, rows) {
    const summary = invariantSummary(rows);
    const scores = equivariantScores(rows);

    container.innerHTML = `
      <div class="grid">
        <section class="panel">
          <h3>Invariant sample summary</h3>
          <p>Mean volume: <strong>${formatNumber(summary.meanVolume)}</strong></p>
          <p>Mean hemoglobin: <strong>${formatNumber(summary.meanHemoglobin)}</strong></p>
          <p class="source-note">These values stay the same when the same rows are reordered.</p>
        </section>
        <section class="panel">
          <h3>Equivariant event scores</h3>
          <ol>
            ${scores.map((item) => `<li>${item.id}: <strong>${formatNumber(item.score)}</strong></li>`).join("")}
          </ol>
          <p class="source-note">The scores stay attached to their event rows, so their order changes when the rows change.</p>
        </section>
      </div>
    `;
  }

  function initDemo(root) {
    if (root.dataset.permutationDemoReady === "true") return;
    root.dataset.permutationDemoReady = "true";

    let rows = cloneRows(BASE_ROWS);

    const controls = document.createElement("div");
    controls.className = "grid";

    const shuffleButton = document.createElement("button");
    shuffleButton.type = "button";
    shuffleButton.textContent = "Shuffle rows";

    const rotateButton = document.createElement("button");
    rotateButton.type = "button";
    rotateButton.className = "secondary";
    rotateButton.textContent = "Rotate rows";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "secondary";
    resetButton.textContent = "Reset rows";

    controls.append(shuffleButton, rotateButton, resetButton);

    const tableMount = document.createElement("div");
    const outputMount = document.createElement("div");
    outputMount.style.marginTop = "18px";

    root.append(controls, tableMount, outputMount);

    function render() {
      renderTable(tableMount, rows);
      renderOutputs(outputMount, rows);
    }

    shuffleButton.addEventListener("click", () => {
      rows = shuffle(rows);
      render();
    });

    rotateButton.addEventListener("click", () => {
      rows = rotate(rows);
      render();
    });

    resetButton.addEventListener("click", () => {
      rows = cloneRows(BASE_ROWS);
      render();
    });

    render();
  }

  function initAll() {
    document.querySelectorAll("[data-permutation-demo]").forEach(initDemo);
  }

  window.PermutationDemo = {
    init: initDemo,
    initAll,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
