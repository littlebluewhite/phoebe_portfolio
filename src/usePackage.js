import {useState} from "react";

function useAdmin(){
    const [user, setUser] = useState(null)
    const signIn = ()=>{
        setUser("user")
    }
    const signOut = ()=>{
        setUser(null)
    }
    return {user, signIn, signOut}
}

export {useAdmin}