import { forwardRef } from "react"

export const SiteInputs = forwardRef((promp, ref) => {
    // console.log(ref);
    return(
        <input {...promp} ref={ref} className="site-inputs mx-auto d-block"/>
    )
})