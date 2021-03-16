import React from 'react';
import {
    Menu,
    MenuItem,
    FavIcon,
  } from "../styles";

interface Props {
  setFeed: (feed: string) => void;
  closeMenu: () => void;
  setFeedIcon: (icon: string) => void;
  resetActiveTab: () => void;
}
const RSSMenu = ({
  setFeed,
  setFeedIcon,
  closeMenu,
  resetActiveTab
}:Props)=> {
  return (
    <Menu>
      <MenuItem
        onClick={() => {
          setFeed("https://www.theverge.com/rss/index.xml");
          setFeedIcon(
            "https://www.google.com/s2/favicons?domain=www.theverge.com"
          );
          resetActiveTab();
          closeMenu();
        }}
      >
        <FavIcon
          alt="The Verge"
          src="https://www.google.com/s2/favicons?domain=www.theverge.com"
        />
        The Verge
      </MenuItem>
      <MenuItem
        onClick={() => {
          setFeed("https://www.polygon.com/rss/index.xml");
          setFeedIcon(
            "https://www.google.com/s2/favicons?domain=www.polygon.com"
          );
          resetActiveTab();
          closeMenu();
        }}
      >
        {" "}
        <FavIcon
          alt="Polygon"
          src="https://www.google.com/s2/favicons?domain=www.polygon.com"
        />
        Polygon
      </MenuItem>
      <MenuItem
        onClick={() => {
          setFeed("https://www.smashingmagazine.com/feed");
          setFeedIcon(
            "https://www.google.com/s2/favicons?domain=www.smashingmagazine.com"
          );
          resetActiveTab();
          closeMenu();
        }}
      >
        <FavIcon
          alt="Smashing Magazine"
          src="https://www.google.com/s2/favicons?domain=www.smashingmagazine.com"
        />
        Smashing Magazine
      </MenuItem>
      <MenuItem
        onClick={() => {
          setFeed("https://daringfireball.net/feeds/main");
          setFeedIcon(
            "https://www.google.com/s2/favicons?domain=www.daringfireball.com"
          );
          resetActiveTab();
          closeMenu();
        }}
      >
        <FavIcon
          alt="Daring Fireball"
          src="https://www.google.com/s2/favicons?domain=www.daringfireball.com"
        />
        Daring Fireball
      </MenuItem>
    </Menu>
  );
};

export default RSSMenu;
