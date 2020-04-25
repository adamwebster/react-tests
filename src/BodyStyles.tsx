import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { AppContext } from './State';
import { Colors } from '@adamwebster/fused-components';

interface GSProps {
    backgroundColor: string;
}
const GlobalStyle = createGlobalStyle<GSProps>`
  body {
    margin: 0;
    padding: 0;
    font: 13px/1.5 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
   background-color: ${(props) =>
       props.theme === 'dark' ? Colors.darkModeDarkest : props.backgroundColor};
   color: ${(props) => (props.theme === 'dark' ? Colors.medium : Colors.dark)};

   width:100%;
  }
#root{
  height: 100vh;
}

.App{
  height:calc(100vh - 50px);
  width: 100vw;
  float:left;
}

a{
  color:  ${(props) =>
      props.theme === 'dark' ? Colors.darkModeMedium : Colors.primary};
}
`;

interface Props {
    theme: any;
}

const BodyStyles = ({ theme }: Props) => {
    const { appState } = useContext(AppContext);
    return (
        <GlobalStyle backgroundColor={appState.backgroundColor} theme={theme} />
    );
};

export default BodyStyles;
