import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const AppBarCreate = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Initialize form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Saving board:", data);

    toast.success("Board created successfully.");
    navigate({ to: "/" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create board</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My new board"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save board</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
