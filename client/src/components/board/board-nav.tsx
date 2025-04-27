import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const BoardNav = () => {
  const [favorite, setFavorite] = useState(false);

  return (
    <nav className="bg-primary fixed top-[49px] flex w-full items-center justify-between px-2 py-1">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" className="text-lg">
          <input
            type="text"
            value="Board name"
            className="w-full outline-none"
          />
        </Button>
        <Button onClick={() => setFavorite((prev) => !prev)} variant="ghost">
          {favorite ? <StarIcon fill="currentColor" /> : <StarIcon />}
        </Button>
      </div>
    </nav>
  );
};
