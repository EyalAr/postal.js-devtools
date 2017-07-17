import React, { Component } from "react"
import { connect } from "react-redux"
import addEntry from "../../actions/addEntry"
import setPending from "../../actions/setPending"
import setFollowMode from "../../actions/setFollowMode"
import setCurrentTime from "../../actions/setCurrentTime"
import setSetting from "../../actions/setSetting"
import AppUI from "../../ui/views/App"
import devtoolsBridge from "../../services/devtoolsBridge"

class AppContainer extends Component {
  constructor (props) {
    super(props)
    const { addEntry, setCurrentTime, setPending, settings } = this.props
    const excluded = settings.get("excluded").toJS()
    var nextEntryId = 0;
    devtoolsBridge.on("publication", entry => {
      if (
        !excluded.some(e =>
          e.channel === entry.channel && (!e.topic || e.topic === entry.topic))
      ) {
        addEntry({
          id: nextEntryId++,
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
      nextProps.settings.get("followMode") === "latest"
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
  return {
    isPending,
    settings,
    entries,
    currentTime
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addEntry: entry => dispatch(addEntry(entry)),
    setPending: isPending => dispatch(setPending(isPending)),
    setFollowMode: mode => dispatch(setFollowMode(mode)),
    setCurrentTime: timestamp => dispatch(setCurrentTime(timestamp)),
    setSetting: (key, value) => dispatch(setSetting(key, value))
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

App.displayName = "Containers/App"

export default App
