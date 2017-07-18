import React, { Component } from "react"
import { connect } from "react-redux"
import addEntry from "../../actions/addEntry"
import setPending from "../../actions/setPending"
import setFollowMode from "../../actions/setFollowMode"
import setCurrentTime from "../../actions/setCurrentTime"
import setTimeSpan from "../../actions/setTimeSpan"
import setSelectedTab from "../../actions/setSelectedTab"
import setSelectedEntry from "../../actions/setSelectedEntry"
import setSetting from "../../actions/setSetting"
import removeFilter from "../../actions/removeFilter"
import addFilter from "../../actions/addFilter"
import setFilterInput from "../../actions/setFilterInput"
import AppUI from "../../ui/views/App"
import devtoolsBridge from "../../services/devtoolsBridge"

class AppContainer extends Component {
  constructor (props) {
    super(props)
    const { addEntry, setCurrentTime, setPending } = this.props
    var nextEntryId = 0;
    devtoolsBridge.on("publication", entry => {
      if (
        !this.props.settings.get("excluded").some(e =>
          e.get("channel") === entry.channel && (!e.get("topic") || e.get("topic") === entry.topic))
      ) {
        addEntry({
          id: "e" + nextEntryId++,
          ...entry
        })
        if (this.props.settings.get("followMode") === "latest") {
          setCurrentTime(+entry.timestamp)
        }
      }
    })
    devtoolsBridge.on("ready", () => setPending(false))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.settings.get("followMode") === "present") {
      if (!this.t_present) {
        this.t_present = setInterval(() => {
          nextProps.setCurrentTime(Date.now())
        }, 50)
      }
    } else if (this.t_present) {
      clearInterval(this.t_present)
      delete this.t_present
    }

    if (
      this.props.settings.get("followMode") !== "latest" &&
      nextProps.settings.get("followMode") === "latest" &&
      this.props.entries.count()
    ) {
      nextProps.setCurrentTime(+this.props.entries.last().get("timestamp"))
    }
  }

  componentWillUnmount () {
    if (this.t_present) {
      clearInterval(this.t_present)
      delete this.t_present
    }
  }

  render () {
    return (
      <AppUI {...this.props}/>
    )
  }
}

const mapStateToProps = state => {
  const settings = state.data.get("settings")
  const isPending = state.data.get("isPending")
  const entries = state.data.get("entries")
  const currentTime = state.data.get("currentTime")
  const timeSpan = state.data.get("timeSpan")
  const selectedTab = state.data.get("selectedTab")
  const selectedEntry = state.data.get("selectedEntry")
  const filterInput = state.data.get("filterInput")
  return {
    isPending,
    settings,
    entries,
    currentTime,
    timeSpan,
    selectedTab,
    selectedEntry,
    filterInput
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addEntry: entry => dispatch(addEntry(entry)),
    setPending: isPending => dispatch(setPending(isPending)),
    setFollowMode: mode => dispatch(setFollowMode(mode)),
    setCurrentTime: timestamp => dispatch(setCurrentTime(timestamp)),
    setTimeSpan: timeSpan => dispatch(setTimeSpan(timeSpan)),
    setSelectedTab: tab => dispatch(setSelectedTab(tab)),
    setSelectedEntry: id => {
      dispatch(setSelectedEntry(id))
      dispatch(setFollowMode("none"))
      dispatch(setSelectedTab("details"))
    },
    setSetting: (key, value) => dispatch(setSetting(key, value)),
    removeFilter: i => dispatch(removeFilter(i)),
    addFilter: spec => {
      if (spec.channel || spec.topic) {
        dispatch(addFilter(spec))
      }
    },
    setFilterInput: (what, val) => dispatch(setFilterInput(what, val))
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

App.displayName = "Containers/App"

export default App
