import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BlogDetails } from "./BlogDetails";
import { CreatePage } from "./CreatePage";
import { HomePage } from "./HomePage";
import { Navbar } from "./Navbar";
import { NotFoundPage } from "./NotFoundPage";

export function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/create" component={CreatePage} />
            <Route path="/blogs/:id" component={BlogDetails} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
