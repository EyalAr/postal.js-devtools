import { Map } from "immutable"

export const ACTION_NAME = "ADD_FILTER"

export const run = (data, action) => {
  return data
    .setIn(
      ["settings", "excluded"],
      data.getIn(["settings", "excluded"]).push(Map(action.spec))
    )
    .setIn(["filterInput", "channel"], "")
    .setIn(["filterInput", "topic"], "")
}
