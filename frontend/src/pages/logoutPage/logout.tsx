import axios from "axios";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Logout() {
    const [user, setUser] = useState ({
            email: "",
            password: ""
    });

    function handleChange(event: any) {
        const { name, value } = event.target;
        setUser(prevValue => {
            return {
            ...prevValue,
            [name]: value
            };
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post('http://localhost:8000/api/v1/logout', user)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="login">
            <Header/>
            <h1>
                Hello {user.email}
            </h1>
            <form onSubmit={handleSubmit}>
                <input 
                    name="email"
                    value={user.email}
                    placeholder="user email"
                    onChange={handleChange}
                />
                <input 
                    name="password"
                    value={user.password}
                    placeholder="user password"
                    onChange={handleChange}
                    type="password"
                />                
                <button type="submit">Submit</button>
            </form>
            <Footer/>
        </div>
    );
}
export default Logout;