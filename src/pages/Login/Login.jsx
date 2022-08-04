import React, { useState } from 'react'
import styled from 'styled-components';
import { LOGIN } from '../../redux/Constants';
import { mobile } from "../../responsive";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { DOMAIN } from '../../util/setting/config';
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const notify = (content) => toast(content);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault()
    let values = {
      "email": username,
      "password": password
    }
    const loginUser = async () => {
      await axios({
        method: 'post',
        url: `${DOMAIN}/users/login`,
        data: values
      }).then((values) => {
        dispatch({
          type: LOGIN,
          values: values.data
        })
        navigate('/')
      }).catch((err) => {
        return (
          notify("Sai Thông Tin Đăng Nhập")
        )
      })
    }
    loginUser()
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <ToastContainer />
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>
            LOGIN
          </Button>
          <Error>Something went wrong...</Error>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={()=>navigate('/register')}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;