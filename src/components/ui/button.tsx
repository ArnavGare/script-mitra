
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Add premium drop shadow and edge glow on hover (for all variants)
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-none hover:shadow-[0_6px_36px_0_rgba(113,86,255,0.18),0_1.5px_8px_0_rgba(0,212,255,0.13)] hover:ring-2 hover:ring-cyan-300/80 hover:ring-offset-1",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-none hover:shadow-[0_6px_36px_0_rgba(255,80,99,0.18),0_1.5px_8px_0_rgba(255,0,85,0.09)] hover:ring-2 hover:ring-pink-300/80 hover:ring-offset-1",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-none hover:shadow-[0_6px_32px_0_rgba(76,88,221,0.12),0_1.5px_8px_0_rgba(0,212,255,0.08)] hover:ring-2 hover:ring-blue-200/40 hover:ring-offset-1",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-none hover:shadow-[0_6px_32px_0_rgba(76,88,221,0.12)] hover:ring-2 hover:ring-purple-300/70 hover:ring-offset-1",
        ghost:
          "hover:bg-accent hover:text-accent-foreground shadow-none hover:shadow-[0_6px_32px_0_rgba(156,163,175,0.18)] hover:ring-2 hover:ring-slate-400/40 hover:ring-offset-1",
        link:
          "text-primary underline-offset-4 hover:underline shadow-none hover:shadow-[0_3px_12px_0_rgba(113,86,255,0.10)] hover:ring-2 hover:ring-blue-300/50 hover:ring-offset-1",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
