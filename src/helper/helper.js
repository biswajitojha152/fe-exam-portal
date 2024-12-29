export function isPassed(totalMark, securedMark) {
  return securedMark >= Math.round((totalMark * 33) / 100);
}
