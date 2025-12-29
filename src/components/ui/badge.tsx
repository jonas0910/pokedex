import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

        /* 🧬 Pokémon types */
        normal:
          "border-transparent bg-zinc-400 text-black [a&]:hover:bg-zinc-400/90",

        fighting:
          "border-transparent bg-red-700 text-white [a&]:hover:bg-red-700/90",

        flying:
          "border-transparent bg-sky-400 text-white [a&]:hover:bg-sky-400/90",

        poison:
          "border-transparent bg-purple-600 text-white [a&]:hover:bg-purple-600/90",

        ground:
          "border-transparent bg-amber-700 text-white [a&]:hover:bg-amber-700/90",

        rock: "border-transparent bg-stone-600 text-white [a&]:hover:bg-stone-600/90",

        bug: "border-transparent bg-lime-600 text-white [a&]:hover:bg-lime-600/90",

        ghost:
          "border-transparent bg-indigo-700 text-white [a&]:hover:bg-indigo-700/90",

        steel:
          "border-transparent bg-slate-500 text-white [a&]:hover:bg-slate-500/90",

        fire: "border-transparent bg-orange-600 text-white [a&]:hover:bg-orange-600/90",

        water:
          "border-transparent bg-blue-600 text-white [a&]:hover:bg-blue-600/90",

        grass:
          "border-transparent bg-green-600 text-white [a&]:hover:bg-green-600/90",

        electric:
          "border-transparent bg-yellow-400 text-black [a&]:hover:bg-yellow-400/90",

        psychic:
          "border-transparent bg-pink-600 text-white [a&]:hover:bg-pink-600/90",

        ice: "border-transparent bg-cyan-300 text-black [a&]:hover:bg-cyan-300/90",

        dragon:
          "border-transparent bg-violet-700 text-white [a&]:hover:bg-violet-700/90",

        dark: "border-transparent bg-neutral-800 text-white [a&]:hover:bg-neutral-800/90",

        fairy:
          "border-transparent bg-rose-400 text-white [a&]:hover:bg-rose-400/90",

        stellar:
          "border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white",

        unknown: "border-transparent bg-gray-400 text-black",

        shadow: "border-transparent bg-black text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
