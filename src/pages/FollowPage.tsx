import React, { useState } from 'react';
import { Card, Button, Avatar } from '@adamwebster/fused-components';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import bgImage from '../static/bg.jpg';

const StyledCard = styled(Card)`
    width: 300px;
    margin: 50px auto 0 auto;
    position: relative;
    padding: 100px 0 0 0;
    overflow: hidden;
`;
const StyledAvatar = styled(Avatar)`
    margin: 0 auto;
    top: 0px;
    position: relative;
    border: solid 5px #fff;
`;
const UserName = styled.h2`
    text-align: center;
    margin-bottom: 0px;
`;

interface ICoverImage {
    image: string;
}
const CoverImage = styled.div<ICoverImage>`
    position: absolute;
    width: 100%;
    height: 150px;
    top: 0;
    background-size: cover;
    background-position: center center;
    background-image: url(${(props) => props.image});
`;
const CardInner = styled.div`
    padding: 10px;
`;
const Stats = styled.div`
    display: flex;
    flex: 1 1;
    margin-bottom: 30px;
`;
const Stat = styled.div`
    display: flex;
    flex: 1 1;
    text-align: center;
    flex-flow: column;
    border-right: solid 1px #e8e8e8;
    &:last-child {
        border-right: none;
    }
`;

const SectionHeader = styled.h4`
    width: 100%;
    margin: 5px 0;
`;
const StatValue = styled.span``;

const UserHandle = styled.span`
    color: #ccc;
    margin: 0 auto;
    width: 100%;
    text-align: center;
    display: inline-block;
    margin-bottom: 30px;
`;

const ButtonStyled = styled(Button)`
    width: 100%;
`;

export const FollowPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonColor, setButtonColor] = useState('');
    const [buttonText, setButtonText] = useState('Follow');
    const [following, setFollowing] = useState(false);
    const [, setButtonIcon] = useState('check');
    const [, setCompleted] = useState(false);
    const followUser = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setButtonText('Following');
            setFollowing(true);
            setCompleted(true);
        }, 1000);
        setTimeout(() => {
            setButtonColor('#ff253a');
            setButtonText('Unfollow');
            setCompleted(false);
            setButtonIcon('times');
        }, 3000);
    };

    const unFollowUser = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setButtonColor('');
            setButtonText('Follow');
            setFollowing(false);
            setButtonIcon('check');
        }, 2000);
    };
    return (
        <StyledCard boxShadow>
            <Helmet>
                <title>
                    Social Profile Card | React Examples | Adam Webster
                </title>
            </Helmet>
            <CoverImage image={bgImage} />
            <StyledAvatar
                boxShadow
                size="large"
                borderRadius="round"
                image={bgImage}
            />
            <CardInner>
                <UserName>Adam Webster</UserName>
                <UserHandle>@adamwebster</UserHandle>
                <Stats>
                    <Stat>
                        <SectionHeader>Posts</SectionHeader>
                        <StatValue>365</StatValue>
                    </Stat>
                    <Stat>
                        <SectionHeader>Followers</SectionHeader>
                        <StatValue>1.5K</StatValue>
                    </Stat>
                    <Stat>
                        <SectionHeader>Following</SectionHeader>
                        <StatValue>157</StatValue>
                    </Stat>
                </Stats>
                <ButtonStyled
                    onClick={
                        !following ? () => followUser() : () => unFollowUser()
                    }
                    isLoading={isLoading}
                    buttonColor={buttonColor}
                    primary
                >
                    {buttonText}
                </ButtonStyled>
            </CardInner>
        </StyledCard>
    );
};
