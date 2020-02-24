import React from 'react';
import { ExampleFooterStyled } from '../../styles/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
interface Props {
  url?: string;
}

export const ExampleFooter = ({url = 'https://github.com/adamwebster/react-tests'}:Props) => {
  return(
    <ExampleFooterStyled>
     &copy; {moment().format('YYYY')} <a href="https://adamwebster.me" rel="noopener noreferrer" target="_blank">Adam Webster</a> View the code on <a href={url} rel="noopener noreferrer" target="_blank"><FontAwesomeIcon style={{marginRight: 2 + 'px'}} icon={['fab','github']}  />GitHub</a>
    </ExampleFooterStyled>
  )
}