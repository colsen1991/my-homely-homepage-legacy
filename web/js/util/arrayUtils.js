export function sortByDate({ date: a }, { date: b }) {
  return new Date(a).getTime() - new Date(b).getTime();
}
