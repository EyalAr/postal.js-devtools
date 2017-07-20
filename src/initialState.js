import { fromJS, Map, List } from "immutable"

const ls_followMode = localStorage.getItem("followMode")
const ls_splitWidth = localStorage.getItem("splitWidth")
const ls_timeFormat = localStorage.getItem("timeFormat")
const ls_clearOnReload = localStorage.getItem("clearOnReload")
const ls_entrySize = localStorage.getItem("entrySize")
const ls_excluded = localStorage.getItem("excluded")

export default {
  data: Map({
    isReady: false,
    isPaused: false,
    currentTime: Date.now(),
    selectedTab: "chronology",
    selectedEntry: undefined,
    timeSpan: 20000,
    filterInput: Map({
      channel: "",
      topic: ""
    }),
    settings: Map({
      followMode: ls_followMode || "present",
      splitWidth: +ls_splitWidth || 300,
      timeFormat: ls_timeFormat || "HH:mm:ss.SSS",
      clearOnReload: ls_clearOnReload === "true",
      entrySize: +ls_entrySize || 500,
      excluded: fromJS(ls_excluded ? JSON.parse(ls_excluded) : [{
        channel: "postal"
      }, {
        channel: "logs"
      }])
    }),
    entries: List()
  })
}
