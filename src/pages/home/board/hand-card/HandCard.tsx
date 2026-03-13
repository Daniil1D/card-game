import { useState, type CSSProperties } from "react";
import type { ICard } from "../../../../types/card.types";
import cn from "clsx";
import { motion } from "framer-motion";

interface Props {
  card: ICard;
  onClick?: () => void;
  isDisabled?: boolean;
  isHided?: boolean;
  style?: CSSProperties;
  arrayLength: number;
}
function getCardOverlap(total: number) {
  if (total <= 6) return -22;
  if (total <= 8) return -33;
  if (total <= 10) return -44;
  if (total <= 12) return -55;
  return -66;
}
export function HandCard({
  card,
  onClick,
  isDisabled,
  isHided,
  style,
  arrayLength,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const overlap = getCardOverlap(arrayLength);
  return (
    <motion.button
      className={cn(
        "h-36 w-24 inline-block rounded-lg will-change-transform relative",
        {
          "shadow": !isHided,
          "cursor-pointer": !isHided && !isDisabled
        },
      )}
      disabled={isDisabled}
      onClick={onClick}
      style={{
        marginLeft: overlap,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1, zIndex: 0, y: 0 }}
      animate={
        isHovered && !isHided
          ? { scale: 1.3, zIndex: 10, y: -95 }
          : {
              scale: 1,
              zIndex: 0,
              y: 0,
            }
      }
      transition={{ type: "spring", stiffness: 210, damping: 30 }}
    >
      {isDisabled && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[1] rounded-lg"/>
      ) }
        <img
          src={isHided ? "/assets/cards/cover.png" : card.imageUrl}
          alt={card.name}
          draggable={false}
          className="will-change-transform"
        />
      
    </motion.button>
  );
}
