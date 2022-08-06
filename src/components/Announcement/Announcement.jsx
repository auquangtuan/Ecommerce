import React from 'react'
import styled from 'styled-components'

export default function Announcement() {
  return (
    <Container>ADMIN : admin 123123 User : nothings@gmail.com 123123</Container>
  )
}
const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
` 