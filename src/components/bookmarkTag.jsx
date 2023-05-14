import React from "react";
import { ImBookmark } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";

function BookmarkTag({ onClick, isItemInWatchlist }) {
  return (
    <div className="bookmark absolute top-0 left-0 w-9 h-9 " onClick={onClick}>
      <ImBookmark
        className={`absolute left-0 top-0 text-4xl ${
          isItemInWatchlist ? "text-yellow-500/80" : "text-black/50"
        } `}
      />
      {!isItemInWatchlist && (
        <AiOutlinePlus className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100" />
      )}
      {isItemInWatchlist && (
        <BsCheck2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-900" />
      )}
    </div>
  );
}

export default BookmarkTag;
