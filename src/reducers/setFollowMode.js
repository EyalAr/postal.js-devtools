export const ACTION_NAME = "SET_FOLLOW_MODE"

export const run = (data, action) => {
  return data.setIn(["settings", "followMode"], action.mode)
}
