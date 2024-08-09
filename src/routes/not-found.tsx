import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const NotFound = () => {
  return (
    <Fragment>
      <main className="flex flex-col justify-center items-center bg-background border-l border-secondary h-full space-y-2">
        <h1 className="font-migra text-white text-8xl">404</h1>
        <p className="text-muted-foreground">Oups, cette page n'existe pas !</p>
        <Link to="/">
          <Button variant={"secondary"}>Retour à l'accueil</Button>
        </Link>
      </main>
    </Fragment>
  );
};

export default NotFound;
