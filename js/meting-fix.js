(function () {
  window.meting_api = "https://api.baka.plus/meting/?server=:server&type=:type&id=:id&r=:r";

  function rehydrateMeting() {
    if (!window.customElements || !window.customElements.get("meting-js")) {
      return false;
    }

    document.querySelectorAll("meting-js").forEach(function (node) {
      if (node.aplayer || node.dataset.metingFixed === "1") {
        return;
      }

      node.dataset.metingFixed = "1";
      var clone = node.cloneNode(true);
      node.replaceWith(clone);
    });

    return true;
  }

  window.loadMeting = function () {
    if (rehydrateMeting()) {
      return;
    }

    var retries = 0;
    var timer = setInterval(function () {
      retries += 1;
      if (rehydrateMeting() || retries > 20) {
        clearInterval(timer);
      }
    }, 250);
  };

  if (document.readyState === "complete") {
    setTimeout(window.loadMeting, 0);
  } else {
    window.addEventListener("load", function () {
      setTimeout(window.loadMeting, 0);
    }, { once: true });
  }
})();
