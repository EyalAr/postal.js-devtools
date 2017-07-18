import React from "react"
import classnames from "classnames/bind"
import style from "./style.less"
import JSONTree from "react-json-tree"
import moment from "moment"
import humanizeDuration from "humanize-duration"

const cx = classnames.bind(style)

const Settings = props => {
  return (
    props.entry ?
    <div>
      <div>Channel: {props.entry.get("channel")}</div>
      <div>Topic: {props.entry.get("topic")}</div>
      <div>Time: {
        moment(props.entry.get("timestamp")).format(props.timeFormat)
      }</div>
      { props.entry.get("data") && <div>
        <JSONTree data={props.entry.get("data")}/>
      </div> }
      <hr/>
      { props.previous &&
        <div>Time from <a href="#" onClick={props.selectPrevious}>previous</a>: {
          humanizeDuration(
            props.entry.get("timestamp") -
            props.previous.get("timestamp")
          )
        }</div> }
      { props.next &&
        <div>Time to <a href="#" onClick={props.selectNext}>next</a>: {
          humanizeDuration(
            props.next.get("timestamp") -
            props.entry.get("timestamp")
          )
        }</div> }
    </div> :
    <div>
      Please select an entry.
    </div>
  )
}

Settings.displayName = "UI/tabs/Settings"

export default Settings
