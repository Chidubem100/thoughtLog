import { useEffect } from "react"

const Alert = ({type,msg,removeAlert}) => {
    useEffect(() =>{
        const timeout = setTimeout(() =>{
            removeAlert()
        },3500)
        return () => clearTimeout(timeout)
    },[removeAlert])
    return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert;