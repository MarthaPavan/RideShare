import React from 'react';
import { Col, Container } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

// Register the required Chart.js components
Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

export default function DashBoard() {
    // Sample data for the area chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [0, 0, 0, 0, 0, 0, 7],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Journey in RideShare',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Container className="min-vh-100">
            <Col xs={12} className="mb-4">

                <Line data={data} options={options} />
            </Col>
            <Col xs={12}>
                <h2 className='text-center display-5'>Recent activity</h2>
                <p>
                    Rides in the week
                </p>
                <p>
                    Earnings in the week
                </p>
            </Col>
        </Container>
    );
}
