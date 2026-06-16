"use client";

import { motion } from "framer-motion";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { springClipReveal } from "@/lib/spring";

interface ClipRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function ClipReveal({
  children,
  delay = 0,
}: ClipRevealProps) {
  const mounted = useIsMounted();

  return (
    <motion.div className="overflow-hidden pb-[0.14em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={mounted ? { y: 100 } : false}
        animate={{ y: 0 }}
        transition={{
          y: { ...springClipReveal, delay: delay + 0.2 },
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
