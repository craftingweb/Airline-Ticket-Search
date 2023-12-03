import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Tabs,
  Tab,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FlightSearch.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchTicketMutation } from "../../services/ticketApi";

export default function FlightSearch() {
  const [
    searchTicket,
    { data: allTicket = [], isLoading, isSuccess },
  ] = useSearchTicketMutation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  // useState to keep track of what user input
  const [formData, setFormData] = useState({
    flightType: "Roundtrip",
    flightClass: "Economy",
    leavingPort: "",
    goingPort: "",
    departDate: "",
    returnDate: "",
    travelerNum: 0,
  });

  useEffect(()=>{
    if(formData){
      localStorage.setItem("formData", JSON.stringify(formData))
    }
  },[formData]) 

  // handle input change, maintain the updated change
  const handleInputChange = (event) => {
    if (typeof event === typeof "") {
      setFormData({
        ...formData,
        ["flightType"]: event,
      });
    } else {
      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (isSuccess && allTicket?.length === 0) {
      setErrors("No ticket available");
    } else if (isSuccess && allTicket.length > 0) {
      navigate("/ticket", { state: { tickets: allTicket } });
      setErrors(null);
    }
  }, [isSuccess, allTicket]);

  // handle the submit case, call the api endpoint and redirect to another page
  const handleSumbit = async (event) => {
    event.preventDefault();
    try {
      await searchTicket(formData).unwrap();
    } catch (error) {
      console.log(error);
      setErrors("Failed to generate data");
    }
  };

  return (
    <Container>
      <Tabs
        defaultActiveKey="Roundtrip"
        className="tabClass mb-3"
        style={{ fontFamily: "Oswald" }}
      >
        <Tab
          eventKey="Roundtrip"
          title="Roundtrip"
          name="flightType"
          onClick={() => handleInputChange("Roundtrip")}
        >
          <Form method="get" onSubmit={handleSumbit}>
            <Row className="mb-3">
              <Col>
                <Form.Label>Flight Classes</Form.Label>
                <Form.Select
                  name="flightClass"
                  value={formData.flightClass}
                  onChange={handleInputChange}
                >
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Group controlId="formGridTravelers">
                  <Form.Label>Travelers</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Number of travelers"
                    name="travelerNum"
                    value={formData.travelerNum}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md>
                <Form.Group controlId="formGridFrom">
                  <Form.Label>Leaving from</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City or airport"
                    name="leavingPort"
                    value={formData.leavingPort}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group controlId="formGridTo" name="arrivingPort">
                  <Form.Label>Going to</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City or airport"
                    name="goingPort"
                    value={formData.goingPort}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md>
                <Form.Group controlId="formGridDates">
                  <Form.Label>Depart Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="departDate"
                    value={formData.departDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group controlId="formGridDates">
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button
                variant="danger"
                type="submit"
                style={{ width: isLoading ? "200px" : "150px" }}
              >
                {isLoading ? (
                  "Searchin Tickets..."
                ) : (
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M4 12H20M20 12L16 8M20 12L16 16"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                )}
              </Button>
            </div>
          </Form>
        </Tab>

        <Tab
          eventKey="One-way"
          title="One-way"
          name="flightType"
          onClick={() => handleInputChange("One-way")}
        >
          <Form method="get" onSubmit={handleSumbit}>
            <Row className="mb-3">
              <Col>
                <Form.Select
                  name="flightClass"
                  value={formData.flightClass}
                  onChange={handleInputChange}
                >
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md>
                <Form.Group controlId="formGridFrom">
                  <Form.Label>Leaving from</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="City or airport"
                    name="leavingPort"
                    value={formData.leavingPort}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group controlId="formGridTo">
                  <Form.Label>Going to</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City or airport"
                    name="goingPort"
                    value={formData.goingPort}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md>
                <Form.Group controlId="formGridDates">
                  <Form.Label>Dates</Form.Label>
                  <Form.Control
                    type="date"
                    name="departDate"
                    value={formData.departDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group controlId="formGridTravelers">
                  <Form.Label>Travelers</Form.Label>
                  <Form.Control
                    type="text"
                    name="travelerNum"
                    value={formData.travelerNum}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button
                variant="danger"
                type="submit"
                style={{ width: isLoading ? "200px" : "150px" }}
              >
                {isLoading ? (
                  "Searchin Tickets..."
                ) : (
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 12H20M20 12L16 8M20 12L16 16"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                )}
              </Button>
            </div>
          </Form>
        </Tab>
      </Tabs>
      {errors && (
        <ToastContainer
          position="middle-end"
          className="p-3"
          style={{ zIndex: 1 }} 
        >
          <Toast onClose={() => setErrors(null)}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                onClick={() => setErrors(null)}
                className="rounded me-auto"
                alt=""
              />
            </Toast.Header>
            <Toast.Body>{errors}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
}
