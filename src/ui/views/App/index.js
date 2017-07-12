import React from "react"
import classnames from "classnames/bind"
import { fromJS } from "immutable"
import style from "./style.less"
import Timeline from "react-calendar-timeline"
import moment from "moment"
import { Map, Set } from "immutable"

const cx = classnames.bind(style)

const App = props => {
  const entries = props.entries.map(e => ({
    id: e.get("id"),
    start_time: e.get("timestamp"),
    end_time: e.get("timestamp") + 500,
    title: e.get("topic"),
    group: e.get("channel")
  })).toJS()

  const groups = Set(
    props.entries.map(e => e.get("channel"))
  ).map(g => Map({
    id: g,
    title: g
  })).toList().toJS()

  return (
    <div className={cx("container")}>
      <div className={cx("controls-container")}>
        <label><input type="checkbox"/> Freeze</label>&nbsp;
        <input type="button" value="Jump to first"/>&nbsp;
        <input type="button" value="Jump to last"/>&nbsp;
        <input type="button" value="Reset zoom"/>&nbsp;
      </div>
      <Timeline
        items={entries}
        groups={groups}
        fullUpdate={false}
        canMove={false}
        canSelect={false}
        canResize={false}
        canChangeGroup={false}
        stackItems
        showCursorLine
        dragSnap={1}
        minZoom={1000}
        maxZoom={1000 * 60 * 60}
        defaultTimeStart={Date.now() - 10000}
        defaultTimeEnd={Date.now() + 10000}/>
    </div>
  )
}

App.displayName = "UI/views/App"

export default App
