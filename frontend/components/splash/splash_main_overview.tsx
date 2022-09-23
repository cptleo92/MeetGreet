import React from "react";
import SplashMainOverviewBanner from "./splash_main_overview_banner";
import SplashMainOverviewPhotos from "./splash_main_overview_photos";
import SplashMainOverviewButtons from "./splash_main_overview_buttons";
import SplashMainOverviewExplore from "./splash_main_overview_explore";
import SplashMainOverviewHow from "./splash_main_overview_how";

const SplashMainOverview = () => {
  return (
    <section className="splash-main-overview">
      <SplashMainOverviewBanner />
      <SplashMainOverviewPhotos />
      <SplashMainOverviewButtons />
      <SplashMainOverviewExplore />
      <SplashMainOverviewHow />
    </section>
  )

}

export default SplashMainOverview