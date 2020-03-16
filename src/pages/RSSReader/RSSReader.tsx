import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Wrapper,
  MobileMenuStyled,
  Container,
  Menu,
  MenuItem,
  Post,
  PostContent,
  PostDate,
  PostTitle,
  Header,
  Posts,
  SiteTitle,
  SinglePost,
  SinglePostInner,
  MobileMenuIcon,
  BackButton,
  BottomBar,
  BarItem,
  FeedImage,
  FavIcon,
  Read,
  ButtonGroupTest
} from "./styles";
import {
  Button,
  ToastProvider,
  FCTheme,
  Icon,
  Colors
} from "@adamwebster/fused-components";

import moment from "moment";
import Axios from "axios";

interface ML {
  setFeed: (feed: string) => void;
  closeMenu: () => void;
  setFeedIcon: (icon: string) => void;
}

const MenuList = ({ setFeed, setFeedIcon, closeMenu }: ML) => {
  return (
    <Menu>
      <MenuItem
        onClick={() => {
          setFeed("https://www.theverge.com/rss/index.xml");
          setFeedIcon(
            "https://www.google.com/s2/favicons?domain=www.theverge.com"
          );
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
const RSSReader = () => {
  const theme = useContext(FCTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [feedIcon, setFeedIcon] = useState("");
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
      return(response.data.items);
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

  
  const GetRead = async () => {
    const toSet = await FeedData();
    const filtered = toSet.filter((item: {read:boolean}) => item.read === true);
        setFeedItems(filtered);
  }

  const GetUnread = async () => {
    const toSet = await FeedData();
    const filtered = toSet.filter((item: {read:boolean}) => item.read === false);
        setFeedItems(filtered);
  }


  const GetAll = async () => {
    const toSet = await FeedData();
    setFeedItems(toSet);
  }

  useEffect(() => {
    setFeedIcon("https://www.google.com/s2/favicons?domain=www.theverge.com");
  },[])

  useEffect(() => {
    FeedData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedUrl]);


  const buttonColor =
    theme?.theme === "dark" ? Colors.darkModeMedium : Colors.dark;
  return (
    <Wrapper>
      <MobileMenuStyled theme={theme?.theme}>
        <ToastProvider>
          <MenuList
            closeMenu={() => setMenuOpen(false)}
            setFeed={(feedUrl: string) => setFeed(feedUrl)}
            setFeedIcon={(feedIcon: string) => setFeedIcon(feedIcon)}
          />
        </ToastProvider>
      </MobileMenuStyled>
      <Container theme={theme?.theme} menuOpen={menuOpen}>
        <Header theme={theme?.theme}>
          <MobileMenuIcon
            theme={theme?.theme}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon icon="menu" />
          </MobileMenuIcon>
          {feedIcon && (
            <FeedImage theme={theme?.theme} src={feedIcon} alt={siteName} />
          )}

          <SiteTitle>{siteName}</SiteTitle>
        </Header>
        <Posts ref={containerRef}>
          <ButtonGroupTest>
            <Button buttonColor={buttonColor} onClick={() => markAllRead()}>
              Mark all Read
            </Button>
            <Button buttonColor={buttonColor} onClick={() => markAllUnread()}>
              Mark all Unread
            </Button>
          </ButtonGroupTest>
          {feedItems &&
            feedItems.map(post => {
              return (
                <Post
                  theme={theme?.theme}
                  key={post.guid}
                  read={post.read}
                  onClick={() => {
                    setActivePost(post);
                    setPostOpen(true);
                    setRead(post.guid);
                  }}
                >
                  <PostTitle>
                    <Read read={post.read} />
                    {post.title}
                  </PostTitle>
                  <PostDate>
                    {moment(post.pubDate)
                      .format("MMMM Do YYYY")
                      .toString()}
                  </PostDate>
                  <PostContent
                    dangerouslySetInnerHTML={{
                      __html:
                        post.content
                          .replace(/(<([^>]+)>)/gi, "")
                          .substr(0, 400) + "..."
                    }}
                  />
                </Post>
              );
            })}
        </Posts>
        <BottomBar menuOpen={menuOpen} theme={theme?.theme}>
        <BarItem onClick={() => GetAll()}>All</BarItem>
        <BarItem onClick={() => GetRead()}>Read</BarItem>
        <BarItem onClick={() => GetUnread()}>Unread</BarItem>
        {/* <BarItem>Favorites</BarItem> */}
      </BottomBar>
      </Container>
      <SinglePost theme={theme?.theme} postOpen={postOpen}>
        <Header theme={theme?.theme}>
          <BackButton onClick={() => setPostOpen(false)}>
            <Icon icon="chevron-left" />
          </BackButton>
        </Header>
        <SinglePostInner>
          <PostTitle>{activePosts.title}</PostTitle>
          <PostDate>
            {" "}
            {moment(activePosts.pubDate)
              .format("MMMM Do YYYY")
              .toString()}
          </PostDate>
          <PostContent
            dangerouslySetInnerHTML={{
              __html: activePosts.content
            }}
          />
        </SinglePostInner>
      </SinglePost>
    
    </Wrapper>
  );
};

export default RSSReader;
