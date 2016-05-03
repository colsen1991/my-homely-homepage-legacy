export const extractValueFromEvent = event => typeof event === 'string' ? event : event.target.value;
