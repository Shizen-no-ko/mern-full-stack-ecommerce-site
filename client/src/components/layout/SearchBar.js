import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  width: 90%;

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
width: 28vw;
z-index: 20;
`

const DropElement = styled.li`
background-color: white;
border: 1px solid lightgray;
font-size: 20px;
list-style-type: none;
margin: 1px;
overflow: hidden;
padding: 5px 10px;


&:hover {
    background-color: pink;
}
`


const SearchBar = () => {

    const history = useHistory();

    const [searchState, setSearchState] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [dropText, setDropText] = useState([]);
    const [dropListState, setDropListState] = useState({
        cursor: -1,
        value: ''
    });





    const handleChange = (e) => {
        setSearchState(e.target.value);
    }

    const handleClick = (word) => {
        setSearchState(word[0]);
        console.log(word);
        setSearchState('');
        history.push(`/products/search?field=${word[1]}&value=${word[0]}`);
    }

    const handleKeyDown = (e) => {
        console.log(e.keyCode);
        console.log('DROPTEXT LENGTH IS:');
        console.log(dropText.length);
        if (e.keyCode === 40) {
            setDropListState(prevState => ({
                cursor: prevState.cursor < dropText.length - 1 ? prevState.cursor + 1 : prevState.cursor,
                value: dropText[prevState.cursor < dropText.length - 1 ? prevState.cursor + 1 : prevState.cursor]
            })
            )
            // console.log(dropListState.value);
        }
        if (e.keyCode === 38) {
            setDropListState(prevState => ({
                cursor: prevState.cursor > -1 ? prevState.cursor - 1 : prevState.cursor,
                value: prevState.cursor > 0 ? dropText[prevState.cursor -1] : searchTerm
            })
            )
            // console.log(dropListState.value);
        }

    }

    useEffect(() => {
        console.log('DROPLIST STATE IS');
       console.log(dropListState.value[0]);
       console.log('CURSOR IS');
       console.log(dropListState.cursor);
       console.log('SEARCH TERM IS');
       console.log(searchTerm);
       dropListState.cursor !== -1 && setSearchState(dropText[dropListState.cursor][0]);
       dropListState.cursor === -1 && setSearchState(searchTerm);
    }, [dropListState])


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
                    item.color.map(color => colors.push(color));
                    item.size.map(size => sizes.push(size));
                    item.category.map(category => categories.push(category));
                });
                sizes = [...new Set(sizes)].map(size => [size, 'size']);
                colors = [...new Set(colors)].map(color => [color, 'color']);
                categories = [...new Set(categories)].map(category => [category, 'searchcategory']);
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
            const words = searchState !== '' ? keyWords.keyWords.filter(word => word[0].includes(searchState) || word[0].includes(searchState.toLowerCase()) || word[0].toLowerCase().includes(searchState)) : [];
            if (words && dropListState.cursor === -1) {
                setDropText(words);
                setSearchTerm(searchState);
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
                    onKeyDown={handleKeyDown}
                />
                <SearchIcon><i className="fas fa-search"></i></SearchIcon>
                <ul>
                    <DropDown>
                        {dropText && dropText.map((word, index) =>
                            <DropElement key={index} style={{ backgroundColor: dropListState.cursor === index ? 'pink' : 'white' }} onClick={() => handleClick(word)}>{word[0]}</DropElement>
                        )}
                    </DropDown>
                </ul>

            </Search>
        </Container>

    )
}

export default SearchBar