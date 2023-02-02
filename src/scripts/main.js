/* eslint-disable no-param-reassign */

/* Using of event delegation pattern
 *
 * Click any button and see ther result in the console
*/
const { body } = window.document;
const handleClick = (event) => {
  if (event.target.tagName === 'BUTTON') {
    console.log(event.target.innerText);
  }
};

body.addEventListener('click', handleClick);


/* Custom vs Sinthetic event
 *
 * Try to add and edit custom detail while the event bubbling
*/
const logEvent = (event) => console.log(
  `[${event.type}]:
  Target:         ${event.target.tagName},
  Current Target: ${event.currentTarget.tagName},
  Detail:         ${event.detail}`,
);
const editEventDetail = (event) => {
  event.detail = 'new value';
  logEvent(event);
};
const targetElement = document.createElement('div');

document.body.append(targetElement);

// synthetic event: will replace 'init value' with 'new value'
const syntheticEvent = new Event('syntheticEvent', { bubbles: true });

syntheticEvent.detail = 'init value';

targetElement.addEventListener('syntheticEvent', logEvent);
document.body.addEventListener('syntheticEvent', editEventDetail);
document.documentElement.addEventListener('syntheticEvent', logEvent);

targetElement.dispatchEvent(syntheticEvent);

// custom event: will throw an error 'Cannot set property detail of #<CustomEvent>...'
const customEvent = new CustomEvent('customEvent', { bubbles: true, detail: 'init value' });

targetElement.addEventListener('customEvent', logEvent);
document.body.addEventListener('customEvent', editEventDetail);
document.documentElement.addEventListener('customEvent', logEvent);

targetElement.dispatchEvent(customEvent);
