import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { USER_LOGIN } from '../../util/setting/config';

export default function Navbar() {
    const { carts } = useSelector(state => state.CartReducer)
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
    
    const redirect = () => {
        localStorage.removeItem(USER_LOGIN);
        return navigate('/')
    }
    const renderInfo = () => {
        if (!userLogin) {
            return (
                <Fragment>
                    <MenuItem onClick={() => navigate('/register')}>REGISTER</MenuItem>
                    <MenuItem onClick={() => navigate('/login')}>SIGN IN</MenuItem>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <MenuItem>Xin Chào : {userLogin.fullname}</MenuItem>
                    {userLogin.role === 1 ? <MenuItem onClick={()=>navigate('/admin')}>ADMIN</MenuItem>: <MenuItem onClick={()=>navigate('/donhang')}>Xem Đơn Hàng</MenuItem> }
                    <MenuItem onClick={() => redirect()}>Đăng Xuất</MenuItem>
                </Fragment>
            )
        }
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>VI</Language>
                    <SearchContainer>
                        <Input />
                        <Search style={{ color: 'gray', fontSize: 16 }} />
                    </SearchContainer>
                    <MenuItem onClick={() => navigate('/shop')}>SHOP</MenuItem>
                </Left>
                <Center>
                    <Logo onClick={() => navigate('/')}>Ecommerce</Logo>
                </Center>
                <Right>
                    {renderInfo()}
                    <MenuItem>
                        <Badge onClick={() => navigate('/cart')} badgeContent={carts.reduce((total) => { return total += 1 }, 0) === 0 ? 0 : carts.reduce((total) => { return total += 1 }, 0)} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    max-height: 200px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
    
`
const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;

`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`
