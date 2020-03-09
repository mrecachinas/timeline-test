import React, {useEffect, memo} from 'react';
import './Timeline.css';

const Timeline = ({eventsJson}) => {
  console.log(eventsJson.events.map(i => i.choice));
  useEffect(() => {
    new window.TL.Timeline('timeline-embed', eventsJson);
  }, []);
  return <div id="timeline-embed"></div>;
}

export default Timeline;