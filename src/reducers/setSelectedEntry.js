export const ACTION_NAME = "SET_SELECTED_ENTRY"

export const run = (data, action) => {
  return data
    .set("selectedEntry", action.id)
    .set("currentTime", data.get("entries").find(e => e.get("id") === action.id).get("timestamp"))
}
