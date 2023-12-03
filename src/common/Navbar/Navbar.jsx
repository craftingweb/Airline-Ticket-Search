import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Form, InputGroup, Toast, ToastContainer } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { useGetSingleTicketMutation } from "../../services/ticketApi";
import { IoIosClose } from "react-icons/io";


export default function Navbar() {
  const [getSingleTicket, { data, isLoading, isError }] =
    useGetSingleTicketMutation();
  const [ticketId, setTicketId] = useState(null);
  const [error, setIsError] = useState(null);
  const navigate  = useNavigate()
  useEffect(()=>{
    if(isError){
        setIsError("Could'n find any reciepts. Please try again!")
    }
  },[])
 

  const handleSearch = async () => {
    if (ticketId && ticketId.trim().length >= 5) {
      const res = await getSingleTicket(ticketId);
      if(res?.data){
        setIsError(null)
        navigate("/reciepts", { state: { reciept: res?.data } });
      }else{
        setIsError("You must enter a valid reciepts Id");
      }
    } else {
      setIsError("You must enter a valid reciepts Id");
    }
  };

  return (
    <div style={{ 
        position:"relative"
      }}>
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        style={{ fontFamily: "Oswald" }}
      >
        <Link class="navbar-brand" to="/">
          Airline
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link class="nav-item nav-link active" to="/">
              Home <span class="sr-only">(current)</span>
            </Link>
            <Link class="nav-item nav-link" to="/ticket">
              Ticket
            </Link>
            <Link class="nav-item nav-link" to="/">
              Login
            </Link>
            <Link class="nav-item nav-link" to="/">
              Sign up
            </Link>
          </div>
        </div>
        <InputGroup className="w-50 mr-3">
          <Form.Control
            placeholder="Enter your reciept's ID"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setTicketId(e.target.value)}
          />
          <InputGroup.Text
            id="basic-addon2"
            onClick={handleSearch}
            style={{
              cursor: "pointer",
            }}
          >
            {isLoading ? "Searching..." :<IoIosSearch />}
          </InputGroup.Text>
        </InputGroup>
      </nav>
    
          { error &&  <div className="w-25 bg-danger text-white px-3 rounded shadow" style={{
                position: "fixed",   
                top: "50px",
                right: "30px",
                zIndex: 1000,   
              }}>
                <IoIosClose onClick={()=> setIsError(null)} style={{
                    marginLeft:"90%",
                    fontSize:"28px",
                    py:"4px",
                    cursor:"pointer",
                }}/>
                <p>{error}</p>
              </div> }

      <Outlet />
      <Footer />
    </div>
  );
}
