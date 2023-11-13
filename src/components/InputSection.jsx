import { classnames } from "../utils/general";

// eslint-disable-next-line react/prop-types
const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
        Input
      </h1>
      <textarea
        
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Input goes here...`}
        className={classnames(
          "outline-none border-none w-full h-56 border-2 border-black z-10 rounded-md px-4 py-2 hover:shadow transition duration-20 bg-vs mt-2 mb-2"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
