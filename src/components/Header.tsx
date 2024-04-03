import SortButton from "./SortButton";
import notingIcon from "../assets/noty.png";

type HeaderProps = {
  handleSortBy: (sortByValue: string) => void;
  sortBy: string;
  handleToggleCompleted: () => void;
  showCompleted: boolean;
};

const sortButtonActions = [
  {
    type: "SORT_BY_NAME",
    label: "Sort by Name",
  },
  {
    type: "SORT_BY_CREATED_AT",
    label: "Sort by Created At",
  },
  {
    type: "SORT_BY_DEADLINE",
    label: "Sort by Deadline",
  },
  {
    type: "SORT_BY_PRIORITY",
    label: "Sort by Priority",
  },
];

export default function Header({
  handleSortBy,
  sortBy,
  handleToggleCompleted,
  showCompleted,
}: HeaderProps) {
  return (
    <header className="bg-transparent py-4 ">
      <h1 className="text-white text-center text-3xl font-semibold">
        <img
          src={notingIcon}
          height={40}
          width={40}
          alt="noting"
          className="inline-block mr-2"
        />
        Todolist
      </h1>
      <div className="flex justify-center mt-10 hover:cursor-pointer gap-5 ">
        {sortButtonActions.map((action) => (
          <SortButton
            key={action.type}
            label={action.label}
            active={sortBy === action.type}
            onClick={() => handleSortBy(action.type)}
          />
        ))}
        <button
          onClick={handleToggleCompleted}
          className={`border-2 border-white p-2 ${
            showCompleted ? "bg-green-500" : ""
          }`}
        >
          Toggle Completed
        </button>
      </div>
    </header>
  );
}
