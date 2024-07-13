let settings = {
  removeBlur: false,
  enableSelection: false,
  enablePointerEvents: false,
  restoreVisibility: false,
  restoreDisplay: false,
  restoreOpacity: false,
};

function loadSettings() {
  chrome.storage.sync.get(
    [
      "removeBlur",
      "enableSelection",
      "enablePointerEvents",
      "restoreVisibility",
      "restoreDisplay",
      "restoreOpacity",
    ],
    function (items) {
      settings = items;
      removeStyles();
    }
  );
}

function removeStyles() {
  const elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    const style = window.getComputedStyle(element);

    if (settings.removeBlur && style.filter.includes("blur")) {
      element.style.filter = element.style.filter.replace(/blur\([^)]+\)/g, "");
      if (element.style.filter.trim() === "") {
        element.style.filter = "none";
      }
    }

    if (settings.enableSelection && style.userSelect === "none") {
      element.style.userSelect = "auto";
    }

    if (settings.enablePointerEvents && style.pointerEvents === "none") {
      element.style.pointerEvents = "auto";
    }

    if (settings.restoreVisibility && style.visibility === "hidden") {
      element.style.visibility = "visible";
    }

    if (settings.restoreDisplay && style.display === "none") {
      element.style.display = "initial";
    }

    if (settings.restoreOpacity && parseFloat(style.opacity) < 1) {
      element.style.opacity = "1";
    }
  });
}

// Load settings and run initial style removal
loadSettings();

// Use a MutationObserver to handle dynamically added content
const observer = new MutationObserver(removeStyles);
observer.observe(document.body, { childList: true, subtree: true });

// Listen for settings updates
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "updateSettings") {
    settings = request.settings;
    removeStyles();
  }
});
