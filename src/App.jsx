import { RouterProvider } from "react-router-dom"
import { route } from "./Routes"

export const App = () =>{
  return(
   <RouterProvider router={route}/>
  )
}