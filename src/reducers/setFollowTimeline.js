export const ACTION_NAME = "SET_FOLLOW_TIMELINE"

export const run = (data, action) => {
  return data.setIn(["settings", "followTimeline"], action.follow)
}
