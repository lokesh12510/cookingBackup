import React from 'react'

import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from '../Breadcrumb/breadcrumb';

const Layout = (props) => {
    return (
        <>
            <Header props={ props } />
            <Navbar />
            <Breadcrumbs />
            { props.children }
            <Footer />
        </>
    );
}

export default Layout;