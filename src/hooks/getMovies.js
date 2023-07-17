import { useQuery } from "@tanstack/react-query";
import { getNowPlaying, getTopRated, getTrending } from "../api/movieData";

export const useGetNowPlaying = () => {
  return useQuery({
    queryKey: ["now-playing"],
    queryFn: getNowPlaying,
  });
};

export const useGetTrending = ({ span }) => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrending(span),
  });
};
export const useGetTopRated = () => {
  return useQuery({
    queryKey: ["top-rated"],
    queryFn: getTopRated,
  });
};
