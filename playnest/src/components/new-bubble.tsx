import { redirect } from "next/navigation";

const NewBubble = () => {
  const handleRedirect = () => {
    redirect("/request-form");
  };

  return (
    <div
      onClick={handleRedirect}
      className="select-none relative flex items-center justify-center rounded-full p-4 bg-gradient-to-br from-green-400 to-blue-500 shadow-lg cursor-pointer"
      style={{
        width: "60vw",
        height: "60vw",
        touchAction: "none",
        borderRadius: "50%",
      }}
    >
      <div className="text-white font-bold text-2xl sm:text-6xl lg:text-8xl">
        Create
      </div>
    </div>
  );
};

export default NewBubble;
