import React, {useEffect, useState} from 'react';
import SearchBar from './SearchBar.js';
import Timeline from './Timeline.js';
import {generateData} from './FakeData';
import './App.css';

const App = () => {
  const [timelineData, setTimelineData] = useState({});
  const [visibleTimelineData, setVisibleTimelineData] = useState({});
  useEffect(() => {
    const timelineData = generateData(50);
    setTimelineData(timelineData);
    setVisibleTimelineData(timelineData);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar
          timelineData={timelineData}
          setTimelineData={setVisibleTimelineData}
        />
      </header>
      { Object.keys(visibleTimelineData).length !== 0 ? <Timeline eventsJson={visibleTimelineData} /> : null }
    </div>
  );
}

export default App;
