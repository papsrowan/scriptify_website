"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Wallet } from "lucide-react";

type Realisation = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  tags?: string[];
};

const realisations: Realisation[] = [
  {
    id: "collecta",
    title: "Collecta",
    description:
      "Plateforme de collecte journalière pour microfinances : suivi des versements, retraits et comptes clients, tableaux de bord en temps réel et application mobile pour les agents sur le terrain.",
    url: "https://collecta.finance/",
    icon: <Wallet className="h-8 w-8" />,
    tags: ["Web", "Mobile", "Microfinance"],
  },
];

export default function RealisationsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="realisations" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Nos réalisations
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Des projets concrets livrés pour nos clients, du web à l’application
            mobile
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {realisations.map((realisation) => (
            <motion.div key={realisation.id} variants={itemVariants}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary dark:bg-brand-green/20 dark:text-brand-green">
                      {realisation.icon}
                    </span>
                    <CardTitle className="text-xl border-border border-b-2 pb-1 w-fit">
                      {realisation.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base mt-1 line-clamp-3">
                    {realisation.description}
                  </CardDescription>
                  {realisation.tags && realisation.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {realisation.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow" />
                <CardFooter className="pt-0">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary/5 group-hover:border-primary/30 dark:group-hover:border-brand-green/30"
                  >
                    <a
                      href={realisation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Voir le site
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
