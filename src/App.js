import React, {useEffect, useState} from 'react';
import SearchBar from './SearchBar.js';
import Timeline from './Timeline.js';
import {generateData} from './FakeData';
import './App.css';

const App = () => {
  const [timelineData, setTimelineData] = useState({});
  useEffect(() => {
    console.log("IN HOOK")
    const timelineData = generateData(50);
    setTimelineData(timelineData);
  }, []);

  console.log(timelineData);
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar
          timelineData={timelineData}
          setTimelineData={setTimelineData}
        />
      </header>
      { Object.keys(timelineData).length !== 0 ? <Timeline eventsJson={timelineData} /> : null }
    </div>
  );
}

export default App;
