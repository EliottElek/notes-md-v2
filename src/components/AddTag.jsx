import React, { useState } from "react";
import { getRandColor } from "../lib/randColor";
import { supabase } from "../lib/supabase";
import Button from "./Button";
import TextInput from "./TextInput";
const AddTag = ({ setTagsList, tagsList }) => {
  const [label, setLabel] = useState("");
  const addTag = async () => {
    try {
      const { data } = await supabase
        .from("tags")
        .insert({
          label: label,
          color: getRandColor(),
        })
        .select();
      setTagsList([...tagsList, data[0]]);
      setLabel("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <TextInput
        placeholder="New tag..."
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Button onClick={addTag}>Add</Button>
    </div>
  );
};

export default AddTag;
