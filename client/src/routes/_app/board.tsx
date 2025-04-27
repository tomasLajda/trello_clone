import { createFileRoute } from "@tanstack/react-router";
import { BoardList } from "../../components/board/board-list";
import { BoardNav } from "../../components/board/board-nav";

const Board = () => {
  return (
    <>
      <BoardNav />
      <main className="m-4 mt-28 flex space-x-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <BoardList key={i} />
        ))}
      </main>
    </>
  );
};

export const Route = createFileRoute("/_app/board")({
  component: Board,
});
