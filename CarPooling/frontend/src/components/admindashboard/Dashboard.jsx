import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const Dashboard = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [300, 50, 100, 40, 120, 90],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className='px-3'>
      <h1 className='text-center display-6'>Dashboard</h1>
      <Container>
        <Row>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Rides Completed</Card.Title>
                <div className="chart-container">
                  <Radar data={data} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Total Rides</Card.Title>
                <div className="chart-container">
                  <Line data={data} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Earnings</Card.Title>
                <div className="chart-container">
                  <Bar data={data} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Users Joined</Card.Title>
                <div className="chart-container">
                  <Pie data={pieData} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
