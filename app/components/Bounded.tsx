import clsx from "clsx";

type BoundedProps = {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}

export default function Bounded({
    as: Comp = "section",
    className,
    children,
    ...restProps      
}: BoundedProps){
    return (
       <Comp className={clsx("relative px-4 py-6 md:py-8 md:px-6", className)} {...restProps}>
            {children}
       </Comp>
    )
}