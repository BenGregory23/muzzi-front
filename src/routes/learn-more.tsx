import { ScrollArea } from "@radix-ui/react-scroll-area";

import { Fragment } from "react/jsx-runtime";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert.tsx";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <Fragment>
      <ScrollArea className="h-full w-full bg-background border-l border-secondary p-10 flex justify-center items-center">
        <section className="flex flex-col items-start justify-center lg:max-w-prose space-y-6">
          <h1 className="text-white text-4xl font-migra">À propos de Muzzi</h1>
          <p className="text-white leading-7 [&:not(:first-child)]:mt-6">
            Muzzi est un projet qui permet d'écouter de la musique (et même des
            live) venant de YouTube tout en travaillant ou révisant. Cette idée
            est née d'un besoin personnel de pouvoir écouter de la musique sans
            être interrompu par des publicités ou par une interface qui veut
            capter mon attention. Mais aussi car beaucoup de contenu n'est pas
            disponible sur des plateformes d'écoutes comme Spotify, Apple Music
            ou Deezer. Donc je me suis fait le mien. C'est l'évolution d'un{" "}
            <a
              href="https://music.bengregory.live"
              className="text-blue-500 hover:underline"
            >
              projet précédent
            </a>{" "}
            qui était un simple lecteur de musique.
          </p>

          <p className=" text-white leading-7 [&:not(:first-child)]:mt-6">
            <div className=" text-white text-lg font-semibold">
              Comment on fait ?
            </div>
            Il suffit de se{" "}
            <Link to="/auth/signup" className="text-blue-500 hover:underline">
              {" "}
              créer un compte{" "}
            </Link>{" "}
            et de se connecter. Ensuite vous cherchez les vidéos que vous voulez
            écouter, vous les ajouter à votre librairie et bingo ! Vous pouvez
            les écouter en boucle sans être interrompu par des publicités ou des
            suggestions.
          </p>

          <div className="text-left flex flex-col items-start">
            <div className=" text-white text-lg font-semibold">
              Technologies utilisées
            </div>
            <ul className=" ml-6 list-disc [&>li]:mt-2 text-white">
              <li>Frontend : React, TailwindCSS, Shadcn</li>
              <li>Backend : NestJs (NodeJS), Prisma</li>
              <li>Base de données : SQL (Supabase)</li>
            </ul>
          </div>

          <Alert className="border-secondary">
            <Github className="h-4 w-4" />

            <AlertTitle>N'hésitez pas à aller voir mon github</AlertTitle>
            <AlertDescription>
              <p>
                Vous pouvez voir le code source de ce projet sur mon github ou
                mes autres projets.
              </p>
              <a
                href="https://github.com/BenGregory23"
                className="text-blue-500"
              >
                BenGregory23
              </a>
            </AlertDescription>
          </Alert>
        </section>
      </ScrollArea>
    </Fragment>
  );
};

export default LearnMore;
