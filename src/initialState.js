import { Map, List } from "immutable"

export default {
  data: Map({
    currentTime: Date.now(),
    selectedTab: "details",
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
          channel: "logs"
        }),
        Map({
          channel: "postal"
        }),
        Map({
          channel: "postal.request-response"
        }),
        Map({
          channel: "meeting",
          topic: "USER.HEARTBEAT.LOCAL"
        })
      ])
    }),
    entries: List()
  })
}
