import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import HeaderAdmin from '../../pages/Admin/HeaderAdmin/HeaderAdmin'
import SideBar from '../../pages/Admin/SideBar/SideBar'

export default function AdminTemplate({ children }) {
    const navigate = useNavigate()
    const { userLogin } = useSelector(state => state.userReducer)

    useEffect(() => {
        if (userLogin !== null) {
            if (userLogin.role !== 1) {
                navigate('/')
            }
        } else {
            navigate('/')
        }
    }, [])
    return (
        <Fragment>
            <HeaderAdmin />
            <Container>
                <ContentLeft>
                    <SideBar />
                </ContentLeft>
                <ContentRight>
                    {children}
                </ContentRight>
            </Container>
        </Fragment>
    )
}
const Container = styled.div`
    display: flex;
`
const ContentLeft = styled.div`
    flex: 2
`
const ContentRight = styled.div`
    flex: 10;
    padding: 0 2rem;
`