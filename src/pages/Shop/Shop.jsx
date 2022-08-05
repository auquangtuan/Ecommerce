import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Prouduct from '../../components/Product/Prouduct';
import { CHANGE_LIMIT, SORT } from '../../redux/Constants';
import { mobile } from "../../responsive";
export default function Shop() {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch({
      type: CHANGE_LIMIT,
      number: e.target.value
    })
  }
  const handleChangeSort = (e) => {
    dispatch({
      type: SORT,
      value: e.target.value
    })
  }
  return (
    <Container>
      <Title>Tất Cả Sản Phẩm</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Số Lượng:</FilterText>
          <Select onChange={handleChange} name="color">
            <Option value='12' >12</Option>
            <Option value='6' >6</Option>
            <Option value='24' >24</Option>
            <Option value='36' >36</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleChangeSort}>
            <Option value="1">Name (ASC)</Option>
            <Option value="2">Name (DESC)</Option>
            <Option value="3"> Price (ASC)</Option>
            <Option value="4">Price (DESC)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Prouduct />
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