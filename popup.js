document.addEventListener("DOMContentLoaded", function () {
  // Load saved settings
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
      document.getElementById("removeBlur").checked = items.removeBlur || false;
      document.getElementById("enableSelection").checked =
        items.enableSelection || false;
      document.getElementById("enablePointerEvents").checked =
        items.enablePointerEvents || false;
      document.getElementById("restoreVisibility").checked =
        items.restoreVisibility || false;
      document.getElementById("restoreDisplay").checked =
        items.restoreDisplay || false;
      document.getElementById("restoreOpacity").checked =
        items.restoreOpacity || false;
    }
  );

  // Save settings
  document.getElementById("save").addEventListener("click", function () {
    let settings = {
      removeBlur: document.getElementById("removeBlur").checked,
      enableSelection: document.getElementById("enableSelection").checked,
      enablePointerEvents: document.getElementById("enablePointerEvents")
        .checked,
      restoreVisibility: document.getElementById("restoreVisibility").checked,
      restoreDisplay: document.getElementById("restoreDisplay").checked,
      restoreOpacity: document.getElementById("restoreOpacity").checked,
    };
    chrome.storage.sync.set(settings, function () {
      console.log("Settings saved");
      // Notify content script
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "updateSettings",
          settings: settings,
        });
      });
    });
  });
});
