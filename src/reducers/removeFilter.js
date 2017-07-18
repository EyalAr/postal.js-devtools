export const ACTION_NAME = "REMOVE_FILTER"

export const run = (data, action) => {
  return data.setIn(
    ["settings", "excluded"],
    data.getIn(["settings", "excluded"]).remove(action.i)
  )
}
