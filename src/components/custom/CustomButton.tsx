import { cn } from "@/src/lib/utils"

type CustomButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}


export default function CustomButton({ children, onClick, className }: CustomButtonProps) {
    return (
        <button className={cn("rounded-md bg-blue-500 p-2 text-white", className)} onClick={onClick}>
            {children}
        </button>
    )
}
