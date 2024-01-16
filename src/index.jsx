import react from "react"
import reactDOM from "react-dom/client"
import { App } from "./App"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
const root = reactDOM.createRoot(document.querySelector("#root"))
root.render(
  <App/>
)
