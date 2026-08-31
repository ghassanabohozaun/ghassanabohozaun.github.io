/**
 * Ghassan Abo Hozaun - Portfolio Application Logic
 * Powered by Alpine.js
 * Multi-Language (AR / EN) & Multi-Theme (Dark / Light)
 */

function portfolioApp() {
    return {
        // State
        lang: localStorage.getItem('ghassan_lang') || 'ar',
        theme: localStorage.getItem('ghassan_theme') || 'dark',
        mobileMenu: false,
        modalOpen: false,
        cvModalOpen: false,
        activeCategory: 'all',
        selectedProject: null,

        // Lifecycle Initialize
        initApp() {
            this.applyTheme();
            this.applyLang();
            setTimeout(() => {
                document.body.classList.remove('preload');
            }, 60);
        },

        // Theme Toggle & Persistence
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('ghassan_theme', this.theme);
            this.applyTheme();
        },

        applyTheme() {
            if (this.theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },

        // Language Toggle & Persistence
        toggleLang() {
            this.lang = this.lang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('ghassan_lang', this.lang);
            this.applyLang();
        },

        applyLang() {
            document.documentElement.lang = this.lang;
            document.documentElement.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
            document.title = this.lang === 'ar'
                ? 'غسان أبو حزين | مهندس برمجيات و Backend Laravel Developer'
                : 'Ghassan Abo Hozaun | Senior Backend Laravel & PHP Developer';
        },

        // Translation Helper
        t(key) {
            return (this.translations[this.lang] && this.translations[this.lang][key]) || key;
        },

        // Project Modal Actions
        openProjectModal(project) {
            this.selectedProject = project;
            this.modalOpen = true;
        },

        // Project Filter Categories
        projectCategories: [
            { id: 'all', name: { ar: 'جميع المشاريع', en: 'All Projects' } },
            { id: 'erp', name: { ar: 'أنظمة ERP & SaaS', en: 'ERP & SaaS' } },
            { id: 'ngo', name: { ar: 'أنظمة الجمعيات والأيتام', en: 'NGO & Orphan Systems' } },
            { id: 'lms', name: { ar: 'منصات تعليمية وطبية', en: 'LMS & Medical Platforms' } },
            { id: 'frontend', name: { ar: 'واجهات وتطبيقات تفاعلية', en: 'Interactive Web & UI' } }
        ],

        // Real Work Experience History
        experienceList: [
            {
                company: { ar: 'شركة PTC – غزة', en: 'PTC – Gaza' },
                role: { ar: 'مطور أول أنظمة Backend Laravel / PHP', en: 'Senior Backend Laravel / PHP Developer' },
                period: { ar: '04/2024 – حتى الآن', en: '04/2024 – Present' },
                location: { ar: 'غزة، فلسطين', en: 'Gaza, Palestine' },
                tasks: {
                    ar: [
                        'تطوير وصيانة نظام ERP متكامل لإدارة الشركات والموظفين والعمليات الإدارية.',
                        'تصميم بنية تحتية برمجية قابلة للتوسع وواجهات RESTful APIs عالية الأداء.',
                        'تطبيق نظام أمان ومصادقة متقدم ونظام صلاحيات متعدد المستويات (Role-Based Access Control).',
                        'تحسين استعلامات قواعد البيانات الضخمة وفهرستها لرفع كفاءة وسرعة الاستجابة.'
                    ],
                    en: [
                        'Developing and maintaining a comprehensive enterprise ERP system for companies and staff.',
                        'Designing scalable backend architecture and high-performance RESTful APIs.',
                        'Implementing robust authentication, authorization, and multi-tier Role-Based Access Control (RBAC).',
                        'Optimizing complex database queries, schema indexing, and boosting application response times.'
                    ]
                },
                stack: ['Laravel 11', 'PHP 8.2', 'MySQL', 'RBAC', 'RESTful APIs', 'Query Tuning']
            },
            {
                company: { ar: 'شركة Digital Order – السعودية', en: 'Digital Order Company – KSA' },
                role: { ar: 'مطور أنظمة Backend Laravel / PHP', en: 'Backend Laravel / PHP Developer' },
                period: { ar: '02/2022 – 10/2023', en: '02/2022 – 10/2023' },
                location: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                tasks: {
                    ar: [
                        'العمل ضمن فريق برمجي كبير لتطوير نظام ERP معقد ومتعدد الوحدات.',
                        'بناء وصيانة الوحدات الخلفية للنظام باستخدام Laravel وأحدث معايير Clean Code.',
                        'التعاون الوثيق مع مطوري الـ Frontend وفرق ضمان الجودة (QA Teams).',
                        'تحسين استقرار النظام وأمان المعاملات وسرعة الأداء.'
                    ],
                    en: [
                        'Worked within a large distributed development team on an extensive enterprise ERP system.',
                        'Built and maintained high-traffic backend modules using Laravel and Clean Code principles.',
                        'Collaborated closely with Frontend engineers and QA testing teams.',
                        'Significantly improved system stability, transaction safety, and overall backend reliability.'
                    ]
                },
                stack: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'ERP Modules', 'Clean Architecture']
            },
            {
                company: { ar: 'جمعية نور المعرفة – غزة', en: 'Noor El Marifa Association – Gaza' },
                role: { ar: 'مطور أنظمة Backend Laravel', en: 'Backend Laravel Developer' },
                period: { ar: '01/2021 – 02/2022', en: '01/2021 – 02/2022' },
                location: { ar: 'غزة، فلسطين', en: 'Gaza, Palestine' },
                tasks: {
                    ar: [
                        'تطوير وصيانة أنظمة إدارة وكفالة الأيتام والمنح والمستفيدين باستخدام Laravel.',
                        'بناء نظام مصادقة وتفويض آمن متعدد البوابات (لوحة الإدارة، بوابة الكفلاء والطلاب).',
                        'تصميم وبناء واجهات برمجية RESTful APIs لربط المنظومات.',
                        'تطبيق نظام معالجة المهام غير المتزامنة والرسائل عبر Laravel Queues & Jobs.'
                    ],
                    en: [
                        'Developed and maintained orphan sponsorship and beneficiary management systems using Laravel.',
                        'Built secure multi-portal authentication (Admin Dashboard, Sponsor & Student Portals).',
                        'Designed and implemented secure RESTful APIs across services.',
                        'Configured asynchronous queues, scheduled tasks, and background job processing.'
                    ]
                },
                stack: ['Laravel', 'MySQL', 'Queues & Jobs', 'RESTful API', 'Sanctum', 'Task Scheduling']
            }
        ],

        // Real Projects Data with Local Images & Live Links
        projects: [
            {
                id: 1,
                category: 'erp',
                categoryLabel: { ar: 'نظام ERP سحابي', en: 'Enterprise ERP' },
                title: {
                    ar: 'نظام إدارة الموارد والشركات والموظفين - PTC ERP',
                    en: 'Enterprise ERP & Employee Management System - PTC'
                },
                description: {
                    ar: 'نظام متكامل لإدارة الشركات، الموظفين، الحضور والانصراف، الرواتب، والتقارير الإحصائية مع صلاحيات متقدمة (RBAC) ولوحات تحكم مخصصة.',
                    en: 'Comprehensive enterprise ERP platform for company operations, employee records, attendance, payroll, and advanced RBAC permission tiers.'
                },
                challenge: {
                    ar: 'إدارة تدفق كميات كبيرة من البيانات والمعاملات الإدارية المتزامنة مع ضمان سرعة المعالجة وأمان الصلاحيات.',
                    en: 'Handling heavy concurrency and huge administrative data pipelines with strict permission boundaries and low query latency.'
                },
                solution: {
                    ar: 'هندسة معمارية نظيفة (Clean Architecture)، فهرسة قواعد البيانات المتقدمة، وبناء بوابات دخول منفصلة للإدارة والموظفين.',
                    en: 'Applied Clean Architecture, database indexing, dedicated Admin/Employee entry portals, and robust Eloquent optimizations.'
                },
                stack: ['Laravel 11', 'PHP 8.2', 'MySQL', 'RESTful APIs', 'RBAC', 'Livewire'],
                image: 'assets/images/projects/ptc-erp.png',
                adminLogin: 'https://ptcsystem.org/en/dashboard/login',
                portalLogin: 'https://ptcsystem.org/en/employees/login',
                mostaql: 'https://mostaql.com/portfolio/3362932',
                liveUrl: 'https://ptcsystem.org/en/dashboard/login'
            },
            {
                id: 2,
                category: 'ngo',
                categoryLabel: { ar: 'نظام إدارة وكفالة', en: 'Sponsorship System' },
                title: {
                    ar: 'نظام كفالة ومتابعة الأيتام - جمعية نور المعرفة',
                    en: 'Orphan Sponsorship & Management System - Noor El-Marifa'
                },
                description: {
                    ar: 'منظومة سحابية متخصصة في توثيق ومتابعة ملفات الأيتام والكفلاء، إدارة التقارير الدورية والمعاملات المالية، وبوابة تفاعلية للطلاب والكفلاء.',
                    en: 'Specialized cloud system for managing orphan profiles, donor sponsorships, periodic welfare reports, and child portal logins.'
                },
                challenge: {
                    ar: 'تأمين البيانات الحساسة للأيتام وإرسال التنبيهات والتقارير للكفلاء في المواعيد المحددة دون تأخير.',
                    en: 'Securing sensitive beneficiary records and scheduling timely automated status and financial reports to global sponsors.'
                },
                solution: {
                    ar: 'استخدام Laravel Queues لمعالجة المهام الخلفية وجدولة التقارير مع تطبيق سياسات حماية متقدمة.',
                    en: 'Leveraged Laravel Queues and Task Scheduling for automated report generation and multi-tier authentication.'
                },
                stack: ['Laravel', 'MySQL', 'Queues & Jobs', 'RESTful APIs', 'Sanctum'],
                image: 'assets/images/projects/orphan-system.png',
                adminLogin: 'https://noorelmarifaa.org/en/dashboard/login',
                portalLogin: 'https://noorelmarifaa.org/en/child/welcome',
                mostaql: 'https://mostaql.com/portfolio/3362912',
                liveUrl: 'https://noorelmarifaa.org/en/dashboard/login'
            },
            {
                id: 3,
                category: 'lms',
                categoryLabel: { ar: 'أكاديمية طبية & LMS', en: 'Medical LMS Platform' },
                title: {
                    ar: 'منصة بكة أكاديمي للتعليم الطبي والمهني - ليبيا',
                    en: 'Bakka Academy Medical & E-Learning Platform - Libya'
                },
                description: {
                    ar: 'منصة تعليمية متكاملة لتقديم الدورات التدريبية الطبية المعتمدة، بث المحتوى التعليمي، الاختبارات التفاعلية، وإصدار الشهادات.',
                    en: 'E-learning medical academy delivering certified training courses, video/audio lectures, interactive quizzes, and certification workflows.'
                },
                challenge: {
                    ar: 'إدارة تشغيل الوسائط وبث الفيديوهات والملفات الصوتية للطلاب مع دعم اللغتين وتأمين المحتوى.',
                    en: 'Handling seamless multimedia streaming, student registrations, multi-lingual interface, and protected lecture access.'
                },
                solution: {
                    ar: 'بناء واجهات برمجية مهيأة للوسائط المتعددة ونظام تخزين مؤقت للدروس وتوفير تجربة مستخدم سريعة بالكامل.',
                    en: 'Engineered responsive media streaming API, caching layer, student tracking dashboards, and seamless multi-language support.'
                },
                stack: ['Laravel', 'MySQL', 'Vue.js', 'Video Streaming', 'Bootstrap 5', 'Multi-Lang'],
                image: 'assets/images/projects/bakka-academy.png',
                adminLogin: '',
                portalLogin: 'https://bakkaacademy.com/en/student',
                mostaql: 'https://mostaql.com/portfolio/3362888',
                liveUrl: 'https://bakkaacademy.com/en'
            },
            {
                id: 4,
                category: 'ngo',
                categoryLabel: { ar: 'بوابة إلكترونية و CMS', en: 'NGO Official Portal' },
                title: {
                    ar: 'البوابة الرسمية لجمعية نور المعرفة الخيرية',
                    en: 'Noor El-Marifa NGO Official Web Platform'
                },
                description: {
                    ar: 'الموقع الرسمي للجمعية لاستعراض البرامج الإنسانية والتعليمية، إدارة الأخبار والفعاليات، وقصص النجاح واستقبال التبرعات.',
                    en: 'Official web portal for Noor El-Marifa NGO showcasing humanitarian relief programs, success stories, and donation inquiries.'
                },
                challenge: {
                    ar: 'توفير لوحة تحكم مرنة وسريعة لإدارة المحتوى الإخباري والوسائط باللغتين العربية والإنجليزية.',
                    en: 'Providing a high-performance, dynamic bilingual CMS to handle press releases, photo galleries, and donor interactions.'
                },
                solution: {
                    ar: 'تطوير نظام إدارة محتوى (CMS) مخصص بالكامل باستخدام Laravel وربطه بقواعد بيانات متينة وسريعة.',
                    en: 'Developed a custom, lightweight Laravel CMS with multi-language capabilities and SEO-optimized structures.'
                },
                stack: ['Laravel', 'MySQL', 'Bootstrap 5', 'Multi-Language', 'Custom CMS'],
                image: 'assets/images/projects/noor-ngo.png',
                adminLogin: '',
                portalLogin: '',
                mostaql: 'https://mostaql.com/portfolio/841463',
                liveUrl: 'https://noorelmarifaa.org/en'
            },
            {
                id: 5,
                category: 'frontend',
                categoryLabel: { ar: 'تطبيق سياحة وحجوزات', en: 'Travel & Tourism UI' },
                title: {
                    ar: 'تحويل تصميم UI/UX إلى موقع ويب تفاعلي - شركة نقاط للسياحة',
                    en: 'Interactive Travel & Tourism Platform - Neqat Travel'
                },
                description: {
                    ar: 'تحويل تصميم واجهة مستخدم (UI) احترافية من Adobe XD إلى منصة ويب تفاعلية بالكامل لخدمات السفر والحجوزات السياحية.',
                    en: 'Pixel-perfect translation of Adobe XD UI/UX prototypes into a dynamic, highly responsive web application for travel and flight bookings.'
                },
                challenge: {
                    ar: 'الدقة المتناهية في مطابقة التصميم الأصلي مع ضمان سرعة الاستجابة والتوافق الكامل مع جميع أحجام الشاشات.',
                    en: 'Pixel-perfect alignment, rich micro-interactions, responsive mobile views, and seamless cross-browser compatibility.'
                },
                solution: {
                    ar: 'بناء واجهات متجاوبة باستخدام Tailwind CSS وجافا سكريبت مع مراعاة سرعة التحميل وتجربة المستخدم.',
                    en: 'Built clean, semantic HTML5/Tailwind markup with optimized assets and silky smooth interactive transitions.'
                },
                stack: ['Tailwind CSS', 'JavaScript', 'HTML5/CSS3', 'Adobe XD to Web'],
                image: 'assets/images/projects/neqat-travel.png',
                adminLogin: '',
                portalLogin: '',
                mostaql: 'https://mostaql.com/portfolio/3418352',
                liveUrl: ''
            },
            {
                id: 6,
                category: 'erp',
                categoryLabel: { ar: 'منصة استشارات', en: 'Consulting Platform' },
                title: {
                    ar: 'منصة مركز هدوء للاستشارات - جدة، السعودية',
                    en: 'Hodoa Consulting Platform - Jeddah, KSA'
                },
                description: {
                    ar: 'نظام ويب متكامل لحجز الجلسات الاستشارية، إدارة المواعيد، وتسهيل التواصل بين المستشارين والعملاء.',
                    en: 'Integrated booking and consultation platform in Jeddah for appointment scheduling, advisor management, and client records.'
                },
                challenge: {
                    ar: 'تنظيم المواعيد ومنع التضارب الزمني بين الجلسات مع سهولة الحجز والدفع.',
                    en: 'Automating schedule slots, preventing double-bookings, and ensuring clear communication channels.'
                },
                solution: {
                    ar: 'بناء محرك جدولة دقيق وإدارة مرنة للأوقات والجلسات المتاحة.',
                    en: 'Constructed an automated scheduling engine with real-time slot reservation and notification triggers.'
                },
                stack: ['Laravel', 'PHP', 'MySQL', 'Booking System', 'Bootstrap'],
                image: 'assets/images/projects/hodoa-consulting.png',
                adminLogin: '',
                portalLogin: '',
                mostaql: 'https://mostaql.com/portfolio/841461',
                liveUrl: ''
            },
            {
                id: 7,
                category: 'lms',
                categoryLabel: { ar: 'منصة استشارات طبية', en: 'Medical Consulting UK' },
                title: {
                    ar: 'موقع إلكتروني لمركز نفسي واستشاري في بريطانيا',
                    en: 'Psychological Consulting Center Platform - UK'
                },
                description: {
                    ar: 'موقع ويب تعريفي ونظام استشارات لمركز نفسي متخصص في المملكة المتحدة لدعم العملاء وجدولة الجلسات.',
                    en: 'UK-based psychological support and consultation platform for client intake, session booking, and specialist directory.'
                },
                challenge: {
                    ar: 'بناء واجهة مريحة وموثوقة تعكس الخصوصية وسهولة الوصول للخدمات العلاجية.',
                    en: 'Designing a calm, accessible interface ensuring utmost client confidentiality and streamlined appointment booking.'
                },
                solution: {
                    ar: 'تصميم وبناء نظام مرن وسلس متوافق مع معايير الويب العالمية والأجهزة الذكية.',
                    en: 'Engineered a secure, lightweight web system with responsive booking forms and multilingual support.'
                },
                stack: ['Laravel', 'PHP', 'MySQL', 'Responsive Design'],
                image: 'assets/images/projects/psychology-center.png',
                adminLogin: '',
                portalLogin: '',
                mostaql: 'https://mostaql.com/portfolio/841458',
                liveUrl: ''
            }
        ],

        get filteredProjects() {
            if (this.activeCategory === 'all') {
                return this.projects;
            }
            return this.projects.filter(p => p.category === this.activeCategory);
        },

        // Bilingual Translations Dictionary
        translations: {
            ar: {
                brandName: 'غسان أبو حزين',
                brandSubtitle: 'Senior Backend Laravel Developer',
                navAbout: 'نبذة',
                navExperience: 'الخبرات',
                navSkills: 'المهارات',
                navProjects: 'المشاريع',
                navEducation: 'التعليم',
                navContact: 'تواصل معي',
                btnCV: 'السيرة الذاتية',
                btnContact: 'راسلني',
                heroStatus: 'متاح للعمل على مشاريع برمجية جديدة وعقود العمل عن بُعد',
                heroTitle1: 'هندسة الأنظمة المعقدة وحلول',
                heroSummary: 'مهندس برمجيات متخصص في تطوير الواجهات الخلفية (Backend) بأنظمة Laravel & PHP بخبرة عملية تزيد عن 6 سنوات في بناء أنظمة الـ ERP، واجهات RESTful APIs فائقة الأداء، وهندسة قواعد البيانات مع التزام صارم بمعايير Clean Architecture وأفضل الممارسات البرمجية.',
                btnExploreProjects: 'استكشاف المشاريع الحية',
                btnDirectWhatsApp: 'محادثة واتساب مباشرة',
                btnViewCV: 'عرض الـ CV',
                stat1Label: 'سنوات خبرة متخصصة',
                stat2Label: 'أنظمة حية ومشاريع مكتملة',
                stat3Label: 'Clean Code & Architecture',
                stat4Label: 'خريج الجامعة الإسلامية',
                pillarsTitle: 'الركائز المعمارية والبرمجية',
                pillarsSubtitle: 'المعايير الهندسية التي أعتمد عليها في بناء الأنظمة البرمجية المتينة والمستقرة',
                pillar1Title: 'بنية أنظمة ERP & SaaS',
                pillar1Desc: 'بناء أنظمة متكاملة متعددة الصلاحيات (RBAC) ولوحات تحكم معقدة تدير تدفق الأعمال بكفاءة.',
                pillar2Title: 'تحسين قواعد البيانات',
                pillar2Desc: 'هندسة MySQL/MariaDB، الفهرسة المتقدمة، تحسين الاستعلامات، وحل مشاكل N+1 بدقة.',
                pillar3Title: 'واجهات APIs ومصادقة آمنة',
                pillar3Desc: 'بناء RESTful APIs متينة وتأمينها باستخدام Laravel Sanctum & Passport مع توثيق شامل.',
                pillar4Title: 'معالجة المهام الخلفية',
                pillar4Desc: 'معالجة المهام الثقيلة في الخلفية عبر Queues & Jobs وجدولة المهام الدورية Task Scheduling.',
                expBadge: 'المسار المهني والخبرات',
                expTitle: 'الخبرات المهنية وسجل العمل',
                expSubtitle: 'محطات واقعية من العمل في شركات ومنظمات برمجية كبرى',
                skillsBadge: 'الترسانة التقنية',
                skillsTitle: 'المهارات والأدوات البرمجية',
                skillsSubtitle: 'الأدوات والتقنيات التي أتقنها لبناء تطبيقات ويب قوية وقابلة للتوسع',
                skillCatBackend: 'Backend & Laravel',
                skillCatDatabase: 'قواعد البيانات والأداء',
                skillCatFrontend: 'Frontend & Reactivity',
                skillCatTools: 'الأدوات وبيئة العمل',
                projectsBadge: 'معرض الأعمال الحقيقية',
                projectsTitle: 'المشاريع ودراسات الحالة',
                projectsSubtitle: 'أنظمة إنتاجية حية ولوحات تحكم تم تطويرها لعملاء وشركات ومؤسسات',
                btnDetails: 'التفاصيل المعمارية',
                btnLive: 'الموقع الحي',
                eduBadge: 'المؤهلات والعضويات',
                eduTitle: 'التعليم والشهادات الرسمية',
                eduSubtitle: 'المؤهلات الأكاديمية والمهنية المعتمدة',
                degreeTitle: 'بكالوريوس علوم الحاسوب (2009)',
                degreeUniversity: 'كلية تكنولوجيا المعلومات – الجامعة الإسلامية بغزة.',
                memberTitle: 'عضوية نقابة PICTA',
                memberDesc: 'عضو رسمي في اتحاد شركات تكنولوجيا المعلومات الفلسطينية.',
                languagesTitle: 'اللغات والمهارات الشخصية',
                languagesDesc: 'العربية: اللغة الأم | الإنجليزية: ممتاز (TOEFL Level 11) وحل المشكلات والتفكير التحليلي.',
                contactTitle: 'هل لديك مشروع أو فرصة عمل تقنية؟',
                contactSubtitle: 'يسعدني تقديم الاستشارات التقنية، وتطوير وبناء الأنظمة البرمجية من الصفر حتى مرحلة الاستقرار والإطلاق.',
                contactViaWhatsApp: 'تواصل فوري عبر الواتساب',
                contactViaEmail: 'البريد الإلكتروني المباشر',
                modalChallenge: 'التحدي والمشكلة البرمجية:',
                modalSolution: 'الحل المعماري والتنفيذ:',
                modalStack: 'المكدس التقني والمكتبات:',
                btnClose: 'إغلاق'
            },
            en: {
                brandName: 'Ghassan Abo Hozaun',
                brandSubtitle: 'Senior Backend Laravel Developer',
                navAbout: 'About',
                navExperience: 'Experience',
                navSkills: 'Skills',
                navProjects: 'Projects',
                navEducation: 'Education',
                navContact: 'Contact',
                btnCV: 'Resume / CV',
                btnContact: 'Get In Touch',
                heroStatus: 'Available for new software projects & remote contract roles',
                heroTitle1: 'Engineering Complex Web Systems &',
                heroSummary: 'Experienced Senior Backend Laravel & PHP Developer with 6+ years of specialized hands-on expertise engineering secure, scalable, and high-performance ERP systems, RESTful APIs, and database architectures with a strict dedication to Clean Code and industry best practices.',
                btnExploreProjects: 'Explore Live Projects',
                btnDirectWhatsApp: 'Direct WhatsApp Chat',
                btnViewCV: 'View Resume',
                stat1Label: 'Years Specialized Exp',
                stat2Label: 'Live Production Systems',
                stat3Label: 'Clean Code & Standards',
                stat4Label: 'IUG CS Graduate (2009)',
                pillarsTitle: 'Architectural & Engineering Pillars',
                pillarsSubtitle: 'The engineering standards and patterns I apply to craft resilient, rock-solid applications',
                pillar1Title: 'Enterprise ERP & SaaS Architecture',
                pillar1Desc: 'Building multi-tenant systems, robust Role-Based Access Control (RBAC), and high-traffic workflows.',
                pillar2Title: 'Database Optimization',
                pillar2Desc: 'MySQL/MariaDB schema tuning, advanced indexing, query profiling, and eliminating N+1 bottlenecks.',
                pillar3Title: 'Secure RESTful APIs',
                pillar3Desc: 'Robust API architecture secured via Laravel Sanctum & Passport with comprehensive documentation.',
                pillar4Title: 'Async Queue Processing',
                pillar4Desc: 'Offloading heavy workloads via Laravel Queues, Jobs, Events, and scheduled background workers.',
                expBadge: 'Career Milestones',
                expTitle: 'Professional Experience',
                expSubtitle: 'Track record working with leading companies and large production environments',
                skillsBadge: 'Tech Stack & Arsenal',
                skillsTitle: 'Technical Arsenal & Skills',
                skillsSubtitle: 'The modern tools and frameworks I rely on to deliver scalable web solutions',
                skillCatBackend: 'Backend & Laravel Core',
                skillCatDatabase: 'Databases & Performance',
                skillCatFrontend: 'Frontend & Reactivity',
                skillCatTools: 'DevOps & Tools',
                projectsBadge: 'Real Production Showcase',
                projectsTitle: 'Featured Projects & Case Studies',
                projectsSubtitle: 'Live systems and enterprise dashboards engineered for businesses and NGOs',
                btnDetails: 'Architecture Details',
                btnLive: 'Live Preview',
                eduBadge: 'Credentials & Degrees',
                eduTitle: 'Education & Certifications',
                eduSubtitle: 'Verified academic qualifications and professional affiliations',
                degreeTitle: 'Bachelor of Computer Science (2009)',
                degreeUniversity: 'Information Technology College – Islamic University of Gaza (IUG).',
                memberTitle: 'PICTA Association Member',
                memberDesc: 'Official member of the Palestinian Information Technology Association.',
                languagesTitle: 'Languages & Soft Skills',
                languagesDesc: 'Arabic: Native | English: Very Good (TOEFL Level 11) with strong problem solving and analytical thinking.',
                contactTitle: 'Have a Project or Remote Role?',
                contactSubtitle: 'I am available for technical consulting, architecture design, and end-to-end backend engineering for your next system.',
                contactViaWhatsApp: 'Instant Chat on WhatsApp',
                contactViaEmail: 'Direct Work Email',
                modalChallenge: 'Problem & Engineering Challenge:',
                modalSolution: 'Architectural Solution & Implementation:',
                modalStack: 'Tech Stack & Libraries:',
                btnClose: 'Close'
            }
        }
    };
}
