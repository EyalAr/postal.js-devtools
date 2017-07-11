var s = document.createElement("script");
s.src = chrome.extension.getURL("bridge.js");
(document.body || document.documentElement).appendChild(s);
s.onload = function() {
  s.parentNode.removeChild(s);
};

chrome.runtime.onMessage.addListener(function (req, sender) {
  if (req.__fromPostaljsDevtoolsApp) {
    window.postMessage(req, "*");
    return true;
  }
});

window.addEventListener("message", function (e) {
  if (e.source === window) {
    var data = e.data;
    if (data.__fromPostaljsDevtoolsBridge) {
      chrome.runtime.sendMessage(data);
    }
  }
});
