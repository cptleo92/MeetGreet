import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeHeader from './home/home_header';
import SplashFooter from './splash/splash_footer';

function Layout() {
  return (
    <div className="layout">
      <HomeHeader />
        <Outlet />
      <SplashFooter />
    </div>
  );
}

export default Layout;