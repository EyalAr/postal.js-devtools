export const ACTION_NAME = "SET_PENDING"

export const run = (data, action) => {
  return data.set("isPending", action.isPending)
}
