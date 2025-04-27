import { AnimatePresence, motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const BoardListTask = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDone, setIsDone] = useState(false);
  return (
    <li className="w-full">
      <Button
        className="relative w-full justify-start"
        variant="outline"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {(isHovered || isDone) && (
            <motion.div
              className={`absolute left-2 ${isDone ? "text-green-600" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsDone((prev) => !prev);
              }}
            >
              <div className="relative">
                <Circle
                  className="h-4 w-4"
                  fill={isDone ? "currentColor" : "none"}
                />
                {isDone && (
                  <Check
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white"
                    size={10}
                    strokeWidth={1}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          animate={{ marginLeft: isHovered || isDone ? "24px" : "0px" }}
          transition={{ duration: 0.2 }}
        >
          addsdafdsf
        </motion.span>
      </Button>
    </li>
  );
};
