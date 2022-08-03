import React, { Fragment, useEffect, useState } from 'react'
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { DOMAIN } from '../../util/setting/config';
import { ADD_CART, GET_ALL_PRODUCT } from '../../redux/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Prouduct() {
    const notify = () => toast("Thêm Vào Giỏ Hàng Thành Công!");
    const { product } = useSelector(state => state.ProductReducer)
    const dispatch = useDispatch();
    const [limit, setLimit] = useState(12)
    const [current, setCurrent] = useState(1)
    const [offset, setOfset] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const navigate = useNavigate()
    const AddCart = (item) => {
        notify();
        dispatch({
            type: ADD_CART,
            item: { ...item, number: 1, size: 1, sizeName: "S" },
        });
    }
    const redirect = (number) => {
        window.scrollTo(0, 0)
        navigate(`/product/${number}`)
    }
    useEffect(() => {
        const getProduct = async () => {
            const getProduct = await axios({
                method: 'get',
                url: `${DOMAIN}/product?limit=${limit}&offset=${offset}`,
                data: product
            }).then((data) => {
                setTotalPage(Math.ceil(data.data.count / limit));
                dispatch({
                    type: GET_ALL_PRODUCT,
                    product: data.data.rows
                })
            }).catch((err) => {
                console.log("err")
            })
        }
        getProduct()
    }, [limit, offset])
    const handleChange = (event, value) => {
        window.scrollTo(0, 1400)
        setOfset(value - 1)
        setCurrent(value)
    };
    return (
        <Fragment>
            <ContainerWrap>
                    <ToastContainer />
                {product?.map((item, index) => {
                    return (
                        <Container key={index}>
                            <Circle />
                            <Image src={item.thumbnail} />
                            <Info>
                                <Icon>
                                    <ShoppingCartOutlined onClick={() => { AddCart(item) }} />
                                </Icon>
                                <Icon>
                                    <SearchOutlined onClick={() => redirect(item.id)} />
                                </Icon>
                                <Icon>
                                    <FavoriteBorderOutlined />
                                </Icon>
                            </Info>
                        </Container>
                    )
                })}
            </ContainerWrap>
            <PaginationWrap>
                <Pagination count={totalPage} page={current} onChange={handleChange} />
            </PaginationWrap>
        </Fragment>
    )
}
const PaginationWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
`
const ContainerWrap = styled.div`
  padding: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;