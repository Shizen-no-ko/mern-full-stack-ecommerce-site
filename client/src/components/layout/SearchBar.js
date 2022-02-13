import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { userReq } from '../../axiosRequests.js';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';

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


const SearchBar = () => {

    const [ searchState, setSearchState ] = useState("");
    const [ keyWords, setKeyWords] = useState("");



    const handleChange = (e) => {
        setSearchState(e.target.value);
    }

    useEffect(() => {
        const getKeywords = async () => {
            try{
                const res =  await userReq.get('/products/keywords');
                var ids = [];
                var colors = [];
                var sizes = [];
                var titles = [];
                res.data.map((item) => {
                    ids.push(item._id);
                    titles.push(item.title);
                    item.color.map(color => colors.push(color));
                    item.size.map(size => sizes.push(size));
                });
                sizes = [...new Set(sizes)];
                colors =  [...new Set(colors)];
                const tempState = {
                    ids : ids,
                    titles: titles,
                    sizes: sizes,
                    colors:colors,
                    keyWords: ids.concat(titles).concat(colors).concat(sizes)
                };
                console.log('KEYWORDS OBJECT IS');
                console.log(tempState);
                setKeyWords(tempState);
            }
            catch (err) {
                console.log(err);
            }
        };
        getKeywords();
    },[])

    return (
        <Search>
            <Input
                type="text"
                value={searchState}
                onChange={handleChange}
            // placeholder='Search' 
            />
            <SearchIcon><i className="fas fa-search"></i></SearchIcon>
        </Search>
    )
}

export default SearchBar