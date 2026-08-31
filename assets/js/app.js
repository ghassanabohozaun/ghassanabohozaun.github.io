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
        activeTechFilter: 'all',
        searchQuery: '',
        techFilters: [
            'all',
            'Laravel 11',
            'MySQL',
            'Queues & Cron Jobs',
            'Multi-Tenant SaaS',
            'RBAC',
            'Livewire',
            'RESTful APIs',
            'Vue.js'
        ],
        selectedProject: null,
        activeModalTab: 'architecture',
        activeTerminalTab: 'artisan',
        activeExpIndex: 0,
        activeWorkflowStep: 0,
        emailCopied: false,

        resetProjectFilters() {
            this.activeCategory = 'all';
            this.activeTechFilter = 'all';
            this.searchQuery = '';
        },

        openProjectModal(project) {
            this.selectedProject = project;
            this.activeModalTab = 'architecture';
            this.modalOpen = true;
        },

        copyEmail() {
            navigator.clipboard.writeText('ghassanabohozaun@gmail.com');
            this.emailCopied = true;
            setTimeout(() => { this.emailCopied = false; }, 2500);
        },

        // 5-Phase Engineering Architecture Workflow
        workflowSteps: [
            {
                step: '01',
                icon: 'fa-solid fa-sitemap',
                color: 'red',
                title: {
                    ar: 'تحليل المتطلبات ونمذجة البيانات (ERD)',
                    en: 'Requirements Analysis & ERD Modeling'
                },
                desc: {
                    ar: 'دراسة منطق الأعمال بدقة، تحديد الكيانات والعلاقات، وبناء مخطط قاعدة البيانات (Schema) وتحديد الفهارس والمفاتيح الأساسية لمنع التكرار.',
                    en: 'Deconstructing business logic, defining entities and relationships, and designing robust normalized schemas with optimized indexes.'
                },
                tags: ['ERD Diagrams', 'Data Normalization', 'Index Planning', 'Relationship Mapping']
            },
            {
                step: '02',
                icon: 'fa-solid fa-layer-group',
                color: 'amber',
                title: {
                    ar: 'تصميم المعمارية البرمجية النظيفة (Clean Architecture)',
                    en: 'Clean Architecture & SOLID Patterns'
                },
                desc: {
                    ar: 'تطبيق نمط Service Layer و Repository Pattern لفصل منطق الأعمال عن الـ Controllers، مع كتابة كود نظيف وقابل للتوسع والصيانة على المدى الطويل.',
                    en: 'Implementing Service Layer and Repository patterns to isolate core business rules from controllers, ensuring maintainability and scalability.'
                },
                tags: ['Service Layer', 'Repository Pattern', 'Modular MVC', 'SOLID Principles']
            },
            {
                step: '03',
                icon: 'fa-solid fa-shield-halved',
                color: 'emerald',
                title: {
                    ar: 'بناء واجهات الـ RESTful وتأمين الصلاحيات (RBAC)',
                    en: 'RESTful APIs & Multi-Tier RBAC'
                },
                desc: {
                    ar: 'تطوير واجهات برمجية آمنة وسريعة باستخدام Laravel Sanctum، والتحكم الدقيق في أدوار المستخدمين وصلاحيات الوصول لكل شاشة وعملية.',
                    en: 'Building high-performance APIs using Laravel Sanctum with granular role-based access control (RBAC) across all modules.'
                },
                tags: ['Laravel Sanctum', 'Role-Based Access', 'API Resources', 'Rate Limiting']
            },
            {
                step: '04',
                icon: 'fa-solid fa-bolt',
                color: 'cyan',
                title: {
                    ar: 'الأتمتة والمهام اللاتزامنية (Queues & Cron Jobs)',
                    en: 'Async Queues & Task Automation'
                },
                desc: {
                    ar: 'ترحيل العمليات الثقيلة (مثل إرسال الإشعارات، معالجة التقارير المالية، وتحديث الحالات) إلى طوابير الخلفية لضمان استجابة لحظية للمستخدم.',
                    en: 'Offloading heavy computations, financial report generation, and notifications to background queues for zero user latency.'
                },
                tags: ['Database/Redis Queues', 'Scheduled Jobs', 'Job Batching', 'Alert Automation']
            },
            {
                step: '05',
                icon: 'fa-solid fa-gauge-high',
                color: 'indigo',
                title: {
                    ar: 'تحسين أداء الاستعلامات والنشر (Tuning & Deploy)',
                    en: 'Query Tuning & Production Deployment'
                },
                desc: {
                    ar: 'فحص استعلامات SQL ومعالجة مشكلة N+1 عبر Eager Loading، تفعيل التخزين المؤقت (Caching)، ونشر النظام على بيئة الإنتاج بثقة واستقرار.',
                    en: 'Auditing SQL queries, eliminating N+1 bottlenecks via Eager Loading, enabling caching layers, and deploying to production.'
                },
                tags: ['Query Profiling', 'Eager Loading', 'Cache Optimization', 'Production Tuning']
            }
        ],

        // Typewriter Animation State
        typewriterWords: {
            ar: [
                'Enterprise ERP Systems Specialist',
                'Laravel & PHP Backend Architect',
                'High-Performance RESTful APIs',
                'Database Schema & Query Tuning'
            ],
            en: [
                'Enterprise ERP Systems Specialist',
                'Laravel & PHP Backend Architect',
                'High-Performance RESTful APIs',
                'Database Schema & Query Tuning'
            ]
        },
        typedText: '',
        wordIndex: 0,
        charIndex: 0,
        isDeleting: false,
        typingTimeout: null,

        // Animated Counters State
        counterStats: { exp: 0, projects: 0, users: 0, grad: 1900 },

        // Lifecycle Initialize
        initApp() {
            this.applyTheme();
            this.applyLang();
            document.body.classList.add('is-ready');
            setTimeout(() => {
                document.body.classList.remove('preload');
                this.startTypewriter();
                this.animateCounters();
                this.initSpotlight();
            }, 100);
        },

        // Interactive Spotlight Card Glow (Vercel & Stripe style)
        initSpotlight() {
            document.addEventListener('mousemove', (e) => {
                const cards = document.querySelectorAll('.spotlight-card');
                for (let i = 0; i < cards.length; i++) {
                    const rect = cards[i].getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    cards[i].style.setProperty('--mouse-x', `${x}px`);
                    cards[i].style.setProperty('--mouse-y', `${y}px`);
                }
            });
        },

        // Typewriter Logic
        startTypewriter() {
            if (this.typingTimeout) clearTimeout(this.typingTimeout);
            const words = this.typewriterWords[this.lang] || this.typewriterWords.ar;
            const currentWord = words[this.wordIndex % words.length];

            if (this.isDeleting) {
                this.typedText = currentWord.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.typedText = currentWord.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let speed = this.isDeleting ? 35 : 70;

            if (!this.isDeleting && this.charIndex === currentWord.length) {
                speed = 2200; // Pause when word is completely typed
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.wordIndex++;
                speed = 350; // Pause before typing next word
            }

            this.typingTimeout = setTimeout(() => this.startTypewriter(), speed);
        },

        // Smooth Counter Animation Logic
        animateCounters() {
            const animateValue = (key, start, end, duration) => {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    // Ease-out cubic curve for natural deceleration
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    this.counterStats[key] = Math.floor(easeProgress * (end - start) + start);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        this.counterStats[key] = end;
                    }
                };
                window.requestAnimationFrame(step);
            };
            animateValue('exp', 0, 6, 1200);
            animateValue('projects', 0, 10, 1400);
            animateValue('users', 0, 10000, 1800);
            animateValue('grad', 1900, 2009, 1000);
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
                ? 'غسان أبو حزين | مطور أول Backend Laravel & PHP'
                : 'Ghassan Abo Hozaun | Senior Backend Laravel & PHP Developer';
        },

        t(key) {
            return this.translations[this.lang][key] || key;
        },

        openProjectModal(project) {
            this.selectedProject = project;
            this.modalOpen = true;
        },

        // Project Categories
        projectCategories: [
            { id: 'all', name: { ar: 'جميع المشاريع', en: 'All Projects' } },
            { id: 'erp', name: { ar: 'أنظمة ERP وإدارة شركات', en: 'ERP & Enterprise' } },
            { id: 'ngo', name: { ar: 'أنظمة الجمعيات والأيتام', en: 'NGO & Welfare Systems' } },
            { id: 'lms', name: { ar: 'منصات طبية وتعليمية', en: 'Medical & E-Learning' } },
            { id: 'frontend', name: { ar: 'تطبيقات تفاعلية و UI', en: 'Interactive Web' } }
        ],

        // Real Experience History
        experienceList: [
            {
                company: { ar: 'شركة PTC – غزة', en: 'PTC – Gaza' },
                role: { ar: 'مطور أول Backend Laravel / PHP', en: 'Senior Backend Laravel / PHP Developer' },
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
                location: { ar: 'المملكة العربية السعودية (عن بُعد)', en: 'Saudi Arabia (Remote)' },
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
                id: 9,
                featured: true,
                isLive: true,
                category: 'erp',
                categoryLabel: { ar: 'نظام SaaS ونقاط بيع POS', en: 'SaaS & POS Platform' },
                title: {
                    ar: 'منصة دكانة السحابية لإدارة المتاجر ونقاط البيع - Dokkanah',
                    en: 'Dokkanah Cloud Platform - SaaS Enterprise & POS System'
                },
                description: {
                    ar: 'منظومة سحابية متكاملة متعددة الفروع لإدارة المبيعات، الحسابات، الموردين، والمخزون، مع واجهة كاشير ودفتر ديون رقمي فوري، تتبع سقف الائتمان وسرعة فائقة في معالجة العمليات المالية.',
                    en: 'Multi-tenant cloud SaaS system for retail sales, inventory, accounts, suppliers, and a real-time cashier notebook with customer debt limits and instant settlement.'
                },
                challenge: {
                    ar: 'بناء نظام سحابي متعدد المتاجر (Multi-Tenant) يتحمل عمليات كاشير متزامنة وسريعة دون تأخير، مع إدارة دقيقة لحسابات الديون والمدفوعات الفورية والتحصيلات.',
                    en: 'Engineering a high-speed multi-tenant architecture handling rapid concurrent POS transactions, instant debt ledger calculations, and tenant data isolation.'
                },
                solution: {
                    ar: 'هندسة معمارية سحابية مع تحسين استعلامات MySQL، فصل بيانات المتاجر بصلاحيات دقيقة، واجهات تفاعلية سريعة، ونظام إحصائيات مالية لحظي للمبيعات والتحصيلات.',
                    en: 'Engineered isolated tenant scoping, optimized relational queries for instantaneous balance updates, responsive Alpine/Livewire cashier interface, and real-time financial tracking.'
                },
                stack: ['Laravel 11', 'PHP 8.2', 'MySQL', 'Multi-Tenant SaaS', 'POS Engine', 'RESTful APIs', 'Livewire'],
                image: 'assets/images/projects/dokkanah-pos.png',
                portals: [
                    { label: { ar: 'لوحة الإدارة', en: 'Admin Portal' }, url: 'https://dokkanah.store/ar/dashboard/login', icon: 'fa-solid fa-gauge-high' },
                    { label: { ar: 'دفتر الكاشير', en: 'Cashier POS' }, url: 'https://dokkanah.store/ar/casher/notebook', icon: 'fa-solid fa-cash-register' }
                ],
                mostaql: '',
                liveUrl: 'https://dokkanah.store/ar/dashboard/login'
            },
            {
                id: 8,
                featured: true,
                isLive: true,
                category: 'erp',
                categoryLabel: { ar: 'نظام إدارة عقارات & ERP', en: 'Real Estate & Property ERP' },
                title: {
                    ar: 'منصة أملاك لإدارة العقارات والأملاك الذكية - MJK Althani',
                    en: 'Amlak Smart Real Estate & Property ERP - MJK Althani'
                },
                description: {
                    ar: 'منظومة سحابية متقدمة لأتمتة دورة حياة العقود العقارية، التتبع المالي الدقيق للشيكات والمقبوضات، وإدارة المستأجرين والوحدات مع نظام تنبيهات استباقي متكامل.',
                    en: 'Advanced cloud ERP platform for automating real estate contract lifecycles, precise financial tracking of cheques and payments, and unit management with proactive alerts.'
                },
                challenge: {
                    ar: 'أتمتة عقود الإيجار المعقدة ومتعددة الفترات، متابعة حالات الشيكات (تحصيل، إرجاع، تأجيل)، وتوليد التقارير المالية والإشعارات التلقائية قبل مواعيد الاستحقاق.',
                    en: 'Automating multi-period lease contracts, tracking cheque lifecycles (cleared, bounced, deferred), and triggering automated financial notifications before due dates.'
                },
                solution: {
                    ar: 'هندسة معمارية متكاملة بالاعتماد على Laravel و MySQL مع تفعيل الـ Queues و Scheduled Jobs للتنبيهات، نظام صلاحيات RBAC متقدم، ولوحة تحكم تفاعلية متجاوبة.',
                    en: 'Engineered a scalable architecture using Laravel and MySQL with automated queues and cron jobs for expiry alerts, granular RBAC authorization, and responsive dashboards.'
                },
                stack: ['Laravel 11', 'PHP 8.2', 'MySQL', 'Queues & Cron Jobs', 'RBAC', 'RESTful APIs', 'Tailwind CSS'],
                image: 'assets/images/projects/amlak-realestate.png',
                portals: [
                    { label: { ar: 'الموقع الرئيسي', en: 'Public Site' }, url: 'https://mjkalthani.com/ar', icon: 'fa-solid fa-globe' },
                    { label: { ar: 'لوحة التحكم', en: 'Admin Dashboard' }, url: 'https://mjkalthani.com/ar/dashboard/login', icon: 'fa-solid fa-building-user' }
                ],
                mostaql: '',
                liveUrl: 'https://mjkalthani.com/ar'
            },
            {
                id: 1,
                featured: true,
                isLive: true,
                category: 'erp',
                categoryLabel: { ar: 'نظام ERP سحابي', en: 'Enterprise ERP' },
                title: {
                    ar: 'نظام إدارة الموارد والشركات والموظفين - PTC ERP',
                    en: 'Enterprise ERP & Staff Management Platform - PTC'
                },
                description: {
                    ar: 'نظام متكامل لإدارة الشركات، الموظفين، الحضور والانصراف، الرواتب، والتقارير الإحصائية مع صلاحيات متقدمة (RBAC) ولوحات تحكم مخصصة للإدارة والموظفين.',
                    en: 'Comprehensive enterprise ERP platform for multi-branch operations, employee records, attendance, payroll, and advanced RBAC permission tiers.'
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
                portals: [
                    { label: { ar: 'لوحة الإدارة', en: 'Admin Portal' }, url: 'https://ptcsystem.org/en/dashboard/login', icon: 'fa-solid fa-lock' },
                    { label: { ar: 'بوابة الموظفين', en: 'Staff Portal' }, url: 'https://ptcsystem.org/en/employees/login', icon: 'fa-solid fa-users' }
                ],
                mostaql: 'https://mostaql.com/portfolio/3362932',
                liveUrl: 'https://ptcsystem.org/en/dashboard/login'
            },
            {
                id: 2,
                featured: true,
                isLive: true,
                category: 'ngo',
                categoryLabel: { ar: 'نظام إدارة وكفالة', en: 'Sponsorship System' },
                title: {
                    ar: 'نظام كفالة ومتابعة الأيتام - جمعية نور المعرفة',
                    en: 'Orphan Sponsorship & Welfare System - Noor El-Marifa'
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
                portals: [
                    { label: { ar: 'لوحة الإدارة', en: 'Admin Portal' }, url: 'https://noorelmarifaa.org/ar/dashboard/login', icon: 'fa-solid fa-shield-halved' },
                    { label: { ar: 'بوابة الكفلاء', en: 'Sponsor Portal' }, url: 'https://noorelmarifaa.org/ar/child/welcome', icon: 'fa-solid fa-hands-holding-child' }
                ],
                mostaql: 'https://mostaql.com/portfolio/3362912',
                liveUrl: 'https://noorelmarifaa.org/ar/dashboard/login'
            },
            {
                id: 3,
                featured: false,
                isLive: true,
                category: 'lms',
                categoryLabel: { ar: 'أكاديمية طبية & LMS', en: 'Medical LMS' },
                title: {
                    ar: 'منصة بكة أكاديمي للتعليم الطبي والمهني - ليبيا',
                    en: 'Bakka Academy Medical E-Learning - Libya'
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
                stack: ['Laravel', 'MySQL', 'Vue.js', 'Video Streaming', 'Bootstrap 5'],
                image: 'assets/images/projects/bakka-academy.png',
                portals: [
                    { label: { ar: 'الموقع العام', en: 'Public Site' }, url: 'https://bakkaacademy.com/en', icon: 'fa-solid fa-globe' },
                    { label: { ar: 'بوابة الطلاب', en: 'Student Portal' }, url: 'https://bakkaacademy.com/en/student', icon: 'fa-solid fa-user-graduate' }
                ],
                mostaql: 'https://mostaql.com/portfolio/3362888',
                liveUrl: 'https://bakkaacademy.com/en'
            },
            {
                id: 4,
                featured: false,
                isLive: true,
                category: 'ngo',
                categoryLabel: { ar: 'بوابة إلكترونية & CMS', en: 'NGO Portal' },
                title: {
                    ar: 'البوابة الرسمية لجمعية نور المعرفة الخيرية',
                    en: 'Noor El-Marifa NGO Web Platform'
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
                portals: [
                    { label: { ar: 'الموقع الرسمي', en: 'Official Portal' }, url: 'https://noorelmarifaa.org/en', icon: 'fa-solid fa-globe' }
                ],
                mostaql: 'https://mostaql.com/portfolio/841463',
                liveUrl: 'https://noorelmarifaa.org/en'
            },
            {
                id: 5,
                featured: false,
                isLive: false,
                category: 'frontend',
                categoryLabel: { ar: 'تطبيق سياحة وحجوزات', en: 'Travel & Booking UI' },
                title: {
                    ar: 'تحويل تصميم UI/UX إلى منصة ويب تفاعلية - شركة نقاط للسياحة',
                    en: 'Interactive Travel & Booking Platform - Neqat Travel'
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
                portals: [],
                mostaql: 'https://mostaql.com/portfolio/3418352',
                liveUrl: ''
            },
            {
                id: 6,
                featured: false,
                isLive: false,
                category: 'erp',
                categoryLabel: { ar: 'منصة استشارات وحجوزات', en: 'Consulting Platform' },
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
                stack: ['Laravel', 'PHP', 'MySQL', 'Booking Engine', 'Bootstrap'],
                image: 'assets/images/projects/hodoa-consulting.png',
                portals: [],
                mostaql: 'https://mostaql.com/portfolio/841461',
                liveUrl: ''
            },
            {
                id: 7,
                featured: false,
                isLive: false,
                category: 'lms',
                categoryLabel: { ar: 'منصة استشارات طبية', en: 'Medical Platform UK' },
                title: {
                    ar: 'موقع إلكتروني لمركز نفسي واستشاري في بريطانيا',
                    en: 'Psychological Consulting Center - UK'
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
                portals: [],
                mostaql: 'https://mostaql.com/portfolio/841458',
                liveUrl: ''
            }
        ],

        get filteredProjects() {
            return this.projects.filter(p => {
                const matchCategory = this.activeCategory === 'all' || p.category === this.activeCategory;
                const matchTech = this.activeTechFilter === 'all' || p.stack.some(t => t.toLowerCase().includes(this.activeTechFilter.toLowerCase()));
                
                let matchSearch = true;
                if (this.searchQuery && this.searchQuery.trim() !== '') {
                    const q = this.searchQuery.toLowerCase().trim();
                    const titleAr = (p.title.ar || '').toLowerCase();
                    const titleEn = (p.title.en || '').toLowerCase();
                    const descAr = (p.description.ar || '').toLowerCase();
                    const descEn = (p.description.en || '').toLowerCase();
                    const catAr = (p.categoryLabel.ar || '').toLowerCase();
                    const catEn = (p.categoryLabel.en || '').toLowerCase();
                    const inStack = p.stack.some(t => t.toLowerCase().includes(q));
                    
                    matchSearch = titleAr.includes(q) || titleEn.includes(q) ||
                                  descAr.includes(q) || descEn.includes(q) ||
                                  catAr.includes(q) || catEn.includes(q) ||
                                  inStack;
                }

                return matchCategory && matchTech && matchSearch;
            });
        },

        // Bilingual Translations Dictionary
        translations: {
            ar: {
                brandName: 'غسان أبو حزين',
                brandSubtitle: 'Senior Backend Laravel Developer',
                navAbout: 'عني',
                navExperience: 'الخبرات',
                navSkills: 'المهارات',
                navWorkflow: 'منهجية العمل',
                navProjects: 'المشاريع',
                navEducation: 'المؤهلات',
                navContact: 'تواصل معي',
                btnCV: 'السيرة الذاتية',
                btnContact: 'راسلني',
                heroStatus: 'متاح للعمل على مشاريع برمجية وعقود عن بُعد',
                heroTitle1: 'مطور أول أنظمة خلفية ومهندس حلول',
                heroSummary: 'مهندس برمجيات بخبرة تزيد عن 6 سنوات في بناء وتطوير أنظمة الـ ERP المعقدة، منصات SaaS، وواجهات RESTful APIs الآمنة. أركز على كتابة كود نظيف وقابل للتوسع (Clean Architecture)، تصميم قواعد البيانات بكفاءة، وتحسين أداء الاستعلامات وتكامل الأنظمة.',
                btnExploreProjects: 'استعراض المشاريع والأنظمة',
                btnDirectWhatsApp: 'محادثة مباشرة عبر واتساب',
                btnViewCV: 'تحميل / عرض السيرة الذاتية',
                stat1Label: 'سنوات خبرة في Laravel & PHP',
                stat2Label: 'أنظمة ERP وحلول حية',
                stat3Label: 'مستخدم ومستفيد مُدار',
                stat4Label: 'خريج الجامعة الإسلامية (2009)',
                expBadge: 'المسار المهني',
                expTitle: 'الخبرات المهنية وسجل العمل',
                expSubtitle: 'محطات واقعية من العمل في شركات ومنظمات برمجية كبرى',
                skillsBadge: 'التقنيات والأدوات',
                skillsTitle: 'المهارات والبيئة البرمجية',
                skillsSubtitle: 'الأدوات والتقنيات التي أستخدمها لبناء وإدارة الأنظمة البرمجية بكفاءة',
                skillCatBackend: 'تطوير الـ Backend و Laravel',
                skillCatDatabase: 'قواعد البيانات وتحسين الأداء',
                skillCatFrontend: 'الواجهات الأمامية والتفاعل',
                skillCatTools: 'أدوات التطوير وبيئة العمل',
                workflowBadge: 'الهندسة المعمارية',
                workflowTitle: 'منهجية بناء وتطوير الأنظمة',
                workflowSubtitle: 'خارطة طريق هندسية واضحة من تحليل المتطلبات وحتى استقرار بيئة الإنتاج',
                workflowDeliverables: 'المخرجات والمعايير الهندسية:',
                achievementsBadge: 'مؤشرات الأداء والجودة',
                achievementsTitle: 'إنجازات وأرقام هندسية محققة',
                achievementsSubtitle: 'تحديات تقنية تم حلها في بيئات عمل وإنتاجية حقيقية',
                metric1Title: 'تسريع الاستعلامات',
                metric1Desc: 'تخفيض زمن الاستجابة عبر الفهرسة المركبة وتطبيق Eager Loading لمنع معضلة N+1.',
                metric2Title: 'سلامة الحركات المالية',
                metric2Desc: 'حماية كاملة لقيود الشيكات والديون بحركات الـ Database Transactions لضمان عدم فقدان أي بيان.',
                metric3Title: 'مهمة مؤتمتة شهرياً',
                metric3Desc: 'معالجة الإشعارات والتقارير الدورية بالخلفية عبر Laravel Queues & Scheduled Jobs.',
                metric4Title: 'عزل بيانات الفروع',
                metric4Desc: 'عزل كامل وآمن لبيانات الشركات والمتاجر المشتركة مع نظام صلاحيات متعدد المستويات (RBAC).',
                projectsBadge: 'سابقة الأعمال والأنظمة',
                projectsTitle: 'الأنظمة والمشاريع المنفذة',
                projectsSubtitle: 'أنظمة إنتاجية حية ولوحات تحكم تم تطويرها لشركات ومؤسسات حقيقية',
                filterByTech: 'تصفية سريعة بالتقنيات:',
                filterAllTech: 'الكل',
                liveBadge: 'نظام إنتاجي حي',
                portalsTitle: 'بوابات الدخول السريعة:',
                searchPlaceholder: 'ابحث في المشاريع بالاسم، التقنية، أو الكلمة المفتاحية (مثال: كاشير، عقارات، ERP)...',
                noProjectsFound: 'لم يتم العثور على أي مشاريع مطابقة لمعايير البحث الحالية.',
                resetFilters: 'إعادة تعيين الفلاتر والبحث',
                btnDetails: 'التفاصيل التقنية',
                btnLive: 'المعاينة الحية',
                eduBadge: 'المؤهلات والشهادات',
                eduTitle: 'التعليم والعضويات المهنية',
                eduSubtitle: 'المؤهلات الأكاديمية والمهنية المعتمدة',
                degreeTitle: 'بكالوريوس علوم الحاسوب (2009)',
                degreeUniversity: 'كلية تكنولوجيا المعلومات – الجامعة الإسلامية بغزة (IUG).',
                memberTitle: 'عضوية اتحاد PICTA',
                memberDesc: 'عضو رسمي في اتحاد شركات تكنولوجيا المعلومات الفلسطينية.',
                languagesTitle: 'اللغات والمهارات التحليلية',
                languagesDesc: 'العربية: اللغة الأم | الإنجليزية: ممتاز (TOEFL Level 11) مع مهارات حل المشكلات والتفكير التحليلي.',
                contactTitle: 'هل لديك مشروع أو تحتاج استشارة برمجية؟',
                contactSubtitle: 'يسعدني مناقشة متطلبات مشروعك، تصميم البنية التحتية البرمجية، وتطوير النظام من الصفر حتى مرحلة الإطلاق والاستقرار.',
                contactViaWhatsApp: 'تواصل فوري عبر الواتساب',
                contactViaEmail: 'البريد الإلكتروني المباشر',
                contactWhatsAppOnline: 'متاح للمحادثة الفورية',
                contactEmailDirect: 'راسلني مباشرة عبر البريد',
                copyEmailAction: 'نسخ البريد',
                copiedEmailAction: 'تم النسخ بنجاح ✓',
                profileLinkedInDesc: 'الملف المهني والتوصيات',
                profileGitHubDesc: 'المستودعات البرمجية',
                profileMostaqlDesc: 'سابقة الأعمال والتقييمات',
                modalChallenge: 'المتطلبات والتحدي التقني:',
                modalSolution: 'الحل المعماري والتنفيذ:',
                modalStack: 'التقنيات والمكتبات المستخدمة:',
                modalTabArchitecture: 'المعمارية والتحدي الهندسي',
                modalTabPortals: 'بوابات الدخول والصلاحيات',
                modalTabStack: 'البيئة البرمجية والمكتبات',
                modalArchitectureBlueprint: 'المخطط المعماري للنظام',
                modalSpecsTitle: 'المعايير الهندسية المنفذة:',
                openPortalDirect: 'فتح البوابة مباشرة',
                btnClose: 'إغلاق',
                footerDesc: 'تطوير حلول برمجية متكاملة وأنظمة ERP مخصصة بمعايير معمارية متقدمة وأداء عالي.',
                footerRights: 'جميع الحقوق محفوظة.',
                btnBackToTop: 'الرجوع للأعلى'
            },
            en: {
                brandName: 'Ghassan Abo Hozaun',
                brandSubtitle: 'Senior Backend Laravel Developer',
                navAbout: 'About',
                navExperience: 'Experience',
                navSkills: 'Skills',
                navWorkflow: 'Workflow',
                navProjects: 'Projects',
                navEducation: 'Credentials',
                navContact: 'Contact',
                btnCV: 'Resume / CV',
                btnContact: 'Get In Touch',
                heroStatus: 'Available for backend projects & remote contract roles',
                heroTitle1: 'Senior Backend Engineer & Laravel Architect',
                heroSummary: 'Experienced Senior Backend Laravel & PHP Developer with 6+ years of hands-on expertise building enterprise ERP platforms, scalable SaaS products, and secure RESTful APIs. Dedicated to Clean Architecture, database schema design, query optimization, and robust async processing.',
                btnExploreProjects: 'View Systems & Projects',
                btnDirectWhatsApp: 'Chat Directly on WhatsApp',
                btnViewCV: 'View / Download CV',
                stat1Label: 'Years Laravel & PHP Exp',
                stat2Label: 'Live Production Systems',
                stat3Label: 'Users & Beneficiaries Managed',
                stat4Label: 'CS Graduate, IUG (2009)',
                expBadge: 'Career Milestones',
                expTitle: 'Work Experience & Track Record',
                expSubtitle: 'Practical career milestones in enterprise software companies and organizations',
                skillsBadge: 'Technical Arsenal',
                skillsTitle: 'Technical Arsenal & Stack',
                skillsSubtitle: 'The core languages, frameworks, databases, and tools I use in production',
                skillCatBackend: 'Backend & Laravel Core',
                skillCatDatabase: 'Databases & Performance Tuning',
                skillCatFrontend: 'Frontend & Reactive UI',
                skillCatTools: 'DevOps & Development Tools',
                workflowBadge: 'Engineering Architecture',
                workflowTitle: 'System Engineering & Development Lifecycle',
                workflowSubtitle: 'A structured 5-phase engineering workflow from requirement modeling to production stability',
                workflowDeliverables: 'Key Deliverables & Patterns:',
                achievementsBadge: 'Key Engineering Metrics',
                achievementsTitle: 'Proven Engineering Metrics & Impact',
                achievementsSubtitle: 'Real-world technical bottlenecks resolved with measurable impact',
                metric1Title: 'Query Latency Tuning',
                metric1Desc: 'Reduced query execution latency via composite indexing and Eager Loading to eliminate N+1 issues.',
                metric2Title: 'Financial Data Integrity',
                metric2Desc: 'Guaranteed ACID compliance for cheque lifecycles and debt ledgers via strict database transactions.',
                metric3Title: 'Automated Monthly Tasks',
                metric3Desc: 'Seamless background processing for periodic reports and notifications via Laravel Queues.',
                metric4Title: 'Multi-Tenant Isolation',
                metric4Desc: 'Robust tenant data scoping and enterprise-grade multi-tier RBAC authorization.',
                projectsBadge: 'Proven Production Track Record',
                projectsTitle: 'Featured Projects & Case Studies',
                projectsSubtitle: 'Live production ERP systems and enterprise platforms engineered for businesses',
                filterByTech: 'Filter by Technology:',
                filterAllTech: 'All',
                liveBadge: 'Live In Production',
                portalsTitle: 'Quick Portals Access:',
                searchPlaceholder: 'Search projects by title, tech stack, or keyword (e.g. POS, ERP, Real Estate)...',
                noProjectsFound: 'No projects matched your search criteria.',
                resetFilters: 'Reset Filters & Search',
                btnDetails: 'Technical Details',
                btnLive: 'Live Preview',
                eduBadge: 'Education & Affiliations',
                eduTitle: 'Education & Professional Credentials',
                eduSubtitle: 'Verified academic degrees and recognized industry affiliations',
                degreeTitle: 'Bachelor of Computer Science (2009)',
                degreeUniversity: 'Faculty of Information Technology – Islamic University of Gaza (IUG).',
                memberTitle: 'PICTA Association Member',
                memberDesc: 'Official member of the Palestinian Information Technology Association.',
                languagesTitle: 'Languages & Analytical Problem Solving',
                languagesDesc: 'Arabic: Native | English: Very Good (TOEFL Level 11) with strong system analysis and debugging skills.',
                contactTitle: 'Have a Project or Backend Engineering Role?',
                contactSubtitle: 'I am available for technical architecture, database engineering, and full-cycle backend development from design to deployment.',
                contactViaWhatsApp: 'Instant WhatsApp Chat',
                contactViaEmail: 'Direct Work Email',
                contactWhatsAppOnline: 'Available for instant discussion',
                contactEmailDirect: 'Direct backend engineering inquiries',
                copyEmailAction: 'Copy Email',
                copiedEmailAction: 'Copied to clipboard ✓',
                profileLinkedInDesc: 'Verified Career Profile & Recommendations',
                profileGitHubDesc: 'Source Code & Technical Repositories',
                profileMostaqlDesc: 'Verified Case Studies & Client Reviews',
                modalChallenge: 'Engineering Challenge & Requirements:',
                modalSolution: 'Architectural Implementation:',
                modalStack: 'Tech Stack & Packages:',
                modalTabArchitecture: 'Architecture & Challenge',
                modalTabPortals: 'Access Portals & RBAC',
                modalTabStack: 'Tech Stack & Packages',
                modalArchitectureBlueprint: 'System Architecture Blueprint',
                modalSpecsTitle: 'Implemented Architectural Standards:',
                openPortalDirect: 'Launch Portal Directly',
                btnClose: 'Close',
                footerDesc: 'Engineering scalable enterprise ERP solutions and clean architecture backend systems.',
                footerRights: 'All rights reserved.',
                btnBackToTop: 'Back to Top'
            }
        }
    };
}
