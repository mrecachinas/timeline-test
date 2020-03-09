import {lorem} from 'faker';
import {sampleSize, random} from 'lodash';

/**
 * 
 * @param {string} text 
 * @param {Array} tags 
 * @returns {string}
 */
const prepareText = (text, tags) => {
  const formattedTagsList = tags.sort()
                                .map((tag) => `<span class="tag">${tag}</span>`)
                                .join("");
  const formattedTags = `<div class="tags">${formattedTagsList}</div>`;
  return `${text}${formattedTags}`;
}

const CHOICES = ["foo", "bar", "baz", "bagel", "donut", "croissant"];
const CHOICES_OBJ = [
  {label: "foo", value: "foo"},
  {label: "bar", value: "bar"},
  {label: "baz", value: "baz"},
  {label: "bagel", value: "bagel"},
  {label: "donut", value: "donut"},
  {label: "croissant", value: "croissant"},
]

/**
 * Generate numEvents number of events with which to seed the timeline.
 *
 * @param {number} numEvents Number of events to generate
 * @returns {Array} Array of events
 */
const generateData = numEvents => {
  const events = [];
  for (let i = 0; i < numEvents; i++) {
    const highlight = random(0, 1) === 1 ? "highlight" : "update";
    const choice = sampleSize(CHOICES, 3);
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

const filterChoices = inputValue => {
  return CHOICES_OBJ.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

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