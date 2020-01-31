import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card } from "@adamwebster/fused-components";
import FeedData from "../data/Feed.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darken } from "polished";

const Feed = styled(Card)`
  width: 600px;
  margin: 40px auto;
  overflow:hidden;
`;
const FeedItem = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Username = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
  color: #3db3ee;
  padding: 10px 10px 0 10px;
`;

const Content = styled.div`
  padding: 10px;
`
const Meta = styled.div`
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f2f2f2;
`
const Date = styled.div`
  color: #939393;

`;

const Actions = styled.div`
  float: right;
  font-size: 16px;
  svg:not(:last-child) {
    margin-right: 10px;
  }
  .fa-smile-wink{
      color: #ff9b00;
      cursor:pointer;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.2);
      color: ${darken(0.1, "#ff9b00")};
    }
  }
  .fa-comment{
    color: #3db3ee;
    cursor:pointer;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.2);
      color: ${darken(0.1, "#3db3ee")};
    }
  }
  .fa-heart {
    color: red;
    cursor:pointer;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.2);
      color: ${darken(0.1, "red")};
    }
  }
`;
const NewsFeed = () => {
  const { FeedItems, setFeedItems } = useState(FeedData);
  console.log(FeedData);
  return (
    <Feed boxShadow>
      {FeedData.map(item => {
        return (
          <FeedItem>
            <Username>{item.user}</Username>
            <Content>{item.content}</Content>
            <Meta>
            <Date>
              {item.date}
              <Actions>
                <FontAwesomeIcon icon="heart" />
                <FontAwesomeIcon icon="comment" />

                <FontAwesomeIcon icon={["fas", "smile-wink"]} />
              </Actions>
            </Date>
            </Meta>
          </FeedItem>
        );
      })}
    </Feed>
  );
};

export default NewsFeed;
