import React, { useContext } from "react";
import { FCTheme, Icon } from "@adamwebster/fused-components";
import moment from 'moment';
import {
  PostContent,
  PostDate,
  PostTitle,
  Header,
  SinglePost,
  SinglePostInner,
  BackButton
} from "../styles";

interface Props {
  postOpen: boolean;
  setPostOpen: (value: boolean) => void;
  activePosts: any;
}
const PostPage = ({postOpen, setPostOpen, activePosts }:Props) => {
  const theme = useContext(FCTheme);
  return (
    <SinglePost theme={theme?.theme} postOpen={postOpen}>
      <Header theme={theme?.theme}>
        <BackButton theme={theme?.theme} onClick={() => setPostOpen(false)}>
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
  );
};

export default PostPage;
