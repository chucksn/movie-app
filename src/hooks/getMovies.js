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
    staleTime: 15 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
  });
};

export const useGetTrending = ({ span }) => {
  return useQuery({
    queryKey: ["trending", span],
    queryFn: () => getTrending(span),
    staleTime: 15 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
  });
};

export const useGetTopRated = () => {
  return useQuery({
    queryKey: ["top-rated"],
    queryFn: getTopRated,
    staleTime: 15 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
  });
};

export const useGetPopularMovies = ({ currentPage }) => {
  return useQuery({
    queryKey: ["popular-movies", currentPage],
    queryFn: () => getPopularMovies(currentPage),
    staleTime: 15 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
  });
};

export const useGetPopularTv = ({ currentPage }) => {
  return useQuery({
    queryKey: ["popular-tv", currentPage],
    queryFn: () => getPopularTv(currentPage),
    staleTime: 15 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
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
    staleTime: 15 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
  });
};
