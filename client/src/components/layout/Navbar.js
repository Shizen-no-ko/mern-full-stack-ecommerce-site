import React, { useState } from 'react';
import styled from 'styled-components';
import CartIcon from './CartIcon';
import Messaging from './Messaging';
import {mobile} from '../../responsive';


const Container = styled.div`
    height: 80px;

    ${mobile({
        height: '120px'
        })};
`

const Wrapper = styled.div`
align-items: center;
${'' /* border-bottom: 1px solid red; */}
display: flex;
justify-content: space-between;
padding: 10px 20px;

${mobile({
    flexDirection:'column',
        })}

`

const Search = styled.div`
align-items: center;
font-size: 20px;
justify-content: flex-start;
line-height: 25px;
display: flex;

${mobile({
        fontSize: '12px'
        })};

`


const Menu = styled.div`
align-items: center;
justify-content: space-evenly;
display: flex;

${mobile({
        justifyContent: 'space-between',
        
        })};

${'' /* ${mobile({
        justifyContent: 'space-between'
        })}; */}

`

const MenuItem = styled.div`
cursor: pointer;
font-size: 18px;
position: relative;

&:hover{
   transform: scale(110%);
}

${mobile({
        fontSize: '12px',
        margin: '7px 5px'
        })};

`

const LogoTextContainer = styled.div`
margin: 0 15px;
text-align: center;
`

const Logo = styled.h1`
color: red;
margin: 0 15px;

${mobile({
        fontSize: '20px',
        margin: '0 5px'
        })};

`
const LogoText = styled.h1`
margin: 0;

${mobile({
        fontSize: '2rem'
        })};

`
const Subtitle = styled.h5`
margin: 0;

${mobile({
        display: 'none'
        })};

`
const Input = styled.input`
border: 1px solid lightgray;
font-size: 20px;
padding: 5px;
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

${mobile({
        display: 'none'
        })};


`
const CZone = styled.div`
align-items: center;
display: flex;
flex: 1;

${mobile({
        flexDirection: 'column'
        })};

`
const RZone = styled.div`
flex: 1;

${mobile({
       width: '60%'
        })};

${'' /* ${mobile({
        flex: '2'
        })}; */}


`

const Navbar = () => {

    const [ searchState, setSearchState ] = useState("");

    const handleChange = (e) => {
        setSearchState(e.target.value);
    }

    return (
        <div>

        
        <Container>
            <Wrapper>
                <LZone>
                    <Search>
                        <Input
                            type="text"
                            value={searchState}
                            onChange={handleChange}
                            placeholder='Search' />
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
                        <MenuItem>LOG IN</MenuItem>
                        <MenuItem>REGISTER</MenuItem>
                        <MenuItem><CartIcon /></MenuItem>
                    </Menu>
                </RZone>
            </Wrapper>
        </Container>
<Messaging/>
        </div>
    )
}

export default Navbar