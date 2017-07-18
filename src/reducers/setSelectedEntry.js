export const ACTION_NAME = "SET_SELECTED_ENTRY"

export const run = (data, action) => {
  var _data = data
    .set("selectedEntry", action.id)
  if (action.center) {
    _data = _data.set(
      "currentTime",
      data.get("entries").find(e => e.get("id") === action.id).get("timestamp")
    )
  }
  return _data
}
