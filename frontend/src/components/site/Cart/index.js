import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../../utils/store/actions';
import Items from './Items';
import Preview from './Preview';

const Cart = (props) => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    
    useEffect(() => {
        console.log(cartState);
    }, [cartState]);
    useEffect(() => {
        const { cartItemsCount, cartTotalAmount } = cartState.cartItems.reduce(
            ({ cartItemsCount, cartTotalAmount }, { u_subtotal }) => ({
                cartItemsCount: cartItemsCount + 1,
                cartTotalAmount: cartTotalAmount + u_subtotal,
            }), {
                cartItemsCount: 0,
                cartTotalAmount: 0,
            },
        );
        dispatch(actions.cartUpdate({
            cartItemsCount: cartItemsCount,
            cartTotalAmount: cartTotalAmount,
        }));
    }, [cartState.cartItems]);
    
    const handleClose = () => {
        dispatch(actions.cartPopup(false));
    }
    
    return (
        <>
            <Modal
                show={cartState.popup}
                onHide={handleClose}
                centered={true}
                size="xl"
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        {/* Cart */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    {/* cart items */}
                    <Row>
                        <Col md={12}>
                            <Items />
                        </Col>
                    </Row>
                    
                    {/* preview items */}
                    <Row>
                        <Col md={12}>
                            <Preview />
                        </Col>
                    </Row>
                    
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default Cart;