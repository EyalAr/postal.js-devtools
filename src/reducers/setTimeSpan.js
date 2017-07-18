export const ACTION_NAME = "SET_TIME_SPAN"

export const run = (data, action) => {
  return data.set("timeSpan", action.timeSpan)
}
