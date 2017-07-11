import React from "react"
import classnames from "classnames/bind"
import { fromJS } from "immutable"
import style from "./style.less"
import Timeline from "react-visjs-timeline"

const cx = classnames.bind(style)

const App = props => {
  const timelineOptions = {
    width: '100%',
    stack: false,
    start: new Date(Date.now() - 10000),
    end: new Date(Date.now() + 10000),
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 10,
    type: 'box',
    rollingMode: {
      follow: props.settings.get("followTimeline"),
      offset: 0.5
    },
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
      }
    }
  }

  const entries = props.entries.map(e => ({
    start: new Date(e.get("timestamp")),
    content: e.get("topic"),
    group: e.get("channel")
  })).toJS()

  const groups = Object.keys(props.entries.reduce((groups, e) => {
    groups[e.get("channel")] = true
    return groups
  }, {})).map(group => ({
    id: group,
    content: group
  }))

  return (
    <div className={cx("container")}>
      <div>{ props.isPending ? "Pending" : "Ready" }</div>
      <button
        onClick={
          () => props.setFollowTimeline(!props.settings.get("followTimeline"))
        }>
        toggle follow
      </button>
      <div>
        <Timeline
          options={timelineOptions}
          items={entries}
          groups={groups}/>
      </div>
    </div>
  )
}

App.displayName = "UI/views/App"

export default App
