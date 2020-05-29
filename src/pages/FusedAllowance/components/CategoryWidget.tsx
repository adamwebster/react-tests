import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Card, Avatar, Colors } from '@adamwebster/fused-components';

const StyledCategoryWidget = styled(Card)`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

const WidgetContent = styled.div`
    width: 100%;
    display: flex;
    align-content: center;
`;

const StyledAvatar = styled(Avatar)`
    margin-right: 10px;
`;

const WidgetInfo = styled.div`
    line-height: 1;
    display: flex;
    flex: 1 1;
    h4 {
        margin: 0;
    }
    span.description {
        font-size: 10px;
        color: ${Colors.mediumdark};
    }
`;

const Row = styled.div`
    display: flex;
    flex-flow: row;
    flex: 1 1;
`;

const Col = styled.div`
    display: flex;
    flex-flow: column;
    align-items: ${({ alignItems }: { alignItems?: string }): string =>
        alignItems ? alignItems : 'flex-start'};
    flex: 1 1;
`;
const Amount = styled.div``;
interface Props {
    children?: ReactNode;
    title?: string;
}
const CategoryWidget = ({ children, title = 'Title' }: Props) => {
    return (
        <StyledCategoryWidget>
            <WidgetContent>
                <StyledAvatar
                    size="small"
                    borderRadius="round"
                    image="https://api.adorable.io/avatars/285/abott@adorable.png"
                />
                <WidgetInfo>
                    <Row>
                        <Col>
                            <h4>{title}</h4>
                            <span className="description">Description</span>
                        </Col>
                        <Col alignItems="flex-end">
                            <Amount>$40</Amount>
                        </Col>
                    </Row>

                    {children && <p>{children}</p>}
                </WidgetInfo>
            </WidgetContent>
        </StyledCategoryWidget>
    );
};

export default CategoryWidget;
