import { Fragment, useEffect } from "react";
import { Route, useLocation } from "wouter";
import { Navbar } from "./Components/Navbar";
import { Editor } from "./Components/Editor";
import { LandingPage } from "./Components/LandingPage";
import { NewNote } from "./Components/NewNote";
import { MyNotes } from "./Components/MyNotes";
import { useNotes } from "./Context/noteContext";
import { defaultNote } from "./types";
function App() {
  const [location, setLocation] = useLocation();
  const { setCurrentNote } = useNotes();

  useEffect(() => {
    if (location !== "/editor") {
      setCurrentNote({
        ...defaultNote,
      });
    }
  }, [location]);

  return (
    <Fragment>
      <Navbar />
      <Route path="/">
        <LandingPage />
      </Route>
      <Route path="/new">
        <NewNote />
      </Route>
      <Route path="/editor">
        <Editor />
      </Route>
      <Route path="/my-notes">
        <MyNotes />
      </Route>
    </Fragment>
  );
}

export default App;
