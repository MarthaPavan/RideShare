import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [satisfaction, setSatisfaction] = useState({
    cleanliness: "",
    comfort: "",
    driverBehavior: "",
    overallRide: "",
  });

  const handleSatisfactionChange = (e) => {
    const { name, value } = e.target;
    setSatisfaction((prevSatisfaction) => ({
      ...prevSatisfaction,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission logic here
    console.log(feedback, satisfaction);
    // Reset the form
    setFeedback("");
    setSatisfaction({
      cleanliness: "",
      comfort: "",
      driverBehavior: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Feedback Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feedback">
          <Form.Label>Further Suggestions:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
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
            <tr>
              <td>Cleanliness</td>
              {["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"].map((label, index) => (
                <td key={index}>
                  <Form.Check
                    type="radio"
                    name="cleanliness"
                    value={label}
                    checked={satisfaction.cleanliness === label}
                    onChange={handleSatisfactionChange}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Comfort</td>
              {["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"].map((label, index) => (
                <td key={index}>
                  <Form.Check
                    type="radio"
                    name="comfort"
                    value={label}
                    checked={satisfaction.comfort === label}
                    onChange={handleSatisfactionChange}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Driver's Behavior</td>
              {["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"].map((label, index) => (
                <td key={index}>
                  <Form.Check
                    type="radio"
                    name="driverBehavior"
                    value={label}
                    checked={satisfaction.driverBehavior === label}
                    onChange={handleSatisfactionChange}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Overall Ride</td>
              {["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"].map((label, index) => (
                <td key={index}>
                  <Form.Check
                    type="radio"
                    name="overallRide"
                    value={label}
                    checked={satisfaction.overallRide === label}
                    onChange={handleSatisfactionChange}
                  />
                </td>
              ))}
            </tr>
          </tbody>
          
        </Table>

        <Button variant="primary" type="submit" className="mt-4">Submit</Button>
      </Form>
    </div>
  );
};

export default FeedbackForm;
