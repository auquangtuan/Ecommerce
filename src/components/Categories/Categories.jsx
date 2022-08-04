import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from "../../responsive";
import { DOMAIN } from '../../util/setting/config';
import axios from 'axios'
export default function Categories() {
  const [categories,setCategories] = useState([])
  console.log(categories)
  useEffect(() => {
    axios({
        method: 'get',
        url: `${DOMAIN}/cate`,
        data: categories
    }).then((data) => {
        setCategories(data.data)
    }).catch((err) => {
        console.log("err")
    })
}, [])
  return (
    <ContainerWrap>
      {categories.map((item) => (
        <Container>
          <Link to={`/categories/${item.id}/${item.name}`}>
            <Image src='https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
            <Info>
              <Title>{item.name}</Title>
              <Button>SHOP NOW</Button>
            </Info>
          </Link>
        </Container>
      ))}
    </ContainerWrap>
  )
}

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
  
  `;
const Container = styled.div`
  flex: 1;
  width: 300px;
  margin: 3px;
  height: 400px;
  position: relative;
  ${mobile({ width: "100%", marginLeft : "0"})}
  `;

const Image = styled.img`
  width: 500px;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" , width : "100%"})}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;