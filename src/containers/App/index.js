import React, { Component } from "react"
import { connect } from "react-redux"
import addEntry from "../../actions/addEntry"
import setPending from "../../actions/setPending"
import setFollowMode from "../../actions/setFollowMode"
import setCurrentTime from "../../actions/setCurrentTime"
import AppUI from "../../ui/views/App"
import devtoolsBridge from "../../services/devtoolsBridge"

class AppContainer extends Component {
  constructor (props) {
    super(props)
    const { addEntry, setPending, settings } = this.props
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
      }
    })
    devtoolsBridge.on("ready", () => setPending(false))
  }

  componentWillMount () {
    this.t_present = setInterval(() => {
      this.props.setCurrentTime(Date.now())
    }, 50)
  }

  componentWillUnmount () {
    clearInterval(this.t_present)
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

const mapDispatchToProps = dispatch => {
  return {
    addEntry: entry => dispatch(addEntry(entry)),
    setPending: isPending => dispatch(setPending(isPending)),
    setFollowMode: mode => dispatch(setFollowMode(mode)),
    setCurrentTime: timestamp => dispatch(setCurrentTime(timestamp))
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

App.displayName = "Containers/App"

export default App
