import { createFileRoute } from "@tanstack/react-router";

const Dashboard = () => {
  return (
    <>
      <div>Dash</div>
    </>
  );
};

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});
