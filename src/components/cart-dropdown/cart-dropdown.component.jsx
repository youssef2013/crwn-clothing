import React from 'react';
import { connect } from 'react-redux';

import './cart-dropdown.styles.scss';
import CartItem from '../../components/cart-item/cart-item.component';

import CustomButton from '../custom-button/custom-button.component';

const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
            ))}
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToPrpos = ({ cart: { cartItems } }) => ({
    cartItems
});

export default connect(mapStateToPrpos)(CartDropdown);