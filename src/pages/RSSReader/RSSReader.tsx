import React, { useState, useContext, useEffect, useRef } from "react";
import { Wrapper, MobileMenuStyled } from "./styles";
import RSSMenu from "./components/Menu";
import PostsPage from "./components/PostsPage";
import PostPage from "./components/PostPage";
import { ToastProvider, FCTheme } from "@adamwebster/fused-components";
import { Helmet } from "react-helmet";

import Axios from "axios";
import { ExampleFooter } from "../../components/UI/ExampleFooter";

const RSSReader = () => {
  const theme = useContext(FCTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [feedIcon, setFeedIcon] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [feedUrl, setFeed] = useState("https://www.theverge.com/rss/index.xml");
  const [, setFeedImage] = useState("");
  const [, setReadPosts] = useState<Array<string>>([]);
  const [activePosts, setActivePost] = useState({
    title: "",
    pubDate: "",
    content: ""
  });
  const [siteName, setSiteName] = useState("");
  const [feedItems, setFeedItems] = useState<Array<any>>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const FeedData = async () => {
    const corsUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
    const feedItems = await Axios.get(corsUrl + feedUrl, {}).then(response => {
      if (response.data.items) {
        response.data.items.forEach((item: any) => {
          const readList = localStorage.getItem("FRSSReadPosts");
          if (readList) {
            const readListJson = JSON.parse(readList as string);
            const isRead = readListJson.filter(
              (itemToMatch: any) => itemToMatch === item.guid
            );
            if (isRead.length > 0) {
              item.read = true;
            } else {
              item.read = false;
            }
          }
        });
      }
      setFeedItems(response.data.items);
      setFeedImage(response.data.feed.image);
      setSiteName(response.data.feed.title);
      scrollTop();
      return response.data.items;
    });

    return feedItems;
  };

  const setRead = (guid: string) => {
    const toSet = localStorage.getItem("FRSSReadPosts");
    let toSetJ = [];
    if (toSet) {
      toSetJ = JSON.parse(toSet);
    }

    const isAdded = toSetJ.filter((itemToCheck: any) => itemToCheck === guid);

    if (isAdded.length < 1) {
      toSetJ.push(guid);
    }
    setReadPosts(toSetJ);
    localStorage.setItem("FRSSReadPosts", JSON.stringify(toSetJ));
    const toMarkRead = feedItems.filter(item => item.guid === guid);
    toMarkRead[0].read = true;
  };

  const markAllRead = () => {
    const toUpdate = feedItems.slice();
    const toSet = localStorage.getItem("FRSSReadPosts");
    let toSetJ: any[] = [];
    if (toSet) {
      toSetJ = JSON.parse(toSet);
    }

    toUpdate.forEach(item => {
      item.read = true;
      const isAdded = toSetJ.filter(
        (itemToCheck: any) => itemToCheck === item.guid
      );
      if (isAdded.length < 1) {
        toSetJ.push(item.guid);
      }
    });
    localStorage.setItem("FRSSReadPosts", JSON.stringify(toSetJ));
    setFeedItems(toUpdate);
  };

  const markAllUnread = () => {
    const toUpdate = feedItems.slice();
    const toSet = localStorage.getItem("FRSSReadPosts");
    let toSetJ: any[] = [];
    if (toSet) {
      toSetJ = JSON.parse(toSet);
    }

    toUpdate.forEach(item => {
      item.read = false;
      const index = toSetJ.findIndex(
        (itemToCheck: any) => itemToCheck === item.guid
      );
      // if (isAdded.length < 1) {
      //   toSetJ.push(item.guid);
      // }

      toSetJ.splice(index, 1);
    });
    localStorage.setItem("FRSSReadPosts", JSON.stringify(toSetJ));
    setFeedItems(toUpdate);
  };

  const scrollTop = () => {
    // const scrollElement = containerRef?.current?.scrollTop;
    containerRef?.current?.scrollTo(0, 0);
  };

  const getRead = async () => {
    const toSet = await FeedData();
    const filtered = toSet.filter(
      (item: { read: boolean }) => item.read === true
    );
    setFeedItems(filtered);
  };

  const getUnread = async () => {
    const toSet = await FeedData();
    const filtered = toSet.filter(
      (item: { read: boolean }) => item.read === false
    );
    setFeedItems(filtered);
  };

  const getAll = async () => {
    const toSet = await FeedData();
    setFeedItems(toSet);
  };

  const toggleRead = (guid: string) => {
    const itemsFiltered = feedItems.slice();
    const toToggle = itemsFiltered.filter(item => item.guid === guid);
    console.log(toToggle);
    toToggle[0].read = !toToggle[0].read;
    console.log(itemsFiltered);
    if (toToggle[0].read) {
      setRead(guid);
    } else {
      const readLocal = localStorage.getItem("FRSSReadPosts");
      let toSetJ: any[] = [];
      if (readLocal) {
        toSetJ = JSON.parse(readLocal);
      }
      const indexToRemove = toSetJ.findIndex(item => item === guid);
      toSetJ.splice(indexToRemove, 1);
      localStorage.setItem("FRSSReadPosts", JSON.stringify(toSetJ));
    }
    setFeedItems(itemsFiltered);
  };
  const OpenPost = (e: any, guid: string) => {
    if (e.target.getAttribute("role") !== "button") {
      setPostOpen(true);
      setRead(guid);
    }
  };

  useEffect(() => {
    setFeedIcon("https://www.google.com/s2/favicons?domain=www.theverge.com");
  }, []);

  useEffect(() => {
    FeedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedUrl]);

  return (
    <>
      <Wrapper>
        <Helmet>
          <title>RSS Reader | React Examples | Adam Webster</title>
        </Helmet>
        <MobileMenuStyled theme={theme?.theme}>
          <ToastProvider>
            <RSSMenu
              resetActiveTab={() => setActiveTab("All")}
              closeMenu={() => setMenuOpen(false)}
              setFeed={(feedUrl: string) => setFeed(feedUrl)}
              setFeedIcon={(feedIcon: string) => setFeedIcon(feedIcon)}
            />
          </ToastProvider>
        </MobileMenuStyled>
        <PostsPage
          feedIcon={feedIcon}
          feedItems={feedItems}
          siteName={siteName}
          markAllRead={() => markAllRead()}
          markAllUnread={() => markAllUnread()}
          containerRef={containerRef}
          setActiveTab={value => setActiveTab(value)}
          openPost={(e, guid) => OpenPost(e, guid)}
          getRead={() => getRead()}
          getUnread={() => getUnread()}
          getAll={() => getAll()}
          toggleRead={guid => toggleRead(guid)}
          menuOpen={menuOpen}
          activeTab={activeTab}
          setActivePost={value => setActivePost(value)}
          setMenuOpen={value => setMenuOpen(value)}
        />
        <PostPage
          postOpen={postOpen}
          setPostOpen={value => setPostOpen(value)}
          activePosts={activePosts}
        />
      </Wrapper>
      <ExampleFooter url="https://github.com/adamwebster/react-tests/tree/master/src/pages/RSSReader" />
    </>
  );
};

export default RSSReader;
