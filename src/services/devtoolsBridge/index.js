import EventEmitter from "eventemitter2"

const bridgeEmitter = new EventEmitter()
const bgConn = chrome.runtime.connect({})

bgConn.postMessage({
  type: "init",
  tabId: chrome.devtools.inspectedWindow.tabId
})

bgConn.postMessage({ type: "pending" })

bgConn.onMessage.addListener((req, sender) => {
  if (req.__fromPostaljsDevtoolsBridge) {
    bridgeEmitter.emit(req.type, req.data)
    return true
  }
})

export default bridgeEmitter
