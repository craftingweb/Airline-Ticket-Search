import React from "react";
import "./Home.css"
import { Outlet } from "react-router-dom";

export default function Home(){
    return(
        <>
            <div className="homeHeroImg">
                <div className="mt-5" style={{fontFamily:"Oswald"}}>
                    <h3 style={{width:"30vw"}}>
                    Explore life.
                    <br />
                    Start your journey.
                    </h3>

                    <h6 style={{width:"300px"}} className="mt-3">
                        Grab unbeatable flight deals now and jet off to your dream destinations at incredible prices!
                    </h6>

                    <button style={{fontFamily:"Oswald", width: "15vw", margin: "0"}} 
                        type="button" class="btn btn-danger mt-3 ">
                        Book Now
                    </button>
                    
                </div>

            </div>

            <div className="mt-5 border rounded m-5 py-3">
                <Outlet/>
            </div>

        </>
    )
}