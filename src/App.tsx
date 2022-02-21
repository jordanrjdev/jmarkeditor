import { Fragment, useEffect, useState } from "react";
import { Route, useLocation, Switch } from "wouter";
import { Navbar } from "./Components/Navbar";
import { Editor } from "./Components/Editor";
import { LandingPage } from "./Components/LandingPage";
import { NewNote } from "./Components/NewNote";
import { Note } from "./types";
import { Container } from "./Components/Container";
import { List } from "./Components/List";
import { useNotes } from "./Hooks/useNotes";
import { Empty } from "./Components/UI/Empty";
import { NoteItem } from "./Components/NoteItem";
import { Page404 } from "./Components/UI/Page404";
function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [location] = useLocation();
  const { getNotesLocalStorage } = useNotes();

  const onEmpty = () => <Empty />;

  const renderItem = (item: Note) => (
    <NoteItem key={item.id} note={item} syncNotes={syncNotes} />
  );

  const syncNotes = () => {
    if (location === "/mynotes") {
      let notesLS = getNotesLocalStorage();
      setNotes([...notesLS]);
    }
  };
  useEffect(() => {
    syncNotes();
  }, [location]);

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
        <Route path="/new">
          <NewNote />
        </Route>
        <Route path="/editor/:id">
          <Editor />
        </Route>
        <Route path="/mynotes">
          <Container numCols={1}>
            <List data={notes} onEmpty={onEmpty}>
              {renderItem}
            </List>
          </Container>
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
