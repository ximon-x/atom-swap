import { cn } from "../utils";

type Children = { children: React.ReactNode; className?: string };

type TextProps = Children & {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "p"
    | "muted"
    | "quote"
    | "code"
    | "lead"
    | "massive";
};

function TypographyH1({ children, className }: Children) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight",
        className,
      )}
    >
      {children}
    </h1>
  );
}

function TypographyH2({ children, className }: Children) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function TypographyH3({ children, className }: Children) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}
function TypographyH4({ children, className }: Children) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
}

function TypographyP({ children, className }: Children) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

function TypographyBlockquote({ children, className }: Children) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

function TypographyLead({ children, className }: Children) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}

function TypographyInlineCode({ children, className }: Children) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
    >
      {children}
    </code>
  );
}

function TypographyMassive({ children, className }: Children) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight sm:text-7xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

function TypographyMuted({ children, className }: Children) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

export function List({ children, className }: Children) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
}

export function Text({ variant, children, className }: TextProps) {
  switch (variant) {
    case "h1": {
      return <TypographyH1 className={className}>{children}</TypographyH1>;
    }

    case "h2": {
      return <TypographyH2 className={className}>{children}</TypographyH2>;
    }

    case "h3": {
      return <TypographyH3 className={className}>{children}</TypographyH3>;
    }

    case "h4": {
      return <TypographyH4 className={className}>{children}</TypographyH4>;
    }

    case "p": {
      return <TypographyP className={className}>{children}</TypographyP>;
    }

    case "muted": {
      return (
        <TypographyMuted className={className}>{children}</TypographyMuted>
      );
    }

    case "quote": {
      return (
        <TypographyBlockquote className={className}>
          {children}
        </TypographyBlockquote>
      );
    }

    case "code": {
      return (
        <TypographyInlineCode className={className}>
          {children}
        </TypographyInlineCode>
      );
    }

    case "lead": {
      return <TypographyLead className={className}>{children}</TypographyLead>;
    }

    case "massive": {
      return (
        <TypographyMassive className={className}>{children}</TypographyMassive>
      );
    }
  }
}
