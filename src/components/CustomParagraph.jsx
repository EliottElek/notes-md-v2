import clsx from "clsx";

const CustomParagraph = ({ children, title, type }) => {
  console.log("Custom paragraph is called");
  const types = [
    {
      type: "default",
      bg: "bg-blue-gray-200",
      border: "border-blue-gray-400",
      text: "text-blue-gray-400",
      icon: null,
    },
    {
      type: "warning",
      bg: "bg-red-100",
      border: "border-red-400",
      text: "text-red-400",
      icon: null, //<ExclamationIcon className="h-5 w-5" />,
    },
    {
      type: "caution",
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      text: "text-yellow-400",
      icon: null, //<ExclamationIcon className="h-5 w-5" />,
    },
    {
      type: "info",
      bg: "bg-sky-100",
      border: "border-sky-400",
      text: "text-sky-400",
      icon: null, //<InformationCircleIcon className="h-5 w-5" />,
    },
    {
      type: "success",
      bg: "bg-green-100",
      border: "border-green-400",
      text: "text-green-400",
      icon: null, //<CheckCircleIcon className="h-5 w-5" />,
    },
  ];
  const foundType = types.find((t) => t.type === type) || types[0];
  return (
    <div
      className={clsx(
        "p-1 prose px-2 border-l-4  rounded-lg my-3",
        foundType.bg,
        foundType.border
      )}
    >
      <span
        className={clsx(
          "py-0 font-bold flex items-center gap-1",
          foundType.text
        )}
      >
        {foundType.icon}
        {title}
      </span>
      {children}
    </div>
  );
};

export default CustomParagraph;
