import * as addEntry from "./addEntry"
import * as setPending from "./setPending"
import * as setFollowTimeline from "./setFollowTimeline"

const REDUCERS = [
  addEntry,
  setPending,
  setFollowTimeline
]

export default (state, action) => {
  return {
    data: REDUCERS
      .filter(reducer => reducer.ACTION_NAME === action.type)
      .reduce((data, reducer) => reducer.run(data, action), state.data)
  }
}
