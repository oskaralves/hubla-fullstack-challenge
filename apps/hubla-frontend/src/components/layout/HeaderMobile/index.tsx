"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { getNavigation } from "@/navigation";
import { motion, useCycle } from "framer-motion";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { hasRole } from "../../../authRoles";
import { MenuItem } from "../Sidebar/MenuItem";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 100% 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

type SidebarMobileProps = {
  user: Session["user"];
};
export const SidebarMobile = ({ user }: SidebarMobileProps) => {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const { locale } = useLanguage();
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const navigation = getNavigation(locale);

  useEffect(() => {
    if (isOpen) {
      toggleOpen();
    }
  }, [pathname]);

  return (
    <div className="relative h-10 w-10 md:hidden">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        className={`fixed inset-0 right-0 z-50 w-full ${
          isOpen ? "" : "pointer-events-none"
        }`}
        ref={containerRef}
      >
        <motion.div
          className="absolute inset-0 right-0 h-screen w-full bg-neutral-50 dark:bg-neutral-800"
          variants={sidebar}
        />
        <motion.ul
          variants={variants}
          className={cn(
            "relative flex h-full w-full flex-col gap-3 px-10 py-16",
            isOpen ? "overflow-y-auto" : "overflow-hidden"
          )}
        >
          {navigation.items
            .filter((item) => hasRole(user, item.roles))
            .map((item, idx) => {
              return (
                <motion.div key={idx} variants={MenuItemVariants}>
                  <MenuItem item={item} />
                </motion.div>
              );
            })}
        </motion.ul>
        <MenuToggle toggleOpen={toggleOpen} />
      </motion.nav>
    </div>
  );
};

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggleOpen }: { toggleOpen: () => void }) => (
  <Button
    onClick={toggleOpen}
    variant="ghost"
    size="icon"
    className="
    pointer-events-auto absolute right-3.5 top-3.5 items-center justify-center
    rounded-lg p-3 transition-colors
    md:visible md:hidden"
  >
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      className="stroke-neutral-700 dark:stroke-neutral-400"
    >
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </Button>
);

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
