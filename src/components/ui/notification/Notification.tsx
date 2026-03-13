import { motion } from "framer-motion";
import { useNotificationStore } from "../../../store/notification/notification.store";
import cn from "clsx";

export function Notification() {
  const { message, type } = useNotificationStore();
  return (
    !!message && (
      <motion.div
        className="fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center bg-[#102a27]/90"
        initial={{ opacity: 0, zoom: 1 }}
        animate={{ opacity: 1, zoom: 1.06 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{ duration: 0.5}}
      >
        <div
          className={cn(
            "rounded-lg py-2 px-4 mx-auto w-max font-semibold text-xl shadow-2xl",
            {
              "bg-green-500": type === "win",
              "bg-red-500": type === "lose",
              "secondary-gradient text-white": type === "info",
            },
          )}
        >
          {message}
        </div>
      </motion.div>
    )
  );
}
