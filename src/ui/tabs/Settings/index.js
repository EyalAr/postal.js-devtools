import React from "react"
import classnames from "classnames/bind"
import style from "./style.less"
import { RadioGroup, Radio } from "react-radio-group"

const cx = classnames.bind(style)

const Settings = props => {
  return (
    <div>
      <div>
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
    </div>
  )
}

Settings.displayName = "UI/tabs/Settings"

export default Settings
