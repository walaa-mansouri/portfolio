const body = document.body;

const NAV_OFFSET = 84;

function animatedScrollTo(targetY, duration = 650) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 1) return;
  let startTime = null;
  function easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuad(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function scrollToTop() {
  animatedScrollTo(0);
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navEl = document.getElementById('siteNav');
  const navHeight = navEl ? navEl.getBoundingClientRect().height : NAV_OFFSET;
  const offset = navHeight + 24;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  animatedScrollTo(Math.max(0, top));
}

function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

/* ================= TRANSLATIONS ================= */
const translations = {
  en: {
    meta: {
      title: "Web Design & Website Development in Paris | Walaa Mansouri",
      description: "Professional, fast and multilingual websites for small businesses and independent professionals in Paris. Free consultation."
    },
    nav: { home: "Home", services: "Services", work: "Projects", process: "How it works", faq: "FAQ", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Full-Stack Developer · Paris",
      title: "Websites that bring your business to life.",
      sub: "Building fast, modern websites for real businesses.",
      cta1: "Let's build your site",
      cta2: "Get a quote",
      marquee: "Websites that bring your business to life.",
      scroll: "Scroll"
    },
    status: { available: "Available for work", availableSub: "Open to new client projects", languages: "Languages", french: "French", english: "English", arabic: "Arabic" },
    loc: { label: "Location", value: "Paris, France", note: "Université Paris Cité · Computer Science" },
    about: {
      eyebrow: "About me",
      lead: "Hi, I'm Walaa. I'm a web developer based in Paris, with a background in computer science and a passion for building things that are both beautiful and technically solid.",
      p1: "I enjoy working at the intersection of design and development - turning an idea or a business into a polished website that feels intentional on every screen.",
      p2: "Alongside web development, I was selected for a supervised university research project in cryptography, where I studied RSA and real-world security. It taught me to approach technical problems with curiosity, precision and attention to detail - a mindset I bring to every website I build."
    },
    aboutBackground: [
      "Computer Science · Université Paris Cité",
      "Web Development Internship · Sirius Net",
      "Cryptography Research · RSA"
    ],
    whyus: {
      item1title: "Mobile-first", item1body: "Every site is built and tested to look great and work smoothly on phones first.",
      item2title: "Built to be found", item2body: "Fast, structured and technically optimized with search engines in mind.",
      item3title: "Multilingual FR / EN / AR", item3body: "Reach customers in their own language, with each version built for its own audience.",
      item4title: "Direct collaboration", item4body: "You work directly with me - no account manager, no middleman."
    },
    packages: {
      eyebrow: "Services",
      title: "Two ways to get online.",
      body: "A landing page that makes a strong first impression - or the same landing page with a custom CMS, so you can manage your own content. More formats are on the way."
    },
    packageList: [
      {
        name: "Landing Page",
        tagline: "A complete online presence, built around one clear goal - your business, distilled into one beautiful page.",
        priceLabel: "Starting from",
        price: "€400",
        oldPrice: "€500",
        badge: "Introductory offer",
        perfectFor: ["Dentists", "Doctors", "Lawyers", "Beauty professionals", "Restaurants", "Freelancers", "Local businesses"],
        categories: [
          { title: "Design", items: ["Custom visual direction", "Responsive design", "Mobile optimization"] },
          { title: "Content structure", items: ["Hero section", "Services", "About", "Benefits", "Testimonials", "FAQ", "Contact CTA"] },
          { title: "Technical", items: ["Fast loading", "SEO basics", "Contact form", "Domain connection", "Deployment"] },
          { title: "After launch", items: ["2 rounds of revisions", "7 days of post-launch support"] }
        ],
        customNote: "Need something more specific? Tell me about your project and I'll give you a custom quote.",
        cta: "Discuss your project"
      },
      {
        name: "Landing Page + CMS",
        tagline: "Everything in the Landing Page package, plus a custom admin panel - update your own content, prices and hours anytime, no code needed.",
        priceLabel: "Starting from",
        price: "€800",
        badge: "Includes custom CMS",
        perfectFor: ["Restaurants", "Boutiques", "Salons", "Local businesses", "Anyone who updates content often"],
        categories: [
          { title: "Design", items: ["Custom visual direction", "Responsive design", "Mobile optimization"] },
          { title: "Content structure", items: ["Hero section", "Services / menu", "About", "Benefits", "Testimonials", "FAQ", "Contact CTA"] },
          { title: "Technical", items: ["Fast loading", "SEO basics", "Contact form", "Domain connection", "Deployment", "Custom CMS / admin panel", "Editable content, prices & hours", "Secure login"] },
          { title: "After launch", items: ["2 rounds of revisions", "7 days of post-launch support", "Training session on using your CMS"] }
        ],
        customNote: "Need something more specific? Tell me about your project and I'll give you a custom quote.",
        cta: "Discuss your project"
      }
    ],
    comingSoonLabel: "Coming soon",
    comingSoon: ["Business Websites", "Booking Systems", "Multilingual Websites"],
    process: { eyebrow: "How it works" },
    processSteps: [
      { title: "Tell me about your business", sub: "A short call or a simple form - 15–20 minutes." },
      { title: "Get your design", sub: "You receive the first version and give feedback." },
      { title: "Build & optimize", sub: "Responsive, fast, and SEO-ready." },
      { title: "Launch", sub: "Your website goes live and you get everything you need." }
    ],
    exp: { eyebrow: "Experience" },
    experience: [
      { role: "Technical & Digital Marketing Manager", org: "Hannachi Couture", period: "Since January 2026", points: ["Overseeing the company's website and technical operations.", "Running digital marketing campaigns and content across social channels.", "Bridging technical execution and marketing strategy for the brand."] },
      { role: "Web Dev Intern", org: "Sirius Net", period: "Summer 2025", points: ["Responsive multilingual site - design to production.", "Gemini AI chatbot integrated, shipped to real users.", "Clean code reviewed and merged by senior team."] },
      { role: "Tutor", org: "Independent", period: "Ongoing", points: ["Programming & math tutoring.", "Complex ideas made practical and clear.", "Trust built through structured guidance."] },
    ],
    research: {
      eyebrow: "Research in cryptography", title: "Supervised research in RSA cryptography",
      body: "Selected for a university research project studying RSA and real-world security - part of how I learned to build things properly, not just make them look good.",
      view: "View project"
    },
    projects: {
      eyebrow: "Work · Case study",
      p1: {
        title: "Mirasens - A website designed to answer visitors, not just look good",
        body: "A multilingual (FR/EN) production website with a live AI assistant, built to help visitors get answers without waiting on a reply from the team.",
        challengeLabel: "The challenge",
        challengeBody: "The business needed a fast, bilingual site that could answer visitor questions instantly - without a support team on standby.",
        approachLabel: "What I did",
        approachBody: "Designed and built the site, set up FR/EN structure and SEO, then integrated an AI assistant to handle real visitor questions live.",
        resultLabel: "The result",
        resultBody: "A production website launched for real users, running live at mirasens.com today.",
        tag1: "Multilingual FR/EN",
        tag2: "AI Assistant",
        tag3: "SEO-ready",
        cta: "Visit mirasens.com"
      },
      p2: {
        eyebrow: "Projects · Client work",
        title: "Le Pacha - Restaurant Website & Custom CMS",
        body: "A real one-page website built for a real client - Le Pacha, a Turkish restaurant in Villejuif - with SEO, a reservation call-to-action, and a custom admin panel so the owner can update the menu and opening hours themselves.",
        challengeLabel: "The challenge",
        challengeBody: "The owner needed a professional site to be found on Google locally and showcase the menu, but couldn't afford a developer every time a dish or price changed.",
        approachLabel: "My approach",
        approachBody: "Designed and built a responsive one-page site (hero, menu highlights, gallery, hours, contact) optimized for local SEO, then built a custom CMS/admin panel from scratch so the client can add, edit or remove menu items, prices and categories, and update opening hours, with no coding needed.",
        resultLabel: "The result",
        resultBody: "Delivered end-to-end as an independent freelance project, live in production and used daily by a real restaurant owner.",
        tag1: "Freelance Client Project · 2026",
        tag2: "Custom CMS / Admin Panel",
        tag3: "Local SEO · Responsive Design",
        cta: "Visit lepacha.netlify.app"
      }
    },
    researchModal: {
      kicker: "Initiation to Research · L1 Computer Science",
      title: "The RSA Cryptosystem",
      subtitle: "Mathematical Foundations and Security Analysis",
      supervisorLabel: "Supervisor",
      recoLabel: "Recommendation",
      schoolLabel: "School",
      abstract: "This project studies the RSA cryptosystem (Rivest, Shamir, Adleman, 1978), one of the most influential public-key algorithms in the history of computer security. After introducing classical and modern cryptography - substitution and stream ciphers, symmetric AES encryption, Diffie-Hellman key exchange and hash functions - it builds the mathematical toolkit behind RSA: modular arithmetic, the extended Euclidean algorithm, Euler's totient function, Euler's theorem, the Chinese remainder theorem and fast modular exponentiation. It then details RSA end to end: key generation, encryption, decryption, digital signatures and the RSA-CRT optimization. A dedicated security analysis studies integer factorization (Pollard's rho, the quadratic sieve, the general number field sieve) and several concrete attacks - the common modulus attack, the blinding attack exploiting RSA's multiplicative homomorphism, and Bleichenbacher's attack on PKCS#1 padding, which recovers a message after roughly 10⁶ queries and once compromised SSL/TLS in practice.",
      planTitle: "Outline",
      plan1title: "Introduction to cryptography",
      plan1sub: "Classical ciphers · Diffie-Hellman",
      plan2title: "Mathematical foundations",
      plan2sub: "Modular arithmetic · Euler · extended Euclid",
      plan3title: "The RSA algorithm",
      plan3sub: "Key generation · Encryption · Signature",
      plan4title: "Security analysis &amp; attacks",
      plan4sub: "Factorization · Common modulus · Bleichenbacher",
      plan5title: "Conclusion &amp; perspectives",
      plan5sub: "RSA vs. post-quantum · Dropped in TLS 1.3",
      downloadExpose: "Download the Exposé (PDF)",
      downloadRapport: "Download the Rapport (PDF)"
    },
    faq: { eyebrow: "FAQ" },
    faqItems: [
      { q: "How much does a website cost?", a: "It depends on scope - see the packages above for what's included in each. Tell me about your business and I'll reply with a free, no-obligation quote." },
      { q: "How long does it take?", a: "Most landing pages and business websites take a few weeks from our first call to launch, depending on how quickly content and feedback come back." },
      { q: "Do you provide hosting?", a: "I can guide you through hosting and domain setup, or handle it for you as part of the project." },
      { q: "Can you improve my existing website?", a: "Yes - send me your current site and I'll suggest concrete improvements, or rebuild it from scratch if that's a better fit." },
      { q: "Can you make it multilingual?", a: "Yes. I build in French, English and Arabic, with proper structure and language tags for each - not just a text swap." },
      { q: "Can I update the content myself afterwards?", a: "Yes - I can set things up so simple text and image changes are easy for you, or handle updates for you with an ongoing maintenance option." }
    ],
    contact: {
      eyebrow: "Contact", heading: "Ready to build?",
      eyebrowNum: "Contact",
      headingLine1: "Let's talk about",
      headingLine2: "your website",
      marquee: "Let's build together",
      body: "Tell me about your business and what you need. I'll reply with a free consultation and a clear plan - no pressure, no jargon.",
      cta: "Start a conversation",
      formName: "Your name",
      formEmail: "Your email",
      formBusiness: "Your business / what you do",
      formNeedDefault: "What do you need?",
      formNeed1: "New website",
      formNeed2: "Redesign an existing site",
      formNeed3: "Landing page",
      formNeed4: "Website + booking",
      formNeed5: "Multilingual website",
      formNeed6: "Not sure yet",
      formHasSiteLabel: "Do you already have a website?",
      yes: "Yes", no: "No",
      formWebsiteUrl: "https://your-current-site.com",
      formBudgetDefault: "Approximate budget",
      formBudget1: "Under €500", formBudget2: "€500 – €750", formBudget3: "€750 – €1,000",
      formBudget4: "€1,000+", formBudget5: "Not sure",
      formMessage: "A few words about your project",
      formPreferenceLabel: "How would you like to continue?",
      prefCall: "I'd like to book a call", prefEmail: "I'd prefer to continue by email",
      prefExploring: "I'm just exploring for now",
      sending: "Sending...", success: "Thanks! I've received your project and will reply within 1-2 business days.",
      errorGeneric: "Something went wrong - please try again or email me directly.",
      errorFields: "Please fill in the required fields.",
      emailLabel: "Email", locationLabel: "Location", locationValueInline: "Paris, France",
      languagesLabel: "Languages", availabilityLabel: "Availability", availabilityValueInline: "Open to projects"
    },
    footer: { line1: "© 2026 Walaa Mansouri", line2: "Full-Stack Web Developer · Paris" }
  },
  fr: {
    meta: {
      title: "Création de sites internet à Paris | Walaa Mansouri",
      description: "Sites internet professionnels, rapides et multilingues pour indépendants et petites entreprises à Paris. Consultation gratuite."
    },
    nav: { home: "Accueil", services: "Services", work: "Projets", process: "Comment ça marche", faq: "FAQ", about: "À propos", contact: "Contact" },
    hero: {
      eyebrow: "Développeuse Web Full-Stack · Paris",
      title: "Des sites web qui donnent vie à votre activité.",
      sub: "Des sites rapides et modernes pour de vraies entreprises.",
      cta1: "Construisons votre site",
      cta2: "Demander un devis",
      marquee: "Des sites web qui donnent vie à votre activité.",
      scroll: "Défiler"
    },
    status: { available: "Disponible pour des missions", availableSub: "Ouverte à de nouveaux projets clients", languages: "Langues", french: "Français", english: "Anglais", arabic: "Arabe" },
    loc: { label: "Localisation", value: "Paris, France", note: "Université Paris Cité · Informatique" },
    about: {
      eyebrow: "À propos de moi",
      lead: "Bonjour, je suis Walaa. Je suis développeuse web basée à Paris, avec une formation en informatique et une passion pour créer des choses à la fois belles et techniquement solides.",
      p1: "J'aime travailler à l'intersection du design et du développement - transformer une idée ou une entreprise en un site web abouti, pensé jusque dans le moindre détail.",
      p2: "En parallèle du développement web, j'ai été sélectionnée pour un projet de recherche universitaire encadré en cryptographie, où j'ai étudié RSA et la sécurité réelle. Cela m'a appris à aborder les problèmes techniques avec curiosité, précision et souci du détail - un état d'esprit que j'apporte à chaque site que je construis."
    },
    aboutBackground: [
      "Informatique · Université Paris Cité",
      "Stage en développement web · Sirius Net",
      "Recherche en cryptographie · RSA"
    ],
    whyus: {
      item1title: "Mobile-first", item1body: "Chaque site est pensé et testé pour bien s'afficher et fonctionner d'abord sur mobile.",
      item2title: "Pensé pour être trouvé", item2body: "Rapide, structuré et techniquement optimisé pour les moteurs de recherche.",
      item3title: "Multilingue FR / EN / AR", item3body: "Touchez vos clients dans leur langue, avec une version pensée pour chaque public.",
      item4title: "Collaboration directe", item4body: "Vous travaillez directement avec moi - sans chargé de compte, sans intermédiaire."
    },
    packages: {
      eyebrow: "Services",
      title: "Deux façons d'être en ligne.",
      body: "Une page d'atterrissage qui fait une forte première impression - ou la même page accompagnée d'un CMS sur mesure pour gérer votre propre contenu. D'autres formules arrivent bientôt."
    },
    packageList: [
      {
        name: "Page d'atterrissage",
        tagline: "Une présence en ligne complète, construite autour d'un objectif clair - votre entreprise, distillée en une seule et belle page.",
        priceLabel: "À partir de",
        price: "400 €",
        oldPrice: "500 €",
        badge: "Offre de lancement",
        perfectFor: ["Dentistes", "Médecins", "Avocats", "Professionnels de la beauté", "Restaurants", "Freelances", "Commerces locaux"],
        categories: [
          { title: "Design", items: ["Direction visuelle sur mesure", "Design responsive", "Optimisation mobile"] },
          { title: "Structure du contenu", items: ["Section héro", "Services", "À propos", "Avantages", "Témoignages", "FAQ", "Appel à l'action"] },
          { title: "Technique", items: ["Chargement rapide", "SEO de base", "Formulaire de contact", "Connexion du domaine", "Mise en ligne"] },
          { title: "Après le lancement", items: ["2 tours de révisions", "7 jours de support après lancement"] }
        ],
        customNote: "Besoin de quelque chose de plus spécifique ? Parlez-moi de votre projet et je vous ferai un devis sur mesure.",
        cta: "Discuter de votre projet"
      },
      {
        name: "Page d'atterrissage + CMS",
        tagline: "Tout ce qui est inclus dans la Page d'atterrissage, plus un panneau d'administration sur mesure - modifiez vous-même votre contenu, vos prix et vos horaires à tout moment, sans code.",
        priceLabel: "À partir de",
        price: "800 €",
        badge: "Inclut un CMS sur mesure",
        perfectFor: ["Restaurants", "Boutiques", "Salons", "Commerces locaux", "Toute activité qui met à jour son contenu souvent"],
        categories: [
          { title: "Design", items: ["Direction visuelle sur mesure", "Design responsive", "Optimisation mobile"] },
          { title: "Structure du contenu", items: ["Section héro", "Services / menu", "À propos", "Avantages", "Témoignages", "FAQ", "Appel à l'action"] },
          { title: "Technique", items: ["Chargement rapide", "SEO de base", "Formulaire de contact", "Connexion du domaine", "Mise en ligne", "CMS / panneau d'administration sur mesure", "Contenu, prix & horaires modifiables", "Connexion sécurisée"] },
          { title: "Après le lancement", items: ["2 tours de révisions", "7 jours de support après lancement", "Session de formation à l'utilisation du CMS"] }
        ],
        customNote: "Besoin de quelque chose de plus spécifique ? Parlez-moi de votre projet et je vous ferai un devis sur mesure.",
        cta: "Discuter de votre projet"
      }
    ],
    comingSoonLabel: "Bientôt disponible",
    comingSoon: ["Sites vitrines", "Systèmes de réservation", "Sites multilingues"],
    process: { eyebrow: "Comment ça marche" },
    processSteps: [
      { title: "Parlez-moi de votre entreprise", sub: "Un court appel ou un formulaire simple - 15 à 20 minutes." },
      { title: "Recevez votre design", sub: "Vous recevez une première version et donnez vos retours." },
      { title: "Construction & optimisation", sub: "Responsive, rapide et prêt pour le SEO." },
      { title: "Mise en ligne", sub: "Votre site est publié et vous recevez tout ce dont vous avez besoin." }
    ],
    exp: { eyebrow: "Expérience" },
    experience: [
      { role: "Responsable Technique et Marketing Digital", org: "Hannachi Couture", period: "Depuis janvier 2026", points: ["Supervision du site web et des aspects techniques de l'entreprise.", "Pilotage des campagnes de marketing digital et du contenu sur les réseaux sociaux.", "Lien entre exécution technique et stratégie marketing pour la marque."] },
      { role: "Stagiaire Dev Web", org: "Sirius Net", period: "Été 2025", points: ["Site multilingue responsive - de la conception à la production.", "Chatbot IA Gemini intégré, livré à de vrais utilisateurs.", "Code propre relu et validé par l'équipe senior."] },
      { role: "Professeure particulière", org: "Indépendant", period: "En cours", points: ["Cours de programmation et de mathématiques.", "Des idées complexes rendues concrètes et claires.", "Une confiance construite par un accompagnement structuré."] },
    ],
    research: {
      eyebrow: "Recherche en cryptographie", title: "Recherche encadrée en cryptographie RSA",
      body: "Sélectionnée pour un projet de recherche universitaire étudiant RSA et la sécurité réelle - une part de ce qui m'a appris à construire les choses correctement, pas seulement à les rendre jolies.",
      view: "Voir le projet"
    },
    projects: {
      eyebrow: "Réalisations · Étude de cas",
      p1: {
        title: "Mirasens - Un site pensé pour répondre aux visiteurs, pas seulement pour être joli",
        body: "Un site professionnel bilingue (FR/EN) en production, avec un assistant IA en direct, conçu pour que les visiteurs obtiennent des réponses sans attendre l'équipe.",
        challengeLabel: "Le défi",
        challengeBody: "L'entreprise avait besoin d'un site bilingue rapide, capable de répondre instantanément aux visiteurs - sans équipe support disponible en permanence.",
        approachLabel: "Ce que j'ai fait",
        approachBody: "Conception et développement du site, mise en place de la structure FR/EN et du SEO, puis intégration d'un assistant IA pour répondre en direct aux vrais visiteurs.",
        resultLabel: "Le résultat",
        resultBody: "Un site en production, livré à de vrais utilisateurs, toujours en ligne aujourd'hui sur mirasens.com.",
        tag1: "Multilingue FR/EN",
        tag2: "Assistant IA",
        tag3: "Prêt pour le SEO",
        cta: "Voir mirasens.com"
      },
      p2: {
        eyebrow: "Projets · Client réel",
        title: "Le Pacha - Site web restaurant & CMS sur mesure",
        body: "Un vrai site one-page réalisé pour un vrai client - Le Pacha, restaurant turc à Villejuif - avec SEO, un call-to-action réservation, et un panneau d'administration sur mesure permettant au propriétaire de modifier lui-même le menu et les horaires.",
        challengeLabel: "Le défi",
        challengeBody: "Le propriétaire avait besoin d'un site professionnel, visible sur Google localement, présentant son menu, sans avoir à payer un développeur à chaque changement de plat ou de prix.",
        approachLabel: "Mon approche",
        approachBody: "Conception et développement d'un site one-page responsive (hero, plats phares, galerie, horaires, contact) optimisé pour le SEO local, puis création d'un CMS/panneau d'administration sur mesure permettant au client d'ajouter, modifier ou supprimer des plats, prix et catégories, et de mettre à jour les horaires, sans aucune compétence en code.",
        resultLabel: "Le résultat",
        resultBody: "Livré de bout en bout en tant que projet freelance indépendant, en production et utilisé quotidiennement par un vrai restaurateur.",
        tag1: "Projet client freelance · 2026",
        tag2: "CMS / panneau d'administration sur mesure",
        tag3: "SEO local · Design responsive",
        cta: "Visiter lepacha.netlify.app"
      }
    },
    researchModal: {
      kicker: "Initiation à la recherche · L1 Informatique",
      title: "Le Cryptosystème RSA",
      subtitle: "Fondements Mathématiques et Analyse de Sécurité",
      supervisorLabel: "Encadrante",
      recoLabel: "Recommandation",
      schoolLabel: "École",
      abstract: "Ce projet étudie le cryptosystème RSA (Rivest, Shamir, Adleman, 1978), l'un des algorithmes à clé publique les plus influents de l'histoire de la sécurité informatique. Après une introduction à la cryptographie classique et moderne - chiffrements par substitution et par flot, chiffrement symétrique AES, échange de clés Diffie-Hellman et fonctions de hachage - le rapport construit les outils mathématiques nécessaires à RSA : arithmétique modulaire, algorithme d'Euclide étendu, indicatrice d'Euler, théorème d'Euler, théorème des restes chinois et exponentiation modulaire rapide. Il détaille ensuite RSA de bout en bout : génération des clés, chiffrement, déchiffrement, signature numérique et optimisation RSA-CRT. Une analyse de sécurité dédiée étudie la factorisation d'entiers (ρ de Pollard, crible quadratique, crible algébrique) ainsi que plusieurs attaques concrètes - l'attaque par module commun, l'attaque par masquage exploitant l'homomorphisme multiplicatif de RSA, et l'attaque de Bleichenbacher sur le bourrage PKCS#1, qui retrouve un message après environ 10⁶ requêtes et a compromis SSL/TLS en pratique.",
      planTitle: "Plan de l'exposé",
      plan1title: "Introduction à la cryptographie",
      plan1sub: "Chiffrements classiques · Diffie-Hellman",
      plan2title: "Fondements mathématiques",
      plan2sub: "Arithmétique modulaire · Euler · Euclide étendu",
      plan3title: "L'algorithme RSA",
      plan3sub: "Génération des clés · Chiffrement · Signature",
      plan4title: "Analyse de sécurité &amp; Attaques",
      plan4sub: "Factorisation · Module commun · Bleichenbacher",
      plan5title: "Conclusion &amp; Perspectives",
      plan5sub: "RSA face au post-quantique · Abandon dans TLS 1.3",
      downloadExpose: "Télécharger l'Exposé (PDF)",
      downloadRapport: "Télécharger le Rapport (PDF)"
    },
    faq: { eyebrow: "FAQ" },
    faqItems: [
      { q: "Combien coûte un site internet ?", a: "Cela dépend du périmètre - voir les formules ci-dessus pour le contenu de chacune. Parlez-moi de votre entreprise et je vous réponds avec un devis gratuit et sans engagement." },
      { q: "Combien de temps ça prend ?", a: "La plupart des pages d'atterrissage et sites vitrines sont livrés en quelques semaines à partir de notre premier échange, selon la rapidité des retours et du contenu." },
      { q: "Fournissez-vous l'hébergement ?", a: "Je peux vous accompagner pour l'hébergement et le nom de domaine, ou m'en charger directement dans le cadre du projet." },
      { q: "Pouvez-vous améliorer mon site existant ?", a: "Oui - envoyez-moi votre site actuel et je vous proposerai des améliorations concrètes, ou une refonte complète si c'est plus adapté." },
      { q: "Pouvez-vous le rendre multilingue ?", a: "Oui. Je développe en français, anglais et arabe, avec une structure et des balises de langue propres à chacune - pas une simple traduction du texte." },
      { q: "Pourrai-je modifier le contenu moi-même ensuite ?", a: "Oui - je peux organiser le site pour que les modifications simples de texte ou d'images soient faciles pour vous, ou m'en occuper via une formule de maintenance." }
    ],
    contact: {
      eyebrow: "Contact", heading: "Prêt à construire ?",
      eyebrowNum: "Contact",
      headingLine1: "Parlons de",
      headingLine2: "votre site",
      marquee: "Construisons ensemble",
      body: "Dites-moi ce que fait votre entreprise et ce dont vous avez besoin. Je vous réponds avec une consultation gratuite et un plan clair - sans pression, sans jargon.",
      cta: "Démarrer une conversation",
      formName: "Votre nom",
      formEmail: "Votre email",
      formBusiness: "Votre entreprise / activité",
      formNeedDefault: "De quoi avez-vous besoin ?",
      formNeed1: "Nouveau site",
      formNeed2: "Refonte d'un site existant",
      formNeed3: "Page d'atterrissage",
      formNeed4: "Site + réservation",
      formNeed5: "Site multilingue",
      formNeed6: "Je ne sais pas encore",
      formHasSiteLabel: "Avez-vous déjà un site web ?",
      yes: "Oui", no: "Non",
      formWebsiteUrl: "https://votre-site-actuel.com",
      formBudgetDefault: "Budget approximatif",
      formBudget1: "Moins de 500 €", formBudget2: "500 € – 750 €", formBudget3: "750 € – 1 000 €",
      formBudget4: "1 000 € et plus", formBudget5: "Je ne sais pas",
      formMessage: "Quelques mots sur votre projet",
      formPreferenceLabel: "Comment souhaitez-vous continuer ?",
      prefCall: "Je souhaite réserver un appel", prefEmail: "Je préfère continuer par email",
      prefExploring: "Je me renseigne pour l'instant",
      sending: "Envoi en cours...", success: "Merci ! J'ai bien reçu votre projet et je vous réponds sous 1-2 jours ouvrés.",
      errorGeneric: "Une erreur s'est produite - réessayez ou écrivez-moi directement par email.",
      errorFields: "Merci de remplir les champs obligatoires.",
      emailLabel: "Email", locationLabel: "Localisation", locationValueInline: "Paris, France",
      languagesLabel: "Langues", availabilityLabel: "Disponibilité", availabilityValueInline: "Ouverte aux projets"
    },
    footer: { line1: "© 2026 Walaa Mansouri", line2: "Développeuse Web Full-Stack · Paris" }
  },
  ar: {
    meta: {
      title: "تصميم وتطوير المواقع الإلكترونية في باريس | ولاء منصوري",
      description: "مواقع إلكترونية احترافية وسريعة ومتعددة اللغات للشركات الصغيرة والمهنيين المستقلين في باريس. استشارة مجانية."
    },
    nav: { home: "الرئيسية", services: "الخدمات", work: "المشاريع", process: "كيف نعمل", faq: "الأسئلة الشائعة", about: "نبذة", contact: "تواصل" },
    hero: {
      eyebrow: "مطوّرة ويب Full-Stack · باريس",
      title: "موقع يعرّف الناس بمشروعك ويترك انطباعًا يدوم.",
      sub: "أصمّم مواقع واضحة وسريعة تساعد عملاءك على التعرف إلى خدماتك والتواصل معك.",
      cta1: "خلّينا نبدأ مشروعك",
      cta2: "اطلب عرض سعر",
      marquee: "موقع يعرّف الناس بمشروعك ويترك انطباعًا يدوم.",
      scroll: "مرّر"
    },
    status: { available: "متاحة للعمل", availableSub: "أستقبل مشاريع جديدة حاليًا", languages: "اللغات", french: "الفرنسية", english: "الإنجليزية", arabic: "العربية" },
    loc: { label: "الموقع", value: "باريس، فرنسا", note: "جامعة باريس سيتي · علوم الحاسوب" },
    about: {
      eyebrow: "نبذة عني",
      lead: "أهلًا، أنا ولاء. مطوّرة مواقع وطالبة علوم الحاسوب في باريس. أساعد أصحاب المشاريع على تقديم أعمالهم على الإنترنت بطريقة مرتّبة وسهلة الاستخدام.",
      p1: "أحب أن أجمع بين التصميم والبرمجة لأصنع موقعًا يناسب طبيعة كل مشروع، بدل أن أقدّم التصميم نفسه للجميع.",
      p2: "إلى جانب عملي في تطوير المواقع، أنجزت بحثًا جامعيًا بإشراف أكاديمي حول تشفير RSA وأمنه. ساعدني هذا العمل على تعميق فهمي للتقنيات التي أستخدمها، وعلى التعامل مع المشكلات بدقة وصبر."
    },
    aboutBackground: [
      "علوم حاسوب · جامعة باريس سيتيه",
      "تدريب في تطوير الويب · Sirius Net",
      "بحث في التشفير · RSA"
    ],
    whyus: {
      item1title: "مصمّم للهاتف أولًا", item1body: "أحرص على أن يكون الموقع واضحًا وسهل الاستخدام على الهاتف، ثم على بقية الشاشات.",
      item2title: "أساس تقني يساعد على الظهور", item2body: "أهتم بسرعة التحميل وتنظيم الصفحات والأساسيات التي تساعد محركات البحث على فهم الموقع.",
      item3title: "متعدد اللغات FR / EN / AR", item3body: "أقدّم محتوى يناسب جمهورك بالعربية أو الفرنسية أو الإنجليزية، وليس ترجمة كلمة بكلمة.",
      item4title: "تعاون مباشر", item4body: "تتواصل معي مباشرة من أول نقاش إلى تسليم الموقع، دون وسطاء."
    },
    packages: {
      eyebrow: "الخدمات",
      title: "طريقتان للتواجد على الإنترنت.",
      body: "صفحة هبوط تترك انطباعًا أول قويًا على الإنترنت - أو نفس الصفحة مع نظام إدارة محتوى مخصص لإدارة محتواك بنفسك. المزيد من الصيغ قادم قريبًا."
    },
    packageList: [
      {
        name: "صفحة هبوط",
        tagline: "حضور كامل على الإنترنت، مبني حول هدف واحد واضح - اسم مشروعك أو مجال عملك، مُختزَل في صفحة واحدة جميلة.",
        priceLabel: "ابتداءً من",
        price: "400 €",
        oldPrice: "500 €",
        badge: "عرض إطلاق",
        perfectFor: ["أطباء الأسنان", "الأطباء", "المحامون", "خبراء التجميل", "المطاعم", "المستقلون", "الأنشطة المحلية"],
        categories: [
          { title: "التصميم", items: ["توجيه بصري مخصص", "تصميم متجاوب", "تحسين للهاتف"] },
          { title: "بنية المحتوى", items: ["قسم رئيسي", "الخدمات", "نبذة", "المزايا", "الشهادات", "الأسئلة الشائعة", "دعوة للتواصل"] },
          { title: "الجانب التقني", items: ["تحميل سريع", "أساسيات SEO", "نموذج تواصل", "ربط النطاق", "النشر"] },
          { title: "بعد الإطلاق", items: ["جولتا تعديل", "7 أيام دعم بعد الإطلاق"] }
        ],
        customNote: "تحتاج شيئًا أكثر تحديدًا؟ أخبرني عن مشروعك وسأعطيك عرض سعر مخصصًا.",
        cta: "ناقش مشروعك"
      },
      {
        name: "صفحة هبوط + نظام إدارة محتوى",
        tagline: "كل ما تتضمنه باقة صفحة الهبوط، بالإضافة إلى لوحة تحكم مخصصة - حدّث محتوى موقعك وأسعارك ومواعيدك بنفسك، دون الحاجة إلى البرمجة.",
        priceLabel: "ابتداءً من",
        price: "800 €",
        badge: "يشمل نظام إدارة محتوى مخصص",
        perfectFor: ["المطاعم", "المتاجر", "الصالونات", "الأنشطة المحلية", "أي نشاط يحدّث محتواه باستمرار"],
        categories: [
          { title: "التصميم", items: ["توجيه بصري مخصص", "تصميم متجاوب", "تحسين للهاتف"] },
          { title: "بنية المحتوى", items: ["قسم رئيسي", "الخدمات / القائمة", "نبذة", "المزايا", "الشهادات", "الأسئلة الشائعة", "دعوة للتواصل"] },
          { title: "الجانب التقني", items: ["تحميل سريع", "أساسيات SEO", "نموذج تواصل", "ربط النطاق", "النشر", "نظام إدارة محتوى / لوحة تحكم مخصصة", "محتوى وأسعار وساعات عمل قابلة للتعديل", "تسجيل دخول آمن"] },
          { title: "بعد الإطلاق", items: ["جولتا تعديل", "7 أيام دعم بعد الإطلاق", "جلسة تدريب على استخدام نظام إدارة المحتوى"] }
        ],
        customNote: "تحتاج شيئًا أكثر تحديدًا؟ أخبرني عن مشروعك وسأعطيك عرض سعر مخصصًا.",
        cta: "ناقش مشروعك"
      }
    ],
    comingSoonLabel: "قريبًا",
    comingSoon: ["مواقع تجارية", "أنظمة حجز", "مواقع متعددة اللغات"],
    process: { eyebrow: "كيف نعمل" },
    processSteps: [
      { title: "أخبرني عن نشاطك", sub: "مكالمة قصيرة أو نموذج بسيط - 15 إلى 20 دقيقة." },
      { title: "استلم تصميمك", sub: "أعرض عليك التصميم الأولي لنراجعه معًا." },
      { title: "البناء والتحسين", sub: "أطوّر الموقع وأختبره على مختلف الشاشات." },
      { title: "الإطلاق", sub: "يصبح موقعك الجديد مباشرًا وتحصل على كل ما تحتاجه." }
    ],
    exp: { eyebrow: "الخبرة" },
    experience: [
      { role: "مسؤولة تقنية وتسويق رقمي", org: "Hannachi Couture", period: "منذ يناير 2026", points: ["الإشراف على الموقع الإلكتروني والجوانب التقنية للشركة.", "إدارة حملات التسويق الرقمي والمحتوى عبر منصات التواصل الاجتماعي.", "الربط بين التنفيذ التقني والاستراتيجية التسويقية للعلامة التجارية."] },
      { role: "متدربة تطوير ويب", org: "Sirius Net", period: "صيف 2025", points: ["موقع متجاوب متعدد اللغات - من التصميم إلى الإنتاج.", "دمج روبوت محادثة Gemini، وتم إطلاقه لمستخدمين حقيقيين.", "كود نظيف تمت مراجعته واعتماده من فريق أول."] },
      { role: "مدرّسة خصوصية", org: "عمل حر", period: "مستمر", points: ["دروس في البرمجة والرياضيات.", "أفكار معقدة تصبح عملية وواضحة.", "بناء الثقة من خلال توجيه منظم."] },
    ],
    research: {
      eyebrow: "بحث في التشفير", title: "بحث جامعي حول تشفير RSA وأمنه",
      body: "عملت على دراسة الأسس الرياضية لتشفير RSA وتحليل بعض الهجمات عليه، وأعددت تقريرًا وتطبيقًا عمليًا بلغة Java.",
      view: "عرض المشروع"
    },
    projects: {
      eyebrow: "الأعمال · دراسة حالة",
      p1: {
        title: "Mirasens - موقع مصمم للإجابة على الزوار، لا لمجرد الشكل الجميل",
        body: "موقع للشركة بالفرنسية والإنجليزية، مع مساعد ذكاء اصطناعي، مصمم ليحصل الزوار على إجابات دون انتظار الفريق.",
        challengeLabel: "التحدي",
        challengeBody: "احتاجت الشركة إلى موقع ثنائي اللغة سريع، قادر على الإجابة عن أسئلة الزوار فورًا - دون فريق دعم متاح باستمرار.",
        approachLabel: "ما قمت به",
        approachBody: "صممت وطورت الموقع، وأعددت بنية ثنائية اللغة وتحسين محركات البحث، ثم دمجت مساعدًا بالذكاء الاصطناعي للرد المباشر على الزوار الحقيقيين.",
        resultLabel: "النتيجة",
        resultBody: "موقع في الإنتاج أُطلق لمستخدمين حقيقيين، وما زال يعمل اليوم على mirasens.com.",
        tag1: "ثنائي اللغة FR/EN",
        tag2: "مساعد ذكاء اصطناعي",
        tag3: "جاهز لتحسين محركات البحث",
        cta: "زيارة mirasens.com"
      },
      p2: {
        eyebrow: "المشاريع · عمل حقيقي مع عميل",
        title: "لو باشا - موقع مطعم مع نظام إدارة محتوى مخصص",
        body: "موقع من صفحة واحدة صممته لمطعم - مطعم لو باشا التركي في فيليجويف - مع تحسين لمحركات البحث SEO، وزر دعوة للحجز، ولوحة تحكم مخصصة تتيح لصاحب المطعم تعديل القائمة وساعات العمل بنفسه.",
        challengeLabel: "التحدي",
        challengeBody: "كان صاحب المطعم بحاجة إلى موقع احترافي يظهر في نتائج البحث المحلية على جوجل ويعرض القائمة، دون أن يضطر لدفع تكلفة مطوّر في كل مرة يتغير فيها طبق أو سعر.",
        approachLabel: "طريقة العمل",
        approachBody: "صممت وطورت موقعًا من صفحة واحدة متجاوبًا (قسم رئيسي، أطباق مميزة، معرض صور، ساعات العمل، تواصل) مع تحسين لمحركات البحث المحلية، ثم بنيت لوحة تحكم/نظام إدارة محتوى مخصصًا من الصفر يتيح للعميل إضافة وتعديل وحذف أطباق القائمة والأسعار والفئات، وتحديث ساعات العمل، دون أي حاجة للبرمجة.",
        resultLabel: "النتيجة",
        resultBody: "تم تسليم المشروع بالكامل كعمل مستقل، وهو الآن قيد التشغيل الفعلي ويستخدمه صاحب مطعم حقيقي يوميًا.",
        tag1: "مشروع عميل مستقل · 2026",
        tag2: "نظام إدارة محتوى / لوحة تحكم مخصصة",
        tag3: "SEO محلي · تصميم متجاوب",
        cta: "زيارة lepacha.netlify.app"
      }
    },
    researchModal: {
      kicker: "مشروع تمهيدي في البحث العلمي · السنة الأولى علوم الحاسوب",
      title: "خوارزمية التشفير RSA",
      subtitle: "الأسس الرياضية وتحليل الأمان",
      supervisorLabel: "المشرفة",
      recoLabel: "توصية",
      schoolLabel: "الجامعة",
      abstract: "يدرس هذا المشروع خوارزمية التشفير RSA (Rivest وShamir وAdleman، 1978)، أحد أكثر خوارزميات المفتاح العام تأثيرًا في تاريخ أمن المعلومات. بعد مقدمة عن التشفير الكلاسيكي والحديث، يبني التقرير الأدوات الرياضية اللازمة لفهم RSA: الحساب النمطي، خوارزمية إقليدس الممتدة، دالة أويلر، مبرهنة أويلر، مبرهنة الباقي الصيني والأس النمطي السريع. ثم يشرح RSA بالكامل: توليد المفاتيح، التشفير، فك التشفير، التوقيع الرقمي وتحسين RSA-CRT. ويخصص تحليلًا أمنيًا لطرق تفكيك الأعداد وعدة هجمات فعلية، من بينها هجوم Bleichenbacher الذي أثّر فعليًا على بروتوكولي SSL وTLS.",
      planTitle: "خطة العرض",
      plan1title: "مقدمة في التشفير",
      plan1sub: "التشفير الكلاسيكي · Diffie-Hellman",
      plan2title: "الأسس الرياضية",
      plan2sub: "الحساب النمطي · أويلر · إقليدس الممتد",
      plan3title: "خوارزمية RSA",
      plan3sub: "توليد المفاتيح · التشفير · التوقيع",
      plan4title: "تحليل الأمان والهجمات",
      plan4sub: "التفكيك · المعامل المشترك · Bleichenbacher",
      plan5title: "الخاتمة والآفاق",
      plan5sub: "RSA أمام الحوسبة الكمّية · التخلي عنه في TLS 1.3",
      downloadExpose: "تحميل العرض (PDF)",
      downloadRapport: "تحميل التقرير (PDF)"
    },
    faq: { eyebrow: "الأسئلة الشائعة" },
    faqItems: [
      { q: "كم تكلفة الموقع؟", a: "يعتمد ذلك على نطاق العمل - انظر الباقات أعلاه لمعرفة ما تشمله كل واحدة. أخبرني عن نشاطك وسأرد عليك بعرض سعر مجاني وغير مُلزم." },
      { q: "كم تستغرق المدة؟", a: "معظم صفحات الهبوط والمواقع التجارية تُسلَّم خلال أسابيع قليلة من أول مكالمة، حسب سرعة تجهيز المحتوى والملاحظات." },
      { q: "هل توفرين الاستضافة؟", a: "يمكنني إرشادك خلال إعداد الاستضافة والنطاق، أو تولي ذلك بنفسي ضمن المشروع." },
      { q: "هل يمكنك تحسين موقعي الحالي؟", a: "نعم - أرسل لي موقعك الجديد الحالي وسأقترح تحسينات محددة، أو إعادة بنائه بالكامل إن كان ذلك أنسب." },
      { q: "هل يمكن أن يكون الموقع متعدد اللغات؟", a: "نعم. أطوّر بالفرنسية والإنجليزية والعربية، ببنية وعلامات لغة صحيحة لكل نسخة - وليس مجرد ترجمة نصوص." },
      { q: "هل أستطيع تعديل المحتوى بنفسي لاحقًا؟", a: "نعم - يمكنني إعداد الموقع بحيث تكون تعديلات النصوص والصور البسيطة سهلة عليك، أو تولي ذلك عبر باقة صيانة مستمرة." }
    ],
    contact: {
      eyebrow: "تواصل", heading: "عندك مشروع؟ خلّينا نحكي عنه.",
      eyebrowNum: "تواصل",
      headingLine1: "خلّينا نتكلم عن",
      headingLine2: "موقعك الجديد",
      marquee: "فكرتك تستحق موقعًا يليق بها",
      body: "احكِ لي عن مشروعك وما الذي تحتاجه. سأساعدك على تحديد الخطوة المناسبة، وأرد عليك بوضوح ومن دون تعقيد.",
      cta: "أرسل تفاصيل مشروعك",
      formName: "اسمك",
      formEmail: "بريدك الإلكتروني",
      formBusiness: "اسم مشروعك أو مجال عملك",
      formNeedDefault: "ما الخدمة التي تبحث عنها؟",
      formNeed1: "موقع جديد",
      formNeed2: "إعادة تصميم موقع حالي",
      formNeed3: "صفحة هبوط",
      formNeed4: "موقع مع نظام حجز",
      formNeed5: "موقع متعدد اللغات",
      formNeed6: "لم أحدد بعد",
      formHasSiteLabel: "هل لديك موقع حاليًا؟",
      yes: "نعم", no: "لا",
      formWebsiteUrl: "https://موقعك الجديد-الحالي.com",
      formBudgetDefault: "الميزانية التقريبية",
      formBudget1: "أقل من 500 €", formBudget2: "500 – 750 €", formBudget3: "750 – 1000 €",
      formBudget4: "1000 € فأكثر", formBudget5: "لست متأكدًا",
      formMessage: "أخبرني باختصار عن مشروعك",
      formPreferenceLabel: "كيف تحب أن نكمل الحديث؟",
      prefCall: "أفضل أن نتحدث في مكالمة", prefEmail: "أفضل التواصل عبر البريد الإلكتروني",
      prefExploring: "أريد الاستفسار فقط في الوقت الحالي",
      sending: "جارٍ الإرسال...", success: "شكرًا! استلمت مشروعك وسأرد عليك خلال 1-2 يوم عمل.",
      errorGeneric: "حدث خطأ - يرجى المحاولة مجددًا أو مراسلتي مباشرة عبر البريد الإلكتروني.",
      errorFields: "يرجى تعبئة الحقول المطلوبة.",
      emailLabel: "البريد الإلكتروني", locationLabel: "الموقع", locationValueInline: "باريس، فرنسا",
      languagesLabel: "اللغات", availabilityLabel: "التوفر", availabilityValueInline: "متاحة لمشاريع جديدة"
    },
    footer: { line1: "© 2026 ولاء منصوري", line2: "مطوّرة ويب Full-Stack · باريس" }
  }






};

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
}

/* ---- Experience ---- */
const expList = document.getElementById('expList');
function renderExperience(lang) {
  if (!expList) return;
  expList.innerHTML = '';
  translations[lang].experience.forEach(exp => {
    const row = document.createElement('div');
    row.className = 'xp-row';
    row.innerHTML = `
    <div class="xp-head">
      <div><div class="xp-role">${exp.role}</div><div class="xp-org">${exp.org}</div></div>
      <span class="xp-period">${exp.period}</span>
    </div>
    <ul class="xp-points">${exp.points.map(p => `<li><i data-lucide="chevron-right" width="11" height="11"></i>${p}</li>`).join('')}</ul>
  `;
    expList.appendChild(row);
  });
  lucide.createIcons();
}

/* ---- About background (credibility list, kept small) ---- */
const aboutBgList = document.getElementById('aboutBgList');
function renderAboutBackground(lang) {
  if (!aboutBgList) return;
  aboutBgList.innerHTML = '';
  translations[lang].aboutBackground.forEach(line => {
    const li = document.createElement('li');
    li.innerHTML = `<i data-lucide="chevron-right" width="11" height="11"></i>${line}`;
    aboutBgList.appendChild(li);
  });
  lucide.createIcons();
}

/* ---- Landing Page offers (one or more packages) ---- */
const mainPackageEl = document.getElementById('mainPackage');
function renderMainPackage(lang) {
  if (!mainPackageEl) return;
  const t = translations[lang];
  mainPackageEl.innerHTML = `<div id="services"></div>` + t.packageList.map(p => `
    <div class="landing-package reveal visible">
      <div class="glass tilt" style="padding:32px;height:100%;">
        <div class="lp-top">
          <div>
            <div class="eyebrow" style="margin-bottom:4px;">${t.packages.eyebrow}</div>
            <div class="lp-name">${p.name}</div>
            <div class="lp-tagline">${p.tagline}</div>
          </div>
          <div class="lp-price-block">
            <div class="lp-price-label">${p.priceLabel}</div>
            <div class="lp-price">${p.price}${p.oldPrice ? `<span class="lp-price-old">${p.oldPrice}</span>` : ''}</div>
            ${p.badge ? `<div class="lp-price-badge">${p.badge}</div>` : ''}
          </div>
        </div>
        <div class="lp-perfect-row">
          ${p.perfectFor.map(x => `<span class="chip">${x}</span>`).join('')}
        </div>
        <div class="lp-categories">
          ${p.categories.map(cat => `
            <div>
              <div class="lp-cat-title">${cat.title}</div>
              <ul class="lp-cat-list">${cat.items.map(it => `<li><i data-lucide="check" width="13" height="13"></i>${it}</li>`).join('')}</ul>
            </div>`).join('')}
        </div>
        <div class="lp-bottom-row">
          <p class="lp-custom-note">${p.customNote}</p>
          <button class="btn-primary" data-portfolio-action="contact">
            <span>${p.cta}</span> <i data-lucide="arrow-right" width="14" height="14"></i>
          </button>
        </div>
      </div>
    </div>`).join('');
  lucide.createIcons();
}

/* ---- Coming soon services ---- */
const comingSoonGrid = document.getElementById('comingSoonGrid');
function renderComingSoon(lang) {
  if (!comingSoonGrid) return;
  comingSoonGrid.innerHTML = '';
  translations[lang].comingSoon.forEach(item => {
    const card = document.createElement('div');
    card.className = 'coming-soon-card reveal visible';
    card.innerHTML = `
      <div class="glass" style="padding:20px 22px;height:100%;">
        <span class="cs-badge">${translations[lang].comingSoonLabel}</span>
        <div class="cs-name">${item}</div>
      </div>`;
    comingSoonGrid.appendChild(card);
  });
}

/* ---- Process ---- */
const processGrid = document.getElementById('processGrid');
function renderProcess(lang) {
  if (!processGrid) return;
  processGrid.innerHTML = '';
  translations[lang].processSteps.forEach((step, i) => {
    const row = document.createElement('div');
    row.className = 'plan-row';
    row.innerHTML = `<span class="plan-num">0${i + 1}</span>
      <div><span class="plan-item-title">${step.title}</span><span class="plan-item-sub">${step.sub}</span></div>`;
    processGrid.appendChild(row);
  });
}

/* ---- FAQ ---- */
const faqList = document.getElementById('faqList');
function renderFaq(lang) {
  if (!faqList) return;
  faqList.innerHTML = '';
  translations[lang].faqItems.forEach((item, i) => {
    const det = document.createElement('details');
    det.className = 'faq-item';
    if (i === 0) det.open = true;
    det.innerHTML = `<summary>${item.q}<i data-lucide="plus" width="16" height="16" class="faq-plus"></i></summary><p>${item.a}</p>`;
    faqList.appendChild(det);
  });
  lucide.createIcons();
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getPath(translations[lang], key);
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = getPath(translations[lang], key);
    if (val !== undefined) el.setAttribute('placeholder', val);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    const val = getPath(translations[lang], key);
    if (val !== undefined) el.setAttribute('aria-label', val);
  });
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

  const meta = translations[lang].meta;
  if (meta && document.body.dataset.page === 'home') {
    document.title = meta.title;
    const descTag = document.getElementById('pageDesc');
    if (descTag) descTag.setAttribute('content', meta.description);
  }
}

// Building the below-the-fold sections (experience, about, packages, process,
// FAQ, etc.) is comparatively heavy DOM work and none of it is visible above
// the fold on load, so it doesn't need to compete with the hero for the main
// thread before first paint. requestIdleCallback runs it once the browser is
// done with more urgent work; setTimeout is the fallback for browsers
// (Safari) that don't support requestIdleCallback.
const scheduleIdle = window.requestIdleCallback || function (cb) { setTimeout(cb, 0); };

function renderBelowFold(lang) {
  renderExperience(lang);
  renderAboutBackground(lang);
  renderMainPackage(lang);
  renderComingSoon(lang);
  renderProcess(lang);
  renderFaq(lang);
}

function setLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyTranslations(lang);
  scheduleIdle(() => renderBelowFold(lang));
  try { localStorage.setItem('wm_lang', lang); } catch (e) { }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    try { localStorage.setItem('wm_lang', lang); } catch (e) { }
    const page = document.body.dataset.page || "home";
    window.location.href = `/${lang}/${page === "home" ? "" : page + "/"}`;
  });
});

function detectLangFromPath() {
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  return translations[seg] ? seg : null;
}

let initialLang = detectLangFromPath();
if (!initialLang) {
  try {
    const stored = localStorage.getItem('wm_lang');
    if (stored && translations[stored]) initialLang = stored;
  } catch (e) { }
}
if (!initialLang) {
  const browserLang = (navigator.language || '').slice(0, 2);
  initialLang = translations[browserLang] ? browserLang : 'en';
}
setLang(initialLang);

/* ================= CONTACT FORM (Netlify Function + Brevo, no database) ================= */
const CONTACT_API_URL = '/.netlify/functions/contact';
const contactForm = document.getElementById('contactForm');
let contactFormStartedAt = Date.now();
const cfHasSiteRadios = document.querySelectorAll('input[name="cfHasSite"]');
const cfWebsiteUrl = document.getElementById('cfWebsiteUrl');

function updateWebsiteUrlVisibility() {
  const checked = document.querySelector('input[name="cfHasSite"]:checked');
  if (!cfWebsiteUrl) return;
  cfWebsiteUrl.style.display = (checked && checked.value === 'yes') ? 'block' : 'none';
  if (!cfWebsiteUrl.style.display || cfWebsiteUrl.style.display === 'none') cfWebsiteUrl.value = '';
}
cfHasSiteRadios.forEach(r => r.addEventListener('change', updateWebsiteUrlVisibility));
updateWebsiteUrlVisibility();

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const statusEl = document.getElementById('cfStatus');
    const submitBtn = document.getElementById('cfSubmitBtn');
    const activeLang = document.documentElement.lang || 'en';
    const t = translations[activeLang] ? translations[activeLang].contact : translations.en.contact;

    // Honeypot: if this hidden field got filled, silently drop the submission (bot behaviour)
    const honeypot = document.getElementById('cfCompanyWebsite').value.trim();
    if (honeypot) return;

    const name = document.getElementById('cfName').value.trim();
    const email = document.getElementById('cfEmail').value.trim();
    const business = document.getElementById('cfBusiness').value.trim();
    const need = document.getElementById('cfNeed').value;
    const hasSite = (document.querySelector('input[name="cfHasSite"]:checked') || {}).value || 'no';
    const websiteUrl = document.getElementById('cfWebsiteUrl').value.trim();
    const budget = document.getElementById('cfBudget').value;
    const message = document.getElementById('cfMessage').value.trim();
    const preference = (document.querySelector('input[name="cfPreference"]:checked') || {}).value || 'email';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !business || !need || !message || !emailPattern.test(email)) {
      statusEl.textContent = t.errorFields;
      statusEl.className = 'cf-status error';
      return;
    }

    submitBtn.disabled = true;
    statusEl.textContent = t.sending;
    statusEl.className = 'cf-status';

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, business, need, hasSite, websiteUrl, budget, message, preference,
          companyWebsite: honeypot, lang: activeLang, formStartedAt: contactFormStartedAt
        })
      });

      if (!res.ok) throw new Error('Request failed');

      statusEl.textContent = t.success;
      statusEl.className = 'cf-status success';
      contactForm.reset();
      contactFormStartedAt = Date.now();
      updateWebsiteUrlVisibility();
    } catch (err) {
      statusEl.textContent = t.errorGeneric;
      statusEl.className = 'cf-status error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ================= NAV SCROLL STATE ================= */
const siteNav = document.getElementById('siteNav');
const navigationSections = ['home', 'services', 'projects', 'about', 'contact'];
function onScroll() {
  if (!siteNav) return;
  const page = document.body.dataset.page;
  if (page && page !== "home") {
    siteNav.classList.add("scrolled");
    document.querySelectorAll("[data-section]").forEach(link => {
      const active = link.dataset.section === page;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    return;
  }
  siteNav.classList.toggle('scrolled', window.scrollY > 40);
  // Each navbar item represents a separate page, not a homepage section.
  // Keep Accueil selected throughout the homepage, including at the footer.
  document.querySelectorAll('[data-section]').forEach(link => {
    const active = link.dataset.section === 'home';
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

/* Desktop language dropdown: accessible, closes on outside click and Escape. */
const languageMenu = document.getElementById('languageMenu');
const languageTrigger = document.getElementById('languageTrigger');
if (languageMenu && languageTrigger) {
  const closeLanguageMenu = () => {
    languageMenu.classList.remove('open');
    languageTrigger.setAttribute('aria-expanded', 'false');
  };
  languageTrigger.addEventListener('click', () => {
    const isOpen = languageMenu.classList.toggle('open');
    languageTrigger.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', event => {
    if (!languageMenu.contains(event.target)) closeLanguageMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLanguageMenu();
  });
}

/* ================= MOBILE MENU ================= */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');
hamburgerBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenuBtn.addEventListener('click', closeMobileMenu);

/* ================= SCROLL REVEAL (pop-in) ================= */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    io.observe(el);
  });
}
initReveal();

// tilt effect (delegated so dynamically-rendered .tilt cards still get it)
document.addEventListener('mousemove', (e) => {
  const card = e.target.closest && e.target.closest('.tilt');
  if (!card) return;
  const r = card.getBoundingClientRect();
  const rx = ((e.clientY - r.top) / r.height - 0.5) * 11;
  const ry = -((e.clientX - r.left) / r.width - 0.5) * 11;
  card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  card.style.transitionDuration = '0.1s';
});
document.addEventListener('mouseout', (e) => {
  const card = e.target.closest && e.target.closest('.tilt');
  if (!card) return;
  card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  card.style.transitionDuration = '0.5s';
});

/* ================= RESEARCH MODAL ================= */
const researchOverlay = document.getElementById('researchOverlay');
function openResearchModal() {
  researchOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeResearchModal() {
  researchOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && researchOverlay.classList.contains('open')) closeResearchModal();
});

/* ================= IMAGE GALLERIES (scrollable, 3 pics each) ================= */
function scrollGallery(btn, dir) {
  const wrap = btn.closest('.gallery-wrap');
  const track = wrap.querySelector('.gallery-track');
  const img = track.querySelector('.gallery-img');
  const amount = (img ? img.getBoundingClientRect().width : 300) + 16;
  track.scrollBy({ left: dir * amount, behavior: 'smooth' });
}

/* ================= IMAGE LIGHTBOX (click any gallery pic to zoom) ================= */
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImgEl = document.getElementById('lightboxImg');
let lightboxGroup = [];
let lightboxIndex = 0;

function showLightboxImage() {
  const img = lightboxGroup[lightboxIndex];
  if (!img) return;
  lightboxImgEl.src = img.src;
  lightboxImgEl.alt = img.alt || '';
}

function openLightbox(imgEl) {
  const group = imgEl.dataset.group;
  lightboxGroup = Array.from(document.querySelectorAll(`.gallery-img[data-group="${group}"]`));
  lightboxIndex = lightboxGroup.indexOf(imgEl);
  showLightboxImage();
  lightboxOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  if (!lightboxGroup.length) return;
  lightboxIndex = (lightboxIndex + dir + lightboxGroup.length) % lightboxGroup.length;
  showLightboxImage();
}

document.addEventListener('keydown', (e) => {
  if (!lightboxOverlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

/* ================= SCROLL PROGRESS BAR (simple, replaces dot navigation) ================= */
const scrollTrack = document.getElementById('scrollTrack');
const scrollFill = document.getElementById('scrollFill');
const backToTopBtn = document.getElementById('backToTop');

// Cache the scrollable height and only recompute it on resize/load, instead
// of forcing a layout read (scrollHeight/clientHeight) on every scroll tick.
let cachedScrollable = 0;
function recomputeScrollable() {
  const doc = document.documentElement;
  cachedScrollable = doc.scrollHeight - doc.clientHeight;
}

function updateScrollBar() {
  if (!scrollFill) return;
  const pct = cachedScrollable > 0 ? (window.scrollY / cachedScrollable) * 100 : 0;
  const clamped = Math.min(100, Math.max(0, pct));
  scrollFill.style.height = clamped + '%';
  if (scrollTrack) scrollTrack.setAttribute('aria-valuenow', Math.round(clamped));
}

function updateBackToTop() {
  if (!backToTopBtn) return;
  backToTopBtn.classList.toggle('visible', window.scrollY > 500);
}

// Single rAF-throttled scroll handler: all three scroll-driven updates
// (nav state, progress bar, back-to-top button) now read window.scrollY once
// per animation frame and batch their DOM writes together, instead of each
// running as its own listener and forcing the browser to re-layout three
// times per scroll event.
let scrollTicking = false;
function onScrollFrame() {
  onScroll();
  updateScrollBar();
  updateBackToTop();
  scrollTicking = false;
}
function handleScroll() {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(onScrollFrame);
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', recomputeScrollable, { passive: true });
// Deferred to the next frame: reading scrollHeight/clientHeight here forces
// a synchronous layout flush, and running it right after setLang()'s DOM
// writes turned that into an expensive forced reflow blocking first paint.
requestAnimationFrame(() => {
  recomputeScrollable();
  onScrollFrame();
});

if (scrollTrack) {
  let isDraggingTrack = false;

  function scrollToTrackPoint(clientY) {
    const rect = scrollTrack.getBoundingClientRect();
    let frac = (clientY - rect.top) / rect.height;
    frac = Math.min(1, Math.max(0, frac));
    const doc = document.documentElement;
    const target = frac * (doc.scrollHeight - doc.clientHeight);
    window.scrollTo(0, target);
  }

  scrollTrack.addEventListener('pointerdown', (e) => {
    isDraggingTrack = true;
    scrollTrack.setPointerCapture(e.pointerId);
    scrollToTrackPoint(e.clientY);
  });
  scrollTrack.addEventListener('pointermove', (e) => {
    if (!isDraggingTrack) return;
    scrollToTrackPoint(e.clientY);
  });
  scrollTrack.addEventListener('pointerup', () => { isDraggingTrack = false; });
  scrollTrack.addEventListener('pointercancel', () => { isDraggingTrack = false; });
}

/* Final pass: render any static Lucide icons (hero, chips, side-nav arrows, lightbox) */
lucide.createIcons();

window.scrollToId = function (id) {
  const section = document.getElementById(id);

  if (!section) {
    console.warn("Section not found:", id);
    return;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

// Delegated actions replace inline HTML handlers (compatible with a strict script CSP).
document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-portfolio-action]');
  if (!el) return;
  const action = el.dataset.portfolioAction;
  if ((action === 'research-overlay' || action === 'lightbox-overlay') && event.target !== el) return;
  const actions = {
    top: () => scrollToTop(),
    contact: () => scrollToId('contact'),
    'research-open': () => openResearchModal(),
    'research-close': () => closeResearchModal(),
    'research-overlay': () => closeResearchModal(),
    'lightbox-open': () => openLightbox(el),
    'lightbox-close': () => closeLightbox(),
    'lightbox-overlay': () => closeLightbox(),
    'lightbox-prev': () => lightboxNav(-1),
    'lightbox-next': () => lightboxNav(1),
    'gallery-prev': () => scrollGallery(el, -1),
    'gallery-next': () => scrollGallery(el, 1)
  };
  actions[action]?.();
});
