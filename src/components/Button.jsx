export const RequestBtn = ({ onClick, text, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 border-2 ${color} text-white font-semibold rounded-full shadow-lg focus:outline-none transition duration-200 ease-in-out transform hover:-translate-y-1`}
    >
      {text}
    </button>
  );
};

export const UserCardBtn = ({ onClick, text, firstColor, secondColor }) => {
  return (
    <button
      onClick={onClick}
      className={`w-1/2 py-3 rounded-xl bg-gradient-to-r ${firstColor} ${secondColor} text-white font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
    >
      {text}
    </button>
  );
};
