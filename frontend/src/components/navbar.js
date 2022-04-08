import React from "react";
import styled from 'styled-components'

const NavbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 60px;
`
const WebsiteName = styled.div`
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    color: #202020;
    margin-left: 10px;
`

const Navbar = () => {
    return (
        <NavbarContainer>
            <img style={{marginLeft: '130px'}} src="borrowLogo.svg"/>
            <WebsiteName>Borroww</WebsiteName>
        </NavbarContainer>
    )
}

export default Navbar