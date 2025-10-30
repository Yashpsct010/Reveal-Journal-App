import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm leading-none font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#3A8CF5] to-[#5C5DF1] text-white hover:from-[#3A8CF5]/90 hover:to-[#5C5DF1]/90 shadow-lg hover:shadow-xl transition-all duration-300",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 shadow-lg hover:shadow-xl transition-all duration-200",
        outline:
          "border-2 border-[#3A8CF5] bg-transparent text-[#3A8CF5] shadow-xs hover:bg-gradient-to-r hover:from-[#3A8CF5]/10 hover:to-[#5C5DF1]/10 hover:text-foreground dark:border-[#5C5DF1] dark:text-[#5C5DF1] dark:hover:from-[#3A8CF5]/20 dark:hover:to-[#5C5DF1]/20 transition-all duration-300",
        secondary:
          "bg-gradient-to-r from-[#3A8CF5]/20 to-[#5C5DF1]/20 text-[#3A8CF5] hover:from-[#3A8CF5]/30 hover:to-[#5C5DF1]/30 dark:text-[#5C5DF1] dark:from-[#5C5DF1]/20 dark:to-[#3A8CF5]/20 dark:hover:from-[#5C5DF1]/30 dark:hover:to-[#3A8CF5]/30 shadow-md hover:shadow-lg transition-all duration-200",
        ghost:
          "text-[#3A8CF5] hover:bg-gradient-to-r hover:from-[#3A8CF5]/10 hover:to-[#5C5DF1]/10 hover:text-foreground dark:text-[#5C5DF1] dark:hover:from-[#3A8CF5]/20 dark:hover:to-[#5C5DF1]/20 transition-all duration-200",
        link: "text-[#3A8CF5] hover:text-[#5C5DF1] dark:text-[#5C5DF1] dark:hover:text-[#3A8CF5] transition-colors duration-200",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
