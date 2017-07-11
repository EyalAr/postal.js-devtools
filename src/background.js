var connections = {};

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(listener);
  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(listener);
    delete connections[getTabId(port)];
  });

  function listener (data, sender) {
    if (data.type === "init") {
      connections[data.tabId] = port;
    } else {
      data.__fromPostaljsDevtoolsApp = true;
      chrome.tabs.sendMessage(+getTabId(port), data);
    }
    return true;
  }
});

chrome.runtime.onMessage.addListener(function(req, sender) {
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(req);
    }
  }
  return true;
});

function getTabId (port) {
  var tabs = Object.keys(connections);
  for (var i = 0, len = tabs.length; i < len; i++) {
    if (connections[tabs[i]] === port) {
      return tabs[i];
    }
  }
}
