import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Same helper as exantara-saas `@/lib/utils`, so sections port without import changes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
