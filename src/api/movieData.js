export const getNowPlaying = async () => {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  let data = await response.json();
  return data;
};

export const getTrending = async (trendingPeriod) => {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/${trendingPeriod}?api_key=${process.env.REACT_APP_API_KEY}`
  );
  let data = await response.json();
  return data;
};

export const getTopRated = async () => {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  let data = await response.json();
  return data;
};

export const getMovieById = async (id) => {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos`
  );
  let data = await response.json();
  return data;
};
