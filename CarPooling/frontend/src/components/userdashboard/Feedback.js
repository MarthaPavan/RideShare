import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"; // Corrected import

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [satisfaction, setSatisfaction] = useState({
    cleanliness: "",
    comfort: "",
    driverBehavior: "",
    overallRide: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user ? user.emailId : "";

  const handleSatisfactionChange = (e) => {
    const { name, value } = e.target;
    setSatisfaction((prevSatisfaction) => ({
      ...prevSatisfaction,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = {
      email,
      feedback,
      satisfaction,
    };

    axios.post("http://localhost:1000/mail/sendfeedback", feedbackData)
      .then(response => {
        console.log('Feedback sent:', response.data);
        // Optionally show a success message or reset the form
        setFeedback("");
        setSatisfaction({
          cleanliness: "",
          comfort: "",
          driverBehavior: "",
          overallRide: "",
        });
      })
      .catch(error => {
        console.error('Error sending feedback:', error);
        // Optionally show an error message to the user
      });
  };

  const maxLength = 200; // Maximum number of characters for the text area

  return (
    <div className="container mt-4 min-vh-100">
      <h2>Feedback Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feedback">
          <Form.Label>Further Suggestions:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={feedback}
            maxLength={maxLength}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            {feedback.length}/{maxLength} characters
          </Form.Text>
        </Form.Group>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Very Unsatisfied</th>
              <th>Unsatisfied</th>
              <th>Neutral</th>
              <th>Satisfied</th>
              <th>Very Satisfied</th>
            </tr>
          </thead>
          <tbody>
            {["Cleanliness", "Comfort", "Driver's Behavior", "Overall Ride"].map((aspect, index) => (
              <tr key={index}>
                <td>{aspect}</td>
                {["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"].map((label, i) => (
                  <td key={i}>
                    <Form.Check
                      type="radio"
                      name={aspect.replace(/\s+/g, '')} // Remove spaces for the name attribute
                      value={label}
                      checked={satisfaction[aspect.replace(/\s+/g, '')] === label}
                      onChange={handleSatisfactionChange}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="primary" type="submit" className="mt-4">Submit</Button>
      </Form>
    </div>
  );
};

export default FeedbackForm;
