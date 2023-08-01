import { useQuery } from "@tanstack/react-query";
import {
  getNowPlaying,
  getTopRated,
  getTrending,
  getPopularMovies,
  getPopularTv,
  searchMovieTv,
} from "../api/movieDataApi";

export const useGetNowPlaying = () => {
  return useQuery({
    queryKey: ["now-playing"],
    queryFn: getNowPlaying,
  });
};

export const useGetTrending = ({ span }) => {
  return useQuery({
    queryKey: ["trending", span],
    queryFn: () => getTrending(span),
  });
};

export const useGetTopRated = () => {
  return useQuery({
    queryKey: ["top-rated"],
    queryFn: getTopRated,
  });
};

export const useGetPopularMovies = ({ currentPage }) => {
  return useQuery({
    queryKey: ["popular-movies", currentPage],
    queryFn: () => getPopularMovies(currentPage),
  });
};

export const useGetPopularTv = ({ currentPage }) => {
  return useQuery({
    queryKey: ["popular-tv", currentPage],
    queryFn: () => getPopularTv(currentPage),
  });
};

export const useGetSearchMovieTv = ({
  currentPage,
  searchToggleState,
  searchQuery,
}) => {
  return useQuery({
    queryKey: ["search-movie-tv", currentPage, searchQuery, searchToggleState],
    queryFn: () => searchMovieTv(searchToggleState, searchQuery, currentPage),
  });
};
