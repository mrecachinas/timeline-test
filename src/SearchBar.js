import React from 'react';
import AsyncSelect from 'react-select/async';
import {intersection} from 'lodash';
import {promiseOptions} from './FakeData';
import './SearchBar.css';

const handleChange = (timelineData, setTimelineData) => {
  return selectedOption => {
    if (selectedOption === null) {
      setTimelineData(timelineData);
    } else if (timelineData && timelineData.length === 0) {
      return;
    } else {
      const selectedValues = selectedOption.map(opt => opt.value);
      const events = timelineData.events.filter(
        td => intersection(td.choice, selectedValues).length === selectedValues.length
      );
      setTimelineData({events});
    }
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