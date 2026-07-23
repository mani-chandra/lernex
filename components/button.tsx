import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-teal-700 text-white hover:bg-teal-800"
      : "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
