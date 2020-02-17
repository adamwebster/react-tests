import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Card,
  Button,
  Avatar,
  Label,
  DropdownButton
} from "@adamwebster/fused-components";
import FeedData from "../data/Feed.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darken } from "polished";

const Feed = styled.div`
  width: 600px;
  margin: 40px auto;
`;

const FeedItem = styled(Card)`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  overflow: hidden;
`;

const Profile = styled.div`
  padding: 10px 10px 0 10px;
  display: flex;
  flex: 1 1;
  border-bottom: solid 1px #dcdcdc;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
  padding: 13px 0px;
`;

const AvatarStyled = styled(Avatar)`
  border: solid 3px #fff;
  display: inline-block;
  margin-right: 20px;
`;

const NewPost = styled.div`
  box-sizing: border-box;
  margin-bottom: 20px;
  textarea {
    width: 100%;
    border-radius: 5px;
    resize: vertical;
    border: solid 1px #ccc;
    box-sizing: border-box;
    min-height: 100px;
  }
`;

const Content = styled.div`
  padding: 10px;
`;
const Meta = styled.div`
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f2f2f2;
`;
const DateValue = styled.div`
  color: #939393;
`;

const Actions = styled.div`
  float: right;
  font-size: 16px;
  svg:not(:last-child) {
    margin-right: 10px;
  }
  .fa-smile-wink {
    color: #ff9b00;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.2);
      color: ${darken(0.1, "#ff9b00")};
    }
  }
  .fa-comment {
    color: #3db3ee;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.2);
      color: ${darken(0.1, "#3db3ee")};
    }
  }
  .fa-heart {
    color: red;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.2);
      color: ${darken(0.1, "red")};
    }
  }
`;
const NewsFeed = () => {
  const [FeedItems, setFeedItems] = useState(FeedData);
  const [FeedText, setFeedText] = useState("");
  const [privacyText, setPrivacyText] = useState("Who can see this?");
  const addFeedItem = () => {
    const FeedItemCopy = FeedItems.slice();
    const d = new Date();
    FeedItemCopy.unshift({
      id: FeedItemCopy.length + 1,
      user: "Adam Webster",
      avatar: "https://adamwebster.me/static/avatar.jpg",
      date: d.toString(),
      content: FeedText
    });
    setFeedItems(FeedItemCopy);
  };
  return (
    <Feed>
      <NewPost>
        <Label htmlFor="NewPost">New Post</Label>
        <textarea onChange={e => setFeedText(e.target.value)} id="NewPost" />
        <Button
          icon={<FontAwesomeIcon icon="plus" />}
          onClick={() => addFeedItem()}
          primary
        >
          Post
        </Button>
        <DropdownButton label={privacyText}>
          <DropdownButton.Menu>
            <DropdownButton.MenuItem onClick={() => setPrivacyText("Friends")}>
              Friends
            </DropdownButton.MenuItem>
            <DropdownButton.MenuItem onClick={() => setPrivacyText("Family")}>
              Family
            </DropdownButton.MenuItem>
            <DropdownButton.MenuItem
              onClick={() => setPrivacyText("Everybody")}
            >
              Everybody
            </DropdownButton.MenuItem>
          </DropdownButton.Menu>
        </DropdownButton>
      </NewPost>
      {FeedItems &&
        FeedItems.map(item => {
          return (
            <FeedItem boxShadow key={item.id}>
              <Profile>
                <AvatarStyled
                  boxShadow
                  size="medium"
                  borderRadius="round"
                  image={item.avatar}
                />
                <UserName>{item.user}</UserName>
              </Profile>
              <Content>{item.content}</Content>
              <Meta>
                <DateValue>
                  {item.date}
                  <Actions>
                    <FontAwesomeIcon icon="heart" />
                    <FontAwesomeIcon icon="comment" />

                    <FontAwesomeIcon icon={["fas", "smile-wink"]} />
                  </Actions>
                </DateValue>
              </Meta>
            </FeedItem>
          );
        })}
    </Feed>
  );
};

export default NewsFeed;
