import React, { useContext } from 'react';
import { isInCart } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import withRouter from '../withRouter';
import { useNavigate } from 'react-router-dom';
import './featured-product.styles.scss';

const FeaturedProduct = (props) => {
    const navigate = useNavigate();
    const { title, imageUrl, price, id, description } = props;
    const product = { title, imageUrl, price, id, description };
    const { addProduct, cartItems } = useContext(CartContext);
    return (
        <div className='featured-product'>
            <div className='featured-image' onClick={() => navigate(`/product/${id}`)}>
                <img src={imageUrl} alt='product' />
            </div>
            <div className='name-price'>
                <h3>{title}</h3>
                <p>€ {price}</p>
                {
                    !isInCart(product, cartItems) && 
                    <button
                        className='button is-black trendyproducts-btn'
                        onClick={() => addProduct(product)}>
                            ADD TO CART</button>
                }
                {
                    isInCart(product, cartItems) &&
                    <button
                        className='button is-black trendyproducts-btn'
                        id='btn-white-outline'
                        onClick={() => {}}>
                            ADD MORE</button>
                }
                
            </div>
        </div>
    )
}

export default withRouter(FeaturedProduct);