import { Map, List } from "immutable"

export default {
  data: Map({
    currentTime: Date.now(),
    settings: Map({
      followMode: "present",
      splitWidth: 300,
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
