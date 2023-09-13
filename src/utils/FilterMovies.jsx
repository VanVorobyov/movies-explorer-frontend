export default function FilterMovies(array) {
  return array.filter((movie) => movie.duration < 30);
}
