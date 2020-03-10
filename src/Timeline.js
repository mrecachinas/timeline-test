import React, {useEffect} from 'react';
import './Timeline.css';

const Timeline = ({eventsJson}) => {
  useEffect(() => {
    new window.TL.Timeline('timeline-embed', eventsJson);
  }, [eventsJson]);
  return <div id="timeline-embed"></div>;
}

export default Timeline;