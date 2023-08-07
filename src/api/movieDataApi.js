export const getNowPlaying = async () => {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTrending = async (trendingPeriod) => {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/trending/all/${trendingPeriod}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTopRated = async () => {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieById = async ({ id, tag }) => {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/${tag}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,credits`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPopularMovies = async (currentPage) => {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPopularTv = async (currentPage) => {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=5267b00cdf764bc75046eff3d46be3e2&language=en-US&page=${currentPage}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const searchMovieTv = async (
  searchToggleState,
  searchQuery,
  currentPage
) => {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/${searchToggleState}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&page=${currentPage}&include_adult=false`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
