import { forwardRef } from "react"

export const TodoListInput = forwardRef((promp, ref) => {
    return(
        <input {...promp} ref={ref} className="todo-inputs" />
    )
})