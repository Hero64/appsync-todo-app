import { Props } from "./types";

function Loading(props: Props) {
  const { size = 6, show = false, className = "" } = props;

  if (!show) {
    return null;
  }

  return (
    <div
      className={`border border-blue-500 border-r-transparent rounded-full animate-spin h-${size} w-${size} ${className}`}
    ></div>
  );
}

export default Loading;
