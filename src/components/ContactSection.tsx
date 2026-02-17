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
import { FaGit, FaGithub, FaWhatsapp } from "react-icons/fa";
import { Resend } from "resend";
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(5, { message: "Le sujet doit contenir au moins 5 caractères" }),
  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" }),
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

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      await fetch("/api/send-mail", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
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
          <motion.div variants={containerVariants} className="space-y-8">
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

            <motion.div
              variants={itemVariants}
              className="flex items-start space-x-4"
            >
              <div className="bg-brand-blue dark:bg-brand-green text-white p-3 rounded-full">
                <FaWhatsapp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Téléphone</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  +237 657 841 880
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Avec un temps de reponse tres rapide
                </p>
              </div>
            </motion.div>

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

            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/1EuNNGzbgc/?mibextid=wwXIfr"
                  className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full hover:bg-brand-blue hover:text-white dark:hover:bg-brand-green transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/scriptify-cm"
                  className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full hover:bg-brand-blue hover:text-white dark:hover:bg-brand-green transition-colors"
                  aria-label="github"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/scriptify-sarl/posts/?feedView=all"
                  className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full hover:bg-brand-blue hover:text-white dark:hover:bg-brand-green transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

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
                      Merci ! Votre message a été envoyé avec succès. Nous vous
                      contacterons bientôt.
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
