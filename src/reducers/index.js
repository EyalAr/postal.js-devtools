import * as addEntry from "./addEntry"
import * as setPending from "./setPending"
import * as setFollowMode from "./setFollowMode"
import * as setCurrentTime from "./setCurrentTime"

const REDUCERS = [
  addEntry,
  setPending,
  setFollowMode,
  setCurrentTime
]

export default (state, action) => {
  return {
    data: REDUCERS
      .filter(reducer => reducer.ACTION_NAME === action.type)
      .reduce((data, reducer) => reducer.run(data, action), state.data)
  }
}
