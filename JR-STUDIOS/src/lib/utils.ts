// lib/utils.ts

// Import clsx to conditionally join class names
import clsx from "clsx";
// Import tailwind-merge to intelligently merge Tailwind CSS classes
import { twMerge } from "tailwind-merge";

/**
 * Combines class names and intelligently merges Tailwind CSS classes.
 * This helper function is useful when you need to conditionally apply classes.
 *
 * @param classes - A list of class names, objects, or arrays to combine.
 * @returns A single string of merged class names.
 *
 * @example
 * const buttonClass = cn(
 *   "px-4 py-2 font-semibold",
 *   isPrimary ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
 * );
 */
export function cn(...classes: any[]): string {
    return twMerge(clsx(classes));
}
