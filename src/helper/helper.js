export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // const result = [];

  // if (hours > 0) {
  //   result.push(`${hours}hr`);
  // } else {
  //   result.push("0hr");
  // }

  // if (remainingMinutes > 0) {
  //   result.push(`${remainingMinutes}min`);
  // } else {
  //   result.push("00min");
  // }

  return `${hours}hr ${
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes
  }min`;
}
