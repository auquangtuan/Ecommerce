import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from "@material-ui/icons";
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { ADD_CART } from '../../redux/Constants';
import { DOMAIN } from '../../util/setting/config';
export default function ProuductCategories(props) {
    const params = useParams()
    const notify = () => toast("Thêm Vào Giỏ Hàng Thành Công!");
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    console.log(categories)
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
    params.id = props.data
    const number = parseInt(props.sort)
    if (number === 1) {
        (categories[0]?.Products?.sort((a, b) => a.title.localeCompare(b.title)))
    } else if (number === 2) {
        (categories[0]?.Products?.reverse())
    } else if (number === 3) {
        (categories[0]?.Products?.sort(function (a, b) { return a.discount - b.discount }))
    } else {
        (categories[0]?.Products?.sort(function (a, b) { return b.discount - a.discount }))
    }
    useEffect(() => {
        const getCategiries = async () => {
            const getCategirie = await axios({
                method: 'get',
                url: `${DOMAIN}/cate/${params.id}`,
                data: categories
            }).then((data) => {
                setCategories(data.data)
            }).catch((err) => {
                console.log("err")
            })
        }
        getCategiries()
    }, [props.data, params])
    
    return (
        <Fragment>
            <ContainerWrap>
                    <ToastContainer />
                {categories[0]?.Products?.map((item, index) => {
                    return (
                        <Container key={index}>
                            <Circle />
                            <Image src={item.thumbnail} />
                            <br/>
                            <div>{item.title}</div>
                            <div>{item.discount}</div>
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
  flex-direction: column;
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