// import { Button } from "@mui/material"
import { SiteInputs } from "../siteElement/siteInputs"
import todoAppLogo from "../assets/imgs/TODo App.svg"
import { useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export const RegisterPage = () => {
    let nameRef = useRef()
    let lastnameRef = useRef()
    let emailRef = useRef()
    let passwordRef = useRef()
    const registerUsers = async (event) =>{
        event.preventDefault()
        try {
            const request = await axios.post(`http://localhost:3000/users`,{
                name: nameRef.current.value,
                lastname: lastnameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            if (request.status === 201 || request.status === 200) {
                const response = await request.data
                if (response.accessToken && response.user.id) {
                    localStorage.setItem("userToken", response.accessToken)
                    localStorage.setItem("userId", response.user.id)
                    localStorage.setItem("userName", response.user.name)
                    localStorage.setItem("userLastname", response.user.lastname)
                    localStorage.setItem("userPassword", passwordRef.current.value)
                    localStorage.setItem("userEmail", response.user.email)
                    window.location.href = "/"
                }
                console.log(response);
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
                        <img className="todo-app-logo" src={todoAppLogo} alt="todo-app_Logo" />
                        <div className="register-box mx-auto text-center shadow">
                                <h2 className="register-text mx-auto">Sitedan foydalanish uchun <span className="color-text">ro'yxatdan</span> o'ting</h2>
                            <form onSubmit={registerUsers} className="register-form">
                                <SiteInputs type={"text"} placeholder="Name" ref={nameRef}/>
                                <SiteInputs type={"text"} placeholder="Lastname" ref={lastnameRef}/>
                                <SiteInputs type={"email"} placeholder="Email" ref={emailRef}/>
                                <SiteInputs type={"password"} placeholder="Password" ref={passwordRef}/>
                                <button type="submit" className="register-button">Submit</button>
                            </form>
                        </div>
                        <Link className="login-text" to={"/login"}>Sizda acounte <span> mavjudmi</span> ?</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}