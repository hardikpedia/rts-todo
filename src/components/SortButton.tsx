
type SortButtonProps= {
  label: string;
  active: boolean;
  onClick: () => void;
}
export default function SortButton({ label, active, onClick }: SortButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`mr-2 border-2 border-white p-2 ${
        active ? "bg-green-500" : ""
      }`}
    >
      {label}
    </div>
  );
}
