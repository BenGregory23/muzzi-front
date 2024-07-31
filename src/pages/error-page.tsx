import { Link, useRouteError } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";

export default function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string };


  return (
    <div
      id="error-page"
      className="bg-background h-screen text-white flex flex-col justify-center items-center"
    >
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Oops!
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 italic">
        <i>{error.statusText || error.message}</i>
      </p>
      <Button asChild className="my-10">
        <Link to="/">Go back to home</Link>
      </Button>
    </div>
  );
}
