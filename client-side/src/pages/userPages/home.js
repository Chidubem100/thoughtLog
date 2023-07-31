import React from "react";
import { useGlobalConext } from "../../context";
import Loading from "../loading";

function HomePage(){
    const {isLoading} = useGlobalConext();

    if(isLoading){
        <Loading/>
    }

    return <section>
        HomePage
    </section>
}

export default HomePage;