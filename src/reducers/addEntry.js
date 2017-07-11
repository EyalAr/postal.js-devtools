import { fromJS } from "immutable"

export const ACTION_NAME = "ADD_ENTRY"

export const run = (data, action) => {
  return data
    .update("entries", entries => entries.push(fromJS(action.entry)))
}
