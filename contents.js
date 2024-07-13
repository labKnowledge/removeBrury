// filter: blur(4px); user-select: none;

function removeStyles() {
  const elements = document.querySelectorAll("*");
  elements.forEach((element) => {
    const style = window.getComputedStyle(element);
    if (style.filter.includes("blur") || style.userSelect === "none") {
      element.style.filter = "none";
      element.style.userSelect = "auto";
    }
  });
}

// Run the function when the page loads
removeStyles();

// Use a MutationObserver to handle dynamically added content
const observer = new MutationObserver(removeStyles);
observer.observe(document.body, { childList: true, subtree: true });
