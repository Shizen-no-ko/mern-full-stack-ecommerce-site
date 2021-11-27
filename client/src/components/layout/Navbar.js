import React, { useState } from 'react';
import styled from 'styled-components';
import CartIcon from './CartIcon';
import Messaging from './Messaging';
import {mobile, portraitTablet} from '../../responsive';


const Container = styled.div`
    height: 80px;

    ${mobile({
        height: '120px'
        })};

        ${portraitTablet({
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

        ${portraitTablet({
        flexDirection: "column",
        marginTop: '20px'
        })};

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

        ${portraitTablet({
            
        justifyContent: 'space-between'
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

        ${portraitTablet({
        fontSize: '20px',
        margin: '12px 10px'
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

        ${portraitTablet({
        fontSize: '35px',
        margin: '0 10px'
        })};

`
const LogoText = styled.h1`
margin: 0;

${mobile({
        fontSize: '2rem'
        })};

        ${portraitTablet({
        fontSize: "2.5rem"
        })};

`
const Subtitle = styled.h5`
margin: 0;

${mobile({
        display: 'none'
        })};

        ${portraitTablet({
        display: "none"
        })};

`
const Input = styled.input`
border: 1px solid lightgray;
cursor: pointer;
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

const SearchIcon = styled.div`
margin-left: -30px;

${mobile({
    marginLeft: '-25px'
        })};

`


const LZone = styled.div`
flex: 1;

${mobile({
    display: 'none'
        })};

        ${portraitTablet({
        display: "none"
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

        ${portraitTablet({
       width: '60%'
        })};


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
                            // placeholder='Search' 
                            />
                        <SearchIcon><i className="fas fa-search"></i></SearchIcon>
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