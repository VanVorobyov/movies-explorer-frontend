export const MOVIES_DURATION = 40;
export const LAPTOP_MOVIES_NUMBER = 12;
export const TABLET_MOVIES_NUMBER = 8;
export const MOBILE_MOVIES_NUMBER = 5;

export const ADDED_LAPTOP_MOVIES_NUMBER = 3;
export const ADDED_TABLET_MOVIES_NUMBER = 2;
export const ADDED_MOBILE_MOVIES_NUMBER = 2;

export function convertDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}м`;
}

export function filterMovies(array) {
  return array.filter((movie) => movie.duration <= MOVIES_DURATION);
}
