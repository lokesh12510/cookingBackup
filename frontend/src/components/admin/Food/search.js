import React, { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';

const initialValues = {
    cook_id: '',
    food_name: '',
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
                    {props.getData && 
                    (
                        <div className="form-group py-3">
                        <select name="cook_id" className="form-control country" value={values.cook_id} onChange={handleChange}>
                            <option value="">select chef</option>
                            {props.getData && props.getData.map((item, index) => (<option value={item.id} > {item.name}</option>))}
                        </select>
                        </div>
                    )}
                  
                </Col>
                <Col md={3}>
                    <div className="form-group py-3">
                        <input
                            id="food_name"
                            name="food_name"
                            type="text"
                            className="form-control"
                            value={ values.food_name }
                            onChange={ handleChange }
                            placeholder="Food Name"
                        />
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