import { Map, List } from "immutable"

export default {
  data: Map({
    isPending: true,
    settings: Map({
      followTimeline: true,
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
