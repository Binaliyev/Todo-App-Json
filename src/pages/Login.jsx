import { useRef } from "react"
import { SiteInputs } from "../siteElement/siteInputs"
import loginLogo from "../assets/imgs/Text.svg"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import axios from "axios"

export const LoginPage = () => {
    let emailRef = useRef()
    let passwordRef = useRef()
    const LoginFuction = async (event) => {
        event.preventDefault()
        try {
            const request = await axios.post(`http://localhost:3000/login`, {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
                const response = await request.data
                if (response?.accessToken) {
                    localStorage.setItem("loginAccessToken", response.accessToken)
                    window.location.href = "/"
                }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <main>
            <section className="hero">
                <div className="container">
                    <div className="hero-inner text-center">
                        <div className="login-box mx-auto">
                        <img src={loginLogo} alt="login-Logo" className="login-logo"/>
                            <form onSubmit={LoginFuction} className="login-form">
                                <SiteInputs type={"email"} placeholder="Email" ref={emailRef}/>
                                <SiteInputs type={"password"} placeholder="Password" ref={passwordRef}/>
                                <Button variant="contained" type="submit" className="login-button my-5">Submit</Button>
                            </form>
                        </div> 
                        <Link className="login-text" to={"/register"}>Sizda acounte <span> mavjud emasmi</span> ?</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}