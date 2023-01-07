export const exportToMd = (note) => {
  const fileData = note.markdown;
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = note.title + ".md";
  link.href = url;
  link.click();
};
