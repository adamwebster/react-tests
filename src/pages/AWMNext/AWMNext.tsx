import { ThemeProvider } from 'styled-components';
import {
    GlobalStyles,
    StyledGrid,
    StyledSiteHeader,
} from './styles/GlobalStyles';
import { LightTheme } from './styles/themes';
import './styles/_fonts.css';

const AWMNext = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <GlobalStyles />
            <StyledGrid initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <StyledSiteHeader>Site Header</StyledSiteHeader>

                <div>1</div>

                <div>1</div>

                <div>1</div>

                <div>1</div>

                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>

                <div>1</div>

                <div>1</div>
            </StyledGrid>
        </ThemeProvider>
    );
};
export default AWMNext;
