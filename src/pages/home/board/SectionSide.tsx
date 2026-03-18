import type { PropsWithChildren } from "react";
import cn from "clsx";

interface Props extends PropsWithChildren {
  isPlayer: boolean;
}
export function SectionSide({ isPlayer, children }: Props) {
  return (
    <section
      className={cn(
        "absolute w-full h-[42vh] sm:h-[44vh] md:h-[45vh]",
        {
          "pt-[40px] sm:pt-[56px] md:pt-[64px] pb-4 sm:pb-6 md:pb-7 top-0": !isPlayer,
          "pt-0 pb-4 sm:pb-6 md:pb-7 bottom-0": isPlayer,
        }
      )}
    >
      {children}
    </section>
  );
}
