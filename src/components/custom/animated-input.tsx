"use client";


import { cn } from "@/src/lib/utils";
import { useId, useState } from "react";
import { Input } from "../ui/input";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function AnimatedInput({ label, id, className, ...props }: AnimatedInputProps) {
    const inputId = useId();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="group relative w-full">
            {/* Label animé */}
            <label
                htmlFor={id || inputId}
                className={cn(
                    "absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all",
                    "group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground",
                    isFocused || props.value ? "top-0 text-xs font-medium text-foreground" : ""
                )}
            >
                <span className="inline-flex bg-background px-1 font-inter">{label}</span>
            </label>

            {/* Input */}
            <Input
                id={id || inputId}
                className={cn("w-full px-2 py-2", className)}
                onFocus={() => setIsFocused(true)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => setIsFocused(!!e.target.value)}
                {...props}
            />
        </div>
    );
}
