(function () {
  var MIN_COLLAPSE_LINES = 18;
  var EXPAND_TEXT = "\u5c55\u5f00\u4ee3\u7801";
  var COLLAPSE_TEXT = "\u6536\u8d77\u4ee3\u7801";
  var LINE_TEXT = "\u884c";

  function countLines(block) {
    return block.querySelectorAll("td.gutter .line").length ||
      block.querySelectorAll("td.code .line").length;
  }

  function buildToggle(block, lineCount) {
    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "code-collapse-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = EXPAND_TEXT + " (" + lineCount + " " + LINE_TEXT + ")";

    toggle.addEventListener("click", function () {
      var collapsed = block.classList.toggle("is-collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.textContent = collapsed ? EXPAND_TEXT + " (" + lineCount + " " + LINE_TEXT + ")" : COLLAPSE_TEXT;
    });

    return toggle;
  }

  function initCodeFold() {
    document.querySelectorAll("article.post .content figure.highlight").forEach(function (block) {
      if (block.classList.contains("is-collapsible")) return;

      var lineCount = countLines(block);
      if (lineCount < MIN_COLLAPSE_LINES) return;

      block.classList.add("is-collapsible", "is-collapsed");
      block.insertBefore(buildToggle(block, lineCount), block.firstChild);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCodeFold);
  } else {
    initCodeFold();
  }
})();
