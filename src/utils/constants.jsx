export function convertDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}м`;
}

export function filterMovies(array) {
  return array.filter((movie) => movie.duration <= 40);
}
