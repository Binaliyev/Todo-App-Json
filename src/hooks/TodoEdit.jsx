import axios from "axios"

export const useTodoEdit = () => {
    let todoListIdEdit = localStorage.getItem("todoListIdEdit")
    const  todoEdit = async (info) => {
        try {
            const response = await axios.put(`http://localhost:3000/todos/${todoListIdEdit}`, info)
            if (response.status === 200 || response.status === 201) {
                console.log(response);
                window.localStorage.removeItem("todoListIdEdit")
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }
    return{ todoEdit}
}