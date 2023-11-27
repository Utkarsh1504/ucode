/* eslint-disable react/prop-types */
const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container flex flex-row gap-5 mt-5">
      <p className="text-base">
        Status:{""}
        <span className="font-semibold text-green-500 px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-base">
        Memory:{""}
        <span className="font-semibold text-green-500 px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.memory} kb
        </span>
      </p>
      <p className="text-base">
        Time:{""}
        <span className="font-semibold text-green-500 px-2 py-1 rounded-md bg-gray-100">
          {outputDetails?.time} ms
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
