export const ACTION_NAME = "SET_SETTING"

export const run = (data, action) => {
  return data.setIn(["settings", action.key], action.value)
}
