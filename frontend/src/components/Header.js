//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../images/logo.jpg'

const StyledHeader = styled.div`
    padding: 0.2vw 1vw;
    display: flex;
    align-items: left;
    border-bottom: 0.5vh solid black;
`

const Logo = styled.img`
 	width: 10vw;
    aspectRatio: 603 / 212;
`

function Header() {
  return (
    <StyledHeader>
        <Logo src={logo} />
    </StyledHeader>
  );
}

export default Header;
