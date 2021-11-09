import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 80px;
`

const Wrapper = styled.div`
align-items: center;
display: flex;
justify-content: space-between;
padding: 10px 20px;
`

const Search = styled.div`
align-items: center;
justify-content: flex-end;
display: flex;
`

const Logo = styled.h1`
color: red;
margin: 0 15px;
`

const Logotext = styled.h1`
margin: 0 15px;
`
const Subtitle = styled.h5`
margin: 0 20px;
`
const LZone = styled.div`
align-items: center;
display: flex;
flex: 1;
`
const CZone = styled.div`
flex: 1;
`
const RZone = styled.div`
flex: 1;
`

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <LZone>
                    <Logo> <i class="fas fa-torii-gate"></i></Logo>
                    <div>
                    <Logotext>
                        Nihon no Mono
                    </Logotext>
                    <Subtitle>A whole world of Japanese Things</Subtitle>
                    </div>
                    
                </LZone>
                <CZone>
                    Center
                </CZone>
                <RZone>
                    <Search>
                        <input></input>
                        <i class="fas fa-search"></i>
                    </Search>
                </RZone>
            </Wrapper>
        </Container>
    )
}

export default Navbar