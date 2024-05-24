import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row className="text-center my-5 ">
        <Col>
          <h1>Go anywhere within Telangana</h1>
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col>
          <p>Request a ride, hop in, and go.</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
           
          <Form className='mt-5 pt-5'>
            <Form.Group controlId="pickupLocation">
              <Form.Label>Pickup Location</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="Enter location" aria-label="pickup location input" />
                <Button variant="outline-secondary">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <path d="M10.5 13.5.5 11 21 3l-8 20.5-2.5-10Z" fill="currentColor"></path>
                  </svg>
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="destinationLocation" className="mt-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control type="text" placeholder="Enter destination" aria-label="destination location input" />
            </Form.Group>
            <div className="text-center mt-4">
              <Button variant="primary" href="/About">See prices</Button>
            </div>
          </Form>
        </Col>
        <Col md={6} className="text-center pb-4">
          <Image src='/images/car_with_people.jpg' fluid />
        </Col>
      </Row>
      <hr className='custom-hr' />
      <Row className="text-center my-5">
        <Col>
            <h3>Why choose us?</h3>
        </Col>
        <Row className='mb-5 pb-3'>
            <Col>
                <Image src='/images/person_leaving_car.jpg' fluid/>
            </Col>
            <Col>
                <p className='mt-5 pt-5'>
                    We are one of the biggest carpool network in hyderabad and in Telangana.
                </p>
            </Col>

        </Row>
        <hr className='custom-hr'/>
        <Row>
            <Col className='m-5 p-5'>
                <h1 >
                    RideShare is one platform where you can earn and have a chance to make connections with various people.
                </h1>
            </Col>
            <Col>
                <Image src='/images/rent.jpg' fluid/>
            </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Home;
