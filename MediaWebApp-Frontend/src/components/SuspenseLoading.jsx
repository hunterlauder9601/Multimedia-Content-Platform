import { useEffect, useState } from "react";
import { FaDog } from "react-icons/fa";

function SuspenseLoading() {
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadingPhase < 3) {
        setLoadingPhase(loadingPhase + 1);
      } else {
        setLoadingPhase(0);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [loadingPhase]);

  return (
    <div className="w-full h-[calc(100vh-43px)] bg-zinc-900 flex items-center justify-center relative">
      {Array(loadingPhase)
        .fill(null)
        .map((_, index) => (
          <FaDog
            key={index}
            size={64}
            className="text-red-500 text-4xl mx-2 aspect-square"
          />
        ))}
    </div>
  );
}

export default SuspenseLoading;
