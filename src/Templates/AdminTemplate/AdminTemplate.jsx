import React, { Fragment } from 'react'
import styled from 'styled-components'
import HeaderAdmin from '../../pages/Admin/HeaderAdmin/HeaderAdmin'
import SideBar from '../../pages/Admin/SideBar/SideBar'
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
export default function AdminTemplate({ children }) {
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
