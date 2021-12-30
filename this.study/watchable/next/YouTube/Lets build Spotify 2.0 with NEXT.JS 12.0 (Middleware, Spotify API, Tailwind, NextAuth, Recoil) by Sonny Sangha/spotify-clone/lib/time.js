export function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60_000);
  const seconds = ((millis % 60_000) / 1000).toFixed(0);

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
