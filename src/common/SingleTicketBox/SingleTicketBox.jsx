import { Container, Row, Col } from 'react-bootstrap';
import React from "react";
import "./SingleTicketBox.css"
import { useNavigate } from 'react-router-dom';

export default function SingleTicketBox({data}){ 
    const navigate = useNavigate()
    return(
        <>
            <div onClick={()=> navigate(`/ticket/${data?.id}`, { state: { ticket: data } })} className=" border rounded p-3 cursor-pointer" style={{ cursor: 'pointer' }}>
                <Row>
                    <Col className="ticketEmphasize font-weight-bold">
                        {data?.time}
                    </Col>
                    <Col className='ticketDetail'>
                        8h 32m (1 stop)
                    </Col>
                    <Col className="ticketEmphasize d-flex justify-content-end font-weight-bold">
                        ${data?.price}
                    </Col>
                </Row>

                <Row>
                    <Col className='ticketDetail'>
                        {data?.from} - {data?.to}
                    </Col>
                    <Col className='ticketDetail'>
                        53m in Dallas(DFW)
                    </Col>
                    <Col className="ticketDetail d-flex justify-content-end">
                        Roundtrip per traveler
                    </Col>
                </Row>
                
                <Row>
                    <Col className='ticketDetail'>
                        {data?.airline}
                    </Col>
                </Row>
            </div>
        </>
    )
}