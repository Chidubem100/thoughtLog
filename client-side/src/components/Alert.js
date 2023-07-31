import { useEffect } from "react"

const Alert = ({type,msg,removeAlert}) => {
    useEffect(() =>{
        const timeout = setTimeout(() =>{
            removeAlert()
        },2500)
        return () => clearTimeout(timeout)
    },[])
    return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert;