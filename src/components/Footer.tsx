"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { Separator } from "./ui/separator";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src={
                  theme === "dark"
                    ? "/images/SCRIPTY_n-20.png"
                    : "/images/SCRIPTY_n_Plan_de_travail_1_copie_5.png"
                }
                alt="Scriptify Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Transformez vos idées en réalité avec nos solutions digitales
              personnalisées. Du développement web à l'IA, nous sommes votre
              partenaire technique.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/share/1EuNNGzbgc/?mibextid=wwXIfr"
                className="text-gray-500 hover:text-brand-blue dark:hover:text-brand-green"
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
              </Link>
              <Link
                href="https://github.com/scriptify-cm"
                className="text-gray-500 hover:text-brand-blue dark:hover:text-brand-green"
                aria-label="Github"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/scriptify-sarl/posts/?feedView=all"
                className="text-gray-500 hover:text-brand-blue dark:hover:text-brand-green"
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
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Nos Services
                </a>
              </li>
              <li>
                <a
                  href="#realisations"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Nos réalisations
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Notre Équipe
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Tarifs
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Développement Web
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Développement Mobile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Community Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-green"
                >
                  Solutions IA
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic">
              <div className="flex items-start space-x-3 mb-3">
                <svg
                  className="h-5 w-5 text-brand-blue dark:text-brand-green mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  Douala, Cameroun
                </span>
              </div>

              <div className="flex items-start space-x-3 mb-3">
                <svg
                  className="h-5 w-5 text-brand-blue dark:text-brand-green mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  contact@scriptify.cm
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <svg
                  className="h-5 w-5 text-brand-blue dark:text-brand-green mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  +237 657 841 880
                </span>
              </div>
            </address>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {currentYear} Scriptify. Tous droits réservés.</p>
          <p className="mt-2">Digitalisez aujourd’hui. Dominez demain.</p>
        </div>
      </div>
    </footer>
  );
}
