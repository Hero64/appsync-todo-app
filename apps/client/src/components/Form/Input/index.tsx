import Loading from "@/components/Loading";
import { ChangeEventHandler, KeyboardEventHandler } from "react";
import { Props } from "./types";

function Input(props: Props) {
  const { value, placeholder, loading = false, onChange, onEnter } = props;

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  const handleOnKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div className="relative">
      <input
        className="py-3 pl-6 pr-10 w-full bg-zinc-100 rounded-lg transition-all duration-500 outline-none focus:shadow-zinc-200 focus:shadow-lg focus:-translate-y-1"
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        disabled={loading}
      />
      <Loading show={loading} className="absolute top-3 right-3" />
    </div>
  );
}

export default Input;
