"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import { PhoneIcon, Mail, MapPin } from "lucide-react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  phone: z.string().optional(),
  subject: z.string().min(5, {
    message: "Le sujet doit contenir au moins 5 caractères",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const sendToWhatsapp = (data: FormValues) => {
    const baseNumber = "237657841880";

    const text = `Bonjour, j'ai un nouveau message :

Nom : ${data.name}
Email : ${data.email}
Téléphone : ${data.phone ?? "Non renseigné"}

Sujet : ${data.subject}

Message :
${data.message}`;

    const url = `https://wa.me/${baseNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);

    sendToWhatsapp(data);

    setIsSuccess(true);
    form.reset();

    setIsSubmitting(false);
  };

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
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
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
            Contactez-nous
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Discutons de votre projet et de comment nous pouvons vous aider
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* Infos */}
          <motion.div variants={containerVariants} className="space-y-8">

            {/* Téléphone */}
            <motion.div
              variants={itemVariants}
              className="flex items-start space-x-4"
            >
              <div className="bg-brand-blue dark:bg-brand-green text-white p-3 rounded-full">
                <PhoneIcon className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Téléphone</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  +237 657 841 880
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Du lundi au vendredi, 8h - 18h
                </p>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              variants={itemVariants}
              className="flex items-start space-x-4"
            >
              <div className="bg-brand-blue dark:bg-brand-green text-white p-3 rounded-full">
                <FaWhatsapp className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">WhatsApp</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  +237 657 841 880
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Temps de réponse très rapide
                </p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={itemVariants}
              className="flex items-start space-x-4"
            >
              <div className="bg-brand-blue dark:bg-brand-green text-white p-3 rounded-full">
                <Mail className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  contact@scriptify.cm
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Nous répondons sous 24h
                </p>
              </div>
            </motion.div>

            {/* Localisation */}
            <motion.div
              variants={itemVariants}
              className="flex items-start space-x-4"
            >
              <div className="bg-brand-blue dark:bg-brand-green text-white p-3 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-1">Localisation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Douala, Cameroun
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Rencontres sur rendez-vous
                </p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>

              <div className="flex space-x-4">
                <a
                  href="https://github.com/scriptify-cm"
                  className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full hover:bg-brand-blue hover:text-white dark:hover:bg-brand-green transition-colors"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Formulaire */}
          <motion.div variants={containerVariants}>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="+237 6xx xxx xxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Sujet de votre message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez votre projet ou votre demande"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-green to-brand-blue hover:opacity-90 text-white py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>

                  {isSuccess && (
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md text-center">
                      Merci ! Votre message a été envoyé avec succès.
                    </div>
                  )}
                </motion.div>

              </form>
            </Form>

          </motion.div>
        </div>
      </div>
    </section>
  );
}