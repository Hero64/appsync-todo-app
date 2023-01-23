import { Props } from "./types";

function Container(props: Props) {
  const { children } = props;

  return (
    <div className="mt-24 mx-auto bg-white rounded-lg w-10/12 lg:w-7/12  p-6 shadow-xl shadow-zinc-200">
      {children}
    </div>
  );
}

export default Container;
