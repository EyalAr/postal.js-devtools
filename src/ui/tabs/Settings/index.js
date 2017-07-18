import React from "react"
import classnames from "classnames/bind"
import style from "./style.less"
import { RadioGroup, Radio } from "react-radio-group"

const cx = classnames.bind(style)

const Settings = props => {
  return (
    <div>
      <div className={cx("setting")}>
        <div>Follow mode:</div>
        <RadioGroup
          name="followMode"
          selectedValue={props.settings.get("followMode")}
          onChange={val => props.setSetting("followMode", val)}>
            <Radio value="present" />Present
            <Radio value="latest" />Latest
            <Radio value="none" />None
        </RadioGroup>
      </div>

      <div className={cx("setting")}>
        <div>Side panel width:</div>
        <RadioGroup
          name="splitWidth"
          selectedValue={"" + props.settings.get("splitWidth")}
          onChange={val => props.setSetting("splitWidth", +val)}>
            <Radio value="300" />Small
            <Radio value="450" />Medium
            <Radio value="600" />Large
        </RadioGroup>
      </div>
      <div className={cx("setting")}>
        <div>Timestamp format:</div>
        <input
          type="text"
          value={props.settings.get("timeFormat")}
          onChange={e => props.setSetting("timeFormat", e.target.value)}/>
      </div>

      <div className={cx("setting")}>
        <div>Filters:</div>
        <ul>
          { props.settings.get("excluded").map((f, i) => (
            <li>
              { f.get("channel") || "*" } / { f.get("topic") || "*" }&nbsp;
              <span className={cx("clickable")} onClick={() => props.removeFilter(i)}>[-]</span>
            </li>
          )) }
        </ul>
        <input
          type="text"
          placeholder="channel"
          value={props.filterInput.get("channel")}
          onChange={e => props.setFilterInput("channel", e.target.value)}/>
        <input
          type="text"
          placeholder="topic"
          value={props.filterInput.get("topic")}
          onChange={e => props.setFilterInput("topic", e.target.value)}/>
        <span className={cx("clickable")} onClick={() => props.addFilter(props.filterInput.toJS())}>[+]</span>
      </div>
    </div>
  )
}

Settings.displayName = "UI/tabs/Settings"

export default Settings
