document.addEventListener('DOMContentLoaded', function() {
    // Cinematic Era Timeline Navigation
    const eraMarkers = document.querySelectorAll('.era-marker');
    const eraShowcases = document.querySelectorAll('.era-showcase');
    
    eraMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const targetEra = this.dataset.era;
            
            // Remove active class from all markers and showcases
            eraMarkers.forEach(m => m.classList.remove('active'));
            eraShowcases.forEach(showcase => showcase.classList.remove('active'));
            
            // Add active class to clicked marker and corresponding showcase
            this.classList.add('active');
            const activeShowcase = document.querySelector(`[data-era="${targetEra}"].era-showcase`);
            if (activeShowcase) {
                activeShowcase.classList.add('active');
                
                // Adjust cinema stage height based on content
                setTimeout(() => {
                    const cinemaStage = document.querySelector('.cinema-stage');
                    const showcaseHeight = activeShowcase.scrollHeight;
                    const minHeight = Math.max(1400, showcaseHeight + 50);
                    cinemaStage.style.minHeight = minHeight + 'px';
                }, 100);
            }
        });
    });

    // Poster Marquee Duplication for Seamless Loop
    function duplicateMarqueePosters() {
        const marqueeTracks = document.querySelectorAll('.marquee-track');
        marqueeTracks.forEach(track => {
            const posters = Array.from(track.children);
            posters.forEach(poster => {
                const duplicate = poster.cloneNode(true);
                track.appendChild(duplicate);
            });
        });
    }

    // Initialize marquee duplication
    duplicateMarqueePosters();

    // Poster Card 3D Tilt Effect
    const posterCards = document.querySelectorAll('.poster-card');
    posterCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / (rect.height / 2)) * -10;
            const rotateY = (mouseX / (rect.width / 2)) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Enhanced Timeline Interaction
    function addTimelineGlow() {
        const timelineTrack = document.querySelector('.timeline-track');
        if (timelineTrack) {
            timelineTrack.style.animation = 'timelineGlow 3s ease-in-out infinite alternate';
        }
    }

    addTimelineGlow();

    // Fullscreen functionality
    const fullscreenBtn = document.getElementById('fullscreen-toggle');
    const fullscreenIcon = fullscreenBtn.querySelector('.fullscreen-icon');
    const fullscreenText = fullscreenBtn.querySelector('.fullscreen-text');

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            document.documentElement.requestFullscreen().then(() => {
                fullscreenIcon.textContent = '⛸';
                fullscreenText.textContent = 'Exit Fullscreen';
                document.body.classList.add('fullscreen-mode');
            }).catch((err) => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            // Exit fullscreen
            document.exitFullscreen().then(() => {
                fullscreenIcon.textContent = '⛶';
                fullscreenText.textContent = 'Fullscreen';
                document.body.classList.remove('fullscreen-mode');
            }).catch((err) => {
                console.log('Error attempting to exit fullscreen:', err);
            });
        }
    }

    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Handle fullscreen change events (for ESC key or other exits)
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            fullscreenIcon.textContent = '⛶';
            fullscreenText.textContent = 'Fullscreen';
            document.body.classList.remove('fullscreen-mode');
        }
    });

    // Keyboard shortcut for fullscreen (F11 alternative: Ctrl+Shift+F)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            toggleFullscreen();
        }
    });

    // Enhanced scroll behavior for fullscreen mode
    function enhanceFullscreenNavigation() {
        if (document.fullscreenElement) {
            // Add smooth scroll behavior
            document.documentElement.style.scrollBehavior = 'smooth';
            
            // Optional: Add section navigation hints
            const sections = document.querySelectorAll('.section');
            sections.forEach((section, index) => {
                section.style.scrollSnapAlign = 'start';
            });
            
            document.body.style.scrollSnapType = 'y mandatory';
        } else {
            // Reset scroll behavior
            document.documentElement.style.scrollBehavior = '';
            document.body.style.scrollSnapType = '';
            
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.style.scrollSnapAlign = '';
            });
        }
    }

    // Apply enhanced navigation when entering/exiting fullscreen
    document.addEventListener('fullscreenchange', function() {
        setTimeout(enhanceFullscreenNavigation, 100);
    });

    // Initial height adjustment
    setTimeout(() => {
        const activeShowcase = document.querySelector('.era-showcase.active');
        if (activeShowcase) {
            const cinemaStage = document.querySelector('.cinema-stage');
            const showcaseHeight = activeShowcase.scrollHeight;
            const minHeight = Math.max(1400, showcaseHeight + 50);
            cinemaStage.style.minHeight = minHeight + 'px';
        }
    }, 500);
    
    // Ghost cards hover effects
    const ghostCards = document.querySelectorAll('.ghost-card');
    
    ghostCards.forEach(card => {
        card.addEventListener('click', function() {
            const ghostName = this.dataset.ghost;
            showGhostInfo(ghostName);
        });
    });

    // Ghost navigation for arrows
    const ghostOrder = ['pocong', 'kuntilanak', 'tuyul', 'genderuwo', 'sundel-bolong'];
    let currentGhostIndex = 0;
    

    // Ghost information data
    const ghostData = {
        pocong: {
            name: "Pocong",
            image: "assets/images/Pocong 01.jpg",
            description: "Hantu yang terbungkus kain kafan dengan wujud yang tidak dapat berjalan normal. Pocong adalah manifestasi dari roh yang belum dapat beristirahat dengan tenang karena ikatan kafan yang tidak dilepaskan setelah 40 hari kematian. Sosoknya yang melompat-lompat menciptakan ketakutan tersendiri bagi yang melihatnya.",
            myth: "Menurut kepercayaan Jawa, pocong muncul karena simpul kain kafan tidak dibuka pada hari ke-40 setelah kematian. Dipercaya pocong akan terus menampakkan diri hingga simpul kafannya dilepaskan. Ada juga mitos bahwa pocong dapat memberikan nomor togel kepada orang yang berani bertemu dengannya di kuburan.",
            potential: "Pocong memiliki potensi besar untuk film horor 'naik kelas' dengan mengeksplorasi aspek psikologis dari kematian yang tidak tuntas. Konsep modern bisa mengintegrasikan trauma keluarga yang ditinggalkan, dilema moral tentang melepaskan orang terkasih, dan konflik antara kepercayaan tradisional dengan dunia modern. Visual effects bisa dikembangkan untuk menampilkan transisi antara dunia nyata dan alam baka."
        },
        kuntilanak: {
            name: "Kuntilanak", 
            image: "assets/images/Kuntilanak 01.png",
            description: "Hantu wanita yang meninggal saat melahirkan dengan penampilan cantik dari depan namun mengerikan dari belakang. Kuntilanak dikenal dengan tangisan bayi yang menyayat hati dan aroma melati yang menyengat sebelum kemunculannya. Sosoknya yang cantik namun mematikan mencerminkan dualitas kehidupan dan kematian.",
            myth: "Legenda mengatakan kuntilanak adalah roh wanita yang meninggal saat melahirkan dan tidak dapat melepaskan ikatan dengan dunia. Dipercaya dia mencari korban untuk menggantikan posisinya atau mencari bayi untuk diambil sebagai anaknya. Ada kepercayaan bahwa kuntilanak takut dengan benda tajam dan dapat dijinakkan dengan memasukkan paku ke lubang di tengkuk kepalanya.",
            potential: "Kuntilanak cocok untuk film horor psikologis yang mengangkat tema motherhood dan trauma persalinan. Pendekatan modern bisa mengeksplorasi isu kesehatan mental pasca melahirkan, maternal horror, dan ekspektasi sosial terhadap perempuan sebagai ibu. Teknik sinematografi bisa bermain dengan kontras antara kecantikan dan horror, serta sound design yang memadukan tangisan bayi dengan elemen mencekam."
        },
        tuyul: {
            name: "Tuyul",
            image: "assets/images/Tuyul.png", 
            description: "Makhluk kecil berbentuk anak gundul yang dipercaya dapat mencuri uang. Tuyul adalah manifestasi dari spiritual ekonomi dalam kepercayaan masyarakat Indonesia, dimana kemiskinan dan kekayaan mendadak sering dikaitkan dengan bantuan makhluk halus. Sosoknya yang polos namun nakal mencerminkan moral ambiguitas dalam pencarian rezeki.",
            myth: "Dipercaya tuyul adalah anak kecil yang meninggal sebelum waktunya dan dijadikan pelayan oleh dukun. Tuyul dapat mencuri uang dan barang berharga untuk majikannya, namun harus dibayar dengan sesajen dan mainan. Ada kepercayaan bahwa tuyul takut dengan bawang putih dan dapat ditangkap menggunakan cermin.",
            potential: "Tuyul bisa dikembangkan menjadi horror komedi atau thriller sosial yang mengkritik budaya instant gratification dan korupsi. Film bisa mengeksplorasi konsekuensi moral dari 'jalan pintas' dalam mencari kekayaan, hubungan antara kemiskinan dengan spiritual, dan ironi tentang bagaimana orang rela mengorbankan moral untuk uang. Approach visual bisa menggunakan kontras antara kelucuan dan horror untuk menciptakan uncanny valley effect."
        },
        genderuwo: {
            name: "Genderuwo",
            image: "assets/images/Genderuwo 01.png",
            description: "Makhluk astral berpostur besar dan berbulu lebat dengan kekuatan supernatural yang menakutkan. Genderuwo dikenal sebagai penggoda yang dapat berubah wujud menjadi manusia, terutama untuk menggoda wanita. Kehadirannya sering dikaitkan dengan tempat-tempat angker dan hutan lebat di Jawa.",
            myth: "Menurut kepercayaan Jawa, genderuwo adalah jin yang menjelma dalam bentuk manusia berbulu. Dipercaya dapat menggoda dan bahkan menikahi wanita manusia, serta memiliki kekuatan untuk mempengaruhi pikiran. Genderuwo konon bersarang di pohon-pohon besar dan tempat gelap, serta dapat memberikan kekayaan namun dengan konsekuensi yang mengerikan.",
            potential: "Genderuwo berpotensi menjadi psychological horror yang mengeksplorasi tema maskulinitas toksik, consent, dan female empowerment. Film modern bisa menggunakan sosok genderuwo sebagai metafora untuk predator seksual dan manipulasi psikologis. Pengembangan karakter bisa fokus pada perjuangan perempuan melawan sosok manipulatif, dengan visual yang bermain antara pesona dan ancaman, serta sound design yang menekankan aspek psikologis daripada sekedar jump scare."
        },
        "sundel-bolong": {
            name: "Sundel Bolong",
            image: "assets/images/Sundel Bolong 01.png",
            description: "Hantu wanita cantik dengan lubang besar di punggungnya yang merupakan hasil dari kutukan atau kematian yang tragis. Sundel Bolong menggabungkan elemen godaan dan horror dalam satu sosok, dimana kecantikannya dari depan kontras dengan kengerian di bagian belakangnya. Sosoknya melambangkan deception dan bahaya tersembunyi.",
            myth: "Legenda menyebutkan Sundel Bolong adalah wanita yang dikutuk karena perbuatan dosa atau mati dalam keadaan hamil di luar nikah. Lubang di punggungnya konon adalah jalan masuk setan atau akibat dari siksaan di alam baka. Dipercaya dia menggoda pria dengan kecantikannya, namun akan membunuh mereka setelah rahasia mengerikan di punggungnya terbongkar.",
            potential: "Sundel Bolong ideal untuk horror film yang mengangkat tema slut-shaming, victim-blaming, dan double standards dalam masyarakat terhadap sexualitas perempuan. Pendekatan modern bisa mengeksplorasi bagaimana stigma sosial dapat 'melubangi jiwa' seseorang. Film bisa menggunakan body horror dan psychological thriller elements, dengan fokus pada kritik sosial tentang judgmental society dan dampak psikologis dari social ostracism."
        }
    };

    // Function to show ghost information
    function showGhostInfo(ghostName) {
        const ghost = ghostData[ghostName];
        const ghostDetails = document.getElementById('ghostDetails');
        
        if (!ghost) return;
        
        // Update current ghost index
        currentGhostIndex = ghostOrder.indexOf(ghostName);
        
        // Update ghost details (carousel keeps running)
        document.getElementById('mainGhostImage').src = ghost.image;
        document.getElementById('mainGhostImage').alt = ghost.name;
        document.getElementById('ghostTitle').textContent = ghost.name;
        document.getElementById('ghostDescription').textContent = ghost.description;
        document.getElementById('ghostMyth').textContent = ghost.myth;
        document.getElementById('ghostPotential').textContent = ghost.potential;
        
        // Show ghost details with animation
        ghostDetails.classList.add('active');
        
        // Scroll to ghost details
        setTimeout(() => {
            ghostDetails.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
        
        // Add click outside to close functionality
        document.addEventListener('click', function closeGhostDetails(e) {
            if (!ghostDetails.contains(e.target) && !e.target.closest('.ghost-card')) {
                resetGhostView();
                document.removeEventListener('click', closeGhostDetails);
            }
        });
    }

    // Navigate to next/prev ghost
    function navigateGhost(direction) {
        if (direction === 'next') {
            currentGhostIndex = (currentGhostIndex + 1) % ghostOrder.length;
        } else {
            currentGhostIndex = (currentGhostIndex - 1 + ghostOrder.length) % ghostOrder.length;
        }
        
        const ghostName = ghostOrder[currentGhostIndex];
        showGhostInfo(ghostName);
    }

    // Arrow navigation event listeners
    const prevBtn = document.getElementById('ghostNavPrev');
    const nextBtn = document.getElementById('ghostNavNext');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateGhost('prev'));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateGhost('next'));
    }
    
    // Function to reset ghost view
    function resetGhostView() {
        const ghostDetails = document.getElementById('ghostDetails');
        
        // Hide ghost details (carousel keeps running)
        ghostDetails.classList.remove('active');
    }
    
    // True infinite scroll carousel functionality
    function initializeGhostCarousel() {
        const ghostTrack = document.querySelector('.ghosts-track');
        const ghostCards = document.querySelectorAll('.ghost-card');
        
        if (!ghostTrack) return;
        
        let currentPosition = 0;
        let isRunning = true;
        let animationId = null;
        
        // Calculate responsive values
        const getCarouselConfig = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 480) {
                return { cardWidth: 150, gap: 20, speed: 0.3 };
            } else if (screenWidth <= 768) {
                return { cardWidth: 170, gap: 25, speed: 0.35 };
            } else {
                return { cardWidth: 200, gap: 40, speed: 0.4 };
            }
        };
        
        // Get current config
        let config = getCarouselConfig();
        let singleSetWidth = (config.cardWidth + config.gap) * 5; // 5 original cards
        
        // Seamless infinite scroll function
        function animateCarousel() {
            if (!isRunning) {
                animationId = requestAnimationFrame(animateCarousel);
                return;
            }
            
            currentPosition -= config.speed;
            
            // Reset position seamlessly when we've moved exactly one full set
            if (Math.abs(currentPosition) >= singleSetWidth) {
                currentPosition = 0;
            }
            
            ghostTrack.style.transform = `translateX(${currentPosition}px)`;
            animationId = requestAnimationFrame(animateCarousel);
        }
        
        // Start the animation
        animateCarousel();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            config = getCarouselConfig();
            singleSetWidth = (config.cardWidth + config.gap) * 5;
        });

        

        
        // Cleanup function
        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
        
        return {
            pause: () => { isRunning = false; },
            resume: () => { isRunning = true; },
            destroy: () => {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            }
        };
    }
    
    // Initialize carousel after DOM is loaded
    const carouselController = initializeGhostCarousel();
    
    // Smooth scrolling for internal navigation (if added later)
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Parallax effect for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.horror-bg-overlay');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Horror-themed cursor effects
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) {
            createCustomCursor();
        }
    });
    
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(139,0,0,0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    }
    
    // Horror sound effects (optional - would require audio files)
    const playHorrorSound = (soundType) => {
        // Placeholder for horror sound effects
        // Could be implemented with Web Audio API or HTML5 audio
        console.log(`Playing ${soundType} sound`);
    };
    
    // Add subtle animations to cards on scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.ghost-card, .blueprint-card');
        
        cards.forEach((card, index) => {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) rotate(0deg)';
                        }, index * 100); // Stagger the animations
                    }
                });
            }, observerOptions);
            
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) rotate(2deg)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });
    };
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Add typing effect to title (optional enhancement)
    const addTypingEffect = () => {
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            setTimeout(() => {
                let charIndex = 0;
                const typeWriter = () => {
                    if (charIndex < text.length) {
                        line.textContent += text.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeWriter, 100);
                    }
                };
                typeWriter();
            }, index * 1000);
        });
    };
    
    // Optional: Uncomment to enable typing effect
    // addTypingEffect();
    
    // Blood drip effect (CSS animation helper)
    const createBloodDrip = () => {
        const bloodDrip = document.createElement('div');
        bloodDrip.className = 'blood-drip';
        bloodDrip.style.cssText = `
            position: absolute;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom, #8b0000, #330000);
            top: 0;
            left: ${Math.random() * 100}%;
            animation: bloodFall 3s linear infinite;
            opacity: 0.7;
        `;
        
        // Add CSS animation if not exists
        if (!document.querySelector('#blood-animation-style')) {
            const style = document.createElement('style');
            style.id = 'blood-animation-style';
            style.textContent = `
                @keyframes bloodFall {
                    0% { top: -20px; opacity: 0; }
                    10% { opacity: 0.7; }
                    90% { opacity: 0.7; }
                    100% { top: 100vh; opacity: 0; }
                }
                @keyframes ghostShake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-2px); }
                    75% { transform: translateX(2px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        return bloodDrip;
    };
    
    // Enhanced horror effects creation
    const createHorrorEffects = () => {
        // Add horror veins to sections
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            if (index % 2 === 0) { // Add veins to every other section
                const veins = document.createElement('div');
                veins.className = 'horror-veins';
                veins.style.animationDelay = `${index * 2}s`;
                section.appendChild(veins);
            }
        });

        // Add ghostly smoke effects
        const createGhostlySmoke = () => {
            const smoke = document.createElement('div');
            smoke.className = 'ghostly-smoke';
            smoke.style.left = Math.random() * 80 + '%';
            smoke.style.top = Math.random() * 80 + '%';
            smoke.style.animationDelay = Math.random() * 12 + 's';
            return smoke;
        };

        // Add smoke to random sections
        ['title-section', 'ghosts-section', 'kkn-section'].forEach(sectionClass => {
            const section = document.querySelector(`.${sectionClass}`);
            if (section) {
                const smoke = createGhostlySmoke();
                section.appendChild(smoke);
            }
        });
    };

    // Create blood splatter effect
    const createBloodSplatter = () => {
        const splatter = document.createElement('div');
        splatter.className = 'blood-splatter';
        splatter.style.left = Math.random() * 100 + '%';
        splatter.style.top = Math.random() * 100 + '%';
        splatter.style.animationDelay = Math.random() * 4 + 's';
        return splatter;
    };

    // Create enhanced blood trail
    const createEnhancedBloodTrail = () => {
        const trail = document.createElement('div');
        trail.className = 'blood-trail';
        trail.style.left = Math.random() * 100 + '%';
        trail.style.animationDelay = Math.random() * 8 + 's';
        return trail;
    };

    // Initialize horror effects
    createHorrorEffects();

    // Randomly create blood effects
    setInterval(() => {
        if (Math.random() < 0.15) { // 15% chance for blood trail
            const section = document.querySelector('.title-section, .ghosts-section, .kkn-section'.split(', ')[Math.floor(Math.random() * 3)]);
            const trail = createEnhancedBloodTrail();
            section.appendChild(trail);
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 8000);
        }
        
        if (Math.random() < 0.08) { // 8% chance for blood splatter
            const sections = document.querySelectorAll('.section');
            const randomSection = sections[Math.floor(Math.random() * sections.length)];
            const splatter = createBloodSplatter();
            randomSection.appendChild(splatter);
            
            setTimeout(() => {
                if (splatter.parentNode) {
                    splatter.parentNode.removeChild(splatter);
                }
            }, 4000);
        }
    }, 4000);
    
    // Trophy Hall of Fame System
    const trophyData = {
        "pengabdi-setan": {
            title: "Pengabdi Setan (2017)",
            category: "Sang Pelopor Kebangkitan",
            image: "assets/Trofeo/Poster Pengabdi Setan.jpg",
            achievements: [
                { icon: "🚀", title: "Pioneer Kebangkitan", desc: "Memulai era baru horror Indonesia modern setelah 2 dekade surut" },
                { icon: "💰", title: "Box Office Champion", desc: "Menghasilkan lebih dari 4.2 juta penonton dan Rp 65 miliar" },
                { icon: "🏆", title: "Critical Acclaim", desc: "Mendapat rating 8.0/10 di IMDb dan pujian kritikus internasional" },
                { icon: "🎬", title: "Technical Excellence", desc: "Standar produksi Hollywood dengan budget dan kru internasional" },
                { icon: "📈", title: "Industry Game Changer", desc: "Membuktikan horror Indonesia bisa bersaing di pasar global" }
            ]
        },
        "joko-anwar": {
            title: "Joko Anwar",
            category: "Maestro Teror Modern", 
            image: "assets/Trofeo/Joko Anwar.jpg",
            achievements: [
                { icon: "🎭", title: "Visionary Director", desc: "Menciptakan bahasa sinema horror Indonesia yang unik dan modern" },
                { icon: "🏅", title: "Award Winning", desc: "Meraih berbagai penghargaan film nasional dan internasional" },
                { icon: "🔥", title: "Box Office Magnet", desc: "Setiap filmnya selalu menjadi box office hit dan phenomenon" },
                { icon: "💡", title: "Technical Innovator", desc: "Menggunakan teknologi terdepan dalam sinematografi horror" },
                { icon: "🌟", title: "Cultural Icon", desc: "Menjadi rujukan sutradara horror Indonesia di mata dunia" }
            ]
        },
        "keramat": {
            title: "Keramat (2009)",
            category: "Realisme Gaib",
            image: "assets/Trofeo/Poster Film Keramat.jpg",
            achievements: [
                { icon: "👻", title: "Supernatural Realism", desc: "Menggabungkan elemen horor dengan realitas sosial yang mendalam" },
                { icon: "🎯", title: "Cultural Authenticity", desc: "Mengangkat kepercayaan lokal dengan pendekatan yang otentik" },
                { icon: "🔍", title: "Psychological Depth", desc: "Mengeksplorasi trauma dan psikologi karakter dengan detail" },
                { icon: "🎪", title: "Festival Recognition", desc: "Diakui di berbagai festival film nasional dan internasional" },
                { icon: "📚", title: "Academic Study", desc: "Menjadi objek kajian akademis tentang horror Indonesia" }
            ]
        },
        "pocong": {
            title: "Hantu Pocong",
            category: "Sang Teror Kain Kafan",
            image: "assets/Trofeo/Pocong 01.jpg",
            achievements: [
                { icon: "👑", title: "Icon Status", desc: "Menjadi hantu paling ikonik dan dikenal di Indonesia" },
                { icon: "🎬", title: "Cinema Legacy", desc: "Muncul di puluhan film horror sejak era 1980-an hingga kini" },
                { icon: "🌍", title: "Global Recognition", desc: "Dikenal dunia internasional sebagai unique Indonesian ghost" },
                { icon: "📱", title: "Pop Culture", desc: "Masuk ke game, meme, merchandise, dan budaya populer" },
                { icon: "🎪", title: "Tourism Magnet", desc: "Menjadi daya tarik wisata horror di berbagai tempat angker" }
            ]
        },
        "sundelbolong-sate": {
            title: "Adegan Makan Sate 200 Tusuk",
            category: "Adegan Paling Legendaris",
            image: "assets/Trofeo/Makan Sate 200 Tusuk.jpg",
            achievements: [
                { icon: "🍖", title: "Iconic Scene", desc: "Adegan paling diingat dan viral dari film Sundelbolong (1981)" },
                { icon: "😱", title: "Shock Value", desc: "Menciptakan ketakutan dan trauma pada generasi penontonnya" },
                { icon: "📺", title: "Cultural Phenomenon", desc: "Menjadi rujukan dalam parodi dan referensi budaya pop" },
                { icon: "💀", title: "Horror Innovation", desc: "Menggabungkan body horror dengan elemen budaya lokal" },
                { icon: "🎭", title: "Acting Mastery", desc: "Menampilkan akting Suzzanna yang luar biasa dan mengerikan" }
            ]
        },
        "kkn-desa-penari": {
            title: "KKN di Desa Penari",
            category: "Sang Pemecah Rekor",
            image: "assets/Trofeo/Poster KKN di Desa Penari 2.jpg",
            achievements: [
                { icon: "📊", title: "Box Office King", desc: "Film Indonesia terlaris sepanjang masa dengan 9.3 juta penonton" },
                { icon: "💰", title: "Revenue Champion", desc: "Meraup pendapatan Rp 175 miliar di box office Indonesia" },
                { icon: "🔥", title: "Viral Marketing", desc: "Fenomena media sosial dan viral marketing paling sukses" },
                { icon: "🎯", title: "Perfect Timing", desc: "Rilis pada momentum yang tepat pasca pandemi" },
                { icon: "🏆", title: "Record Breaker", desc: "Memecahkan semua rekor film Indonesia dalam berbagai kategori" }
            ]
        },
        "suzzanna": {
            title: "Suzzanna",
            category: "Ratu Horor Indonesia",
            image: "assets/Trofeo/Suzanna.jpg",
            achievements: [
                { icon: "👸", title: "Queen of Horror", desc: "Diakui sebagai Ratu Horror Indonesia yang tidak tergantikan" },
                { icon: "🎬", title: "Filmography Legacy", desc: "Membintangi lebih dari 40 film horror yang menjadi klasik" },
                { icon: "💎", title: "Box Office Queen", desc: "Film-filmnya selalu menjadi box office hits di era keemasan" },
                { icon: "🌟", title: "Cultural Icon", desc: "Namanya menjadi sinonim dengan horror Indonesia" },
                { icon: "🏛️", title: "Timeless Legend", desc: "Legenda yang tetap relevan dan dikenang hingga generasi kini" }
            ]
        }
    };

    // Trophy navigation system
    const trophyOrder = ["pengabdi-setan", "joko-anwar", "keramat", "pocong", "sundelbolong-sate", "kkn-desa-penari", "suzzanna"];
    let currentTrophyIndex = 0;

    // Initialize trophy display
    function initializeTrophySystem() {
        createTrophyIndicators();
        showTrophy(trophyOrder[currentTrophyIndex]);
        
        // Navigation event listeners
        const prevBtn = document.getElementById('trophyNavPrev');
        const nextBtn = document.getElementById('trophyNavNext');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => navigateTrophy('prev'));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => navigateTrophy('next'));
        }
    }

    // Create trophy indicators
    function createTrophyIndicators() {
        const indicatorsContainer = document.getElementById('trophyIndicators');
        if (!indicatorsContainer) return;

        indicatorsContainer.innerHTML = '';
        
        trophyOrder.forEach((trophyId, index) => {
            const indicator = document.createElement('button');
            indicator.className = `trophy-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-trophy', trophyId);
            indicator.setAttribute('title', trophyData[trophyId].category);
            indicator.innerHTML = `<span class="indicator-dot"></span>`;
            
            indicator.addEventListener('click', () => {
                currentTrophyIndex = index;
                showTrophy(trophyId);
                updateIndicators();
            });
            
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Navigate trophy
    function navigateTrophy(direction) {
        if (direction === 'next') {
            currentTrophyIndex = (currentTrophyIndex + 1) % trophyOrder.length;
        } else {
            currentTrophyIndex = (currentTrophyIndex - 1 + trophyOrder.length) % trophyOrder.length;
        }
        
        const trophyId = trophyOrder[currentTrophyIndex];
        showTrophy(trophyId);
        updateIndicators();
    }

    // Show specific trophy
    function showTrophy(trophyId) {
        const trophy = trophyData[trophyId];
        if (!trophy) return;

        // Update main image and info
        const mainImage = document.getElementById('trophyMainImage');
        const title = document.getElementById('trophyTitle');
        const category = document.getElementById('trophyCategory');
        
        if (mainImage) {
            mainImage.src = trophy.image;
            mainImage.alt = trophy.title;
        }
        
        if (title) title.textContent = trophy.title;
        if (category) category.textContent = trophy.category;

        // Update achievement cards
        updateAchievementCards(trophy.achievements);

        // Add entrance animation
        const trophyDisplay = document.getElementById('trophyDisplay');
        if (trophyDisplay) {
            trophyDisplay.classList.add('trophy-entering');
            setTimeout(() => {
                trophyDisplay.classList.remove('trophy-entering');
            }, 600);
        }
    }

    // Update achievement cards
    function updateAchievementCards(achievements) {
        const cardsContainer = document.getElementById('achievementCards');
        if (!cardsContainer) return;

        cardsContainer.innerHTML = '';
        
        achievements.forEach((achievement, index) => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-content">
                    <h4 class="achievement-title">${achievement.title}</h4>
                    <p class="achievement-desc">${achievement.desc}</p>
                </div>
            `;
            
            cardsContainer.appendChild(card);
        });
    }

    // Update indicators
    function updateIndicators() {
        const indicators = document.querySelectorAll('.trophy-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentTrophyIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Initialize trophy system after DOM is loaded
    initializeTrophySystem();
    
    console.log('Horror presentation initialized successfully!');
});