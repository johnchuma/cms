const Button = ({
  text,
  onClick,
  loading = false,
  isFull = true,
  isNormal = true,
}) => {
  return (
    <button
      type="submit"
      className={`bg-primary hover:scale-105 py-3 min-w-48 transition-all duration-200  ${
        isFull ? "w-full" : ""
      }  text-white  flex justify-center px-6 rounded-lg ${
        isNormal ? "text-base" : "text-lg"
      } font-medium`}
    >
      {loading ? (
        <div className=" size-7 border-4  animate-spin rounded-full border-b-transparent border-white"></div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
