import React, { ReactNode } from 'react';
import styled from 'styled-components';

const WidgetList = styled.section`
    width: 100%;
`;

interface Props {
    children?: ReactNode;
}
const CategoryWidgets = ({ children }: Props) => {
    return <WidgetList id="#AllowanceWidgets">{children}</WidgetList>;
};

export default CategoryWidgets;
