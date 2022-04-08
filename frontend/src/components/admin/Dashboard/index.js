import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


export const Dashboard = (props) => {
  return (
    <>
      <div className="container">
        <div className="card">
          <Row>
            <Col md={6}><h3>Dashboard</h3></Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}