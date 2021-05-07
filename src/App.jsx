import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from "./Home";
import Movies from "./Movies";
import PageNotFound from "./PageNotFound";

export default function App(props) {
    return(
    <Router>
        <Switch>
        <Route exact path = "/">
        <Home/>
        </Route> <Route path = "/Movies">
        <Movies/>
        </Route> <Route path = "/404">
        <PageNotFound/>
        </Route> 
        <Redirect to = "/404" >
        </Redirect> 
        </Switch> 
    </Router>
    )
}