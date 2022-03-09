import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { userReq } from '../../axiosRequests.js';
import { mobile, landscapeTablet } from '../../responsive';

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
  width: 28vw;

&:focus{
    border: 1px solid red;
    outline: none;
}

&:hover{
    border: 1px solid black;

}

${landscapeTablet({
    fontSize: '15px',
   
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

    // resets all states upon redirect or blur
    const resetStates = () => {
        setDropListState({
            cursor: -1,
            value: ''
        });
        setDropText([]);
        setSearchState('');
        setSearchTerm('');
    }

    // controlled input state
    const handleChange = (e) => {
        setSearchState(e.target.value);
    }

    // direct click on dropdown suggestion
    const handleClick = (word) => {
        setSearchState(word[0]);
        console.log(word);
        setSearchState('');
        history.push(`/products/search?field=${word[1]}&value=${word[0]}`);
    }

    // Handle key navigation of dropdown
    const handleKeyDown = (e) => {

        // down arrow
        if (e.keyCode === 40) {
            setDropListState(prevState => ({
                cursor: prevState.cursor < dropText.length - 1 ? prevState.cursor + 1 : prevState.cursor,
                value: dropText[prevState.cursor < dropText.length - 1 ? prevState.cursor + 1 : prevState.cursor]
            })
            )
        }

        //up arrow
        if (e.keyCode === 38) {
            setDropListState(prevState => ({
                cursor: prevState.cursor > -1 ? prevState.cursor - 1 : prevState.cursor,
                value: prevState.cursor > 0 ? dropText[prevState.cursor - 1] : searchTerm
            })
            )
        }

        // enter key
        if (e.keyCode === 13) {
            if (dropListState.cursor !== -1) {
                const field = dropText[dropListState.cursor][1];
                const value = dropText[dropListState.cursor][0];
                resetStates();
                history.push(`/products/search?field=${field}&value=${value}`);
            }
        }

        // backspace
        if (e.keyCode === 8) {
            if (dropListState.cursor !== -1) {
                e.preventDefault();
                setSearchState(searchTerm);
                setDropListState({ cursor: -1, value: '' })
            };
        }
    }


    const handleBlur = () => {
        window.onclick = e => {
            // checks if element clicked that is causing the blur 
            // is not an element from the drop down suggestions list,
            // otherwise clicking on suggestion doesn't re-route
            if (!e.target.classList.contains('DropElement')) {
                resetStates();
            }
        };
    }


// When navigating dropdown list with arrow keys, sets 
// search input to current highlighted item in dropdown
    useEffect(() => {
        dropListState.cursor !== -1 && setSearchState(dropText[dropListState.cursor][0]);
        dropListState.cursor === -1 && setSearchState(searchTerm);
    }, [dropListState, dropText, searchTerm])


// Retrieve keyword suggestions for dropdown
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
                    return null
                });
                // Arrays of unique values
                sizes = [...new Set(sizes)].map(size => [size, 'size']);
                colors = [...new Set(colors)].map(color => [color, 'color']);
                // Set second value as 'searchcategory' as 'category' already present in backend
                // for other functionality
                categories = [...new Set(categories)].map(category => [category, 'searchcategory']);
                const tempState = {
                    // ids for later use in admin
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
    }, [searchState])

    // Sets dropdown text suggestions according to searchState in the input field
    useEffect(() => {
        if (keyWords !== '') {
            const words = searchState !== '' ? keyWords.keyWords.filter(word => word[0].includes(searchState) || word[0].includes(searchState.toLowerCase()) || word[0].toLowerCase().includes(searchState)) : [];
            if (words && dropListState.cursor === -1) {
                setDropText(words);
                setSearchTerm(searchState);
            }
        }
    }, [searchState, dropListState.cursor, keyWords])

    return (
        <Container >
            <Search >
                <Input
                    type="text"
                    value={searchState}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                />
                <SearchIcon><i className="fas fa-search"></i></SearchIcon>
                <ul>
                    <DropDown>
                        {dropText && dropText.map((word, index) => {
                            const splitStart = word[0].toLowerCase().indexOf(searchTerm.toLowerCase());
                            const splitEnd = splitStart + searchTerm.length;
                            const highlight = word[0].substring(splitStart, splitEnd);
                            const before = word[0].substring(0, splitStart);
                            const after = word[0].substring(splitEnd);
                            return <DropElement key={index} className='DropElement' style={{ backgroundColor: dropListState.cursor === index ? 'pink' : 'white' }} onClick={() => handleClick(word)}>{before}<strong style={{ color: 'red' }}>{highlight}</strong>{after}</DropElement>
                        }
                        )}
                    </DropDown>
                </ul>
            </Search>
        </Container>
    )
}

export default SearchBar