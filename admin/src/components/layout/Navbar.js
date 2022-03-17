import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { persistor } from '../../redux/store';
import styled from 'styled-components';

import SearchBar from './SearchBar';

import { mobile, portraitTablet, landscapeTablet } from '../../responsive';


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
display: flex;
justify-content: space-between;
padding: 10px 20px;

${mobile({
    flexDirection: 'column',
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
`

const StyledLink = styled(Link)`
color: black;
text-decoration: none;

&:active{
    color: red;
}
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

${landscapeTablet({
    fontSize: '15px',
    margin: '10px'
})};
`


const LogoTextContainer = styled.div`
margin: 0 15px;
text-align: center;

${landscapeTablet({
    margin: '0 auto 0 15px'
})};
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

${landscapeTablet({
    fontSize: '35px',
    margin: '0 10px 0 auto'
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

${landscapeTablet({
    fontSize: "2rem"
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

${landscapeTablet({
    fontSize: '15px',
    width: '150px'
})};
`

const SearchIcon = styled.div`
margin-left: -30px;

${mobile({
    marginLeft: '-25px'
})};

${landscapeTablet({
    fontSize: '15px',
})};
`

const LZone = styled.div`
flex: 0.5;

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

${landscapeTablet({
    flex: '2',
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

${landscapeTablet({
    flex: '1.25'
})};
`

const Navbar = () => {

    const user = useSelector(state => state.user.currentUser);

    const handleLogout = async () => {
        await persistor.purge();
        window.location.href = '/';
    }

    return (
        <div>
            <Container>
                <Wrapper>
                    <LZone>
                        <SearchBar />
                    </LZone>
                    <StyledLink to='/'>
                        <CZone>
                            <Logo> <i className="fas fa-torii-gate"></i></Logo>
                            <LogoTextContainer>
                                <LogoText>
                                    Nihon no Mono
                                </LogoText>
                                <Subtitle>Admin</Subtitle>
                            </LogoTextContainer>
                        </CZone>
                    </StyledLink>
                    <RZone>
                        <Menu>
                            {!user && <MenuItem><StyledLink to='/login'>LOG IN</StyledLink></MenuItem>}
                            {user && <MenuItem><StyledLink to='/add'>ADD</StyledLink></MenuItem>}
                            {user && <MenuItem><StyledLink to='/'>PRODUCTS</StyledLink></MenuItem>}
                            {user && <MenuItem><StyledLink to='/statistics'>STATS</StyledLink></MenuItem>}
                            {user && <MenuItem><StyledLink to='/deleted'>DELETED</StyledLink></MenuItem>}
                            {user && <MenuItem ><StyledLink onClick={handleLogout} to='/'>LOGOUT</StyledLink></MenuItem>}
                        </Menu>
                    </RZone>
                </Wrapper>
            </Container>
        </div>
    )
}

export default Navbar