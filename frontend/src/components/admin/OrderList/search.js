import React, { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';

const initialValues = {
    delivery_status: '',
    payment_status: '',
};

export default (props) => {

    const [values, setValues] = useState(initialValues);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    }
    const handleSearch = () => {
        props.setData(values);
    }
    const handleReset = () => {
        setValues((prevState) => ({ ...prevState, ...initialValues }));
        props.setData(initialValues);
    }

    return (
        <>
            <Row className="pt-3">
                <Col md={4}>
                <div className="form-group py-2">
                <select name="delivery_status" className="form-control status" value={values.delivery_status} onChange={handleChange}>
                        <option value="">Delivery Status</option>
                        <option value="1">Order Confirmed</option>
                        <option value="2">Food Packed</option>
                        <option value="3">Delivered</option>
                        <option value="4">Cancelled</option>

                 </select>
                 </div>
                </Col>
               
                <Col md={4}>
                    <div className="form-group py-2">

                        <select name="payment_status" className="form-control status" value={values.payment_status} onChange={handleChange}>
                        <option value="">Payment Status</option>
                        <option value="1">Paid</option>
                        <option value="0">Pending</option>
                        </select>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="form-group py-2">
                        <Button variant="primary" type="button" onClick={ handleSearch }>
                            Search
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="secondary" type="button" onClick={ handleReset }>
                            Reset
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};