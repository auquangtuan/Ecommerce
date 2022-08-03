import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components';
import { mobile } from "../../responsive";
import { Add, AddShoppingCart, Remove } from "@material-ui/icons";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DOMAIN } from '../../util/setting/config';
import axios from 'axios';
import { ADD_CART, GET_ONE_PRODUCT } from '../../redux/Constants';
import Prouduct from '../../components/Product/Prouduct';

export default function ShopDetails() {
  const params = useParams()
  const { productDetail } = useSelector(state => state.ProductReducer)
  console.log(productDetail)
  const [num, setNum] = useState(1)
  const [size, setSize] = useState(1)
  console.log(size)
  const handleChange = (e) => {
    setSize(e.target.value)
  }
  const addCart = (item) => {
    console.log("First Item", item)
    let name;
    let id = item.id;
    let title = item.title
    let price = item.price;
    let discount = item.discount;
    let thumbnail = item.thumbnail;
    let sizeInt = parseInt(size)
    if (sizeInt === 1) {
      name = "S"
    } else if (sizeInt === 2) {
      name = "M"
    } else if (sizeInt === 3) {
      name = "L"
    } else if (sizeInt === 4) {
      name = "XL"
    } else if (sizeInt === 5) {
      name = "XXL"
    } else {
      name = 'Sai'
    }
    const items = { id, thumbnail, price, title, discount, number: num, size: size, sizeName: name }
    console.log('items', items)
    dispatch({
      type: ADD_CART,
      item: items
    })
  }
  const handleClick = (boolean) => {
    if (boolean) {
      setNum(num + 1)
    } else {
      setNum(num === 1 ? 1 : num - 1)
    }
  }
  const handleClicker = () => {
    console.log("1")
  }
  const dispatch = useDispatch();
  useEffect(() => {
    const getOneProduct = async () => {
      const getProductDetail = await axios({
        method: 'get',
        url: `${DOMAIN}/product/${params.id}`,
        data: productDetail
      }).then((data) => {
        dispatch({
          type: GET_ONE_PRODUCT,
          productDetail: data.data
        })
      }).catch((err) => {
        console.log("err")
      })
    }
    getOneProduct()
  }, [params.id])
  return (
    <Container>
      <Wrapper>
        {productDetail?.map((item, index) => {
          return (
            <Fragment>
              <ImgContainer>
                <Image src={item.thumbnail} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.description}</Desc>
                <Discount>{item.discount.toLocaleString()}đ</Discount>
                <Price>{item.price.toLocaleString()}đ</Price>
                <FilterContainer>
                  <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize onChange={handleChange}>
                      {item.Sizes?.map((size, index) => {
                        return (
                          <FilterSizeOption value={size.id} key={index}>{size.size} ( Còn : {size.Product_Size?.amount} )</FilterSizeOption>
                        )
                      })}
                    </FilterSize>
                  </Filter>
                </FilterContainer>
                <AddContainer>
                  <AmountContainer>
                    <Remove onClick={() => handleClick(false)} />
                    <Amount>{num}</Amount>
                    <Add onClick={() => handleClick(true)} />
                  </AmountContainer>
                  <Button onClick={() => addCart(item)}>ADD TO CART</Button>
                </AddContainer>
              </InfoContainer>
            </Fragment>
          )
        })}
      </Wrapper>
      <Prouduct onClick={() => handleClicker()} />
    </Container>
  )
}
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 90%;
  max-height: 70vh;
  object-fit: top;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  margin-left: 2rem;
  text-decoration: line-through;
`;
const Discount = styled.span`
  font-weight: 100;
  font-size: 40px;
`

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;


const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;
