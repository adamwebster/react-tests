import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Colors, FCTheme } from '@adamwebster/fused-components';
import AppHeader from './components/AppHeader';
import AppNav from './components/AppNav';
import AppContent from './components/AppContent';
import { FusedAllowanceProvider } from './state';
import CategoryWidgets from './components/CategoryWidgets';
import CategoryWidget from './components/CategoryWidget';
import { AppContext } from '../../State';

export const Wrapper = styled.div`
    width: 375px;
    height: 812px;
    border: solid 1px
        ${({ theme }) =>
            theme === 'dark' ? Colors.darkModeMedium : Colors.medium};
    margin: 20px auto;
    overflow: hidden;
    position: relative;
    font-size: 15px;
    display: flex;
    flex-flow: column;
    background-color: ${({ theme }) =>
        theme === 'dark' ? Colors.darkModeDarker : Colors.light};
`;

const FusedAllowance = () => {
    const { dispatchApp } = useContext(AppContext);
    const theme = useContext(FCTheme);
    useEffect(() => {
        dispatchApp({ type: 'SET_BACKGROUND_COLOR', payload: Colors.lightest });
        return () => {
            dispatchApp({
                type: 'SET_BACKGROUND_COLOR',
                payload: Colors.mediumlight,
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Wrapper theme={theme.theme}>
            <FusedAllowanceProvider>
                <AppHeader />
                <AppContent>
                    <CategoryWidgets>
                        <CategoryWidget></CategoryWidget>
                        <CategoryWidget></CategoryWidget>
                        <CategoryWidget></CategoryWidget>
                    </CategoryWidgets>
                </AppContent>
                <AppNav />
            </FusedAllowanceProvider>
        </Wrapper>
    );
};

export default FusedAllowance;
