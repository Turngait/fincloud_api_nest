export function dateNow() {
  return new Date().toISOString().slice(0, 10);
}

export function dateToday() {
  return new Date();
}
