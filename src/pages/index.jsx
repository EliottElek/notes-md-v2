import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { supabase } from "../lib/supabase";
import Button from "../components/Button";
import StickyNavbar from "../components/StickyNavbar";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function Home() {
  const [notes, setNotes] = useState(null);
  const [tags, setTags] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await supabase
          .from("notes")
          .select("slug, title, markdown, id, notes_tags(tags!inner(*))")
          .order("title");
        setNotes(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [setNotes]);

  return (
    <div>
      <StickyNavbar>
        {user && (
          <Link to="/new">
            <Button defaultbtn={true}>
              Add a new note <FiEdit />
            </Button>
          </Link>
        )}
      </StickyNavbar>

      {!notes ? (
        <div className="flex justify-center mt-10 items-center">
          <Loader />
        </div>
      ) : (
        <main className={"main__grid"}>
          {notes?.map((note) => (
            <Card
              tagsList={tags}
              setTagsList={setTags}
              key={note.id}
              note={note}
            />
          ))}
        </main>
      )}
    </div>
  );
}
