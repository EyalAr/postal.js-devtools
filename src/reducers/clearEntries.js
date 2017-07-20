import { List } from "immutable"

export const ACTION_NAME = "CLEAR_ENTRIES"

export const run = (data, action) => {
  return data.set("entries", List())
}
