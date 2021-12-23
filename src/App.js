import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { NotesProvider } from "./contexts/NotesProvider";
import NoteForm from "./pages/NoteForm";
import Notes from "./pages/Notes";
import NavMenu from "./components/NavMenu";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
        <NotesProvider>
          <Router>
            <NavMenu />
            <Switch>
              <Route path="/" exact>
                <Redirect to="/notes" />
              </Route>

              <Route path="/notes" exact>
                <Notes />
              </Route>

              <Route path="/notes/add" exact>
                <NoteForm />
              </Route>

              <Route path="/notes/edit/:id" exact>
                <NoteForm />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </Router>
        </NotesProvider>
    </AuthProvider>
  );
}

export default App;