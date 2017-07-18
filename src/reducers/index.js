import * as addEntry from "./addEntry"
import * as setPending from "./setPending"
import * as setFollowMode from "./setFollowMode"
import * as setCurrentTime from "./setCurrentTime"
import * as setTimeSpan from "./setTimeSpan"
import * as setSelectedTab from "./setSelectedTab"
import * as setSelectedEntry from "./setSelectedEntry"
import * as setSetting from "./setSetting"

const REDUCERS = [
  addEntry,
  setPending,
  setFollowMode,
  setCurrentTime,
  setTimeSpan,
  setSelectedTab,
  setSelectedEntry,
  setSetting
]

export default (state, action) => {
  return {
    data: REDUCERS
      .filter(reducer => reducer.ACTION_NAME === action.type)
      .reduce((data, reducer) => reducer.run(data, action), state.data)
  }
}
