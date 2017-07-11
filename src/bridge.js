(function () {
  var ATTEMPTS_INTERVAL = 500;
  var isAppPending = false;

  attempt();

  window.addEventListener("message", function (e) {
    if (e.source === window) {
      var data = e.data;
      if (data.__fromPostaljsDevtoolsApp) {
        if (data.type === "pending") {
          if (window.__postaljsDevtoolsRef) {
            notifyApp();
          } else {
            isAppPending = true;
          }
        }
      }
    }
  });

  function attempt () {
    if (window.__postaljsDevtoolsRef) {
      init(window.__postaljsDevtoolsRef);
      if (isAppPending) {
        isAppPending = false;
        notifyApp();
      }
    } else {
      setTimeout(attempt, ATTEMPTS_INTERVAL);
    }
  }

  function init (postal) {
    postal.addWireTap(function (data, env) {
      window.postMessage({
        __fromPostaljsDevtoolsBridge: true,
        type: "publication",
        data: {
          timestamp: env.timeStamp.getTime(),
          channel: env.channel,
          topic: env.topic
        }
      }, "*");
    });
  }

  function notifyApp () {
    window.postMessage({
      __fromPostaljsDevtoolsBridge: true,
      type: "ready"
    }, "*");
  }
})();
