import React from "react"
import classnames from "classnames/bind"
import { Map, Set } from "immutable"
import style from "./style.less"
import Timeline from "react-calendar-timeline"
import containerResizeDetector from "react-calendar-timeline/lib/resize-detector/container"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SettingsTab from "../../tabs/Settings"
import DetailsTab from "../../tabs/Details"
import ChronologyTab from "../../tabs/Chronology"

const cx = classnames.bind(style)

const tabsIndices = [
  "chronology",
  "details",
  "settings"
]

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
    topic: e.get("topic"),
    channel: e.get("channel")
  })).toJS()

  const timelineGroups = Set(
    props.entries.map(e => e.get("channel"))
  ).map(g => Map({
    id: g,
    title: g
  })).toList().toJS()

  const splitWidth = props.settings.get("splitWidth")
  const selectedEntry = props.selectedEntry !== undefined &&
    props.entries.find(e => e.get("id") === props.selectedEntry)
  const previousEntry = selectedEntry && props.entries.find((e, i) => {
    const next = props.entries.get(i + 1)
    return next && next.get("id") === props.selectedEntry
  })
  const nextEntry = selectedEntry && props.entries.find((e, i) => {
    const prev = i !== 0 && props.entries.get(i - 1)
    return prev && prev.get("id") === props.selectedEntry
  })

  return (
    <div>
      <div className={cx("tabs-container")} style={{ width: splitWidth }}>
        <Tabs
          onSelect={i => props.setSelectedTab(tabsIndices[i])}
          selectedIndex={tabsIndices.indexOf(props.selectedTab)}>
            <TabList>
              <Tab>Chronology</Tab>
              <Tab>Details</Tab>
              <Tab>Settings</Tab>
            </TabList>
            <TabPanel>
              <ChronologyTab
                entries={chronologyEntries}
                selectedEntry={props.selectedEntry}
                setSelectedEntry={props.setSelectedEntry}/>
            </TabPanel>
            <TabPanel>
              <DetailsTab
                entry={selectedEntry}
                previous={previousEntry}
                next={nextEntry}
                selectPrevious={() => {
                  if (previousEntry) {
                    props.setSelectedEntry(previousEntry.get("id"))
                  }
                }}
                selectNext={() => {
                  if (nextEntry) {
                    props.setSelectedEntry(nextEntry.get("id"))
                  }
                }}
                setFilterInput={props.setFilterInput}
                setSelectedTab={props.setSelectedTab}
                timeFormat={props.settings.get("timeFormat")}/>
            </TabPanel>
            <TabPanel>
              <SettingsTab
                settings={props.settings}
                filterInput={props.filterInput}
                setSetting={props.setSetting}
                removeFilter={props.removeFilter}
                addFilter={props.addFilter}
                setFilterInput={props.setFilterInput}/>
            </TabPanel>
        </Tabs>
      </div>
      <div className={cx("timeline-container")} style={{ marginLeft: splitWidth }}>
        {
          timelineEntries.length ?
            <Timeline
              items={timelineEntries}
              groups={timelineGroups}
              selected={[props.selectedEntry]}
              onItemSelect={props.setSelectedEntry}
              fullUpdate={false}
              canMove={false}
              canResize={false}
              canChangeGroup={false}
              stackItems={true}
              showCursorLine
              dragSnap={1}
              resizeDetector={containerResizeDetector}
              minZoom={1000}
              maxZoom={1000 * 60 * 60}
              visibleTimeStart={props.currentTime - props.timeSpan / 2}
              visibleTimeEnd={props.currentTime + props.timeSpan / 2}
              onTimeChange={(timeStart, timeEnd) => {
                const timeSpan = timeEnd - timeStart
                const currentTime = timeStart + timeSpan / 2
                props.setCurrentTime(currentTime)
                props.setTimeSpan(timeSpan)
                props.setFollowMode("none")
              }}/> :
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
