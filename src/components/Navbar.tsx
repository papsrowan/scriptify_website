"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#team", label: "Équipe" },
  { href: "#pricing", label: "Tarifs" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={theme === "dark" ? "/images/SCRIPTY_n-20.png" : "/images/SCRIPTY_n_Plan_de_travail_1_copie_5.png"}
            alt="Scriptify Logo"
            width={180}
            height={50}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              onClick={() => scrollToSection(link.href.substring(1))}
              className="text-base font-medium hover:text-brand-blue dark:hover:text-brand-green"
            >
              {link.label}
            </Button>
          ))}
          <Button
            variant="default"
            className="bg-gradient-to-r from-brand-green to-brand-blue hover:opacity-90 text-white"
            onClick={() => scrollToSection("contact")}
          >
            Commencer un projet
          </Button>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center py-4">
                  <Image
                    src={theme === "dark" ? "/images/SCRIPTY_n-20.png" : "/images/SCRIPTY_n_Plan_de_travail_1_copie_5.png"}
                    alt="Scriptify Logo"
                    width={150}
                    height={40}
                    className="h-8 w-auto"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 py-8">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      onClick={() => scrollToSection(link.href.substring(1))}
                      className="justify-start text-lg font-medium"
                    >
                      {link.label}
                    </Button>
                  ))}
                </nav>
                <div className="mt-auto pb-8">
                  <Button
                    className="w-full bg-gradient-to-r from-brand-green to-brand-blue hover:opacity-90 text-white"
                    onClick={() => scrollToSection("contact")}
                  >
                    Commencer un projet
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
