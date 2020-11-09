import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleListPage from "./pages/ArticleListPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./NavBar";
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <div id="page-body"><Route path="/" component={Homepage} exact/>
                    <Switch>
                        <Route path="/about" component={AboutPage}/>
                        <Route path="/article-list" component={ArticleListPage}/>
                        <Route path="/article/:name" component={ArticlesPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
