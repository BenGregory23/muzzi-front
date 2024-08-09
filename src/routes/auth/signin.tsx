import { useState } from "react";
import { Button } from "../../components/ui/button.tsx";

import { useMainStore } from "../../stores/main.ts";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useKeep } from "../../hooks/useKeep.tsx";
import { API_URL } from "../../lib/constants.ts";
import i18next from "i18next";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken, setUser } = useMainStore((state) => state);

  async function fetchUser(token: string) {
    try {
      const response = await fetch(API_URL + "/users/me", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        return response.json();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function signin() {
    try {
      const result = await fetch(API_URL + "/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (result) {
        console.log("Signin success");
        // get body data
        const data = await result.json();

        if (data.access_token) {
          setToken(data.access_token);
          useKeep.set("token", data.access_token);

          const user = await fetchUser(data.access_token);
          console.log(user);
          setUser(user);

          // TODO: redirect to home
          navigate("/");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  //Redirect if user is already logged in
  if (useKeep.get("token")) {
    // TODO: redirect to home
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center border-l border-secondary w-full bg-background h-full text-white ">
      <div className="flex items-center justify-center py-12">
        <div className=" w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{i18next.t("auth.signin")}</h1>
            <p className="text-balance text-muted-foreground">
              {i18next.t("auth.signinSubtitle")}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{i18next.t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{i18next.t("auth.password")}</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  {i18next.t("auth.forgotPassword")}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={() => signin()} className="w-full">
              {i18next.t("auth.signin")}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {i18next.t("auth.dontHaveAccount")}{" "}
            <Link to="/auth/signup" className="underline">
              {i18next.t("auth.signup")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
