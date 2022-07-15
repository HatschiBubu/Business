import React from 'react';
import { PlusCircleIcon, TrashIcon, MinusCircleIcon } from '../../icons';

const CartItem = (product) => {
    const { title, imageUrl, price, quantiy } = product;

    return (
        <div className=''>
            <div className=''>
                <img src={imageUrl} alt='product' />
            </div>
            <div className='name-price'>
                <h4>{title}</h4>
                <p>€ {price}</p>
            </div>
            <div className='quantity'>
                <p>{`Quantity: €{quantity}`}</p>
            </div>
            <div className='btns-container'>
                <button>
                    <PlusCircleIcon width='20px' />
                </button>
            </div>
        </div>
    );
}