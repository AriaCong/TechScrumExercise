import axios from "axios";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./registerPage.css"
function Register() {
    const [user, setUser] = useState ({
            name: "",
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

    async function  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Event Handling: event.preventDefault() is crucial for handling form submissions in a single-page application (SPA) context, where you want to avoid full page reloads.
        event.preventDefault();
        await axios.post('http://localhost:8000/api/v1/register', user);
    }

    return (
        <div className="register">
            <Header/>
            <h1>
                Hello {user.name}
            </h1>
            <p>{user.email}</p>
            <form onSubmit={handleSubmit}>
                <input 
                    name="name"
                    value={user.name}
                    placeholder="user name"
                    onChange={handleChange}
                />
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
export default Register;