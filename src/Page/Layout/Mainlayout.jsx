import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
const Mainlayout = () => {

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Mainlayout
