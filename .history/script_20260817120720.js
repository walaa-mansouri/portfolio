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
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function scrollToId(id) {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

    // skills (tech names stay the same across languages)
    const SKILLS = [
      { name: "React", bg: "rgba(97,218,251,0.15)", fg: "#61daff" },
      { name: "JavaScript", bg: "rgba(247,223,30,0.12)", fg: "#f7df1e" },
      { name: "Python", bg: "rgba(55,118,171,0.15)", fg: "#4b8bbe" },
      { name: "PHP", bg: "rgba(119,123,180,0.15)", fg: "#8892be" },
      { name: "SQL", bg: "rgba(0,144,200,0.15)", fg: "#00aad4" },
      { name: "HTML/CSS", bg: "rgba(228,77,38,0.12)", fg: "#e44d26" },
      { name: "Git", bg: "rgba(240,80,50,0.12)", fg: "#f05033" },
      { name: "Gemini API", bg: "rgba(66,133,244,0.12)", fg: "#4285f4" },
      { name: "Figma", bg: "rgba(162,89,255,0.15)", fg: "#a259ff" },
    ];
    const skillsWrap = document.getElementById('skillsWrap');
    SKILLS.forEach(s => {
      const el = document.createElement('span');
      el.className = 'skillchip';
      el.textContent = s.name;
      el.style.background = s.bg; el.style.color = s.fg; el.style.border = `1px solid ${s.fg}30`;
      skillsWrap.appendChild(el);
    });

    /* ================= TRANSLATIONS ================= */
    const translations = {
      en: {
        nav: { about: "About", services: "Services", work: "Work", projects: "Projects", research: "Research", contact: "Contact" },
        hero: {
          eyebrow: "Full-Stack Developer · Paris",
          sub: "Building fast, modern websites for real businesses.",
          cta1: "Let's build your site",
          cta2: "Get a quote",
          marquee: "Full-Stack Developer",
          scroll: "Scroll"
        },
        status: { available: "Available for work", availableSub: "Open to new client projects", languages: "Languages", french: "French", english: "English", arabic: "Arabic" },
        loc: { label: "Location", value: "Paris, France", note: "Université Paris Cité · Computer Science" },
        about: {
          eyebrow: "About me",
          lead: "CS student at Université Paris Cité — top 2 of 148 — but rankings don't close projects. Results do.",
          p1: "Self-taught full-stack developer. Real internship. Real shipped code. My work at Sirius Net meant building a multilingual production site with a live AI chatbot — not a demo.",
          p2: "I write clean code and design for outcomes. Hire me when you need a site that works hard for your business."
        },
        skills: { eyebrow: "Tech stack", servicesEyebrow: "Services" },
        services: [
          { icon: "code-2", title: "Design & Dev", desc: "Full websites from design to deployment." },
          { icon: "zap", title: "Landing Pages", desc: "Conversion-focused single-page experiences." },
          { icon: "message-square", title: "AI Chatbots", desc: "Gemini & OpenAI integrations, production-ready." },
          { icon: "globe", title: "Bilingual (FR/EN)", desc: "Localised for French and English markets." },
          { icon: "search", title: "SEO", desc: "Structured, semantic, fast and discoverable." },
        ],
        ach: {
          eyebrow1: "of 148 students", body1: "Ranked among the highest in a competitive CS program at Université Paris Cité.",
          eyebrow2: "research selection", body2: "Chosen for a cryptography research project — rare for a first-year student.",
          eyebrow3: "technical report", body3: "Authored a deep-dive on RSA security and real-world cryptographic systems.",
          eyebrow4: "shipped with AI", body4: "Launched a bilingual SEO-optimized site with a live Gemini AI chatbot."
        },
        exp: { eyebrow: "Experience" },
        experience: [
          { role: "Web Dev Intern", org: "Sirius Net", period: "Summer 2025", points: ["Responsive multilingual site — design to production.", "Gemini AI chatbot integrated, shipped to real users.", "Clean code reviewed and merged by senior team."] },
          { role: "Tutor", org: "Independent", period: "Ongoing", points: ["Programming & math tutoring.", "Complex ideas made practical and clear.", "Trust built through structured guidance."] },
        ],
        research: {
          eyebrow: "Research", title: "RSA Security &amp; Cryptography",
          body: "Selected for an exclusive university cryptography research project — rare for a first-year student. Delivered a 65-page technical report on RSA vulnerabilities.",
          chip1: "Cryptography",
          view: "View details"
        },
        projects: {
          eyebrow: "Projects · Featured build",
          p1: {
            title: "Mirasens — Bilingual Business Website &amp; AI Assistant",
            body: "Built during my 2025 web development internship at Sirius Net: a bilingual (FR/EN) production website with a live Gemini AI chatbot, shipped to real users and reviewed by the senior team.",
            challengeLabel: "The challenge",
            challengeBody: "The client needed a fast, bilingual site that could answer visitor questions instantly — without a support team on standby.",
            approachLabel: "My approach",
            approachBody: "Designed and built the frontend, wired up FR/EN routing and SEO, then integrated a Gemini-powered chatbot to handle real visitor questions live.",
            resultLabel: "The result",
            resultBody: "Shipped to production, code reviewed and merged by the senior team, and running live at mirasens.com today.",
            tag1: "Web Dev Internship · Sirius Net · 2025",
            tag2: "Gemini AI Chatbot",
            tag3: "Bilingual FR/EN · SEO",
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
        contact: {
          eyebrow: "Contact", heading: "Ready to build?",
          eyebrowNum: "05 — Contact",
          headingLine1: "Let's build",
          headingLine2: "something together",
          marquee: "Let's build together",
          body: "Tell me what you need, who it's for, and when you want it live. I'll reply with a free quote and a clear plan.",
          cta: "Get a free quote",
          emailLabel: "Email", locationLabel: "Location", locationValueInline: "Paris, France",
          languagesLabel: "Languages", availabilityLabel: "Availability", availabilityValueInline: "Open to projects"
        },
        footer: { line1: "© 2026 Walaa Mansouri", line2: "Full-Stack Developer · Paris" }
      },
      fr: {
        nav: { about: "À propos", services: "Services", work: "Parcours", projects: "Projets", research: "Recherche", contact: "Contact" },
        hero: {
          eyebrow: "Développeuse Full-Stack · Paris",
          sub: "Je crée des sites web rapides et modernes pour de vraies entreprises.",
          cta1: "Construisons votre site",
          cta2: "Devis gratuit",
          marquee: "Développeuse Full-Stack",
          scroll: "Défiler"
        },
        status: { available: "Disponible pour des missions", availableSub: "Ouverte à de nouveaux projets clients", languages: "Langues", french: "Français", english: "Anglais", arabic: "Arabe" },
        loc: { label: "Localisation", value: "Paris, France", note: "Université Paris Cité · Informatique" },
        about: {
          eyebrow: "À propos de moi",
          lead: "Étudiante en informatique à l'Université Paris Cité — 2ème sur 148 — mais un classement ne livre pas un projet. Les résultats, si.",
          p1: "Développeuse full-stack autodidacte. Un vrai stage. Du vrai code en production. Mon travail chez Sirius Net a consisté à construire un site multilingue en production avec un chatbot IA en direct — pas une démo.",
          p2: "J'écris un code propre et je conçois pour des résultats concrets. Faites appel à moi quand vous avez besoin d'un site à la hauteur de votre entreprise."
        },
        skills: { eyebrow: "Stack technique", servicesEyebrow: "Services" },
        services: [
          { icon: "code-2", title: "Conception & Dev", desc: "Sites web complets, de la conception à la mise en ligne." },
          { icon: "zap", title: "Pages d'atterrissage", desc: "Des pages pensées pour la conversion." },
          { icon: "message-square", title: "Chatbots IA", desc: "Intégrations Gemini & OpenAI, prêtes pour la production." },
          { icon: "globe", title: "Bilingue (FR/EN)", desc: "Adapté aux marchés francophones et anglophones." },
          { icon: "search", title: "SEO", desc: "Structuré, sémantique, rapide et facile à trouver." },
        ],
        ach: {
          eyebrow1: "sur 148 étudiants", body1: "Classée parmi les meilleurs d'un cursus informatique très sélectif à l'Université Paris Cité.",
          eyebrow2: "sélection recherche", body2: "Choisie pour un projet de recherche en cryptographie — rare pour une étudiante de première année.",
          eyebrow3: "rapport technique", body3: "Auteure d'une étude approfondie sur la sécurité RSA et les systèmes cryptographiques réels.",
          eyebrow4: "livré avec IA", body4: "Lancement d'un site bilingue optimisé SEO avec un chatbot IA Gemini en direct."
        },
        exp: { eyebrow: "Expérience" },
        experience: [
          { role: "Stagiaire Dev Web", org: "Sirius Net", period: "Été 2025", points: ["Site multilingue responsive — de la conception à la production.", "Chatbot IA Gemini intégré, livré à de vrais utilisateurs.", "Code propre relu et validé par l'équipe senior."] },
          { role: "Professeure particulière", org: "Indépendant", period: "En cours", points: ["Cours de programmation et de mathématiques.", "Des idées complexes rendues concrètes et claires.", "Une confiance construite par un accompagnement structuré."] },
        ],
        research: {
          eyebrow: "Recherche", title: "Sécurité RSA &amp; Cryptographie",
          body: "Sélectionnée pour un projet de recherche universitaire exclusif en cryptographie — rare pour une étudiante de première année. Rapport technique de 65 pages sur les vulnérabilités RSA.",
          chip1: "Cryptographie",
          view: "Voir les détails"
        },
        projects: {
          eyebrow: "Projets · Réalisation phare",
          p1: {
            title: "Mirasens — Site vitrine bilingue &amp; assistant IA",
            body: "Réalisé durant mon stage de développement web 2025 chez Sirius Net : un site professionnel bilingue (FR/EN) en production, avec un chatbot IA Gemini en direct, livré à de vrais utilisateurs et relu par l'équipe senior.",
            challengeLabel: "Le défi",
            challengeBody: "Le client avait besoin d'un site bilingue rapide, capable de répondre instantanément aux visiteurs — sans équipe support disponible en permanence.",
            approachLabel: "Mon approche",
            approachBody: "Conception et développement du frontend, mise en place du routage FR/EN et du SEO, puis intégration d'un chatbot propulsé par Gemini pour répondre en direct aux vrais visiteurs.",
            resultLabel: "Le résultat",
            resultBody: "Site livré en production, code relu et validé par l'équipe senior, et toujours en ligne aujourd'hui sur mirasens.com.",
            tag1: "Stage Dev Web · Sirius Net · 2025",
            tag2: "Chatbot IA Gemini",
            tag3: "Bilingue FR/EN · SEO",
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
        contact: {
          eyebrow: "Contact", heading: "Prêt à construire ?",
          eyebrowNum: "05 — Contact",
          headingLine1: "Construisons",
          headingLine2: "quelque chose ensemble",
          marquee: "Construisons ensemble",
          body: "Dites-moi ce dont vous avez besoin, pour qui, et pour quand. Je vous répondrai avec un devis gratuit et un plan clair.",
          cta: "Devis gratuit",
          emailLabel: "Email", locationLabel: "Localisation", locationValueInline: "Paris, France",
          languagesLabel: "Langues", availabilityLabel: "Disponibilité", availabilityValueInline: "Ouverte aux projets"
        },
        footer: { line1: "© 2026 Walaa Mansouri", line2: "Développeuse Full-Stack · Paris" }
      },
      ar: {
        nav: { about: "نبذة", services: "الخدمات", work: "المسار", projects: "المشاريع", research: "البحث", contact: "تواصل" },
        hero: {
          eyebrow: "مطوّرة Full-Stack · باريس",
          sub: "أصمم مواقع ويب سريعة وحديثة لشركات حقيقية.",
          cta1: "لنبنِ موقعك",
          cta2: "اطلب عرض سعر",
          marquee: "مطوّرة Full-Stack",
          scroll: "مرّر"
        },
        status: { available: "متاحة للعمل", availableSub: "منفتحة على مشاريع عملاء جدد", languages: "اللغات", french: "الفرنسية", english: "الإنجليزية", arabic: "العربية" },
        loc: { label: "الموقع", value: "باريس، فرنسا", note: "جامعة باريس سيتيه · علوم حاسوب" },
        about: {
          eyebrow: "نبذة عني",
          lead: "طالبة علوم حاسوب في جامعة باريس سيتيه — من بين أفضل 2 من أصل 148 — لكن الترتيب لا ينجز المشاريع، النتائج هي التي تفعل ذلك.",
          p1: "مطوّرة full-stack تعلّمت بنفسها. تدريب حقيقي. كود حقيقي في الإنتاج. عملي في Sirius Net كان بناء موقع متعدد اللغات في الإنتاج مع روبوت محادثة بالذكاء الاصطناعي فعلي — وليس عرضًا تجريبيًا.",
          p2: "أكتب كودًا نظيفًا وأصمم من أجل نتائج ملموسة. استعن بي عندما تحتاج إلى موقع يعمل بجد من أجل عملك."
        },
        skills: { eyebrow: "الأدوات التقنية", servicesEyebrow: "الخدمات" },
        services: [
          { icon: "code-2", title: "تصميم وتطوير", desc: "مواقع كاملة من التصميم حتى الإطلاق." },
          { icon: "zap", title: "صفحات هبوط", desc: "صفحات مصممة لتحقيق أعلى نسبة تحويل." },
          { icon: "message-square", title: "روبوتات محادثة بالذكاء الاصطناعي", desc: "تكاملات Gemini وOpenAI جاهزة للإنتاج." },
          { icon: "globe", title: "ثنائي اللغة (فرنسي/إنجليزي)", desc: "مصمم للأسواق الفرنكوفونية والأنجلوفونية." },
          { icon: "search", title: "تحسين محركات البحث", desc: "بنية منظمة وسريعة وسهلة الاكتشاف." },
        ],
        ach: {
          eyebrow1: "من أصل 148 طالبًا", body1: "من بين الأفضل في برنامج علوم حاسوب تنافسي بجامعة باريس سيتيه.",
          eyebrow2: "اختيار بحثي", body2: "تم اختيارها لمشروع بحث في التشفير — أمر نادر لطالبة في السنة الأولى.",
          eyebrow3: "تقرير تقني", body3: "أعدّت دراسة معمّقة حول أمان RSA والأنظمة التشفيرية الحقيقية.",
          eyebrow4: "أُطلق بالذكاء الاصطناعي", body4: "أطلقت موقعًا ثنائي اللغة محسّنًا لمحركات البحث مع روبوت محادثة Gemini فعلي."
        },
        exp: { eyebrow: "الخبرة" },
        experience: [
          { role: "متدربة تطوير ويب", org: "Sirius Net", period: "صيف 2025", points: ["موقع متجاوب متعدد اللغات — من التصميم إلى الإنتاج.", "دمج روبوت محادثة Gemini، وتم إطلاقه لمستخدمين حقيقيين.", "كود نظيف تمت مراجعته واعتماده من فريق أول."] },
          { role: "مدرّسة خصوصية", org: "عمل حر", period: "مستمر", points: ["دروس في البرمجة والرياضيات.", "أفكار معقدة تصبح عملية وواضحة.", "بناء الثقة من خلال توجيه منظم."] },
        ],
        research: {
          eyebrow: "البحث", title: "أمان RSA والتشفير",
          body: "اختيرت لمشروع بحث جامعي حصري في التشفير — أمر نادر لطالبة في السنة الأولى. أعدّت تقريرًا تقنيًا من 65 صفحة حول ثغرات RSA.",
          chip1: "التشفير",
          view: "عرض التفاصيل"
        },
        projects: {
          eyebrow: "المشاريع · إنجاز مميز",
          p1: {
            title: "Mirasens — موقع تجاري ثنائي اللغة ومساعد ذكاء اصطناعي",
            body: "أُنجز خلال تدريبي في تطوير الويب لعام 2025 لدى Sirius Net: موقع تجاري ثنائي اللغة (فرنسي/إنجليزي) في الإنتاج مع روبوت محادثة Gemini فعلي، أُطلق لمستخدمين حقيقيين وراجعه الفريق الأول.",
            challengeLabel: "التحدي",
            challengeBody: "احتاج العميل موقعًا ثنائي اللغة وسريعًا يجيب زواره فورًا — دون فريق دعم متاح باستمرار.",
            approachLabel: "منهجيتي",
            approachBody: "صممت وطورت الواجهة، وأعددت التوجيه الثنائي اللغة وتحسين محركات البحث، ثم دمجت روبوت محادثة يعمل بـ Gemini للرد المباشر على أسئلة الزوار الحقيقيين.",
            resultLabel: "النتيجة",
            resultBody: "أُطلق الموقع في الإنتاج، وتمت مراجعة الكود واعتماده من الفريق الأول، وهو يعمل حاليًا على mirasens.com.",
            tag1: "تدريب تطوير ويب · Sirius Net · 2025",
            tag2: "روبوت محادثة Gemini",
            tag3: "ثنائي اللغة · تحسين محركات البحث",
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
        contact: {
          eyebrow: "تواصل", heading: "مستعدة للبناء؟",
          eyebrowNum: "٠٥ — تواصل",
          headingLine1: "لنبنِ",
          headingLine2: "شيئًا معًا",
          marquee: "لنبنِ شيئًا معًا",
          body: "أخبرني بما تحتاجه، ولمن، ومتى تريده مباشرًا. سأرد عليك بعرض سعر مجاني وخطة واضحة.",
          cta: "اطلب عرض سعر مجاني",
          emailLabel: "البريد الإلكتروني", locationLabel: "الموقع", locationValueInline: "باريس، فرنسا",
          languagesLabel: "اللغات", availabilityLabel: "التوفر", availabilityValueInline: "متاحة لمشاريع جديدة"
        },
        footer: { line1: "© 2026 ولاء منصوري", line2: "مطوّرة Full-Stack · باريس" }
      }
    };

    function getPath(obj, path) {
      return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
    }

    const svcGrid = document.getElementById('svcGrid');
    function renderServices(lang) {
      svcGrid.innerHTML = '';
      translations[lang].services.forEach(s => {
        const el = document.createElement('div');
        el.className = 'svc-item';
        el.innerHTML = `<i data-lucide="${s.icon}" width="14" height="14" style="color:#a78bfa"></i><div class="title">${s.title}</div><div class="desc">${s.desc}</div>`;
        svcGrid.appendChild(el);
      });
      lucide.createIcons();
    }

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

    function applyTranslations(lang) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = getPath(translations[lang], key);
        if (val !== undefined) el.innerHTML = val;
      });
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    }

    function setLang(lang) {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      applyTranslations(lang);
      renderServices(lang);
      renderExperience(lang);
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
    const revealEls = document.querySelectorAll('.reveal');
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

    // counters
    document.querySelectorAll('.counter').forEach(el => {
      const to = parseInt(el.dataset.to, 10);
      const pre = el.dataset.pre || '';
      const suf = el.dataset.suf || '';
      const obs = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now(), dur = 1300;
        function tick(now) {
          const t = Math.min((now - start) / dur, 1);
          const val = Math.round((1 - Math.pow(1 - t, 3)) * to);
          el.textContent = pre + val + suf;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, { rootMargin: '-50px' });
      obs.observe(el);
    });

    // tilt effect
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * 11;
        const ry = -((e.clientX - r.left) / r.width - 0.5) * 11;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
        card.style.transitionDuration = '0.1s';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.transitionDuration = '0.5s';
      });
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

/* ================= LEFT SIDE-NAV (scrollspy + step through sections) ================= */
const SIDE_SECTIONS = ['home', 'about', 'services', 'work', 'projects', 'research', 'contact'];
const sideDots = document.querySelectorAll('.side-dot');

function goToSideSection(id) {
  if (id === 'home') scrollToTop();
  else scrollToId(id);
}

sideDots.forEach((dot) => {
  dot.addEventListener('click', () => goToSideSection(dot.dataset.target));
});

function sectionTopPositions() {
  return SIDE_SECTIONS.map(id => {
    if (id === 'home') return 0;
    const el = document.getElementById(id);
    if (!el) return Infinity;
    return el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - 6;
  });
}

function sideNavStep(dir) {
  const positions = sectionTopPositions();
  const current = window.scrollY;
  let idx = 0;
  if (dir > 0) {
    idx = positions.findIndex(p => p > current + 12);
    if (idx === -1) idx = positions.length - 1;
  } else {
    idx = 0;
    for (let i = positions.length - 1; i >= 0; i--) {
      if (positions[i] < current - 12) { idx = i; break; }
    }
  }
  goToSideSection(SIDE_SECTIONS[idx]);
}

function updateSideNav() {
  const positions = sectionTopPositions();
  const current = window.scrollY;
  let activeIdx = 0;
  positions.forEach((p, i) => { if (current + 4 >= p) activeIdx = i; });
  sideDots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
}
window.addEventListener('scroll', updateSideNav);
updateSideNav();

/* Final pass: render any static Lucide icons (hero, chips, side-nav arrows, lightbox) */
lucide.createIcons();
