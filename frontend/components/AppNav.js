"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Players" },
  { href: "/queue", label: "Queue and Matches" },
  { href: "/about", label: "About" }
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={active ? "nav-link active" : "nav-link"}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
