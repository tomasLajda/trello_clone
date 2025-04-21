import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authService } from "../services/auth.service";

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
import { useEffect, useState } from "react";
import illustration2 from "../assets/illustrations/illustration2.svg";
import illustration3 from "../assets/illustrations/illustration3.svg";
import logo from "../assets/logo.png";

const formSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z
      .string()
      .min(7, {
        message: "Password must be at least 7 characters.",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number.",
      })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Password must contain at least one special character.",
      }),
    repeatPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match.",
    path: ["repeatPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Registration successful! Please log in.");
      navigate({ to: "/login" });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Registration failed. Please try again.");
      setIsSubmitting(false);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    registerMutation.mutate(userData);
  };

  useEffect(() => {
    if (authService.isLoggedIn()) {
      navigate({ to: "/dashboard" });
    }
  }, [navigate]);

  return (
    <div className="sm:bg-secondary relative flex h-screen items-center justify-center overflow-hidden bg-white">
      <div className="flex w-sm flex-col items-center rounded-sm bg-white p-10 sm:shadow-2xl">
        <img src={logo} alt="" className="h-16" />
        <h4 className="mb-6 font-semibold">Sign up to continue</h4>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John_Snow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.snow@winterfell.com" {...field} />
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
                    <Input
                      placeholder="Enter password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Repeat password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <Link to="/login" className="text-primary mt-4">
          Already registered?
        </Link>
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

export const Route = createFileRoute("/register")({
  component: Register,
});
