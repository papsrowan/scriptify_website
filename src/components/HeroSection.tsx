"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useTheme } from "./theme-provider";

export default function HeroSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-hero pt-28 md:pt-32 pb-20 overflow-hidden" id="hero">
      <div className="absolute inset-0 bg-grid z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12"
        >
          <motion.div variants={itemVariants} className="w-full md:w-1/2 mt-10 md:mt-0">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green"
            >
              Digitalisez aujourd’hui. Dominez demain.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
            >
              Propulsez votre entreprise avec nos solutions digitales sur mesure.
              Du développement web et mobile à l'IA, nous transformons vos idées en réalité.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-green to-brand-blue hover:opacity-90 text-white px-8 py-6 text-lg"
                onClick={handleScrollToContact}
              >
                Démarrer un projet
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-brand-blue dark:border-brand-green hover:bg-brand-blue/10 dark:hover:bg-brand-green/10 px-8 py-6 text-lg"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Découvrir nos services
              </Button>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-green to-brand-blue opacity-30 blur-xl"></div>
              <Image
                src={theme === "dark" ? "/images/SCRIPTY_n_Plan_de_travail_1_copie_2.png" : "/images/SCRIPTY_n_Plan_de_travail_1_copie_11.png"}
                alt="Scriptify Logo"
                width={500}
                height={500}
                className="relative z-10 w-full h-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[60px] rotate-180 transform bg-transparent"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-background dark:opacity-80"
          ></path>
        </svg>
      </div>
    </section>
  );
}
