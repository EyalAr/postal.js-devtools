import React from "react"
import classnames from "classnames/bind"
import { fromJS } from "immutable"
import style from "./style.less"
import Timeline from "react-calendar-timeline"
import containerResizeDetector from "react-calendar-timeline/lib/resize-detector/container"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import moment from "moment"
import { Map, Set } from "immutable"

const cx = classnames.bind(style)

const App = props => {
  const timelineEntries = props.entries.map(e => ({
    id: e.get("id"),
    start_time: e.get("timestamp"),
    end_time: e.get("timestamp") + 500,
    title: e.get("topic"),
    group: e.get("channel")
  })).toJS()

  const chronologyEntries = props.entries.map(e => ({
    id: e.get("id"),
    timestamp: e.get("timestamp"),
    title: e.get("topic"),
    group: e.get("channel")
  })).toJS()

  const timelineGroups = Set(
    props.entries.map(e => e.get("channel"))
  ).map(g => Map({
    id: g,
    title: g
  })).toList().toJS()

  const splitWidth = props.settings.get("splitWidth")

  return (
    <div>
      <div className={cx("tabs-container")} style={{ width: splitWidth }}>
        <Tabs>
          <TabList>
            <Tab>Chronology</Tab>
            <Tab>Details</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanel>
            Chronology
          </TabPanel>
          <TabPanel>
            Details
          </TabPanel>
          <TabPanel>
            Settings
          </TabPanel>
        </Tabs>
      </div>
      <div className={cx("timeline-container")} style={{ marginLeft: splitWidth }}>
        {
          timelineEntries.length ?
            <Timeline
              items={timelineEntries}
              groups={timelineGroups}
              fullUpdate={false}
              canMove={false}
              canSelect={false}
              canResize={false}
              canChangeGroup={false}
              stackItems={true}
              showCursorLine
              dragSnap={1}
              resizeDetector={containerResizeDetector}
              minZoom={1000}
              maxZoom={1000 * 60 * 60}
              visibleTimeStart={props.currentTime - 10000}
              visibleTimeEnd={props.currentTime + 10000}/> :
            <div className={cx("timeline-placeholder")} style={{ left: splitWidth }}>
              Waiting for publications...
            </div>
        }
      </div>
    </div>
  )
}

App.displayName = "UI/views/App"

export default App
