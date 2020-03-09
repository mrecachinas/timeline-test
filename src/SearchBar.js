import React, {useEffect} from 'react';
import AsyncSelect from 'react-select/async';
import {difference} from 'lodash';
import {promiseOptions, generateData} from './FakeData';
import './SearchBar.css';

const handleChange = (timelineData, setTimelineData) => {
  return selectedOption => {
    if (timelineData && timelineData.length === 0) {
      return;
    }
    const selectedValues = selectedOption.map(opt => opt.value);
    const events = timelineData.events.filter(td => difference(td.choice, selectedValues).length > 0);
    setTimelineData({events});
  };
};

const SearchBar = ({timelineData, setTimelineData}) => {
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then(result => setTimelineData(result.data));
  // }, []);

  const handleChangeEffect = handleChange(timelineData, setTimelineData);
  return <div className="searchbar">
    <AsyncSelect
      cacheOptions
      defaultOptions
      isMulti
      loadOptions={promiseOptions}
      onChange={handleChangeEffect}
    />
  </div>;
}

export default SearchBar;