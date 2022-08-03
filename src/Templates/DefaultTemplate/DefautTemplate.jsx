import React, { Fragment } from 'react'
import Announcement from '../../components/Announcement/Announcement'
import Navbar from '../../components/Navbar/Navbar'
import Footer from './Footer/Footer'

export default function DefautTemplate({ children }) {
    return (
        <Fragment>
            <Announcement />
            <Navbar />
            <>{children}</>
            <Footer />
        </Fragment>
    )
}
