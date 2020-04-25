import styled from 'styled-components';
import { Colors } from '@adamwebster/fused-components';

export const ExampleFooterStyled = styled.div`
    width: 100%;
    padding: 20px;
    font-size: 11px;
    color: #333;
    text-align: center;
    box-sizing: border-box;
`;

export const ExampleFooterStyledFloating = styled.div`
    width: 300px;
    padding: 10px;
    font-size: 11px;
    color: #333;
    position: fixed;
    background-color: #ffffffee;
    border-left: solid 1px ${Colors.border};
    border-top: solid 1px ${Colors.border};

    border-top-left-radius: 5px;
    bottom: 0;
    right: 0;
    text-align: center;
    box-sizing: border-box;
`;
