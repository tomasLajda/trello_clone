import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BoardListTask } from "./board-list-task";

export const BoardList = () => {
  return (
    <div className="bg-secondary flex h-full max-h-[calc(100vh-140px)] w-72 shrink-0 flex-col rounded-md p-4">
      <Input
        value="ahojky"
        className="dark:bg-secondary mb-4 w-full border-none !text-base shadow-none"
      />

      <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
        <ul className="space-y-4 pr-1">
          {Array.from({ length: Math.random() * 30 + 1 }).map((_, i) => (
            <BoardListTask key={i} />
          ))}
        </ul>
      </div>

      <Button className="mt-4 w-full">
        <PlusIcon className="mr-2 h-4 w-4" />
        <p>Add a card</p>
      </Button>
    </div>
  );
};
