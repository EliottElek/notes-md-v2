import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { supabase } from "../lib/supabase";
import Button from "../components/Button";
import StickyNavbar from "../components/StickyNavbar";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
export default function Home() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await supabase
        .from("notes")
        .select("slug, title, markdown, id")
        .order("title");
      setNotes(data);
    };
    fetchData();
  }, [setNotes]);
  return (
    <div>
      <StickyNavbar>
        <div className="pb-4">
          <Link to="/new">
            <Button defaultbtn={true}>
              Add a new note <FiEdit />
            </Button>
          </Link>
        </div>
      </StickyNavbar>

      {!notes ? (
        <div className="flex justify-center mt-10 items-center">
          <Loader />
        </div>
      ) : (
        <main className={"main__grid"}>
          {notes?.map((note) => (
            <Card key={note.id} note={note} />
          ))}
        </main>
      )}
    </div>
  );
}
