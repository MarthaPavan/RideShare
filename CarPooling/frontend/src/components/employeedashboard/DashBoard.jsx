import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card, Spinner } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useAuth } from '../../routes/AuthContext';
// Register Chart.js components
Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

export default function DashBoard() {
    const [chartData, setChartData] = useState(null);
    const [weeklyStats, setWeeklyStats] = useState({ totalRides: 0, totalCapacity: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:1000";

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${base_url}/book/stats`, {
                params: {
                    userId: user?._id,
                    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                    endDate: new Date()
                }
            });
            console.log(response)
            if (response.data.success) {
                setChartData(response.data.data);
                setWeeklyStats(response.data.data.weeklyStats);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
            setError('Failed to load statistics');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [user?._id]);

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Journey in RideShare',
                font: {
                    size: 16
                }
            },
            legend: {
                position: 'bottom'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="min-vh-100">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </Container>
        );
    }

    return (
        <Container className="min-vh-100 py-4">
            <Row>
                <Col xs={12} className="mb-4">
                    {chartData && (
                        <Card>
                            <Card.Body>
                                <Line data={chartData} options={options} />
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
            
            <Row>
                <Col xs={12} className="mb-4">
                    <Card>
                        <Card.Body>
                            <h2 className='text-center h4 mb-4'>Recent Activity</h2>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Card className="bg-light">
                                        <Card.Body>
                                            <h5>Rides this week</h5>
                                            <h3 className="text-primary">{weeklyStats.totalRides}</h3>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Card className="bg-light">
                                        <Card.Body>
                                            <h5>Total Capacity this week</h5>
                                            <h3 className="text-success">{weeklyStats.totalCapacity}</h3>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}