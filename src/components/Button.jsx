const Button = ({ type = 'button', label, onClick, disabled = false }) => {
  return (
    <button
      type={type}
      className="space-x-4 bg-teal-700 text-white rounded-md p-2 hover:text-white focus:outline-none focus:text-white focus:bg-teal-600"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;