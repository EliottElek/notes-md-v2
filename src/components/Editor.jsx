import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import { supabase } from "../lib/supabase";
import cuid from "cuid";

const mdParser = new MarkdownIt();

function onImageUpload(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (data) => {
      const { error, data: image } = await supabase.storage
        .from("images")
        .upload("/public" + cuid() + file.name, file);
      if (error) alert("An error occured uploading the image.");
      resolve(
        "https://hqgzddojabxfzifsaavu.supabase.co/storage/v1/object/public/images/" +
          image.path
      );
      //resolve(data.target.result);
    };
    reader.readAsDataURL(file);
  });
}

const Editor = ({ value, onChange, placeholder }) => {
  return (
    <MdEditor
      onImageUpload={onImageUpload}
      className="w-full h-full rounded-md min-h-[180px]"
      renderHTML={(text) => mdParser.render(text)}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Editor;
