export const ACTION_NAME = "SET_SELECTED_TAB"

export const run = (data, action) => {
  return data.set("selectedTab", action.tab)
}
