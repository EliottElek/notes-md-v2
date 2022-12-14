import Select from "react-tailwindcss-select";

const SelectComponent = ({ sources, selected, setSelected }) => {
  const handleChange = (value) => {
    setSelected(value);
  };
  console.log(sources);
  return (
    <div className="my-2">
      <Select
        primaryColor="green"
        value={selected}
        isMultiple
        isClearable
        isSearchable
        onChange={handleChange}
        options={sources}
        loading={!sources}
        placeholder="Tags..."
      />
    </div>
  );
};

export default SelectComponent;
