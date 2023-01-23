import { Props } from "./types";

function EmptyContent(props: Props) {
  const { emoji, children } = props;

  return (
    <div className="py-10 h-full flex flex-col items-center justify-center">
      <p className="text-8xl mb-6">{emoji}</p>
      <p className="font-light text-xl mx-10 md:mx-32 text-center">
        {children}
      </p>
    </div>
  );
}

export default EmptyContent;
