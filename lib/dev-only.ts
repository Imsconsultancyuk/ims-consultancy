import { notFound } from "next/navigation";

// Scratch routes under app/dev stay usable in `next dev` and 404 in production builds.
export function devOnly(): void {
  if (process.env.NODE_ENV === "production") notFound();
}
