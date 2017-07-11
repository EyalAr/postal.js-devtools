import { Map, List } from "immutable"

export default {
  data: Map({
    isPending: true,
    settings: Map({
      followTimeline: true,
      excluded: List([
        Map({
          channel: "logs"
        }),
        Map({
          channel: "postal"
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
