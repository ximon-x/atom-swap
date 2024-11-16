import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function AlgoBlack(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 650 650"
      {...props}
    >
      <title>ALGO_Logos_190320</title>
      <g id="lINT7W">
        <polygon points="444.18 444.32 406.81 444.32 382.54 354.04 330.36 444.33 288.64 444.33 369.29 304.57 356.31 256.05 247.56 444.36 205.82 444.36 343.64 205.64 380.18 205.64 396.18 264.95 433.88 264.95 408.14 309.71 444.18 444.32" />
      </g>
    </svg>
  );
}

function AlgoWhite(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 650 650"
      {...props}
    >
      <title>ALGO_Logos_190320</title>
      <g id="lINT7W">
        <polygon
          className="fill-white"
          points="444.18 444.32 406.81 444.32 382.54 354.04 330.36 444.33 288.64 444.33 369.29 304.57 356.31 256.05 247.56 444.36 205.82 444.36 343.64 205.64 380.18 205.64 396.18 264.95 433.88 264.95 408.14 309.71 444.18 444.32"
        />
      </g>
    </svg>
  );
}

export function Algo(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (resolvedTheme === "dark") {
    return <AlgoWhite {...props} />;
  } else {
    return <AlgoBlack {...props} />;
  }
}
