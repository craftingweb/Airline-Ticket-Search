import { Link } from "react-router-dom"
import "./Footer.css"

export default function Footer() {
    return (
        <div className="footer">
            <div className="top-footer">
                <Link to="/">Home</Link>
                <Link to="/">About</Link>
                <Link to="/">FAQ</Link>
                <Link to="/">Settings</Link>
                <Link to="/">Contact Us</Link>
            </div>
            <div className="bottom-footer">
                <p> @Group 6 Airline</p>
            </div>
        </div>
    )
}