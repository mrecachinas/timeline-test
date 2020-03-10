import {lorem} from 'faker';
import {sampleSize, random} from 'lodash';

/**
 * Convert text and tags to HTML for the slides.
 *
 * @param {string} text Sentences/paragraphs
 * @param {Array} tags List of tags to format below the text
 * @returns {string} HTML-ified string containing the text and tags
 */
const prepareText = (text, tags) => {
  const formattedTagsList = tags.sort()
                                .map((tag) => `<span class="tag">${tag}</span>`)
                                .join("");
  const formattedTags = `<div class="tags">${formattedTagsList}</div>`;
  return `${text}${formattedTags}`;
}

/**
 * Generate numEvents number of events with which to seed the timeline.
 *
 * @param {number} numEvents Number of events to generate
 * @returns {Array} Array of events
 */
const generateData = numEvents => {
  const events = [];
  const CHOICES = ["foo", "bar", "baz", "bagel", "donut", "croissant"];
  for (let i = 0; i < numEvents; i++) {
    const highlight = random(0, 1) === 1 ? "highlight" : "update";
    const choice = sampleSize(CHOICES, 3).concat(highlight);
    events.push({
      start_date: {
        year: random(2019, 2020),
        month: random(1, 12),
        day: random(1, 31),
      },
      text: {
        headline: `${highlight}: ${lorem.text(3)}`,
        text: prepareText(lorem.paragraphs(2), choice),
      },
      group: highlight,
      highlight: highlight,
      choice: choice,
    });
  }
  return {events};
};

/**
 * Filter options based on what's entered in search bar.
 *
 * @param {string} inputValue Value entered into the search bar
 * @returns {Array} Filtered array of choices
 */
const filterChoices = inputValue => {
  return [
    {label: "foo", value: "foo"},
    {label: "bar", value: "bar"},
    {label: "baz", value: "baz"},
    {label: "bagel", value: "bagel"},
    {label: "donut", value: "donut"},
    {label: "croissant", value: "croissant"},
    {label: "highlight", value: "highlight"},
    {label: "update", value: "update"},
  ].filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

/**
 * Fake an asynchronous call for collecting options
 * for the search bar.
 *
 * @param {string} inputValue Value entered into the search bar
 */
const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterChoices(inputValue));
    }, 1000);
  });

export {
    promiseOptions,
    generateData,
};