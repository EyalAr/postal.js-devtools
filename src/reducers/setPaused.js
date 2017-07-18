export const ACTION_NAME = "SET_PAUSED"

export const run = (data, action) => {
  return data.set("isPaused", action.isPaused)
}
