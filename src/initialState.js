import { Map, List } from "immutable"

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
      followMode: "present",
      splitWidth: 300,
      timeFormat: "HH:mm:ss.SSS",
      excluded: List([
        Map({
          channel: "postal"
        }),
        Map({
          channel: "logs"
        })
      ])
    }),
    entries: List()
  })
}
