export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60),
    remainingMinutes = minutes % 60;

  return `${hours}hr ${
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes
  }min`;
}

export function toLetters(num) {
  const mod = num % 26;
  let pow = (num / 26) | 0;
  const out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
  return pow ? toLetters(pow) + out : out;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isSubstringMatch(string, subString) {
  return new RegExp(escapeRegExp(subString), "i").test(string);
}
