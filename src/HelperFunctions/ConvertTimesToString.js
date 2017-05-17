function convertTimesToString(time: number) {
  const minsLeft = Math.floor(time / 60);
  const secsLeft = time % 60;
  return `${minsLeft}:${secsLeft < 10 ? '0' : ''}${secsLeft}`;
}

export default convertTimesToString;
