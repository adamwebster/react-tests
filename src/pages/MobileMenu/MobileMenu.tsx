import React, { useState, useContext } from "react";
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
  SinglePostInner
} from "./styles";
import {
  Button,
  ToastProvider,
  useToast,
  FCTheme
} from "@adamwebster/fused-components";

const posts = [
  {
    id: 0,
    title: "Post 1",
    date: "03/04/2022",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione necessitatibus molestias voluptates, dignissimos inventore porro sunt repudiandae quaerat dolorem nesciunt maxime aspernatur assumenda eius consequatur aperiam atque exercitationem? Tenetur, et!"
  },
  {
    id: 1,
    title: "Post 2",
    date: "03/03/2022",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione necessitatibus molestias voluptates, dignissimos inventore porro sunt repudiandae quaerat dolorem nesciunt maxime aspernatur assumenda eius consequatur aperiam atque exercitationem? Tenetur, et!"
  },
  {
    id: 2,
    title: "Post 3",
    date: "03/03/2022",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione necessitatibus molestias voluptates, dignissimos inventore porro sunt repudiandae quaerat dolorem nesciunt maxime aspernatur assumenda eius consequatur aperiam atque exercitationem? Tenetur, et!"
  },
  {
    id: 3,
    title: "Post 4",
    date: "03/03/2022",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione necessitatibus molestias voluptates, dignissimos inventore porro sunt repudiandae quaerat dolorem nesciunt maxime aspernatur assumenda eius consequatur aperiam atque exercitationem? Tenetur, et!"
  },
  {
    id: 4,
    title: "Post 5",
    date: "03/03/2022",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione necessitatibus molestias voluptates, dignissimos inventore porro sunt repudiandae quaerat dolorem nesciunt maxime aspernatur assumenda eius consequatur aperiam atque exercitationem? Tenetur, et!"
  }
];

const MenuList = () => {
  const toast = useToast();
  const theme = useContext(FCTheme);
  return (
    <Menu>
      <MenuItem onClick={() => toast.addInfo("Open the Home page")}>
        Home
      </MenuItem>
      <MenuItem onClick={() => toast.addInfo("Open the About page")}>
        About
      </MenuItem>
      <MenuItem onClick={() => toast.addInfo("Open the Portfolio page")}>
        Portfolio
      </MenuItem>
      <MenuItem onClick={() => toast.addInfo("Open the Contact page")}>
        Contact
      </MenuItem>
    </Menu>
  );
};
const MobileMenu = () => {
  const theme = useContext(FCTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [activePosts, setActivePost] = useState(0);

  return (
    <Wrapper>
      <MobileMenuStyled theme={theme?.theme}>
        <ToastProvider>
          <MenuList />
        </ToastProvider>
      </MobileMenuStyled>
      <Container theme={theme?.theme} menuOpen={menuOpen}>
        <Header theme={theme?.theme}>
          <Button primary onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "Close " : "Open "}
            Menu
          </Button>
          <SiteTitle>Site Name</SiteTitle>
        </Header>
        <Posts>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                onClick={() => {
                  setActivePost(post.id);
                  setPostOpen(true);
                }}
              >
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{post.date}</PostDate>
                <PostContent>{post.content}</PostContent>
              </Post>
            );
          })}
        </Posts>
      </Container>
      <SinglePost postOpen={postOpen}>
        <Header theme={theme?.theme}>
            <Button onClick={() => setPostOpen(false)}>Back</Button>
            <SiteTitle>{posts[activePosts].title}</SiteTitle></Header>
        <SinglePostInner>
          <PostDate>{posts[activePosts].date}</PostDate>
          <PostContent>{posts[activePosts].content}</PostContent>
        </SinglePostInner>
      </SinglePost>
    </Wrapper>
  );
};

export default MobileMenu;
