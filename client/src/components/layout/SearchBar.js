import { ConnectionStates } from 'mongoose';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { userReq } from '../../axiosRequests.js';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

const Container = styled.div`
display: flex;
flex-direction: column;
`

const Search = styled.div`
align-items: center;
font-size: 20px;
justify-content: flex-start;
line-height: 25px;
display: flex;
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

const DropDown = styled.div`
background-color: white;
display: flex;
flex-direction: column;
justify-content: space-evenly;
left: 24px;
position: absolute;
top: 60px;
width: 15vw;
z-index: 20;
`

const DropElement = styled.div`
background-color: white;
border: 1px solid lightgray;
font-size: 20px;
margin: 1px;
overflow: hidden;
padding: 5px 10px;


&:hover {
    background-color: pink;
}
`



const SearchBar = () => {

    const [searchState, setSearchState] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [dropText, setDropText] = useState([]);



    const handleChange = (e) => {
        setSearchState(e.target.value);
    }
    
    const handleClick = (word) => {
        setSearchState(word[0]);
        console.log(word);
    }

    useEffect(() => {
        const getKeywords = async () => {
            try {
                const res = await userReq.get('/products/keywords');
                var ids = [];
                var colors = [];
                var sizes = [];
                var titles = [];
                var categories = [];
                res.data.map((item) => {
                    ids.push([item._id, 'id']);
                    titles.push([item.title, 'title']);
                    item.color.map(color => colors.push([color, 'color']));
                    item.size.map(size => sizes.push([size, 'size']));
                    item.category.map(category => categories.push([category, 'searchcategory']));
                });
                sizes = [...new Set(sizes)];
                colors = [...new Set(colors)];
                categories = [...new Set(categories)];
                const tempState = {
                    ids: ids,
                    titles: titles,
                    sizes: sizes,
                    colors: colors,
                    categories: categories,
                    keyWords: titles.concat(colors).concat(sizes).concat(categories)
                };
                setKeyWords(tempState);
            }
            catch (err) {
                console.log(err);
            }
        };
        getKeywords();
    }, [])

    useEffect(() => {
        if (keyWords !== '') {
            const words = searchState !== '' ? keyWords.keyWords.filter(word => word[0].includes(searchState) || word[0].includes(searchState.toLowerCase()) || word[0].toLowerCase().includes(searchState) ) : [];
            if (words) {
                setDropText(words);
            }
        }

    }, [searchState])

    return (
        <Container>
            <Search>
                <Input
                    type="text"
                    value={searchState}
                    onChange={handleChange}
                />
                <SearchIcon><i className="fas fa-search"></i></SearchIcon>
                <DropDown>
                    {dropText && dropText.map((word, index) => <DropElement key={index} onClick={() => handleClick(word)}>{word[0]}</DropElement>)}
                </DropDown>
            </Search>
        </Container>

    )
}

export default SearchBar