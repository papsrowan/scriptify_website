"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { Github, Linkedin, ExternalLink } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  initials: string;
  links?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
};

const teamMembers: TeamMember[] = [
  // {
  //   id: "medjo-ines",
  //   name: "Rosine MEDJO",
  //   title: "PDG",
  //   bio: "Leader visionnaire avec une solide expérience dans la gestion d'entreprise et une passion pour l'innovation technologique.",
  //   avatar: "/images/pdg.jpeg",
  //   initials: "RM",
  // },
  {
    id: "brightman-efoo",
    name: "Brightman EFO'O",
    title: "Développeur Fullstack",
    bio: "Développeur passionné avec une expertise dans les technologies web modernes. Spécialisé dans la création d'applications web performantes et intuitives.",
    avatar: "/images/brightman.jpeg",
    initials: "BE",
    links: {
      github: "https://github.com/BrightkyEfoo",
      linkedin: "https://www.linkedin.com/in/brightkyefoo/",
      website: "https://brightman-efoo.scriptify.cm/",
    },
  },
  {
    id: "yann-etame",
    name: "Yann ETAME",
    title: "PDG (Développeur Fullstack)",
    bio: "Expert en développement web et mobile, avec une passion pour les interfaces utilisateur réactives et les architectures robustes.",
    avatar: "/images/etame2.jpeg",
    initials: "YE",
    links: {
      github: "https://github.com/papsrowan",
      linkedin: "https://www.linkedin.com/in/etame-eboa-a58878282/",
      website: "https://yann-etame.scriptify.cm/",
    },
  },
  {
    id: "kazebie-heroine",
    name: "Heroine KAZEBIE",
    title: "Directeur Département Communication",
    bio: "Expert en stratégie de communication avec une compréhension approfondie des médias sociaux et du marketing digital.",
    avatar: "/images/heroine.jpg",
    initials: "HK",
    links: {
      linkedin: "https://cm.linkedin.com/in/heroine-kazebie",
      website: "https://kazebie-heroine.scriptify.cm/",
    },
  },
];

export default function TeamSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="team" className="py-20">
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
            Notre Équipe
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Une équipe talentueuse et passionnée pour concrétiser vos projets
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24 border-4 border-gray-100 dark:border-gray-800">
                      <AvatarImage
                        src={member.avatar}
                        className="object-cover"
                        alt={member.name}
                      />
                      <AvatarFallback className="text-xl bg-brand-green text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-brand-blue dark:text-brand-green font-medium">
                    {member.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {member.bio}
                  </p>
                </CardContent>
                {member.links && (
                  <CardFooter className="flex justify-center gap-4 pt-2">
                    {member.links.github && (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              window.open(member.links?.github, "_blank")
                            }
                          >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-40">
                          <p className="text-sm text-center">GitHub Profile</p>
                        </HoverCardContent>
                      </HoverCard>
                    )}
                    {member.links.linkedin && (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              window.open(member.links?.linkedin, "_blank")
                            }
                          >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-40">
                          <p className="text-sm text-center">
                            LinkedIn Profile
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    )}
                    {member.links.website && (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              window.open(member.links?.website, "_blank")
                            }
                          >
                            <ExternalLink className="h-5 w-5" />
                            <span className="sr-only">Website</span>
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-40">
                          <p className="text-sm text-center">
                            Personal Website
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    )}
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
