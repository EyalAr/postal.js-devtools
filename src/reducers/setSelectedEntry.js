export const ACTION_NAME = "SET_SELECTED_ENTRY"

export const run = (data, action) => {
  return data.set("selectedEntry", action.id)
}
