import React, { useContext } from "react";
import { Button, Icon, FCTheme, Colors } from "@adamwebster/fused-components";
import moment from 'moment';

import {
  Container,
  Post,
  PostContent,
  PostDate,
  PostTitle,
  Header,
  Posts,
  SiteTitle,
  MobileMenuIcon,
  BottomBar,
  BarItem,
  FeedImage,
  Read,
  ButtonGroupTest,
  EmptyState,
} from "../styles";

interface Props {
    feedIcon?: string;
    feedItems: Array<any>;
    siteName?: string;
    markAllRead: () => void;
    markAllUnread: () => void;
    containerRef?: any,
    setActiveTab: (value: string) => void;
    openPost: (element: any, value: string) => void;
    getRead: () => void;
    getUnread: () => void;
    getAll: () => void;
    toggleRead: (guid: string) => void;
    menuOpen: boolean;
    activeTab: string;
    setActivePost: (post: any) => void;
    setMenuOpen: (value:boolean) => void;
}
const PostsPage = ({
  feedIcon,
  feedItems,
  siteName,
  markAllRead,
  markAllUnread,
  containerRef,
  setActiveTab,
  openPost,
  getRead,
  getUnread,
  setMenuOpen,
  toggleRead,
  menuOpen,
  activeTab,
  getAll,
  setActivePost,
}: Props) => {
  const theme = useContext(FCTheme);
  const buttonColor =
    theme?.theme === "dark" ? Colors.darkModeMedium : Colors.dark;
  return (
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
                onClick={e => {
                  setActivePost(post);
                  openPost(e, post.guid);
                  // setRead(post.guid);
                }}
              >
                <PostTitle>
                  <Read
                    onClick={() => toggleRead(post.guid)}
                    role="button"
                    read={post.read}
                  />
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
                      post.content.replace(/(<([^>]+)>)/gi, "").substr(0, 400) +
                      "..."
                  }}
                />
              </Post>
            );
          })}
        {feedItems.length === 0 && (
          <EmptyState>No posts found for this feed.</EmptyState>
        )}
      </Posts>
      <BottomBar menuOpen={menuOpen} theme={theme?.theme}>
        <BarItem
          theme={theme?.theme}
          activeTab={activeTab}
          onClick={() => {
            getAll();
            setActiveTab("All");
          }}
        >
          All
        </BarItem>
        <BarItem
          theme={theme?.theme}
          activeTab={activeTab}
          onClick={() => {
            getRead();
            setActiveTab("Read");
          }}
        >
          Read
        </BarItem>
        <BarItem
          theme={theme?.theme}
          activeTab={activeTab}
          onClick={() => {
            getUnread();
            setActiveTab("Unread");
          }}
        >
          Unread
        </BarItem>
        {/* <BarItem>Favorites</BarItem> */}
      </BottomBar>
    </Container>
  );
};

export default PostsPage;
