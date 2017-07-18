import React from "react"
import classnames from "classnames/bind"
import style from "./style.less"
import humanizeDuration from "humanize-duration"

const cx = classnames.bind(style)

const Chronology = props => {
  return (
    props.entries.length ?
    <div className={cx("container")}>
      { props.entries.map((e, i) => (
        <div className={cx("entry", { selected: e.id === props.selectedEntry })}>
          <div className={cx("info")} onClick={() => props.setSelectedEntry(e.id)}>
            <div className={cx("channel")} title={e.channel}>{e.channel}</div>
            <div className={cx("topic")} title={e.topic}>{e.topic}</div>
          </div>
          { props.entries[i + 1] &&
            <div className={cx("time")} title={props.entries[i + 1].timestamp - e.timestamp}>
              {humanizeDuration(props.entries[i + 1].timestamp - e.timestamp)}
            </div> }
        </div>
      ))}
    </div> :
    <div>
      Waiting for publications...
    </div>
  )
}

Chronology.displayName = "UI/tabs/Chronology"

export default Chronology
