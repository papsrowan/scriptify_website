"use client";

"use client";

export default function PDGSection() {
  return (
    <section id="pdg" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mot du PDG
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Photo du PDG */}
            <div className="text-center">
              <img src="/images/etame2.jpeg" alt="ETAME EBOA YANN ROWAN" className="w-50 h-50 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">ETAME EBOA YANN ROWAN</h3>
              <p className="text-blue-600 font-medium">PDG & Fondateur</p>
              <p className="text-gray-600 text-sm">Scriptify</p>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="text-4xl text-blue-200 absolute -top-4 -left-4">"</div>
                <blockquote className="text-lg text-gray-700 leading-relaxed italic bg-gray-50 p-8 rounded-lg border-l-4 border-blue-600">
                  "Dans un monde où la technologie évolue à une vitesse fulgurante, Scriptify s'engage
                  à être le partenaire de confiance des entreprises camerounaises et africaines.
                  Notre mission est simple : transformer vos idées en réalités digitales performantes
                  et sécurisées.

                  Depuis notre création, nous avons eu le privilège d'accompagner plus de 50 entreprises
                  dans leur transformation digitale. Chaque projet est une opportunité d'innover,
                  d'apprendre et de contribuer au développement de l'écosystème tech africain.

                  Nous croyons fermement que l'excellence technologique doit être accessible à tous,
                  indépendamment de la taille de l'entreprise. C'est pourquoi nous mettons l'accent
                  sur des solutions sur mesure, évolutives et adaptées au contexte africain.

                  Ensemble, construisons l'avenir digital de l'Afrique."
                </blockquote>
              </div>

              <div className="mt-6 text-right">
                <p className="text-gray-900 font-semibold">ETAME EBOA YANN ROWAN</p>
                <p className="text-gray-600 text-sm">PDG & Fondateur, Scriptify</p>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Projets Réalisés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-gray-600">Années d'Expérience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Client</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Technique</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
         