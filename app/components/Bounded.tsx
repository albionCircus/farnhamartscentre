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
       <Comp className={clsx("relative px-4 pt-4 pb-0 md:py-8 md:pb-0 md:px-6 lg:pt-8 lg:pb-0", className)} {...restProps}>
            {children}
       </Comp>
    )
}