import React, { useState } from "react";
import { Form, Button, Table, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [satisfaction, setSatisfaction] = useState({
    cleanliness: "",
    comfort: "",
    driverBehavior: "",
    overallRide: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    message: "",
    variant: ""
  });

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const senderEmail = user ? user.emailId : "";
  const senderName = user ? user.name : "Anonymous User";

  const handleSatisfactionChange = (e) => {
    const { name, value } = e.target;
    setSatisfaction((prevSatisfaction) => ({
      ...prevSatisfaction,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Check if all radio buttons are selected
    const isAllSatisfactionFilled = Object.values(satisfaction).every(value => value !== "");
    
    if (!isAllSatisfactionFilled) {
      setSubmitStatus({
        show: true,
        message: "Please rate all aspects of your experience",
        variant: "warning"
      });
      return false;
    }

    if (!senderEmail) {
      setSubmitStatus({
        show: true,
        message: "Email is required. Please log in.",
        variant: "warning"
      });
      return false;
    }

    if (!feedback.trim()) {
      setSubmitStatus({
        show: true,
        message: "Please provide your feedback",
        variant: "warning"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Convert ratings to format "X/5"
    const ratingMap = {
      "Very Unsatisfied": "1/5",
      "Unsatisfied": "2/5",
      "Neutral": "3/5",
      "Satisfied": "4/5",
      "Very Satisfied": "5/5"
    };

    const feedbackData = {
      senderName,
      senderEmail,
      feedback,
      satisfaction: {
        cleanliness: ratingMap[satisfaction.cleanliness] || satisfaction.cleanliness,
        comfort: ratingMap[satisfaction.comfort] || satisfaction.comfort,
        driverBehavior: ratingMap[satisfaction.driverBehavior] || satisfaction.driverBehavior,
        overallRide: ratingMap[satisfaction.overallRide] || satisfaction.overallRide,
      },
    };

    try {
      const response = await axios.post("http://localhost:1000/mail/sendfeedback", feedbackData);
      console.log('Feedback sent:', response.data);
      
      // Show success message
      setSubmitStatus({
        show: true,
        message: "Thank you for your feedback!",
        variant: "success"
      });

      // Reset form
      setFeedback("");
      setSatisfaction({
        cleanliness: "",
        comfort: "",
        driverBehavior: "",
        overallRide: "",
      });

    } catch (error) {
      console.error('Error sending feedback:', error);
      setSubmitStatus({
        show: true,
        message: error.response?.data?.message || "Error sending feedback. Please try again.",
        variant: "danger"
      });
    }
  };

  const maxLength = 200;

  return (
    <div className="container mt-4 min-vh-100">
      <h2 className="mb-4">Share Your Experience</h2>

      {submitStatus.show && (
        <Alert 
          variant={submitStatus.variant}
          dismissible
          onClose={() => setSubmitStatus({ ...submitStatus, show: false })}
        >
          {submitStatus.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="userInfo">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={senderEmail}
            disabled
            className="mb-2"
          />
          {!senderEmail && (
            <Form.Text className="text-danger">
              Please log in to submit feedback
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-4" controlId="feedback">
          <Form.Label>Your Feedback:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={feedback}
            maxLength={maxLength}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please share your experience and suggestions..."
            required
          />
          <Form.Text className="text-muted">
            {feedback.length}/{maxLength} characters
          </Form.Text>
        </Form.Group>

        <div className="mb-4">
          <h4 className="mb-3">Rate Your Experience</h4>
          <Table responsive bordered hover>
            <thead className="table-light">
              <tr>
                <th style={{width: "20%"}}>Aspect</th>
                <th>Very Unsatisfied</th>
                <th>Unsatisfied</th>
                <th>Neutral</th>
                <th>Satisfied</th>
                <th>Very Satisfied</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Cleanliness", key: "cleanliness" },
                { label: "Comfort", key: "comfort" },
                { label: "Driver's Behavior", key: "driverBehavior" },
                { label: "Overall Ride", key: "overallRide" }
              ].map((aspect) => (
                <tr key={aspect.key}>
                  <td className="align-middle">{aspect.label}</td>
                  {["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"].map((rating) => (
                    <td key={rating} className="text-center">
                      <Form.Check
                        type="radio"
                        name={aspect.key}
                        value={rating}
                        checked={satisfaction[aspect.key] === rating}
                        onChange={handleSatisfactionChange}
                        required
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Button 
          variant="primary" 
          type="submit" 
          size="lg"
          className="px-4"
          disabled={!senderEmail}
        >
          Submit Feedback
        </Button>
      </Form>
      <div className="mt-2"></div>
    </div>
  );
};

export default FeedbackForm;