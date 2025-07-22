export const RequestBtn = ({ onClick, text, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 border-2 border-${color}-600 text-white font-semibold rounded-full shadow-lg hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:-translate-y-1`}
    >
      {text}
    </button>
  );
};

export const UserCardBtn = ({ onClick, text, firstColor, secondColor }) => {
  return (
    <button
      onClick={onClick}
      className={`w-1/2 py-3 rounded-xl bg-gradient-to-r from-${firstColor}-600 to-${secondColor}-700 text-white font-bold shadow-lg hover:from-${firstColor}-700 hover:to-${secondColor}-800 transition-all duration-300 transform hover:-translate-y-1`}
    >
      {text}
    </button>
  );
};
