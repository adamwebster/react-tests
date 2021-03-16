import React from 'react';
import styled from 'styled-components';

const HelpTextStyled = styled.span`
font-size:11px;
margin-top: 10px;
display:inline-block;
`

const HelpText = ({ ...rest }) => {
  return (
    <HelpTextStyled {...rest} />
  );
}

export default HelpText;