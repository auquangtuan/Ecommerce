import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { mobile } from "../../responsive";
import { DOMAIN } from '../../util/setting/config';

export default function Register() {
  const notify = (content) => toast(content);
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const navigate = useNavigate()
  const register = (e) => {
    e.preventDefault()
    if (password !== rePassword) {
      alert("Mật Khẩu phải xác nhận giống nhau")
    } else if(email.length < 4){
      notify("username phải ít nhất 4 kí tự")
    } else if(phone.length < 10) {
      notify("Số Điện thoại cần 10 số")
    } else if(password.length < 6) {
      notify("Mật Khẩu 6 kí tự")
    } else {
      notify("Đang Đăng Kí, Vui Lòng Chờ giây Lát")
      const values = {
        "fullname": fullname,
        "email": email,
        "address": address,
        "phone": phone,
        "password": password,
      }
      const register = async () => {
        await axios({
          method: 'post',
          url: `${DOMAIN}/users/register`,
          data: values
        }).then((values) => {
          notify("Đăng kí thành công, quay lại trang đăng nhập")
          setTimeout(()=>{
            navigate('/login')
          },2000)
        }).catch((err) => {
          return (
            notify("đăng kí thất bại")
          )
        })
      }
      register()
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <ToastContainer />
        <Form>
          <Input onChange={(e) => setFullname(e.target.value)} placeholder="Họ Và Tên" />
          <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email Hoặc username(ít nhất 4 kí tự)"/>
          <Input onChange={(e) => setAddress(e.target.value)}  placeholder="Địa Chỉ"/>
          <Input onChange={(e) => setPhone(e.target.value)}  placeholder="Số Điện Thoại (10 số)"/>
          <Input onChange={(e) => setPassword(e.target.value)} placeholder="Mật Khẩu (ít nhất 6 kí tự)" />
          <Input onChange={(e) => setRePassword(e.target.value)} placeholder="Nhập lại mật khẩu" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={register}>CREATE</Button>
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
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

