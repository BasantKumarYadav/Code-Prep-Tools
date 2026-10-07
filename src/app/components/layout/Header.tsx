"use client";

import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/site";
import ThemeToggle from "../common/ThemeToggle";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          onClick={() => setMobileOpen(false)}
        >
          <span className="brand-icon">
            <Code2 size={20} />
          </span>

          <span>CodePrepTools</span>
        </Link>

        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />

          <button
            type="button"
            className="mobile-menu-button"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-navigation" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}