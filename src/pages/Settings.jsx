import { Avatar, Button } from "@mui/material"
import { SiteInputs } from "../siteElement/siteInputs"
import avatarImg from "../assets/imgs/Logo.svg"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import backIcon from "../assets/icons/arrow_back_FILL0_wght400_GRAD0_opsz24.svg"

export const Settings = () => {
    let userName = window.localStorage.getItem("userName")
    let userId = window.localStorage.getItem("userId")
    let userLastname = window.localStorage.getItem("userLastname")
    let userPassword = window.localStorage.getItem("userPassword")
    let userEmail = window.localStorage.getItem("userEmail")
    const [only, setOnly] = useState(false)
    const [data, setData] = useState([])
    let nameRef = useRef()
    let lastnameRef = useRef()
    let emailRef = useRef()
    let passwordRef = useRef()
    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(response => {
                if (response.status === 200) {
                    // console.log(response);
                    setData([response.data])
                }
            })
    }, [])
    const acounteEdid = async () => {
        window.localStorage.removeItem("userPassword")
        try {
            const request = await axios.put(`http://localhost:3000/users/${userId}`, {
                name: nameRef.current.value,
                lastname: lastnameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            if (request.status === 200 || request.status === 201) {
                console.log(request.data);
                window.localStorage.setItem("userName", request.data.name)
                window.localStorage.setItem("userLastname", request.data.lastname)
                window.localStorage.setItem("userPassword", passwordRef.current.value)
                window.localStorage.setItem("userEmail", request.data.email)

                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const userDelete = async () => {
        try {
            const request = await axios.delete(`http://localhost:3000/users/${userId}`)
            if (request.status === 200 ) {
                window.localStorage.removeItem("userId")
                window.localStorage.removeItem("userToken")
                window.localStorage.removeItem("loginAccessToken")
                window.localStorage.removeItem("userName")
                window.localStorage.removeItem("userLastname")
                window.localStorage.removeItem("userPassword")
                window.localStorage.removeItem("userEmail")
                window.localStorage.removeItem("todoListIdEdit")
                window.localStorage.removeItem("todoListId")
                window.location.href = "/"
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main>
            <section className="hero">
                <div className="container">
                    <div className="hero-inner text-center">
                        <div className="back-box">
                            <img src={backIcon} alt="back-icons" />
                            <h3>
                                <Link className="back-link" to={"/back"} >Ortga</Link>
                            </h3>
                        </div>
                        <div className="settings-avatar-box mx-auto">
                            <Avatar className="todo-avatar"
                                alt={userName ? userName : ""}
                                src={avatarImg}
                                sx={{ width: 60, height: 60 }} />
                            <h4>{userName ? userName : ""}</h4>
                        </div>
                        <h2 className="settings-text">Acountni tahrirlash</h2>
                        {data?.map((item) => {
                            return (
                                nameRef.current.value = item.name,
                                lastnameRef.current.value = item.lastname,
                                emailRef.current.value = item.email,
                                passwordRef.current.value = userPassword ? userPassword : ""
                            )
                        })}
                        <div className="settings-input-box mx-auto">
                            <form className="settings-form">
                                <SiteInputs readOnly={only ? "" : "readOnly"} type={"text"} placeholder="Name" ref={nameRef} />
                                <SiteInputs readOnly={only ? "" : "readOnly"} type={"text"} placeholder="Lastname" ref={lastnameRef} />
                                <SiteInputs readOnly={only ? "" : "readOnly"} type={"email"} placeholder="Email" ref={emailRef} />
                                <SiteInputs readOnly={only ? "" : "readOnly"} type={"password"} placeholder="Password" ref={passwordRef} />
                            </form>
                            <Button
                                variant="outlined"
                                color="inherit"
                                sx={{ marginTop: 4 }}
                                type="submit"
                                onClick={() => {
                                    setOnly(!only)
                                    { nameRef.current.value !== userName ? acounteEdid() : null 
                                    || lastnameRef.current.value !== userLastname ? acounteEdid() : null 
                                    || passwordRef.current.value !== userPassword ? acounteEdid() : null
                                    || emailRef.current.value !== userEmail? acounteEdid() : null }
                                }}
                            >Submit</Button>
                        </div>
                        <h2 className="my-5 text-danger">Acountdan chiqish va O'chirish</h2>
                        <div className="settings-button mx-auto">
                            <Button variant="contained" color="error" onClick={() => {
                                window.localStorage.getItem("userToken")
                                window.localStorage.getItem("loginAccessToken")
                                window.localStorage.removeItem("userToken")
                                window.localStorage.removeItem("loginAccessToken")
                                window.location.href = "/"
                            }}>Log Oute</Button>
                            <Button variant="contained" onClick={userDelete} color="error">Delete</Button>
                        </div>
                        <h5>"Acountni o'chirishdan oldin barcha todolaringizni o'chiring !!!"</h5>
                    </div>
                </div>
            </section>
        </main>
    )
}