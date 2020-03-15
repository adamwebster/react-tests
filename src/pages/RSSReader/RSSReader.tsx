import React, { useState, useContext, useEffect } from "react";
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
  FavIcon
} from "./styles";
import {
  Button,
  ToastProvider,
  useToast,
  FCTheme,
  Icon
} from "@adamwebster/fused-components";

import moment from "moment";
import Axios from "axios";

interface ML {
  setFeed: (feed: string) => void;
}

const MenuList = ({ setFeed }: ML) => {
  const toast = useToast();
  const theme = useContext(FCTheme);
  return (
    <Menu>
      <MenuItem
        onClick={() => setFeed("https://www.theverge.com/rss/index.xml")}
      >
        <FavIcon
          alt="The Verge"
          src="http://www.google.com/s2/favicons?domain=www.theverge.com"
        />
        The Verge
      </MenuItem>
      <MenuItem
        onClick={() => setFeed("https://www.polygon.com/rss/index.xml")}
      >
        {" "}
        <FavIcon
          alt="Polygon"
          src="http://www.google.com/s2/favicons?domain=www.polygon.com"
        />
        Polygon
      </MenuItem>
      <MenuItem
        onClick={() => setFeed("https://www.smashingmagazine.com/feed")}
      >
        <FavIcon
          alt="Smashing Magazine"
          src="http://www.google.com/s2/favicons?domain=www.smashingmagazine.com"
        />
        Smashing Magazine
      </MenuItem>
      <MenuItem
        onClick={() => setFeed("https://daringfireball.net/feeds/main")}
      >
        <FavIcon
          alt="Daring Fireball"
          src="http://www.google.com/s2/favicons?domain=www.daringfireball.com"
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
  const [feedUrl, setFeed] = useState("https://www.theverge.com/rss/index.xml");
  const [feedImg, setFeedImage] = useState("");
  const [activePosts, setActivePost] = useState({
    title: "",
    pubDate: "",
    content: ""
  });
  const [siteName, setSiteName] = useState("");
  const [feedItems, setFeedItems] = useState<Array<any>>([]);
  const FeedData = () => {
    const corsUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
    Axios.get(corsUrl + feedUrl, {}).then(response => {
      console.log(response);
      setFeedItems(response.data.items);
      setFeedImage(response.data.feed.image);
      setSiteName(response.data.feed.title);
      setMenuOpen(false);
    });
  };

  useEffect(() => {
    FeedData();
  }, [feedUrl]);
  return (
    <Wrapper>
      <MobileMenuStyled theme={theme?.theme}>
        <ToastProvider>
          <MenuList setFeed={(feedUrl: string) => setFeed(feedUrl)} />
        </ToastProvider>
      </MobileMenuStyled>
      <Container theme={theme?.theme} menuOpen={menuOpen}>
        <Header theme={theme?.theme}>
          <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)}>
            <Icon icon="menu" />
          </MobileMenuIcon>
          {feedImg && <FeedImage src={feedImg} alt={siteName} />}

          <SiteTitle>{siteName}</SiteTitle>
        </Header>
        <Posts>
          {console.log(feedItems)}
          {feedItems &&
            feedItems.map(post => {
              return (
                <Post
                  theme={theme?.theme}
                  key={post.id}
                  onClick={() => {
                    setActivePost(post);
                    setPostOpen(true);
                  }}
                >
                  <PostTitle>{post.title}</PostTitle>
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
        {/* <BottomBar theme={theme?.theme}>
          <BarItem>Read</BarItem>
          <BarItem>Unread</BarItem>
          <BarItem>Favourites</BarItem>
        </BottomBar> */}
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
