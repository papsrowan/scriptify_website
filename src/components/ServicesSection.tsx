"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import {
  GlobeIcon,
  SmartphoneIcon,
  BrainCircuitIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";

type ServiceItem = {
  name: string;
  price: string;
  description: string;
  features: string[];
  image?: string;
};

type ServiceCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  items: ServiceItem[];
};

const services: ServiceCategory[] = [
  {
    id: "web",
    title: "Pack Web – Création et Développement de Sites",
    icon: <GlobeIcon className="h-6 w-6" />,
    description: "Des sites web professionnels adaptés à tous les besoins.",
    items: [
      {
        name: "Entrée Digitale",
        price: "150 000 FCFA",
        description: "Site WordPress classique avec services de base",
        image: "/images/services/web/entry-digitale.jpg",
        features: [
          "Site WordPress classique",
          "Hébergement offert (1 an)",
          "VPS offert",
          "Nom de domaine offert (3 mois)",
          "Gestion de page offerte (1 mois)",
          "Assistant de publication offert (1 mois)",
        ],
      },
      {
        name: "Plat Principal Web",
        price: "750 000 FCFA",
        description: "Site web entièrement personnalisé avec maintenance",
        image: "/images/services/web/plat-principal-web.jpg",
        features: [
          "Site web entièrement personnalisé",
          "Hébergement (VPS offert 3 mois)",
          "Maintenance offerte (1 an)",
          "Cahier des charges inclus",
        ],
      },
      {
        name: "Expérience Prestige",
        price: "1 800 000 FCFA",
        description: "Solution de haute qualité pour projets d'envergure",
        image: "/images/services/web/experience-prestige.jpg",
        features: [
          "Site web pour institutions, entreprises ou projets de grande envergure",
          "Maintenance offerte (6 mois)",
          "DNS offert (1 an)",
          "Hébergement (3 mois)",
          "Suivi du projet avec rapports réguliers",
          "Séance pilote",
          "Guide d'utilisation et vidéo explicative",
        ],
      },
    ],
  },
  {
    id: "marketing",
    title: "Pack Marketing Digital – Visibilité et Engagement",
    icon: <UsersIcon className="h-6 w-6" />,
    description:
      "Optimisation de la présence en ligne et acquisition de clients.",
    items: [
      {
        name: "Pack 'Visibilité Express'",
        price: "150 000 FCFA",
        description:
          "Campagne publicitaire ciblée pour acquérir de nouveaux clients",
        image: "/images/services/marketing/visibilite-express.jpg",
        features: [
          "Campagne publicitaire ciblée sur Facebook & Instagram (1 mois)",
          "Création de visuels et textes attractifs",
          "Analyse des performances et ajustements",
        ],
      },
      {
        name: "Pack 'SEO Boost'",
        price: "250 000 FCFA",
        description: "Optimisation pour les moteurs de recherche",
        image: "/images/services/marketing/seo-boost.jpg",
        features: [
          "Audit SEO et recommandations",
          "Optimisation technique du site (vitesse, balises, indexation)",
          "Création de contenus optimisés (3 articles ou pages)",
        ],
      },
      {
        name: "Pack 'Community Management'",
        price: "à partir de 350 000 FCFA",
        description: "Gestion professionnelle de vos réseaux sociaux",
        image: "/images/services/marketing/community-management.jpg",
        features: [
          "Gestion des réseaux sociaux (Facebook, Instagram, LinkedIn)",
          "Création et publication de contenus (4 posts/semaine)",
          "Animation de la communauté et gestion des messages",
          "Analyse et reporting mensuel",
        ],
      },
    ],
  },
  {
    id: "combined",
    title: "Pack Web + Marketing Digital – Solution Complète",
    icon: <SmartphoneIcon className="h-6 w-6" />,
    description:
      "Une combinaison puissante pour lancer et promouvoir son activité en ligne.",
    items: [
      {
        name: "Menu 'Entrée Digitale Boostée'",
        price: "250 000 FCFA",
        description: "Site web basique avec campagne publicitaire",
        image: "/images/services/combined/entry-digitale-boostee.jpg",
        features: [
          "Pack 'Entrée Digitale'",
          "Pack 'Visibilité Express' (publicité Facebook & Instagram 1 mois)",
        ],
      },
      {
        name: "Menu 'Plat Principal Web & Visibilité'",
        price: "900 000 FCFA",
        description: "Site personnalisé avec stratégie de visibilité",
        image: "/images/services/combined/plat-principal-web-visibilite.jpg",
        features: [
          "Pack 'Plat Principal Web'",
          "Gestion des réseaux sociaux (3 mois)",
          "Stratégie SEO de base",
        ],
      },
      {
        name: "Menu 'Expérience Prestige & Impact'",
        price: "2 500 000 FCFA",
        description: "Solution complète haut de gamme",
        image: "/images/services/combined/experience-prestige-impact.jpg",
        features: [
          "Pack 'Expérience Prestige'",
          "SEO avancé (audit + optimisation + contenus)",
          "Publicité en ligne (Google Ads & Réseaux Sociaux)",
          "Gestion des réseaux sociaux (2 mois)",
        ],
      },
    ],
  },
  {
    id: "ai",
    title: "Packs IA – Automatisation et Intelligence Artificielle",
    icon: <BrainCircuitIcon className="h-6 w-6" />,
    description:
      "Des solutions IA pour optimiser votre activité et améliorer l'expérience utilisateur.",
    items: [
      {
        name: "Pack 'IA Chatbot Business'",
        price: "500 000 FCFA",
        description: "Chatbot intelligent pour site web et réseaux sociaux",
        image: "/images/services/ai/ia-chatbot-business.jpg",
        features: [
          "Chatbot intelligent pour site web et réseaux sociaux",
          "Réponses automatiques aux questions fréquentes",
          "Intégration WhatsApp, Messenger, Instagram",
          "Personnalisation des scénarios de conversation",
        ],
      },
      {
        name: "Pack 'SEO & Contenu IA'",
        price: "600 000 FCFA",
        description: "Génération automatique d'articles optimisés pour le SEO",
        image: "/images/services/ai/seo-contenu-ia.jpg",
        features: [
          "Génération automatique d'articles optimisés pour le SEO",
          "Suggestions intelligentes de mots-clés et balises",
          "Planification et publication automatique sur WordPress",
          "Optimisation continue basée sur l'analyse du trafic",
        ],
      },
      {
        name: "Pack 'E-commerce IA'",
        price: "1 200 000 FCFA",
        description: "Solutions IA pour boutiques en ligne",
        image: "/images/services/ai/e-commerce-ia.jpg",
        features: [
          "Recommandations de produits basées sur le comportement client",
          "Chatbot de vente et support client 24/7",
          "Génération automatique de descriptions produits optimisées",
          "Analyse avancée des ventes et des tendances",
        ],
      },
    ],
  },
];

export default function ServicesSection() {
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

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
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
            Nos Services
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Des packs adaptés à tous vos besoins, de la création de site à
            l'automatisation par IA
          </motion.p>
        </motion.div>

        <motion.div variants={containerVariants}>
          <Tabs defaultValue="web" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-background">
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex items-center gap-2 py-3 dark:data-[state=active]:!border-blue-300/15 dark:data-[state=active]:border"
                >
                  {service.icon}
                  <span className="hidden md:inline">
                    {service.id.charAt(0).toUpperCase() + service.id.slice(1)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <motion.div
                  variants={itemVariants}
                  className="mb-8 text-center"
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-brand-blue dark:text-brand-green mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {service.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.items.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                        <div className="relative h-48 bg-primary border-b border-border">
                          <Image
                            src={item.image || ""}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader className="pb-4">
                          <CardTitle className=" border-border border-b-2 pb-2 w-fit">
                            {item.name}
                          </CardTitle>
                          <CardDescription className="text-lg mt-1">
                            {item.description}
                          </CardDescription>
                          <p className="text-2xl font-bold mt-2 text-primary dark:text-secondary">
                            {item.price}
                          </p>
                        </CardHeader>
                        <CardContent className="flex-grow pb-6">
                          <ul className="space-y-2">
                            {item.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2 mt-1 text-brand-green">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20 6L9 17L4 12"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <span className="text-sm">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <div className="p-6 pt-0 mt-auto">
                          <Button
                            onClick={handleScrollToContact}
                            className="w-full bg-gradient-to-r from-brand-green to-brand-blue hover:opacity-90 text-white"
                          >
                            Obtenir un devis
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
