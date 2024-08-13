import { House, ListMusic, LogIn, Music4Icon } from "lucide-react";
import Title from "./title.tsx";
import { useKeep } from "../../hooks/useKeep.tsx";
import { useMainStore } from "../../stores/main.ts";
import { Button } from "../ui/button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { GearIcon, StarFilledIcon } from "@radix-ui/react-icons";
import i18next from "i18next";

const Sidebar = () => {
  const { token, logout } = useMainStore((state) => state);
  const navigate = useNavigate();

  const logOutUser = () => {
    useKeep.remove("token");
    logout();

    navigate("/");
  };

  return (
    <div className="text-white flex flex-col space-y-10 items-start justify-start bg-background  w-80 p-4 h-[calc(100vh-6rem)]">
      <Title />

      <div className="flex flex-col w-full h-full justify-between items-center">
        <div className="flex flex-col space-y-5 w-full">
          <Link
            to={"/"}
            className="flex items-center justify-start px-4  w-60  py-1.5 rounded-md text-muted-foreground space-x-4 hover:bg-secondary/90 "
          >
            <House className="w-5 h-5" />
            <span className="font-normal">{i18next.t("sidebar.home")}</span>
          </Link>

          <Link
            to={"/musics"}
            className="flex items-center justify-start px-4   w-60  py-1.5 rounded-md text-muted-foreground space-x-4 hover:bg-secondary/90 "
          >
            <Music4Icon className="w-5 h-5" />
            <span className="font-normal">{i18next.t("sidebar.musics")}</span>
          </Link>

          <Link
            to={"/playlists"}
            className="flex items-center justify-start px-4   w-60  py-1.5 rounded-md text-muted-foreground space-x-4 hover:bg-secondary/90 "
          >
            <ListMusic className="w-5 h-5" />
            <span className="font-normal">
              {i18next.t("sidebar.playlists")}{" "}
              <span className="text-xs">
                ({i18next.t("sidebar.comingSoon")})
              </span>{" "}
            </span>
          </Link>
        </div>

        <div className="space-y-5 w-full">
          <Link
            to={"/learn-more"}
            className="flex items-center justify-start px-4  w-60  py-1.5 rounded-md text-muted-foreground space-x-4 hover:bg-secondary/90 "
          >
            <StarFilledIcon className="w-5 h-5" />
            <span className="font-normal">
              {i18next.t("sidebar.learnMore")}
            </span>
          </Link>

          <Link
            to={"/settings"}
            className={
              "flex items-center justify-start px-4  w-60 py-1.5 rounded-md text-muted-foreground space-x-4 hover:bg-secondary/90 " +
              (token === null ? "hidden" : "")
            }
          >
            <GearIcon className="w-5 h-5" />
            <span className="font-normal">{i18next.t("sidebar.settings")}</span>
          </Link>

          {token === null ? (
            <Link
              to={"/auth/signin"}
              className="flex items-center justify-start px-4 w-60  py-1.5 rounded-md text-muted-foreground space-x-4 hover:bg-secondary/90 "
            >
              <LogIn className="w-5 h-5" />
              <span className="font-normal">{i18next.t("sidebar.signin")}</span>
            </Link>
          ) : (
            <Button className="w-full" onClick={() => logOutUser()}>
              {i18next.t("sidebar.logout")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
