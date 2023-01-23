import { useId } from "react";
import { Loading } from "@/components";

import { Props } from "./types";

function Checkbox(props: Props) {
  const { checked, label, loading = false, onChange } = props;
  const id = useId();

  return (
    <div className="flex items-center mb-4 relative">
      <Loading show={loading} />
      <input
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
        className={`w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-lg ${
          loading ? "hidden" : ""
        }`}
      />
      <label htmlFor={id} className={`ml-4 ${checked ? "line-through" : ""}`}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
