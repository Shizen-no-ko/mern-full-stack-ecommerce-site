import Navbar from '../layout/Navbar';
import ProductDisplay from '../layout/ProductDisplay';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';
import Filter from '../layout/Filter';

const ProductsFilter = () => {
    return(
        <div>
            <Navbar/>
            <Filter/>
            <ProductDisplay/>
            <SubscriptionForm/>
            <Footer/>
        </div>
    )
}

export default ProductsFilter