import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from "../../responsive";
import ProuductCategories from './ProductCategories';

export default function Categories() {
  const params = useParams()
  const paramsInt = parseInt(params.id)
  const [number,setNumber] = useState(paramsInt) 
  const [numberone,setNumberone] = useState(1)
  const handleChange = (e) => {
    setNumber(parseInt(e.target.value))
  }
  const handleSort = (e) => {
    setNumberone(parseInt(e.target.value))
  } 
  return (
    <Container>
      <Title>Sản Phẩm</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Category:</FilterText>
          <Select onChange={handleChange} name="color">
            <Option disabled>Category</Option>
            <Option value='1' >Áo Polo</Option>
            <Option value='2' >Áo Thun Cổ Tròn</Option>
            <Option value='3' >Áo Khoác Nam</Option>
            <Option value='4' >Quần Nam</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort}>
            <Option value="1">Name (ASC)</Option>
            <Option value="2">Name (DESC)</Option>
            <Option value="3"> Price (ASC)</Option>
            <Option value="4"> Price (DESC)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <ProuductCategories data={number} sort={numberone} />
    </Container>
  )
}
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``; 