function NoPage() {
  const style = {
    color: "white",
    textAlign: "center",
    fontWeight: "300",
  };
  return (
    <div className="outlet-bg-empty-search min-h-screen w-full bg-black/80">
      <h2 style={style}>page Not Found</h2>
    </div>
  );
}

export default NoPage;
