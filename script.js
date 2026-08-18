// theme toggle
const body = document.body;
const themeBtn = document.getElementById('themeToggle');
function paintThemeIcon() {
  const dark = body.classList.contains('dark');
  themeBtn.innerHTML = dark ? '<i data-lucide="sun" width="13" height="13"></i>' : '<i data-lucide="moon" width="13" height="13"></i>';
  lucide.createIcons();
}
themeBtn.addEventListener('click', () => { body.classList.toggle('dark'); paintThemeIcon(); });

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
    nav: { services: "Services", work: "Work", process: "How it works", faq: "FAQ", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Full-Stack Developer · Paris",
      title: "Walaa<br>Mansouri",
      sub: "Building fast, modern websites for real businesses.",
      cta1: "Let's build your site",
      cta2: "Get a quote",
      marquee: "Full-Stack Developer · Paris",
      scroll: "Scroll"
    },
    status: { available: "Available for work", availableSub: "Open to new client projects", languages: "Languages", french: "French", english: "English", arabic: "Arabic" },
    loc: { label: "Location", value: "Paris, France", note: "Université Paris Cité · Computer Science" },
    about: {
      eyebrow: "About me",
      lead: "Hi, I'm Walaa. I'm a web developer based in Paris, with a background in computer science and a passion for building things that are both beautiful and technically solid.",
      p1: "I enjoy working at the intersection of design and development — turning an idea or a business into a polished website that feels intentional on every screen.",
      p2: "Alongside web development, I was selected for a supervised university research project in cryptography, where I studied RSA and real-world security. It taught me to approach technical problems with curiosity, precision and attention to detail — a mindset I bring to every website I build."
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
      item4title: "Direct collaboration", item4body: "You work directly with me — no account manager, no middleman."
    },
    packages: {
      eyebrow: "Services",
      title: "One offer, done properly.",
      body: "I'm starting focused: landing pages that make a strong first impression online. More formats are on the way."
    },
    mainPackage: {
      name: "Landing Page",
      tagline: "A complete online presence, built around one clear goal — your business, distilled into one beautiful page.",
      priceLabel: "Starting from",
      price: "€XXX",
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
    comingSoonLabel: "Coming soon",
    comingSoon: ["Business Websites", "Booking Systems", "Multilingual Websites"],
    process: { eyebrow: "How it works" },
    processSteps: [
      { title: "Tell me about your business", sub: "A short call or a simple form — 15–20 minutes." },
      { title: "Get your design", sub: "You receive the first version and give feedback." },
      { title: "Build & optimize", sub: "Responsive, fast, and SEO-ready." },
      { title: "Launch", sub: "Your website goes live and you get everything you need." }
    ],
    exp: { eyebrow: "Experience" },
    experience: [
      { role: "Web Dev Intern", org: "Sirius Net", period: "Summer 2025", points: ["Responsive multilingual site — design to production.", "Gemini AI chatbot integrated, shipped to real users.", "Clean code reviewed and merged by senior team."] },
      { role: "Tutor", org: "Independent", period: "Ongoing", points: ["Programming & math tutoring.", "Complex ideas made practical and clear.", "Trust built through structured guidance."] },
    ],
    research: {
      eyebrow: "Research in cryptography", title: "Supervised research in RSA cryptography",
      body: "Selected for a university research project studying RSA and real-world security — part of how I learned to build things properly, not just make them look good.",
      view: "View project"
    },
    projects: {
      eyebrow: "Work · Case study",
      p1: {
        title: "Mirasens — A website designed to answer visitors, not just look good",
        body: "A multilingual (FR/EN) production website with a live AI assistant, built to help visitors get answers without waiting on a reply from the team.",
        challengeLabel: "The challenge",
        challengeBody: "The business needed a fast, bilingual site that could answer visitor questions instantly — without a support team on standby.",
        approachLabel: "What I did",
        approachBody: "Designed and built the site, set up FR/EN structure and SEO, then integrated an AI assistant to handle real visitor questions live.",
        resultLabel: "The result",
        resultBody: "A production website launched for real users, running live at mirasens.com today.",
        tag1: "Multilingual FR/EN",
        tag2: "AI Assistant",
        tag3: "SEO-ready",
        cta: "Visit mirasens.com"
      }
    },
    researchModal: {
      kicker: "Initiation to Research · L1 Computer Science",
      title: "The RSA Cryptosystem",
      subtitle: "Mathematical Foundations and Security Analysis",
      supervisorLabel: "Supervisor",
      recoLabel: "Recommendation",
      schoolLabel: "School",
      abstract: "This project studies the RSA cryptosystem (Rivest, Shamir, Adleman, 1978), one of the most influential public-key algorithms in the history of computer security. After introducing classical and modern cryptography — substitution and stream ciphers, symmetric AES encryption, Diffie-Hellman key exchange and hash functions — it builds the mathematical toolkit behind RSA: modular arithmetic, the extended Euclidean algorithm, Euler's totient function, Euler's theorem, the Chinese remainder theorem and fast modular exponentiation. It then details RSA end to end: key generation, encryption, decryption, digital signatures and the RSA-CRT optimization. A dedicated security analysis studies integer factorization (Pollard's rho, the quadratic sieve, the general number field sieve) and several concrete attacks — the common modulus attack, the blinding attack exploiting RSA's multiplicative homomorphism, and Bleichenbacher's attack on PKCS#1 padding, which recovers a message after roughly 10⁶ queries and once compromised SSL/TLS in practice.",
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
      { q: "How much does a website cost?", a: "It depends on scope — see the packages above for what's included in each. Tell me about your business and I'll reply with a free, no-obligation quote." },
      { q: "How long does it take?", a: "Most landing pages and business websites take a few weeks from our first call to launch, depending on how quickly content and feedback come back." },
      { q: "Do you provide hosting?", a: "I can guide you through hosting and domain setup, or handle it for you as part of the project." },
      { q: "Can you improve my existing website?", a: "Yes — send me your current site and I'll suggest concrete improvements, or rebuild it from scratch if that's a better fit." },
      { q: "Can you make it multilingual?", a: "Yes. I build in French, English and Arabic, with proper structure and language tags for each — not just a text swap." },
      { q: "Can I update the content myself afterwards?", a: "Yes — I can set things up so simple text and image changes are easy for you, or handle updates for you with an ongoing maintenance option." }
    ],
    contact: {
      eyebrow: "Contact", heading: "Ready to build?",
      eyebrowNum: "Contact",
      headingLine1: "Let's talk about",
      headingLine2: "your website",
      marquee: "Let's build together",
      body: "Tell me about your business and what you need. I'll reply with a free consultation and a clear plan — no pressure, no jargon.",
      cta: "Request a free consultation",
      formName: "Your name",
      formBusiness: "Your business / what you do",
      formNeedDefault: "What do you need?",
      formNeed1: "New website",
      formNeed2: "Redesign an existing site",
      formNeed3: "Landing page",
      formNeed4: "Website + booking",
      formNeed5: "Multilingual website",
      formNeed6: "Not sure yet",
      formMessage: "A few words about your project",
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
    nav: { services: "Services", work: "Réalisations", process: "Comment ça marche", faq: "FAQ", about: "À propos", contact: "Contact" },
    hero: {
      eyebrow: "Développeuse Web Full-Stack · Paris",
      title: "Walaa<br>Mansouri",
      sub: "Des sites rapides et modernes pour de vraies entreprises.",
      cta1: "Construisons votre site",
      cta2: "Demander un devis",
      marquee: "Développeuse Web Full-Stack · Paris",
      scroll: "Défiler"
    },
    status: { available: "Disponible pour des missions", availableSub: "Ouverte à de nouveaux projets clients", languages: "Langues", french: "Français", english: "Anglais", arabic: "Arabe" },
    loc: { label: "Localisation", value: "Paris, France", note: "Université Paris Cité · Informatique" },
    about: {
      eyebrow: "À propos de moi",
      lead: "Bonjour, je suis Walaa. Je suis développeuse web basée à Paris, avec une formation en informatique et une passion pour créer des choses à la fois belles et techniquement solides.",
      p1: "J'aime travailler à l'intersection du design et du développement — transformer une idée ou une entreprise en un site web abouti, pensé jusque dans le moindre détail.",
      p2: "En parallèle du développement web, j'ai été sélectionnée pour un projet de recherche universitaire encadré en cryptographie, où j'ai étudié RSA et la sécurité réelle. Cela m'a appris à aborder les problèmes techniques avec curiosité, précision et souci du détail — un état d'esprit que j'apporte à chaque site que je construis."
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
      item4title: "Collaboration directe", item4body: "Vous travaillez directement avec moi — sans chargé de compte, sans intermédiaire."
    },
    packages: {
      eyebrow: "Services",
      title: "Une offre, bien faite.",
      body: "Je démarre avec un seul objectif : des pages d'atterrissage qui font une forte première impression en ligne. D'autres formules arrivent bientôt."
    },
    mainPackage: {
      name: "Page d'atterrissage",
      tagline: "Une présence en ligne complète, construite autour d'un objectif clair — votre entreprise, distillée en une seule et belle page.",
      priceLabel: "À partir de",
      price: "XXX €",
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
    comingSoonLabel: "Bientôt disponible",
    comingSoon: ["Sites vitrines", "Systèmes de réservation", "Sites multilingues"],
    process: { eyebrow: "Comment ça marche" },
    processSteps: [
      { title: "Parlez-moi de votre entreprise", sub: "Un court appel ou un formulaire simple — 15 à 20 minutes." },
      { title: "Recevez votre design", sub: "Vous recevez une première version et donnez vos retours." },
      { title: "Construction & optimisation", sub: "Responsive, rapide et prêt pour le SEO." },
      { title: "Mise en ligne", sub: "Votre site est publié et vous recevez tout ce dont vous avez besoin." }
    ],
    exp: { eyebrow: "Expérience" },
    experience: [
      { role: "Stagiaire Dev Web", org: "Sirius Net", period: "Été 2025", points: ["Site multilingue responsive — de la conception à la production.", "Chatbot IA Gemini intégré, livré à de vrais utilisateurs.", "Code propre relu et validé par l'équipe senior."] },
      { role: "Professeure particulière", org: "Indépendant", period: "En cours", points: ["Cours de programmation et de mathématiques.", "Des idées complexes rendues concrètes et claires.", "Une confiance construite par un accompagnement structuré."] },
    ],
    research: {
      eyebrow: "Recherche en cryptographie", title: "Recherche encadrée en cryptographie RSA",
      body: "Sélectionnée pour un projet de recherche universitaire étudiant RSA et la sécurité réelle — une part de ce qui m'a appris à construire les choses correctement, pas seulement à les rendre jolies.",
      view: "Voir le projet"
    },
    projects: {
      eyebrow: "Réalisations · Étude de cas",
      p1: {
        title: "Mirasens — Un site pensé pour répondre aux visiteurs, pas seulement pour être joli",
        body: "Un site professionnel bilingue (FR/EN) en production, avec un assistant IA en direct, conçu pour que les visiteurs obtiennent des réponses sans attendre l'équipe.",
        challengeLabel: "Le défi",
        challengeBody: "L'entreprise avait besoin d'un site bilingue rapide, capable de répondre instantanément aux visiteurs — sans équipe support disponible en permanence.",
        approachLabel: "Ce que j'ai fait",
        approachBody: "Conception et développement du site, mise en place de la structure FR/EN et du SEO, puis intégration d'un assistant IA pour répondre en direct aux vrais visiteurs.",
        resultLabel: "Le résultat",
        resultBody: "Un site en production, livré à de vrais utilisateurs, toujours en ligne aujourd'hui sur mirasens.com.",
        tag1: "Multilingue FR/EN",
        tag2: "Assistant IA",
        tag3: "Prêt pour le SEO",
        cta: "Voir mirasens.com"
      }
    },
    researchModal: {
      kicker: "Initiation à la recherche · L1 Informatique",
      title: "Le Cryptosystème RSA",
      subtitle: "Fondements Mathématiques et Analyse de Sécurité",
      supervisorLabel: "Encadrante",
      recoLabel: "Recommandation",
      schoolLabel: "École",
      abstract: "Ce projet étudie le cryptosystème RSA (Rivest, Shamir, Adleman, 1978), l'un des algorithmes à clé publique les plus influents de l'histoire de la sécurité informatique. Après une introduction à la cryptographie classique et moderne — chiffrements par substitution et par flot, chiffrement symétrique AES, échange de clés Diffie-Hellman et fonctions de hachage — le rapport construit les outils mathématiques nécessaires à RSA : arithmétique modulaire, algorithme d'Euclide étendu, indicatrice d'Euler, théorème d'Euler, théorème des restes chinois et exponentiation modulaire rapide. Il détaille ensuite RSA de bout en bout : génération des clés, chiffrement, déchiffrement, signature numérique et optimisation RSA-CRT. Une analyse de sécurité dédiée étudie la factorisation d'entiers (ρ de Pollard, crible quadratique, crible algébrique) ainsi que plusieurs attaques concrètes — l'attaque par module commun, l'attaque par masquage exploitant l'homomorphisme multiplicatif de RSA, et l'attaque de Bleichenbacher sur le bourrage PKCS#1, qui retrouve un message après environ 10⁶ requêtes et a compromis SSL/TLS en pratique.",
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
      { q: "Combien coûte un site internet ?", a: "Cela dépend du périmètre — voir les formules ci-dessus pour le contenu de chacune. Parlez-moi de votre entreprise et je vous réponds avec un devis gratuit et sans engagement." },
      { q: "Combien de temps ça prend ?", a: "La plupart des pages d'atterrissage et sites vitrines sont livrés en quelques semaines à partir de notre premier échange, selon la rapidité des retours et du contenu." },
      { q: "Fournissez-vous l'hébergement ?", a: "Je peux vous accompagner pour l'hébergement et le nom de domaine, ou m'en charger directement dans le cadre du projet." },
      { q: "Pouvez-vous améliorer mon site existant ?", a: "Oui — envoyez-moi votre site actuel et je vous proposerai des améliorations concrètes, ou une refonte complète si c'est plus adapté." },
      { q: "Pouvez-vous le rendre multilingue ?", a: "Oui. Je développe en français, anglais et arabe, avec une structure et des balises de langue propres à chacune — pas une simple traduction du texte." },
      { q: "Pourrai-je modifier le contenu moi-même ensuite ?", a: "Oui — je peux organiser le site pour que les modifications simples de texte ou d'images soient faciles pour vous, ou m'en occuper via une formule de maintenance." }
    ],
    contact: {
      eyebrow: "Contact", heading: "Prêt à construire ?",
      eyebrowNum: "Contact",
      headingLine1: "Parlons de",
      headingLine2: "votre site",
      marquee: "Construisons ensemble",
      body: "Dites-moi ce que fait votre entreprise et ce dont vous avez besoin. Je vous réponds avec une consultation gratuite et un plan clair — sans pression, sans jargon.",
      cta: "Demander une consultation gratuite",
      formName: "Votre nom",
      formBusiness: "Votre entreprise / activité",
      formNeedDefault: "De quoi avez-vous besoin ?",
      formNeed1: "Nouveau site",
      formNeed2: "Refonte d'un site existant",
      formNeed3: "Page d'atterrissage",
      formNeed4: "Site + réservation",
      formNeed5: "Site multilingue",
      formNeed6: "Je ne sais pas encore",
      formMessage: "Quelques mots sur votre projet",
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
    nav: { services: "الخدمات", work: "الأعمال", process: "كيف نعمل", faq: "الأسئلة الشائعة", about: "نبذة", contact: "تواصل" },
    hero: {
      eyebrow: "مطوّرة ويب Full-Stack · باريس",
      title: "ولاء<br>منصوري",
      sub: "مواقع سريعة وحديثة لشركات حقيقية.",
      cta1: "لنبنِ موقعك",
      cta2: "اطلب عرض سعر",
      marquee: "مطوّرة ويب Full-Stack · باريس",
      scroll: "مرّر"
    },
    status: { available: "متاحة للعمل", availableSub: "منفتحة على مشاريع عملاء جدد", languages: "اللغات", french: "الفرنسية", english: "الإنجليزية", arabic: "العربية" },
    loc: { label: "الموقع", value: "باريس، فرنسا", note: "جامعة باريس سيتيه · علوم حاسوب" },
    about: {
      eyebrow: "نبذة عني",
      lead: "مرحبًا، أنا ولاء. مطوّرة ويب مقيمة في باريس، بخلفية في علوم الحاسوب وشغف ببناء أشياء جميلة ومتينة تقنيًا في آن واحد.",
      p1: "أستمتع بالعمل عند تقاطع التصميم والتطوير — تحويل فكرة أو نشاط تجاري إلى موقع متكامل يبدو مدروسًا في كل تفصيلة.",
      p2: "إلى جانب تطوير الويب، اختيرت لمشروع بحث جامعي مُشرَف عليه في التشفير، درست فيه RSA والأمان الواقعي. علّمني ذلك التعامل مع المشكلات التقنية بفضول ودقة واهتمام بالتفاصيل — وهي عقلية أحملها إلى كل موقع أبنيه."
    },
    aboutBackground: [
      "علوم حاسوب · جامعة باريس سيتيه",
      "تدريب في تطوير الويب · Sirius Net",
      "بحث في التشفير · RSA"
    ],
    whyus: {
      item1title: "أولوية للموبايل", item1body: "كل موقع مصمّم ومختبر ليظهر بشكل رائع ويعمل بسلاسة على الهاتف أولًا.",
      item2title: "مبني ليُكتشف بسهولة", item2body: "سريع ومنظم ومُحسَّن تقنيًا مع مراعاة محركات البحث.",
      item3title: "متعدد اللغات FR / EN / AR", item3body: "تواصل مع عملائك بلغتهم، مع نسخة مصممة لكل جمهور.",
      item4title: "تعاون مباشر", item4body: "تعمل معي مباشرة — بلا مسؤول حسابات وبلا وسيط."
    },
    packages: {
      eyebrow: "الخدمات",
      title: "عرض واحد، منفَّذ بعناية.",
      body: "أبدأ بتركيز واحد: صفحات هبوط تترك انطباعًا أول قويًا على الإنترنت. المزيد من الصيغ قادم قريبًا."
    },
    mainPackage: {
      name: "صفحة هبوط",
      tagline: "حضور كامل على الإنترنت، مبني حول هدف واحد واضح — نشاطك التجاري، مُختزَل في صفحة واحدة جميلة.",
      priceLabel: "ابتداءً من",
      price: "XXX €",
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
    comingSoonLabel: "قريبًا",
    comingSoon: ["مواقع تجارية", "أنظمة حجز", "مواقع متعددة اللغات"],
    process: { eyebrow: "كيف نعمل" },
    processSteps: [
      { title: "أخبرني عن نشاطك", sub: "مكالمة قصيرة أو نموذج بسيط — 15 إلى 20 دقيقة." },
      { title: "استلم تصميمك", sub: "تستلم النسخة الأولى وتشاركني ملاحظاتك." },
      { title: "البناء والتحسين", sub: "متجاوب وسريع وجاهز لمحركات البحث." },
      { title: "الإطلاق", sub: "يصبح موقعك مباشرًا وتحصل على كل ما تحتاجه." }
    ],
    exp: { eyebrow: "الخبرة" },
    experience: [
      { role: "متدربة تطوير ويب", org: "Sirius Net", period: "صيف 2025", points: ["موقع متجاوب متعدد اللغات — من التصميم إلى الإنتاج.", "دمج روبوت محادثة Gemini، وتم إطلاقه لمستخدمين حقيقيين.", "كود نظيف تمت مراجعته واعتماده من فريق أول."] },
      { role: "مدرّسة خصوصية", org: "عمل حر", period: "مستمر", points: ["دروس في البرمجة والرياضيات.", "أفكار معقدة تصبح عملية وواضحة.", "بناء الثقة من خلال توجيه منظم."] },
    ],
    research: {
      eyebrow: "بحث في التشفير", title: "بحث أكاديمي مُشرَف عليه في تشفير RSA",
      body: "اختيرت لمشروع بحث جامعي يدرس RSA والأمان الواقعي — جزء مما علّمني بناء الأشياء بشكل صحيح، لا مجرد جعلها تبدو جميلة.",
      view: "عرض المشروع"
    },
    projects: {
      eyebrow: "الأعمال · دراسة حالة",
      p1: {
        title: "Mirasens — موقع مصمم للإجابة على الزوار، لا لمجرد الشكل الجميل",
        body: "موقع تجاري ثنائي اللغة (فرنسي/إنجليزي) في الإنتاج مع مساعد ذكاء اصطناعي فعلي، مصمم ليحصل الزوار على إجابات دون انتظار الفريق.",
        challengeLabel: "التحدي",
        challengeBody: "احتاجت الشركة إلى موقع ثنائي اللغة سريع، قادر على الإجابة عن أسئلة الزوار فورًا — دون فريق دعم متاح باستمرار.",
        approachLabel: "ما قمت به",
        approachBody: "صممت وطورت الموقع، وأعددت بنية ثنائية اللغة وتحسين محركات البحث، ثم دمجت مساعدًا بالذكاء الاصطناعي للرد المباشر على الزوار الحقيقيين.",
        resultLabel: "النتيجة",
        resultBody: "موقع في الإنتاج أُطلق لمستخدمين حقيقيين، وما زال يعمل اليوم على mirasens.com.",
        tag1: "ثنائي اللغة FR/EN",
        tag2: "مساعد ذكاء اصطناعي",
        tag3: "جاهز لتحسين محركات البحث",
        cta: "زيارة mirasens.com"
      }
    },
    researchModal: {
      kicker: "المبادرة إلى البحث · السنة الأولى إعلام آلي",
      title: "نظام التشفير RSA",
      subtitle: "الأسس الرياضية وتحليل الأمان",
      supervisorLabel: "المشرفة",
      recoLabel: "توصية",
      schoolLabel: "الجامعة",
      abstract: "يدرس هذا المشروع نظام التشفير RSA (Rivest وShamir وAdleman، 1978)، أحد أكثر خوارزميات المفتاح العام تأثيرًا في تاريخ أمن المعلومات. بعد مقدمة عن التشفير الكلاسيكي والحديث، يبني التقرير الأدوات الرياضية اللازمة لفهم RSA: الحساب النمطي، خوارزمية إقليدس الممتدة، دالة أويلر، مبرهنة أويلر، مبرهنة الباقي الصيني والأس النمطي السريع. ثم يشرح RSA بالكامل: توليد المفاتيح، التشفير، فك التشفير، التوقيع الرقمي وتحسين RSA-CRT. ويخصص تحليلًا أمنيًا لطرق تفكيك الأعداد وعدة هجمات فعلية، من بينها هجوم Bleichenbacher الذي أثّر فعليًا على بروتوكولي SSL وTLS.",
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
      { q: "كم تكلفة الموقع؟", a: "يعتمد ذلك على نطاق العمل — انظر الباقات أعلاه لمعرفة ما تشمله كل واحدة. أخبرني عن نشاطك وسأرد عليك بعرض سعر مجاني وغير مُلزم." },
      { q: "كم تستغرق المدة؟", a: "معظم صفحات الهبوط والمواقع التجارية تُسلَّم خلال أسابيع قليلة من أول مكالمة، حسب سرعة تجهيز المحتوى والملاحظات." },
      { q: "هل توفرين الاستضافة؟", a: "يمكنني إرشادك خلال إعداد الاستضافة والنطاق، أو تولي ذلك بنفسي ضمن المشروع." },
      { q: "هل يمكنك تحسين موقعي الحالي؟", a: "نعم — أرسل لي موقعك الحالي وسأقترح تحسينات محددة، أو إعادة بنائه بالكامل إن كان ذلك أنسب." },
      { q: "هل يمكن أن يكون الموقع متعدد اللغات؟", a: "نعم. أطوّر بالفرنسية والإنجليزية والعربية، ببنية وعلامات لغة صحيحة لكل نسخة — وليس مجرد ترجمة نصوص." },
      { q: "هل أستطيع تعديل المحتوى بنفسي لاحقًا؟", a: "نعم — يمكنني إعداد الموقع بحيث تكون تعديلات النصوص والصور البسيطة سهلة عليك، أو تولي ذلك عبر باقة صيانة مستمرة." }
    ],
    contact: {
      eyebrow: "تواصل", heading: "مستعدة للبناء؟",
      eyebrowNum: "تواصل",
      headingLine1: "لنتحدث عن",
      headingLine2: "موقعك",
      marquee: "لنبنِ شيئًا معًا",
      body: "أخبرني عن نشاطك وما تحتاجه. سأرد عليك باستشارة مجانية وخطة واضحة — دون ضغط ودون مصطلحات معقدة.",
      cta: "اطلب استشارة مجانية",
      formName: "اسمك",
      formBusiness: "نشاطك التجاري",
      formNeedDefault: "ما الذي تحتاجه؟",
      formNeed1: "موقع جديد",
      formNeed2: "إعادة تصميم موقع حالي",
      formNeed3: "صفحة هبوط",
      formNeed4: "موقع + حجز",
      formNeed5: "موقع متعدد اللغات",
      formNeed6: "لست متأكدًا بعد",
      formMessage: "بضع كلمات عن مشروعك",
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
  aboutBgList.innerHTML = '';
  translations[lang].aboutBackground.forEach(line => {
    const li = document.createElement('li');
    li.innerHTML = `<i data-lucide="chevron-right" width="11" height="11"></i>${line}`;
    aboutBgList.appendChild(li);
  });
  lucide.createIcons();
}

/* ---- Single Landing Page offer ---- */
const mainPackageEl = document.getElementById('mainPackage');
function renderMainPackage(lang) {
  const t = translations[lang];
  const p = t.mainPackage;
  mainPackageEl.innerHTML = `
    <div class="landing-package reveal visible" id="services">
      <div class="glass tilt" style="padding:32px;height:100%;">
        <div class="lp-top">
          <div>
            <div class="eyebrow" style="margin-bottom:4px;">${t.packages.eyebrow}</div>
            <div class="lp-name">${p.name}</div>
            <div class="lp-tagline">${p.tagline}</div>
          </div>
          <div class="lp-price-block">
            <div class="lp-price-label">${p.priceLabel}</div>
            <div class="lp-price">${p.price}</div>
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
          <button class="btn-primary" onclick="scrollToId('contact')">
            <span>${p.cta}</span> <i data-lucide="arrow-right" width="14" height="14"></i>
          </button>
        </div>
      </div>
    </div>`;
  lucide.createIcons();
}

/* ---- Coming soon services ---- */
const comingSoonGrid = document.getElementById('comingSoonGrid');
function renderComingSoon(lang) {
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
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

  const meta = translations[lang].meta;
  if (meta) {
    document.title = meta.title;
    const descTag = document.getElementById('pageDesc');
    if (descTag) descTag.setAttribute('content', meta.description);
  }
}

function setLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyTranslations(lang);
  renderExperience(lang);
  renderAboutBackground(lang);
  renderMainPackage(lang);
  renderComingSoon(lang);
  renderProcess(lang);
  renderFaq(lang);
  try { localStorage.setItem('wm_lang', lang); } catch (e) { }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

let initialLang = 'en';
try {
  const stored = localStorage.getItem('wm_lang');
  if (stored && translations[stored]) initialLang = stored;
} catch (e) { }
setLang(initialLang);

paintThemeIcon();

/* ================= CONTACT FORM (builds a pre-filled mailto — no backend needed) ================= */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cfName').value.trim();
    const bizz = document.getElementById('cfBusiness').value.trim();
    const needSelect = document.getElementById('cfNeed');
    const needLabel = needSelect.options[needSelect.selectedIndex].text;
    const message = document.getElementById('cfMessage').value.trim();

    const subject = `Website project — ${bizz || name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Business: ${bizz}`,
      `Need: ${needLabel}`,
      '',
      message
    ];
    const mailto = `mailto:walaa.mansouri@etu.u-paris.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
  });
}

/* ================= NAV SCROLL STATE ================= */
const siteNav = document.getElementById('siteNav');
function onScroll() {
  if (window.scrollY > 40) siteNav.classList.add('scrolled');
  else siteNav.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll);
onScroll();

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

function updateScrollBar() {
  if (!scrollFill) return;
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  scrollFill.style.height = Math.min(100, Math.max(0, pct)) + '%';
}
window.addEventListener('scroll', updateScrollBar);
updateScrollBar();

if (scrollTrack) {
  scrollTrack.addEventListener('click', (e) => {
    const rect = scrollTrack.getBoundingClientRect();
    const frac = (e.clientY - rect.top) / rect.height;
    const doc = document.documentElement;
    const target = frac * (doc.scrollHeight - doc.clientHeight);
    animatedScrollTo(target);
  });
}

/* Final pass: render any static Lucide icons (hero, chips, side-nav arrows, lightbox) */
lucide.createIcons();
