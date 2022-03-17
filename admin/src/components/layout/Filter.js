import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { mobile, portraitTablet, landscapeTablet } from '../../responsive';


const Container = styled.div`
height: 200px;
margin: 40px auto;
width: 97vw;
`

const Title = styled.h1`
color: rgba(255, 0, 0, 0.8);
font-size: 3rem;
margin: 20px 30px;

${mobile({
    fontSize: '2.5rem',
    textAlign: 'center'
})};

${portraitTablet({
    textAlign: 'center'
})};
`

const SelectorRow = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 40px;

${mobile({
    flexWrap: 'wrap',
    padding: '10px 10px',
    textAlign: 'center'
})};

${portraitTablet({
    flexWrap: 'wrap',
    padding: '10px 10px',
    textAlign: 'center'
})};

${landscapeTablet({
    flexWrap: 'wrap',
    marginLeft: '40px',
    padding: '10px 10px',
    textAlign: 'center'
})};
`

const SelectorContainer = styled.div`
line-height: 60px;

${mobile({
    flex: '100%',
})};

${portraitTablet({
    flex: '100%',
})};
`

const Label = styled.span`
font-size: 20px;
padding: 10px;

${mobile({
    fontSize: '12px',
    display: 'none'
})};

${portraitTablet({
    display: 'none'
})};
`

const Selector = styled.select`
border: 1px solid lightgray;
border-radius: ${props => props.pos === 'left' ? '20px 0 0 20px' : props.pos === 'right' ? '0 20px 20px 0' : '0'} ;
font-size: 18px;
font-weight: 500;
margin: 0 5px;
outline: none;
padding: 5px 15px;

&:focus {
    outline: none;
}

${mobile({
    fontSize: '12px',
})};

${portraitTablet({
    fontSize: '15px',
})};
`

const Option = styled.option`
font-weight: ${props => props.bold === true ? 'bold' : 'normal'};
`

const Filter = (props) => {

    const { availableColorsSizes, category, searchValue, setParentSortState, setParentFilterState } = props;

    // For resetting selectors
    const colorRef = useRef(null);
    const sizeRef = useRef(null);

    const [filterState, setFilterState] = useState({});

    const { filterCategory, color, size, sort } = filterState;

    let history = useHistory();

    const onChange = (e) => {
        // deletes All Colors/All Sizes from filter when setting to All Colors or All Sizes
        if (e.target.value === 'All Colors' || e.target.value === 'All Sizes') {
            const tempState = { ...filterState };
            delete tempState[e.target.name];
            setFilterState(tempState);
        } else {
            setFilterState({ ...filterState, [e.target.name]: e.target.value });
        }
    }


    const onCategoryChange = (e) => {
        history.push(`/products${e.target.value === 'All Products' ? '' : '/' + e.target.value.toLowerCase()}`);
    }


    // Handle sort filter, setting sortState which is then 
    // passed up to ProductsFilter using setParentSortState
    const onSortChange = (e) => {
        setParentSortState(e.target.value);
    }

    // Reset size and color select to unselected when 
    // changing category and selected size/color is not present
    // Otherwise 'All Colors' or 'All Sizes' are pre-selected and cannot be selected.
    useEffect(() => {
        if (availableColorsSizes) {
            if (color && !availableColorsSizes.colors.includes(color.toLowerCase())) {
                colorRef.current.selectedIndex = 0;
            }
            if (size && !availableColorsSizes.sizes.includes(size.toLowerCase())) {
                sizeRef.current.selectedIndex = 0;
            }
        }
    }, [availableColorsSizes, color, size])
    

    // Send up state of filter up to ProductsFilter for handling
    useEffect(() => {
        const lowerCaseFilterState = {};
        Object.entries(filterState).forEach((entry) => {
            lowerCaseFilterState[entry[0]] = entry[1].toLowerCase();
        });
        setParentFilterState(lowerCaseFilterState);
    }, [filterState, setParentFilterState]);


    return (
        <Container>
            {/* Conditional setting of page title */}
            {category === 'search' ? <Title>Search for: {searchValue[0].toUpperCase() + searchValue.substring(1)}</Title>
                :
                <Title>{category ? category.toUpperCase() : 'ALL PRODUCTS'}</Title>}
            <SelectorRow>
                <SelectorContainer>
                    <Label>Filter Products</Label>
                    <Selector onChange={(e) => { onCategoryChange(e) }} name='category' defaultValue='Category' value={filterCategory} pos='left'>
                        <Option bold={true} disabled >Category</Option>
                        <Option>All Products</Option>
                        <Option>Clothing</Option>
                        <Option>Homeware</Option>
                        <Option>Iro-Iro</Option>
                    </Selector>
                    <Selector onChange={(e) => { onChange(e) }} name='color' defaultValue='Color' value={color} ref={colorRef} pos='center'>
                        <Option bold={true} disabled>Color</Option>
                        {/* Populate Colors Selector */}
                        {availableColorsSizes.colors ? availableColorsSizes.colors.map((color, index) => <Option key={index}>{color.charAt(0).toUpperCase() + color.slice(1)}</Option>) : null};
                    </Selector>
                    <Selector onChange={(e) => { onChange(e) }} name='size' defaultValue='Size' value={size} ref={sizeRef} pos='right' >
                        <Option bold={true} disabled>Size</Option>
                        {/* Populate Sizes Selector */}
                        {availableColorsSizes.sizes ? availableColorsSizes.sizes.map((size, index) => <Option key={index}>{size === 'All Sizes' ? 'All Sizes' : size.toUpperCase()}</Option>) : null};
                    </Selector>
                </SelectorContainer>
                <SelectorContainer>
                    <Selector onChange={(e) => { onSortChange(e) }} name='sortOption' defaultValue={'Sort Results'} value={sort} pos='right' >
                        <Option bold={true} disabled>Sort Results</Option>
                        <Option>Most Recent</Option>
                        <Option>Price Ascending</Option>
                        <Option>Price Descending</Option>
                    </Selector>
                </SelectorContainer>
            </SelectorRow>
        </Container>
    )
}

export default Filter

