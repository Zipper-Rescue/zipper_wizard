// From https://stackoverflow.com/questions/54603497/cross-domain-iframe-element-scrollintoview-safari-issue

export function iframeSafeScrollIntoView(
  elm: HTMLElement | null,
  options?: boolean | ScrollIntoViewOptions,
) {
  if (!elm) return; // If no element, do nothing.

  if (RequiresIframeScrollFix())
    window.parent.postMessage(
      {
        command: "scroll",
        top: elm.getBoundingClientRect().top,
        options,
      },
      "*",
    );
  // Tell IFrame parent to do the scrolling. If this is not a test environment, replace "*" with the parent domain.
  else elm.scrollIntoView(options); // If not scroll into view as usual.
}

// Detects an issue on mobile where the Parent is an iframe which cannot have it's scroll bars removed.
// Presumably not a bug as safari will autosize it's iframes: https://salomvary.com/iframe-resize-ios-safari.html
// Can use "scrolling=no" fix instead if the parent knows the initial size of your iframe.
function RequiresIframeScrollFix() {
  try {
    // We know this issue happens inside an IFrame on;
    // Safari iPhone
    // Safari iPad
    // Safari Desktop Works fine.

    // Check for safari
    let is_safari = navigator.userAgent.indexOf("Safari") > -1;

    // Chrome has Safari in the user agent so we need to filter (https://stackoverflow.com/a/7768006/1502448)
    const is_chrome = navigator.userAgent.indexOf("Chrome") > -1;
    if (is_chrome && is_safari) {
      is_safari = false;
    }

    // If we need to narrow this down even further we can use a more robust browser detection (https://stackoverflow.com/questions/5916900)
    // Problematic browsers can be adjusted here.
    if (
      is_safari &&
      inIframe() &&
      (navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPhone/i))
    )
      return true;
    else return false;
  } catch (e) {
    console.error("RequiresIframeScrollFix error", e);
  }
}

// (https://stackoverflow.com/questions/326069/)
function inIframe() {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}
