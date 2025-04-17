import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import illustration2 from "../assets/illustrations/illustration2.svg";
import illustration3 from "../assets/illustrations/illustration3.svg";
import logo from "../assets/logo.png";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(7, {
    message: "Password must be at least 7 characters.",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="sm:bg-secondary relative flex h-screen items-center justify-center overflow-hidden bg-white">
      <div className="flex w-sm flex-col items-center rounded-sm bg-white p-10 sm:shadow-2xl">
        <img src={logo} alt="" className="h-16" />
        <h4 className="mb-6 font-semibold">Login to continue</h4>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8 text-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <ul className="text-primary mt-4 flex gap-2">
          <li>
            <Link to="/register"> Can't log in?</Link>
          </li>
          <li className="text-black">•</li>
          <li>
            <Link to="/register">Create an account</Link>
          </li>
        </ul>
      </div>
      <img
        src={illustration2}
        className="absolute hidden lg:-bottom-14 lg:-left-9 lg:block lg:w-sm"
        alt="Illustration 2"
      />
      <img
        src={illustration3}
        className="absolute hidden lg:-right-16 lg:-bottom-14 lg:block lg:w-sm"
        alt="Illustration 3"
      />
    </div>
  );
};

export const Route = createFileRoute("/login")({
  component: Login,
});
