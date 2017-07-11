import React, { Component } from "react"
import { connect } from "react-redux"
import addEntry from "../../actions/addEntry"
import setPending from "../../actions/setPending"
import setFollowTimeline from "../../actions/setFollowTimeline"
import AppUI from "../../ui/views/App"
import devtoolsBridge from "../../services/devtoolsBridge"

class AppContainer extends Component {
  constructor (props) {
    super(props)
    const { addEntry, setPending, settings } = this.props
    const excluded = settings.get("excluded").toJS()
    devtoolsBridge.on("publication", entry => {
      if (
        !excluded.some(e =>
          e.channel === entry.channel && (!e.topic || e.topic === entry.topic))
      ) {
        addEntry(entry)
      }
    })
    devtoolsBridge.on("ready", () => setPending(false))
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
  return {
    isPending,
    settings,
    entries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEntry: entry => dispatch(addEntry(entry)),
    setPending: isPending => dispatch(setPending(isPending)),
    setFollowTimeline: follow => dispatch(setFollowTimeline(follow))
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

App.displayName = "Containers/App"

export default App
