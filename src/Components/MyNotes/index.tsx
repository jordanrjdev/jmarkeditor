import { useEffect } from "react";
import { useNotes } from "../../Context/noteContext";
import { Note } from "../../types";
import { Container } from "../Container";
import { List } from "../List";
import { NoteItem } from "../NoteItem";
import { Empty } from "../UI/Empty";

export const MyNotes = () => {
  const { getNotes, notes } = useNotes();

  const onEmpty = () => <Empty />;
  const renderItem = (item: Note) => <NoteItem note={item} />;

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <Container numCols={1}>
      <div className="h-full">
        <h1 className="text-2xl font-black mb-8">My Notes</h1>

        <List data={notes} onEmpty={onEmpty}>
          {renderItem}
        </List>
      </div>
    </Container>
  );
};
