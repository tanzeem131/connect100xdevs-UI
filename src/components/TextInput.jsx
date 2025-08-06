export const TextInputHeading = ({ text }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="text-bold text-white sm:text-3xl text-xl rounded-full border-2 border-purple-500/50 px-4 py-1 flex justify-center items-center">
        {text}
      </div>
    </div>
  );
};

export const TextInputError = ({ text }) => {
  return (
    <div className="flex justify-center mt-5 text-purple-600 text-xl">
      {text}
    </div>
  );
};
