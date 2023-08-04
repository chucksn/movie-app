export const fetchWatchlistData = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URI}/api/v1/watchlist`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    return { status: response.status, data };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateWatchlistData = async ({ tag, watchlistItem, token }) => {
  try {
    //add tag to watchlistItem sent to backend
    const updatedWatchlistItem = { ...watchlistItem, tag };
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URI}/api/v1/watchlist`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedWatchlistItem),
      }
    );

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteWatchlistData = async ({ watchlistItemId, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URI}/api/v1/watchlist/${watchlistItemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return { status: 500, error: "Internal Server Error" };
  }
};
