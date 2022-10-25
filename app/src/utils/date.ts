function dateNow() {
  return new Date().toISOString().slice(0, 10);
}

export function dateToday() {
  return new Date();
}

export function sortByDate(first: any, second: any): number {
  if (new Date(first) > new Date(second)) return -1;
  if (new Date(first) < new Date(second)) return 1;
  return 0;
}

module.exports = {
  dateNow,
  dateToday,
};
