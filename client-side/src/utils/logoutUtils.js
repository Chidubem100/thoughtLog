import { useNavigate } from "react-router-dom";
import { useLocalState } from "./alert";
import axios from "axios";
import { useGlobalConext } from "../pages/context";

const logoutURL = 'http://localhost:5000/api/v1/auth/logout';


function LogoutUtils(){
    const {setToken} = useGlobalConext();
    const navigate = useNavigate();
    const {setLoading} = useLocalState()

    const logoutUser = async () => {
           
        setLoading(true)
        try {
            const resp = await fetch(logoutURL,{
                method: "GET",
                mode: "cors"
            });
            const data = await resp.json();

            if (resp.ok) {
                localStorage.removeItem("user")
                localStorage.removeItem("accessToken")
                axios.defaults.headers.common['Authorization'] = ''
                setToken(null);
                console.log(data.msg)
                navigate("/login")
                
            }

          
        } catch (error) {
          console.log(error);
        }
        setLoading(false)
    };
    return {
        logoutUser,
    }
}

export default LogoutUtils;