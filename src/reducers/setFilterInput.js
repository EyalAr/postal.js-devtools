export const ACTION_NAME = "SET_FILTER_INPUT"

export const run = (data, action) => {
  return data.setIn(["filterInput", action.what], action.val)
}
