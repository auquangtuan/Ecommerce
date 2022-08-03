import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Navbar() {
    const {carts} = useSelector(state=>state.CartReducer)
    const navigate = useNavigate();
    
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>VI</Language>
                    <SearchContainer>
                        <Input />
                        <Search style={{color : 'gray', fontSize: 16}} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo onClick={()=>navigate('/')}>Ecommerce</Logo>
                </Center>
                <Right>
                <MenuItem onClick={()=>navigate('/register')}>REGISTER</MenuItem>
                    <MenuItem onClick={()=>navigate('/login')}>SIGN IN</MenuItem>
                    <MenuItem>
                        <Badge onClick={()=>navigate('/cart')} badgeContent={carts.reduce((total)=>{return total+= 1},0) === 0 ? 0 : carts.reduce((total)=>{return total+= 1},0) } color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    height: 60px;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
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
