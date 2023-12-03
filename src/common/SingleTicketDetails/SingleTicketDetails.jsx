import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateRecieptMutation,
  useGetSingleTicketMutation,
} from "../../services/ticketApi";
import SingleTicketBox from "../SingleTicketBox/SingleTicketBox";
import { Button, InputGroup } from "react-bootstrap";
import { generateRandomId } from "../../utils/utils";

function SingleTicketDetails() { 
  const navigate = useNavigate();
  const [
    createReciept,
    { data: createdData, isLoading, isError: creatingError },
  ] = useCreateRecieptMutation();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const ticketData = location.state && location.state.ticket;
  const formData = localStorage.getItem("formData");
  const formDataParsed = JSON.parse(formData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (createdData) {
      navigate("/reciepts", { state: { reciept: createdData } });
      localStorage.removeItem("reciepts")
    }
  }, [createdData]);
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const id= generateRandomId()
  const userAllData={
    ...userData,
    airport: ticketData.from,
    destination: ticketData.to,
    time: ticketData.time,
    id
  }

  const handleCreateReciept = async () => {
    if (userData) {
      await createReciept(userAllData);
    } else {
      setError("Failed to create the receipt");
    }
  };

  return (
    <div className="bg-light " style={{ height: "100vh" }}>
      <div className="h-100 " style={{ maxWidth: "1280px", margin: "auto" }}>
        <button
          onClick={() => navigate(-1)}
          className="d-flex pt-4 pb-2 bg-transparent border-0 justify-content-center align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            className="mr-2"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          Back
        </button>
        <div
          className="w-100 bg-secondary mb-2"
          style={{ height: "1px" }}
        ></div>
        <div className="d-md-flex py-4 gap-5">
          <div className="w-25 h-50 bg-white p-3 shadow-sm border rounded">
            <h4 className="fs-5">Flight Details</h4>
            <div
              className="w-100 bg-secondary mb-2"
              style={{ height: "1px" }}
            ></div>
            <p className="fw-normal" style={{ fontSize: "14px" }}>
              <strong>Type:</strong> {formDataParsed.flightType}
            </p>
            <p className="fw-normal" style={{ fontSize: "14px" }}>
              <strong>Class</strong>: {formDataParsed.flightClass}
            </p>
            <p className="fw-normal" style={{ fontSize: "14px" }}>
              <strong>Travelers</strong>: {formDataParsed.travelerNum}
            </p>
            <p className="fw-normal" style={{ fontSize: "14px" }}>
              <strong>Leaving from</strong>: {formDataParsed.leavingPort}
            </p>
            <p className="fw-normal" style={{ fontSize: "14px" }}>
              <strong>Going from</strong>: {formDataParsed.goingPort}
            </p>
            <p className="fw-normal" style={{ fontSize: "14px" }}>
              <strong>Depart date</strong>: {formDataParsed.departDate}
            </p>
            <p className="fw-normal" style={{ fontSize: "14px" }}>
              <strong>Return date</strong>: {formDataParsed.returnDate}
            </p>
          </div>
          <div className="w-75 h-100 bg-white p-3 shadow-sm border rounded">
            <div className="">
              <SingleTicketBox data={ticketData} />
            </div>
            <div className="mt-4">
              <h4 className="fs-5">Personal Informations</h4>
              <div
                className="w-100 bg-secondary mb-2"
                style={{ height: "1px" }}
              ></div>
              <div className="mt-2 d-flex gap-4">
                <div className="w-100">
                  <label htmlFor="">
                    Full Name<span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="customerName"
                    class="form-control"
                    placeholder="Recipient's name"
                    aria-label="Recipient's name"
                    aria-describedby="button-addon2"
                  />
                </div>
                <div className="w-100">
                  <label htmlFor="">
                    Seats<span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={handleInputChange}
                    name="seats"
                    type="number"
                    class="form-control"
                    placeholder="Seats"
                    aria-label="Recipient's name"
                    aria-describedby="button-addon2"
                    defaultValue={0}
                  />
                </div>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <Button
                onClick={handleCreateReciept}
                className="btn-primary mt-3"
              >
                {isLoading ? "Loading..." : "Buy Ticket"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleTicketDetails;
