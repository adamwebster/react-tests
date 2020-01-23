import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display:grid;
  grid-gap: 10px;
  grid-template-columns: auto auto auto;
  background-color: tomato;
  padding:10px;
`

const GridItem = styled.div`
  background-color: #fff;
  border: solid 1px #ccc;
  padding:20px;
`
const CSSGrid = () => {
  const numberOfItems = 9;
const createGridItem = () => {
  let items = [];

  for (let i = 0; i < numberOfItems; i++){
    items.push(<GridItem>{i + 1}</GridItem>)
  }
  return items;

}
  return (
    <Grid>
      {createGridItem()}
  
    </Grid>
  )
};

export default CSSGrid;