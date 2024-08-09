import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useKeep } from "../../hooks/useKeep.tsx";
import { useMainStore } from "../../stores/main.ts";
import { fetchWrapper } from "../../utils/fetchWrapper.ts";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";
import getUser from "../../api-requests/getUser.ts";
import { API_URL } from "../../lib/constants.ts";
import i18next from "i18next";

const formSchema = z.object({
  firstname: z.string().min(2, "Firstname must be at least 2 characters"),
  lastname: z.string().min(2, "Lastname must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const { setToken, setUser } = useMainStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const { result, error } = await fetchWrapper.post(
        API_URL + "/auth/signup",
        values,
        false,
      );
      if (error) {
        toast.error(error);
      }

      if (result) {
        console.log(result);
        // get body data

        if (result.access_token) {
          setToken(result.access_token);
          useKeep.set("token", result.access_token);

          const user = await getUser();

          setUser(user);

          // TODO: redirect to home
          navigate("/");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex justify-center items-center border-l border-secondary w-full bg-background h-full text-white ">
      <div className="flex items-center justify-center py-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-[350px]"
          >
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">{i18next.t("auth.signup")}</h1>
              <p className="text-balance text-muted-foreground">
                {i18next.t("auth.signupSubtitle")}
              </p>
            </div>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18next.t("auth.firstname")}</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18next.t("auth.lastname")}</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18next.t("auth.email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18next.t("auth.password")}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {i18next.t("auth.signup")}
            </Button>
            <div className="mt-4 text-center text-sm">
              {i18next.t("auth.alreadyHaveAccount")}{" "}
              <Link to="/auth/signin" className="underline">
                {i18next.t("auth.signin")}
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
