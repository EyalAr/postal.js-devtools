export const ACTION_NAME = "SET_READY"

export const run = (data, action) => {
  return data.set("isReady", action.isReady)
}
