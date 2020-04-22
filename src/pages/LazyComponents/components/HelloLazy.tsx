import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { Colors, Avatar, FCTheme } from '@adamwebster/fused-components';

const CommentContainer = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;
const CommentItem = styled.li`
    background-color: ${({ theme }) =>
        theme === 'dark' ? Colors.darkModeDark : '#fff'};
    padding: 15px;
    box-sizing: border-box;
    border: solid 1px ${Colors.border};
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 0 15px #00000050;
`;
const CommentHeader = styled.header`
    display: flex;
    flex-flow: row;
`;

const CommentAuthorMeta = styled.div`
    display: flex;
    flex-flow: column;
    margin-left: 10px;
    h1 {
        margin: 0;
        font-size: 14px;
    }
`;

interface Props {
    commentsLoaded: number;
}
const HelloLazy = ({ commentsLoaded }: Props) => {
    const theme = useContext(FCTheme);
    const [comments, setComments] = useState<Array<any>>([]);
    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/comments').then(
            (response) => {
                response.data.forEach((comment: any) => {
                    comment.avatarImage = `https://i.pravatar.cc/300?img=${comment.id}`;
                });
                const commentsToSet = [];
                commentsToSet.push(response.data.slice(0, commentsLoaded));
                setComments(commentsToSet[0]);
            }
        );
    }, [commentsLoaded]);
    const commentItems = comments.map(
        (comment: {
            name: string;
            id: number;
            body: string;
            email: string;
            avatarImage: string;
        }) => {
            return (
                <CommentItem theme={theme?.theme} key={comment.id}>
                    <CommentHeader>
                        <Avatar size="medium" image={comment.avatarImage} />
                        <CommentAuthorMeta>
                            <h1>
                                {comment.name} {comment.id}
                            </h1>
                            <a href={`mailto:${comment.email}`}>
                                {comment.email}
                            </a>{' '}
                        </CommentAuthorMeta>
                    </CommentHeader>
                    <p>{comment.body}</p>
                </CommentItem>
            );
        }
    );
    return <CommentContainer>{commentItems}</CommentContainer>;
};

export default HelloLazy;
