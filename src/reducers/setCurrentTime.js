export const ACTION_NAME = "SET_CURRENT_TIME"

export const run = (data, action) => {
  return data.set("currentTime", action.timestamp)
}
