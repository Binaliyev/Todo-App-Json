import { Avatar, Button, Checkbox, Input } from "@mui/material"
import { SiteInputs } from "../siteElement/siteInputs"
import { useEffect, useRef, useState } from "react"
import avatarImg from "../assets/imgs/Logo.svg"
import axios from "axios"
import { TodoListInput } from "../siteElement/todoListInput"
import { Link } from "react-router-dom"

export const NextPage = () => {
    let todoRef = useRef()
    let todoListRef = useRef()
    let userName = window.localStorage.getItem("userName")
    // let userLastname = window.localStorage.getItem("userLastname")
    const todoRequest = async (event) => {
        event.preventDefault()
        try {
            let userId = localStorage.getItem("userId")
            const request = await axios.post("http://localhost:3000/todos", {
                todoName: todoRef.current.value,
                userId: userId
            })
            todoRef.current.value = null
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/todos").then(response => {
            if (response.status === 200) {
                setData(response.data)
            }
        })
    }, [])
    const todoDelete = async () => {
        try {
            let todoListId = localStorage.getItem("todoListId")
            let request = await axios.delete(`http://localhost:3000/todos/` + todoListId)
            if (request.status === 200) {
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [readOnlyF, setReadOnly] = useState(false)
    const todoEdit = async () => {
        try {
            let todoListIdEdit = localStorage.getItem("todoListIdEdit")
            let userId = localStorage.getItem("userId")
            let request = await axios.put(`http://localhost:3000/todos/${todoListIdEdit}`, {
                todoName: todoListRef.current.value,
                userId: userId
            })
            console.log(request);
            if (request.status === 200 || request.status === 201) {
                const response = await request.data
                console.log(response);
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }
    // const [check, setCheck] = useState(false)
    // const ChekTrue = () => {
    //     window.localStorage.setItem("check", !check)
    //     setCheck(!check)
    // }
    // let locallChek = window.localStorage.getItem("check")
    return (
        <main>
            <section className="hero">
                <div className="container">
                    <div className="hero-inner">
                        <Link className="avatar-link mx-auto" to={"/settings"}>
                            <Avatar className="todo-avatar"
                                alt={userName ? userName : ""}
                                src={avatarImg}
                                sx={{ width: 60, height: 60 }} />
                            <h4>{userName ? userName : ""}</h4>
                        </Link>
                        <div className="todo-app-box mx-auto shadow">
                            <div className="input-button-box mx-auto">
                                <SiteInputs type={"search"} placeholder="Todo app" ref={todoRef} />
                                <Button onClick={todoRequest} variant="contained" color="primary">Add</Button>
                            </div>
                        </div>
                        <ul className="todo-ul mx-auto">
                            {data.map((item) => {
                                let userId = localStorage.getItem("userId")
                                if (item.userId === userId) {
                                    return (
                                        <li key={item.id} id={item.id} className="todo-list my-3 shadow">
                                            <TodoListInput type={"text"} readOnly={readOnlyF ? "" : "readOnly"} placeholder={item.todoName} ref={todoListRef} />
                                            <div className="buttomn-box">
                                                <Button variant="contained" color="error" onClick={() => {
                                                    localStorage.setItem("todoListId", item.id)
                                                    todoDelete()
                                                }}>Delet</Button>
                                                <Button variant="contained" color="success" onClick={() => {
                                                    setReadOnly(!readOnlyF)
                                                    localStorage.setItem("todoListIdEdit", item.id)
                                                    { todoListRef.current.value ? todoEdit() : null }
                                                }}>Edit</Button>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}