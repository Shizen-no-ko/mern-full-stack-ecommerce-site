import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { publicReq, userReq } from '../../axiosRequests.js';
import { update } from '../../redux/apiCalls';
import styled from 'styled-components';


import ProductElement from './ProductElement.js';
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
    const likedArray = user ? user.user.likedProducts : undefined;
    
   
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
        const filterResult = products.filter((item) => {
            return Object.entries(filter).every(([key, value]) => {
                return item[key].includes(value);
            }
            )
        }
        )
        setFiltered(filterResult);
        console.log('FILTER GETTING SET');
        var filteredColors = [];
        var filteredSizes = [];
        products.forEach(product => {
            filteredColors.push(...product.color);
            filteredSizes.push(...product.size);

        });
        filteredColors = filteredColors.filter((element, index, array) => array.indexOf(element) === index);
        filteredSizes = filteredSizes.filter((element, index, array) => array.indexOf(element) === index);
        if (!landing) getAvailableColorsSizes({ colors: filteredColors, sizes: filteredSizes });

    }, [products, filter, category])

    useEffect(() => {
        if (sort === 'Most Recent') {
            setFiltered(prev => [...prev].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
        } else {
            setFiltered(prev => [...prev].sort((a, b) => sort === 'Price Ascending' ? a.price - b.price : b.price - a.price));
        }
    }, [sort])


    const getCartClick = (product) => {
        setModalContent(product);
        setShowModal(true);
    };

    const getLikeClick = async (productId) => {
        console.log(productId);
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

    const getModalClick = () => {
        setShowModal(false);
    };



    useEffect(() => {
        console.log("FILTERED CHANGED");
        console.log("Filtered is:")
        console.log(filtered);
        console.log("Products is")
        console.log(products)
    }, [filtered]);

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