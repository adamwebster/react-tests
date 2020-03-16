import styled, { css } from "styled-components";
import { Colors, ButtonGroup } from "@adamwebster/fused-components";

export const ButtonGroupTest = styled(ButtonGroup)`
  width: 196px;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  width: 375px;
  height: 812px;
  border: solid 1px ${Colors.mediumdark};
  margin: 20px auto;
  overflow: hidden;
  position: relative;
  font-size: 15px;
`;
export const MobileMenuStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDarkest : Colors.dark};
  color: ${Colors.mediumlight};
`;

interface CI extends React.HTMLAttributes<HTMLDivElement> {
  menuOpen: boolean;
}

export const Container = styled.div<CI>`
  position: absolute;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: calc(100%);
  box-sizing: border-box;
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDarker : Colors.medium};
  color: ${props =>
    props.theme === "dark" ? Colors.darkModeLight : Colors.dark};
  transition: all 0.2s;
  overflow: hidden;
  box-shadow: 0 0 10px ${Colors.darkest};
  ${props =>
    props.menuOpen &&
    css`
      transform: scale(0.9) translate(70%);
    `}
`;

export const Header = styled.header`
  border-bottom: solid 1px
    ${props =>
      props.theme === "dark" ? Colors.darkModeMediumDark : Colors.border};
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDarker : Colors.medium};
  color: ${props =>
    props.theme === "dark" ? Colors.darkModeLight : Colors.dark};
  min-height: 60px;
  max-height: 60px;
  align-items: center;
  overflow: hidden;
`;

export const SiteTitle = styled.h1`
  display: inline-block;
  margin: 0 10px;
  box-sizing: border-box;
  font-weight: 300;
  font-size: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Posts = styled.section`
  overflow: auto;
  padding: 10px 20px 0 20px;
  box-sizing: border-box;
  display: flex;
  flex: 1 1;
  flex-flow: column;
`;

export const SinglePostInner = styled.section`
  overflow: auto;
  padding: 10px 20px 0 20px;
`;

export const Menu = styled.ul`
  list-style: none;
  margin: 30px 0;
  padding: 0;
  width: 200px;
`;

export const MenuItem = styled.li`
  padding: 10px 0;
  border-bottom: solid 1px ${Colors.mediumdark};
  display: flex;
  cursor: pointer;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }
  &:last-child {
    border-bottom: none;
  }
`;

interface PT {
  read: boolean;
}
export const Post = styled.div<PT>`
  border-bottom: solid 1px
    ${props =>
      props.theme === "dark" ? Colors.darkModeMediumDark : Colors.border};

  ${props =>
    props.read &&
    css`
      opacity: 0.6;
    `}
  &:last-child {
    border-bottom: none;
  }
`;
export const PostTitle = styled.h2`
  margin-bottom: 0;
`;

interface ReadProps {
  read: boolean;
}

export const Read = styled.div<ReadProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => (props.read ? "none" : Colors.blue)};
  display: inline-block;
  margin-right: 5px;
  box-sizing: border-box;
  border: solid 2px ${Colors.blue};
`;

export const PostDate = styled.div``;

export const PostContent = styled.p`
  & img {
    max-width: 100%;
  }
`;

export const PostMeta = styled.div``;

interface SP {
  postOpen: boolean;
}
export const SinglePost = styled.div<SP>`
  position: absolute;
  left: 110%;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDarker : Colors.medium};
  display: flex;
  flex-flow: column;
  box-shadow: 0 0 10px ${Colors.darkest};

  ${props =>
    props.postOpen &&
    css`
      left: 0;
      /* transform: scale(0.9) translate(70%); */
    `}
    color: ${props =>
      props.theme === "dark" ? Colors.darkModeLight : Colors.dark};
`;

interface MMI {
  theme?: any;
}

export const MobileMenuIcon = styled.div<MMI>`
  width: 24px;
  box-sizing: border-box;
  color: ${props =>
    props.theme === "dark" ? Colors.darkModeLight : Colors.dark};
  top: 5px;
  position: relative;
  cursor: pointer;
  svg {
    width: 24px;
  }
  &:hover {
    opacity: 0.7;
  }
`;

export const BackButton = styled.div`
  width: 24px;
  box-sizing: border-box;
  color: ${props =>
    props.theme === "dark" ? Colors.darkModeLight : Colors.dark};
  top: 5px;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

interface BB {
  menuOpen: boolean;
}
export const BottomBar = styled.div<BB>`
  min-height: 32px;
  height: 44px;
  box-sizing: border-box;

  border-top: solid 1px
    ${props =>
      props.theme === "dark" ? Colors.darkModeMediumDark : Colors.border};
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${props =>
    props.theme === "dark" ? Colors.darkModeDarker : Colors.medium};
`;

interface BI {
  activeTab: string;
}
export const BarItem = styled.div<BI>`
  flex: 1 1;
  padding: 8px;
  border-right: solid 1px
    ${props =>
      props.theme === "dark" ? Colors.darkModeMediumDark : Colors.border};
  box-sizing: border-box;
  text-align: center;
  &:last-child{
          border-right:none;
        }

  ${props =>
    props.activeTab === props.children
      ? css`
          border-top: solid 5px ${Colors.primary};
        `
      : css`
          border-top: solid 5px transparent;
        `}
`;

interface FI {
  theme?: any;
}
export const FeedImage = styled.img<FI>`
  border-radius: 50%;
  background-color: #fff;
  padding: 1px;
  min-width: 24px;
  margin-left: 15px;
`;

export const FavIcon = styled.img`
  border-radius: 50%;
  background-color: #fff;
  padding: 1px;
  width: 20px;
  box-sizing: border-box;
  margin-right: 10px;
`;

export const EmptyState = styled.div`
  text-align: center;
  font-weight: bold;
  margin-top: 50px;
`;
