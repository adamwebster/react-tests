import React from 'react';
import styled, { css } from 'styled-components';

const Grid = styled.div`
  display:grid;
  grid-gap: 10px;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto;
  grid-template-rows: 50px 200px 200px 50px;
  background-color: tomato;
  padding:10px;
`

const GridItem = styled.div`
  background-color: #fff;
  border: solid 1px #ccc;
  padding:20px;
  ${props => props.gridColumn && css`
    grid-column: ${props.gridColumn};
  `}

  ${props => props.gridRow && css`
    grid-row: ${props.gridRow};
  `}
`
const CSSGrid = () => {

  return (
    <Grid>
      {/* {createGridItem()} */}
      <GridItem gridColumn={"1 / 13"} />

      <GridItem gridColumn={"1 / 3"} gridRow={"2 / span 3"}  />
      <GridItem  gridColumn={"3 / 13"}  gridRow={"2 / span 3"} />
      <GridItem gridColumn={"1 / 13"} />

    </Grid>
  )
};

export default CSSGrid;