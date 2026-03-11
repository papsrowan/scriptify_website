"use client";

import { motion } from "framer-motion";
import { Eye, Target, Users, Shield, UserCheck, Award, Lightbulb } from "lucide-react";

export default function VisionSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="vision" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-brand-blue to-brand-blue bg-clip-text text-transparent">
            Notre Vision & Objectifs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce qui guide Scriptify vers l'excellence et l'innovation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-brand-green mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Vision */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-brand-blue to-brand-blue p-4 rounded-full shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Notre Vision</h3>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
              <p className="text-gray-700 leading-relaxed mb-4">
                Devenir la référence en matière de transformation digitale au Cameroun et en Afrique centrale,
                en accompagnant les entreprises dans leur évolution technologique pour qu'elles restent
                compétitives dans un monde en constante évolution.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nous croyons que chaque entreprise, quelle que soit sa taille, mérite d'accéder aux
                meilleurs outils technologiques pour réussir dans l'économie numérique.
              </p>
            </div>
          </motion.div>

          {/* Objectifs */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-brand-green to-brand-green p-4 rounded-full shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Nos Objectifs</h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation Continue",
                  desc: "Rester à la pointe des technologies émergentes et les adapter au contexte africain"
                },
                {
                  icon: Users,
                  title: "Impact Local",
                  desc: "Contribuer au développement de l'écosystème tech camerounais et africain"
                },
                {
                  icon: Shield,
                  title: "Excellence Opérationnelle",
                  desc: "Développer des solutions robustes, sécurisées et évolutives pour nos clients"
                },
                {
                  icon: UserCheck,
                  title: "Accompagnement Personnalisé",
                  desc: "Offrir un service sur mesure adapté aux besoins spécifiques de chaque entreprise"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  variants={fadeInUp}
                >
                  <div className="bg-gradient-to-br from-brand-green to-brand-blue p-2 rounded-full flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Valeurs clés */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-12">Nos Valeurs Clés</h3>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {[
              {
                icon: Shield,
                title: "Intégrité",
                desc: "Transparence et honnêteté dans toutes nos relations professionnelles"
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "Recherche constante de solutions créatives et adaptées"
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Engagement envers la qualité et la satisfaction client"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                variants={fadeInUp}
              >
                <div className="bg-gradient-to-br from-brand-green to-brand-blue p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3 text-xl">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
          