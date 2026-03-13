import type { PropsWithChildren } from "react";
import cn from "clsx";

interface Props extends PropsWithChildren {
  isPlayer: boolean;
}
export function SectionSide({ isPlayer, children }: Props) {
  return (
    <section
      className={cn('absolute w-full h-[45vh]',{
        "pt-[64px] pb-7 top-0": !isPlayer,
        "pt-0 pb-7 bottom-0": isPlayer,
      })}
    >
      {children}
    </section>
  );
}
