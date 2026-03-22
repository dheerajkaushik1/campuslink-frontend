export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-(--primary) text-(--text)">
      
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 bg-(--secondary) rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-(--secondary) rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 bg-(--secondary) rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>

      <p className="text-lg">Loading...</p>
    </div>
  );
}