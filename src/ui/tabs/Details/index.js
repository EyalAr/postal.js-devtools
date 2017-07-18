import React from "react"
import classnames from "classnames/bind"
import style from "./style.less"
import JSONTree from "react-json-tree"
import moment from "moment"
import humanizeDuration from "humanize-duration"

const cx = classnames.bind(style)

const Details = props => {
  return (
    props.entry ?
    <div>
      <div><span className={cx("title")}>Channel: </span>{props.entry.get("channel")}</div>
      <div><span className={cx("title")}>Topic: </span>{props.entry.get("topic")}</div>
      <div><span className={cx("title")}>Time: </span>{
        moment(props.entry.get("timestamp")).format(props.timeFormat)
      }</div>
      { props.entry.get("data") && <div>
        <JSONTree data={props.entry.get("data")}/>
      </div> }
      <hr/>
      { props.previous &&
        <div><span className={cx("title")}>Time from <span className={cx("clickable")} onClick={props.selectPrevious}>previous</span>:</span> {
          humanizeDuration(
            props.entry.get("timestamp") -
            props.previous.get("timestamp")
          )
        }</div> }
      { props.next &&
        <div><span className={cx("title")}>Time to <span className={cx("clickable")} onClick={props.selectNext}>next</span>:</span> {
          humanizeDuration(
            props.next.get("timestamp") -
            props.entry.get("timestamp")
          )
        }</div> }
        <hr/>
        <div
          className={cx("clickable", "title")}
          onClick={() => {
            props.setFilterInput("channel", props.entry.get("channel"))
            props.setFilterInput("topic", props.entry.get("topic"))
            props.setSelectedTab("settings")
          }}>
            Add as filter
        </div>
    </div> :
    <div>
      Please select an entry.
    </div>
  )
}

Details.displayName = "UI/tabs/Details"

export default Details
