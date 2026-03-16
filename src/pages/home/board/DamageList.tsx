import { AnimatePresence, motion } from "framer-motion";
import { useDamageStore } from "../../../store/game/damage.store";
import type { TPlayer } from "../../../store/game/game.types";
import cn from 'clsx'

interface Props {
    id: string | TPlayer, 
    isRight?: boolean
}
export function DamageList({id, isRight = true}:Props) {
    const { damages } = useDamageStore()

  return (
    <AnimatePresence>
        {(damages[id] || []).map(({ id: damageId, amount }, index) => (
            <motion.div
                key={damageId}
                initial={{ opacity: 1, y: 0, rotate: 0 }}
                animate={{ opacity: 0, y: 50 + index * 40, rotate: 15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className={cn('absolute top-2 w-full text-center text-red-500 font-bold text-xl z-50',
                    isRight ? '-right-[54%]' : '-left-[54%]'
                )}
            >
                {amount}
            </motion.div>
        ))}

    </AnimatePresence>
  )
}
