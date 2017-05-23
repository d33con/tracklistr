function convertStringToTime(timeString) {
  const hoursLeft = timeString.slice(2, 0);
  const minsLeft = timeString.slice(-3, -5);
  const secsLeft = timeString.slice(0, -2);
  return hoursLeft + minsLeft + secsLeft;
}

export default convertStringToTime;
