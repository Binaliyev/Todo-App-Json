import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { NextPage, RegisterPage, Settings } from "./pages";
import { LoginPage } from "./pages/Login";
let userToken =  localStorage.getItem("userToken")
let loginToken = localStorage.getItem("loginAccessToken")
export const route = createBrowserRouter(
    createRoutesFromElements(
        [
            <Route path="/" element={userToken || loginToken ? <NextPage/> : <RegisterPage/>}/>,
            <Route path="/login" element={<LoginPage/>}/>,
            <Route path="/register" element={<RegisterPage/>}/>,
            <Route path="/settings" element={<Settings/>}/>,
            <Route path="/back" element={<NextPage/>}/>
        ]
    )
)