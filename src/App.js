import React, {useContext, useState} from 'react';
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import {useAdmin} from "./usePackage";
import image3 from "./image/20210707.png"
import image2 from "./image/20210706.png"

const authContext = React.createContext({})

function App() {
    const auth = useAdmin()
    return (
        <HashRouter>
            <authContext.Provider value={auth}>
                <Switch>
                    <Route exact path={"/"}>
                        {auth.user ?
                            <Index/>:
                            <Redirect to={{pathname: "/login"}}/>
                        }
                    </Route>
                    <Route path={"/login"}>
                        {auth.user ?
                            <Redirect to={{pathname: "/"}}/>:
                            <Login/>
                        }
                    </Route>
                </Switch>
            </authContext.Provider>
        </HashRouter>
    );
}

function Login() {
    const auth = useContext(authContext)
    const [password, setPassword] = useState()

    function handleSubmit(event) {
        event.preventDefault()
        if(password==="0520"){
            auth.signIn()
        }
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    return (
        <div>
            <header className="App-header">
                Phoebe Portfolio
            </header>
            <article>
                <div>
                    <form action="" onSubmit={event=>(handleSubmit(event))}>
                        <input type="password" onChange={event=>(changePassword(event))} value={password}/>
                        <button>確定</button>
                    </form>
                </div>
            </article>
        </div>
    )
}

function Index() {
    const auth = useContext(authContext)
    function handleSingOut() {
        auth.signOut()
    }
    return(
        <div>
            <header>
                <button onClick={handleSingOut}>登出</button>
            </header>
            <article>
                <div className={"articleContainer"}>
                    <Element name={"家暴受虐兒"} src={image3} time={"2021/07/07"}/>
                    <Element name={"聖誕樹大叔"} src={image2} time={"2021/07/06"}/>
                </div>
            </article>
        </div>
    )
}

function Element(props) {
    return(
        <div className={"imgContainer"}>
            <div className={"image"}>
                <img src={props.src} alt=""/>
            </div>
            <div className={"time"}>
                {props.time}
            </div>
            <div className={"text"}>
                {props.name}
            </div>
        </div>
    )
}

export default App;
