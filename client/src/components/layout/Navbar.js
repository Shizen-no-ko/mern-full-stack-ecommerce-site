import React, { useState } from 'react';
import styled from 'styled-components';
import CartIcon from './CartIcon';

const Container = styled.div`
    height: 80px;
`

const Wrapper = styled.div`
align-items: center;
${'' /* border-bottom: 1px solid red; */}
display: flex;
justify-content: space-between;
padding: 10px 20px;
`

const Search = styled.div`
align-items: center;
justify-content: flex-start;
display: flex;
`

const Menu = styled.div`
align-items: center;
justify-content: space-evenly;
display: flex;
`

const MenuItem = styled.div`
cursor: pointer;
font-size: 18px;
position: relative;

&:hover{
   transform: scale(110%);
}

`

const LogoTextContainer = styled.div`
margin: 0 15px;
text-align: center;
`

const Logo = styled.h1`
color: red;
margin: 0 15px;
`
const LogoText = styled.h1`
margin: 0;
`
const Subtitle = styled.h5`
margin: 0;
`
const Input = styled.input`
border: 1px solid lightgray;
  margin: 5px;

&:focus{
    border: 1px solid red;
    outline: none;
}

&:hover{
    border: 1px solid black;
}
`

const LZone = styled.div`
flex: 1;
`
const CZone = styled.div`
align-items: center;
display: flex;
flex: 1;
`
const RZone = styled.div`
flex: 1;
`

const Navbar = () => {

    const [ searchState, setSearchState ] = useState("");

    const handleChange = (e) => {
        setSearchState(e.target.value);
    }

    return (
        <Container>
            <Wrapper>
                <LZone>
                    <Search>
                        <Input
                            type="text"
                            value={searchState}
                            onChange={handleChange} />
                        <i className="fas fa-search"></i>
                    </Search>
                </LZone>
                <CZone>
                    <Logo> <i className="fas fa-torii-gate"></i></Logo>
                    <LogoTextContainer>
                        <LogoText>
                            Nihon no Mono
                        </LogoText>
                        <Subtitle>A whole world of Japanese Things</Subtitle>
                    </LogoTextContainer>
                </CZone>
                <RZone>
                    <Menu>
                    <MenuItem>HOME</MenuItem>
                        <MenuItem>LOG IN</MenuItem>
                        <MenuItem>REGISTER</MenuItem>
                        <MenuItem><CartIcon /></MenuItem>
                    </Menu>
                </RZone>
            </Wrapper>
        </Container>
    )
}

export default Navbar