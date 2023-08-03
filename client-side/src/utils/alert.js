import { useState} from "react";


const useLocalState = () =>{

    const [alert, setAlert] = useState({type:'',show:false,text:''});

    function showAlert(show=false,msg='',type=''){
        setAlert({show, msg, type})
    }

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    return {
        alert,
        showAlert,
        setAlert,
        loading,
        setLoading,
        success,
        setSuccess
    }

}

export {useLocalState};