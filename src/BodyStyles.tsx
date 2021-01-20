import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { AppContext } from './State';
import { Colors, FCGlobalStyles } from '@adamwebster/fused-components';

interface GSProps {
    backgroundColor: string;
}
const GlobalStyle = createGlobalStyle<GSProps>`
  body {
   width:100%;
   font-size: 100%;
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
        <>
            <GlobalStyle
                backgroundColor={appState.backgroundColor}
                theme={theme}
            />
            <FCGlobalStyles backgroundColor={appState.backgroundColor} />
        </>
    );
};

export default BodyStyles;
