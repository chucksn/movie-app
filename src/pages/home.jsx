import HomeMainSection from "../components/home-main-sect";
import HomeTrendingSection from "../components/home-trending-sect";
import HomeTopRatedSection from "../components/home-topRated-sect";

function Home() {
  return (
    <>
      <div className="outlet-bg min-h-screen w-full bg-black/90 py-[72px] px-2 sm:py-32 sm:px-4 md:px-7 lg:px-2">
        <HomeMainSection />
        <HomeTrendingSection />
        <HomeTopRatedSection />
      </div>
    </>
  );
}

export default Home;
