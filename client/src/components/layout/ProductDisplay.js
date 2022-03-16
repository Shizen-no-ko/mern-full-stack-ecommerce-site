import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { publicReq, userReq } from '../../axiosRequests.js';
import { update } from '../../redux/apiCalls';
import styled from 'styled-components';


import ProductElement from './ProductElement.js';
// Modal for 'quick-add to cart' pop-up
import Modal from './Modal';


const Container = styled.div`
display:flex;
flex-wrap: wrap;
justify-content: space-evenly;
margin: auto;
width: 97vw;
`


const ProductDisplay = ({ category, filter, sort, landing, getAvailableColorsSizes, searchField, searchValue }) => {


    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ size: [], color: [] });

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);


    const userId = user ? user.user._id : null;
    // For triggering API call if product is liked/unliked and thus changes likedProducts
    const likedArray = user ? user.user.likedProducts : undefined;


    // Retrieve all products to display from DB via API, according to category, search-term, 
    //or if products are liked (for likes page)
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                if (category === 'search') {
                    const res = await publicReq.get(`/products/all?${searchField}=${searchValue}`
                    );
                    setProducts(res.data);
                }
                else if (category === 'liked' && user.user.likedProducts) {
                    const res = await publicReq.get(`/products/findfaves/${user.user.likedProducts}`);
                    setProducts(res.data);
                }
                else {
                    const res = await publicReq.get(category !== null && category !== ""
                        ? `/products/all?category=${category}`
                        : '/products/all'
                    );
                    setProducts(res.data);
                }
            }
            catch (err) { console.log(err) }
        };
        getAllProducts();
    }, [category, searchField, searchValue, likedArray])


    useEffect(() => {
        // Filter through retrieved products and set filterResult to 
        // items which match settings in Filter.js
        const filterResult = products.filter((item) => {
            return Object.entries(filter).every(([key, value]) => {
                return item[key].includes(value);
            }
            )
        }
        )
        setFiltered(filterResult);
        var filteredColors = [];
        var filteredSizes = [];
        products.forEach(product => {
            filteredColors.push(...product.color);
            filteredSizes.push(...product.size);
        });
        // Make colors and sizes arrays of unique values
        filteredColors = filteredColors.filter((element, index, array) => array.indexOf(element) === index);
        filteredSizes = filteredSizes.filter((element, index, array) => array.indexOf(element) === index);
        // If not landing page, set colors and values for selectors in Filter.js
        if (!landing) getAvailableColorsSizes({ colors: ['All Colors', ...filteredColors], sizes: ['All Sizes', ...filteredSizes] });
    }, [products, filter, category, landing, getAvailableColorsSizes])


    // Sort products functionality by price/most recent 
    useEffect(() => {
        if (sort === 'Most Recent') {
            setFiltered(prev => [...prev].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
        } else {
            setFiltered(prev => [...prev].sort((a, b) => sort === 'Price Ascending' ? a.price - b.price : b.price - a.price));
        }
    }, [sort])


    // Handle click on shopping cart icon, upon product element
    // Set content for modal, and display modal
    const getCartClick = (product) => {
        setModalContent(product);
        setShowModal(true);
    };

    // Handle click on like icon on product element
    const getLikeClick = async (productId) => {
        if (user) {
            try {
                await userReq.patch(`/users/toggleLike/${userId}/${productId}`);
                update(dispatch, user);
            }
            catch (err) {
                console.log(err);
            };
        }
    };

    // For retrieving click from modal
    const getModalClick = () => {
        setShowModal(false);
    };



    return (
        <Container>
            <Modal showModal={showModal} getModalClick={getModalClick} modalContent={modalContent} />
            {
                !landing ?
                    filtered.length ?
                        filtered.map((product, i) => {
                            const liked = user && user.user.likedProducts ? user.user.likedProducts.includes(product._id) : false;
                            return (
                                <ProductElement key={i} getLikeClick={getLikeClick} getCartClick={getCartClick} element={product} liked={liked} />
                            )
                        })
                        : <h1>SORRY. NO PRODUCTS MATCH YOUR SELECTION</h1>
                    :
                    products.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 8).map((product, i) => {
                        const liked = user && user.user.likedProducts ? user.user.likedProducts.includes(product._id) : false;
                        return (
                            <ProductElement key={i} getLikeClick={getLikeClick} getCartClick={getCartClick} element={product} liked={liked} />
                        )
                    })
            }
        </Container>
    )
}

export default ProductDisplay