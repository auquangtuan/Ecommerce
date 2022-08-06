import { TextField } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DELETE_ITEM, DONE, TANG_GIAM_ITEM } from "../../redux/Constants";
import { mobile } from "../../responsive";
import { DOMAIN, USER_LOGIN } from "../../util/setting/config";
import axios from 'axios';
export default function Cart() {
  const navigate = useNavigate()
  const { carts } = useSelector(state => state.CartReducer)
  const user = JSON.parse(localStorage.getItem(USER_LOGIN))
  let userID = null;
  if (user !== null) {
    userID = user.id
  }
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [note, setNote] = useState("")
  const handleOpen = () => {
    setOpen(!open)
  }
  const renderArr = () => {
    const arrProduct = []
    for (let i = 0; i < carts.length; i++) {
      arrProduct.push(
        {
          "number": carts[i].number,
          "price": carts[i].price,
          "discount": carts[i].discount,
          "size_ID": carts[i].size,
          "product_ID": carts[i].id,
        }
      )
    }
    return arrProduct
  }
  const deleteItem = (num) => {
    dispatch({
      type: DELETE_ITEM,
      num
    })
  }
  const orderProduct = () => {
    if (fullname.length < 2 || phone.length < 10) {
      alert("Tên Phải Trên 2 Kí Tự, Và SĐT Phải 10 Trở Lên")
    } else {
      const values = {
        "user_ID": userID,
        "fullname": fullname,
        "email": email,
        "phone": phone,
        "address": address,
        "note": note,
        "arr":
          renderArr()
      }
      const postOrder = async () => {
        await axios({
          method: 'post',
          url: `${DOMAIN}/orderDetails/postOrder`,
          data: values
        }).then((data) => {
          console.log(data)
          alert("Đặt Hàng Thành Công")
          setOpen(false)
          navigate('/')
          dispatch({
            type: DONE,
            data
          })
      }).catch ((err) => {
        console.log("err", err)
      })
    }
    postOrder()
  }
}
const handleNumber = (id, index, boolean) => {
  dispatch({
    type: TANG_GIAM_ITEM,
    id,
    index,
    boolean
  })
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
return (
  <Container>
    <Wrapper>
      <Title>YOUR BAG</Title>
      <Top>
        <TopButton onClick={() => navigate('/')}>CONTINUE SHOPPING</TopButton>
        <TopTexts>
          <TopText>Shopping Bag ( {carts.length} ) </TopText>
          <TopText>Your Wishlist (0)</TopText>
        </TopTexts>
      </Top>
      <Bottom>
        <Info>
          {carts.map((item, index) => {
            return (
              <Fragment key={index}>

                <Product>

                  <ProductDetail>
                    <Image src={item.thumbnail} />
                    <Details>
                      <ProductName>
                        <b>Sản Phẩm:</b> {item.title}
                      </ProductName>
                      <ProductId>
                        <b>Mã Số:</b> 198734{item.id}
                      </ProductId>
                      <ProductSize>
                        <b>Size:</b> {item.sizeName}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove onClick={() => handleNumber(item.id, index, false)} />
                      <ProductAmount>{item.number}</ProductAmount>
                      <Add onClick={() => handleNumber(item.id, index, true)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      {(item.number * item.price).toLocaleString()}đ
                    </ProductPrice>
                  </PriceDetail>
                  <CloseIcon onClick={() => { deleteItem(item.id) }} style={{ cursor: 'pointer' }} />

                </Product>
                <Hr />
              </Fragment>
            )
          })}
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>{carts.reduce((total, item) => { return total += (item.price * item.number) }, 0).toLocaleString()}đ</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping</SummaryItemText>
            <SummaryItemPrice>10.000đ</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Mã Giảm Giá</SummaryItemText>
            <SummaryItemPrice>0</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>{carts.reduce((total, item) => { return total += (item.price * item.number) }, 10000).toLocaleString()}</SummaryItemPrice>
          </SummaryItem>

          <Buttons onClick={carts.length === 0 ? "" : (handleOpen)} >CHECKOUT NOW</Buttons>
        </Summary>
      </Bottom>
    </Wrapper>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h9" component="h4">
          Nhập Thông Tin
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, ml: 8 }}>
          <TextField onChange={(e) => setFullName(e.target.value)} id="outlined-search" label="Họ và Tên" type="search" helperText={fullname.length < 2 ? "Tối Thiểu 2 ký tự" : ""} />

          <TextField onChange={(e) => setEmail(e.target.value)} style={{ marginLeft: 24 }} id="outlined-search" label="Email" type="search" helperText={email.length === 0 ? "Có Thể Để Trống" : ""} />
          <TextField onChange={(e) => setPhone(e.target.value)} id="outlined-search" label="Số Điện Thoại" type="search" helperText={phone.length < 10 ? "Yêu Cầu 10 Số" : ""} />
          <TextField onChange={(e) => setAddress(e.target.value)} style={{ marginLeft: 24 }} id="outlined-search" label="Địa Chỉ" type="search" helperText={address.length < 1 ? "Yêu cầu điền đúng địa chỉ" : ""} />
          <TextField onChange={(e) => setNote(e.target.value)} fullWidth label="Ghi Chú" id="fullWidth" helperText={note.length < 1 ? "Ghi chú thêm cho Shop tại đây" : ""} />
          <br />
          <Button onClick={() => { orderProduct() }} type='submit' style={{ float: 'right', marginTop: 20 }} variant="contained">
            Đặt Hàng
          </Button>
        </Typography>
      </Box>
    </Modal>
  </Container>
)
}
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  /* flex-direction: row-reverse; */
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Buttons = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
