// Art Homes - WordPress & Elementor-Style Animation Suite & Interactive Logic
document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navbar Elevation & Glassmorphism on Scroll
  initNavbarElevation();

  // 2. Scroll-Triggered Reveal Animations (AOS / Elementor style)
  initScrollReveal();

  // 3. Smooth Animated Metric Counters
  initMetricCounters();

  // 4. Interactive FAQ Accordion
  initFaqAccordion();

  // 5. Interactive Interior Cost Estimator (on Services page)
  initCostEstimator();

  // 6. Interactive Filter Tabs (Services / Gallery)
  initFilterTabs();

  // 7. Two-Stage Workflow Tabs (Design & Execution)
  initWorkflowTabs();

  // 8. Smooth Scroll for Anchor Links
  initSmoothScroll();

  // 8. Mobile Menu Outside Dismiss & Keyboard Accessibility
  initMobileMenuDismiss();
});

/* --------------------------------------------------------------------------
   1. Sticky Navbar Elevation on Scroll
   -------------------------------------------------------------------------- */
function initNavbarElevation() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 35) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Scroll-Triggered Reveal Animations (Elementor Motion Effects)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-quote, .reveal-down, ' +
    '.editorial-about-section, .editorial-about-grid, .editorial-comp-left, .editorial-comp-right, .editorial-comp-img-top, ' +
    '.anim-fade-down, .anim-fade-left, .about-split-grid, .about-story-text, .founder-card, .about-visit-banner, ' +
    '.section-header, .feature-card, .service-card, .space-card, ' +
    '.showcase-project-card, .testimonial-card-item, .workflow-grid, ' +
    '.partner-logo-item, .value-box-card, .process-step-card, ' +
    '.cert-card, .faq-item, .split-lead-grid, .floating-metrics-box, .floating-metrics-wrap, ' +
    '.quote-banner-section, ' +
    '.estimator-card, .compact-contact-layout, .compact-action-row, ' +
    '.myna-pill-card, .offer-card, .step-card, .about-lead-wrap, .standards-grid, ' +
    '.what-we-offer-section, .offer-header-wrap, .benefits-section, .benefits-row, .benefit-header-wrap, .benefit-card, .fade-pop, .reveal-fade-pop, .fade-right, .fade-left, .fade-in, ' +
    '.coffee-consultation-section, .coffee-consultation-banner, .coffee-fade-item'
  );

  if (!targets.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If this is an individual benefit card, let the parent benefits-section 1-by-1 sequencer reveal it
          // Benefit cards will be activated
          entry.target.classList.add('is-visible');
          // If container has editorial section, also ensure children are marked
          if (entry.target.classList.contains('editorial-about-section') || entry.target.classList.contains('editorial-about-grid')) {
            const children = entry.target.querySelectorAll('.editorial-comp-left, .editorial-comp-right, .editorial-comp-img-top, .editorial-comp-factory-box, .btn-call-today, .editorial-watermark, .editorial-eyebrow, h2, p');
            children.forEach(c => c.classList.add('is-visible'));
          }
          // If container has quote banner section, also ensure quote children are marked
          if (entry.target.classList.contains('quote-banner-section')) {
            const quoteChildren = entry.target.querySelectorAll('.quote-mark-icon, .quote-banner-text, .quote-banner-sub, .btn');
            quoteChildren.forEach(c => c.classList.add('is-visible'));
          }
          // If container has floating metrics, ensure metric items are marked
          if (entry.target.classList.contains('floating-metrics-wrap') || entry.target.classList.contains('floating-metrics-box')) {
            const metricItems = entry.target.querySelectorAll('.floating-metric-item');
            metricItems.forEach(c => c.classList.add('is-visible'));
          }
          // If container has what-we-offer or offer header, trigger orchestrated fade-pop animation
          if (entry.target.classList.contains('what-we-offer-section') || entry.target.classList.contains('offer-header-wrap')) {
            const offerChildren = entry.target.querySelectorAll('.offer-watermark, .offer-circle-icon, .offer-eyebrow, .offer-title, .offer-header-wrap');
            offerChildren.forEach(c => c.classList.add('is-visible'));
          }
          // If container has benefits section or benefit header, trigger fade-pop and directional reveals
          if (entry.target.classList.contains('benefits-section') || entry.target.classList.contains('benefits-row') || entry.target.classList.contains('benefit-header-wrap') || entry.target.id === 'whyChooseUs') {
            // 1. Reveal section header immediately
            const headerChildren = entry.target.querySelectorAll('.benefit-watermark, .benefit-eyebrow, .benefit-title, .reveal-fade-pop, .fade-pop');
            headerChildren.forEach(c => c.classList.add('is-visible'));

            // 2. Reveal benefit cards (transition-delay handles 1-by-1 stagger)
            const cards = entry.target.querySelectorAll('.benefit-card');
            cards.forEach(c => c.classList.add('is-visible'));
          }
          if (entry.target.classList.contains('benefit-card')) {
            entry.target.classList.add('is-visible');
          }
          if (entry.target.classList.contains('coffee-consultation-section') || entry.target.classList.contains('coffee-consultation-banner')) {
            const coffeeChildren = entry.target.querySelectorAll('.coffee-consultation-banner, .coffee-fade-item');
            coffeeChildren.forEach(c => c.classList.add('is-visible'));
          }
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    targets.forEach(el => observer.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-visible'));
  }
}

/* --------------------------------------------------------------------------
   3. Animated Metric Counters (Count up smoothly from 0)
   -------------------------------------------------------------------------- */
function initMetricCounters() {
  const counterElements = document.querySelectorAll('.counter-number');
  if (!counterElements.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  function runCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1800; // 1.8s easeOut
    let startTime = null;

    el.textContent = `${prefix}0${suffix}`;

    function animate(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeProgress * target);

      el.textContent = `${prefix}${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }

    requestAnimationFrame(animate);
  }

  if ('IntersectionObserver' in window) {
    const counterContainers = document.querySelectorAll('.hero-metrics, .floating-metrics-box, .floating-metrics-wrap, .values-grid');
    if (!counterContainers.length) {
      counterElements.forEach(runCounter);
      return;
    }

    counterContainers.forEach(container => {
      let triggered = false;
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            const items = entry.target.querySelectorAll('.counter-number');
            setTimeout(() => {
              items.forEach(runCounter);
            }, 150);
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15
      });
      observer.observe(container);
    });
  } else {
    setTimeout(() => {
      counterElements.forEach(runCounter);
    }, 200);
  }
}

/* --------------------------------------------------------------------------
   4. Interactive FAQ Accordion (Elementor Toggle Style)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Optional: close other open accordions in the same group
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Interior Cost Estimator (WordPress Style)
   -------------------------------------------------------------------------- */
function initCostEstimator() {
  const estimatorCard = document.getElementById('costEstimator');
  if (!estimatorCard) return;

  const bhkBtns = estimatorCard.querySelectorAll('[data-bhk]');
  const tierBtns = estimatorCard.querySelectorAll('[data-tier]');
  const priceDisplay = document.getElementById('estimatePriceDisplay');
  const kitchenDisplay = document.getElementById('estKitchenVal');
  const wardrobeDisplay = document.getElementById('estWardrobeVal');
  const ceilingDisplay = document.getElementById('estCeilingVal');
  const livingDisplay = document.getElementById('estLivingVal');
  const waBtn = document.getElementById('estWhatsAppBtn');

  // Pricing matrix in INR (Lac)
  const estimates = {
    '1BHK': {
      'essential': { total: '₹1.8 – ₹2.2 Lac', kitchen: '₹85,000', wardrobe: '₹60,000', ceiling: '₹35,000', living: '₹30,000' },
      'premium': { total: '₹2.4 – ₹2.9 Lac', kitchen: '₹1,15,000', wardrobe: '₹85,000', ceiling: '₹45,000', living: '₹40,000' },
      'luxury': { total: '₹3.2 – ₹3.8 Lac', kitchen: '₹1,55,000', wardrobe: '₹1,20,000', ceiling: '₹60,000', living: '₹55,000' }
    },
    '2BHK': {
      'essential': { total: '₹2.5 – ₹3.2 Lac', kitchen: '₹1,10,000', wardrobe: '₹95,000', ceiling: '₹45,000', living: '₹40,000' },
      'premium': { total: '₹3.4 – ₹4.2 Lac', kitchen: '₹1,50,000', wardrobe: '₹1,35,000', ceiling: '₹65,000', living: '₹60,000' },
      'luxury': { total: '₹4.6 – ₹5.8 Lac', kitchen: '₹2,05,000', wardrobe: '₹1,85,000', ceiling: '₹90,000', living: '₹85,000' }
    },
    '3BHK': {
      'essential': { total: '₹3.5 – ₹4.5 Lac', kitchen: '₹1,30,000', wardrobe: '₹1,40,000', ceiling: '₹65,000', living: '₹55,000' },
      'premium': { total: '₹4.8 – ₹6.2 Lac', kitchen: '₹1,85,000', wardrobe: '₹1,95,000', ceiling: '₹95,000', living: '₹85,000' },
      'luxury': { total: '₹6.8 – ₹8.5 Lac', kitchen: '₹2,60,000', wardrobe: '₹2,75,000', ceiling: '₹1,40,000', living: '₹1,25,000' }
    },
    'Villa': {
      'essential': { total: '₹5.5 – ₹7.5 Lac', kitchen: '₹1,80,000', wardrobe: '₹2,20,000', ceiling: '₹1,10,000', living: '₹95,000' },
      'premium': { total: '₹8.0 – ₹11.5 Lac', kitchen: '₹2,70,000', wardrobe: '₹3,40,000', ceiling: '₹1,60,000', living: '₹1,45,000' },
      'luxury': { total: '₹12.5 – ₹18.0 Lac', kitchen: '₹3,90,000', wardrobe: '₹5,20,000', ceiling: '₹2,40,000', living: '₹2,20,000' }
    }
  };

  let currentBhk = '2BHK';
  let currentTier = 'premium';

  function updateDisplay() {
    const data = estimates[currentBhk][currentTier];
    if (!data) return;

    if (priceDisplay) priceDisplay.textContent = data.total;
    if (kitchenDisplay) kitchenDisplay.textContent = data.kitchen;
    if (wardrobeDisplay) wardrobeDisplay.textContent = data.wardrobe;
    if (ceilingDisplay) ceilingDisplay.textContent = data.ceiling;
    if (livingDisplay) livingDisplay.textContent = data.living;

    if (waBtn) {
      const msg = `Hi Art Homes! I calculated an estimate on your website for a *${currentBhk}* in *${currentTier.toUpperCase()}* finish (${data.total}). Could you please send me the detailed BOQ breakdown?`;
      waBtn.href = `https://wa.me/919791272166?text=${encodeURIComponent(msg)}`;
    }
  }

  bhkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bhkBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentBhk = btn.getAttribute('data-bhk');
      updateDisplay();
    });
  });

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentTier = btn.getAttribute('data-tier');
      updateDisplay();
    });
  });

  updateDisplay();
}

/* --------------------------------------------------------------------------
   6. Interactive Filter Tabs (Services & Gallery)
   -------------------------------------------------------------------------- */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.tab-pill[data-filter]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');
      const cards = document.querySelectorAll('[data-category]');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = '';
          // Retrigger subtle entry animation
          card.classList.remove('is-visible');
          setTimeout(() => card.classList.add('is-visible'), 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Two-Stage Workflow Tabs (Design & Execution)
   -------------------------------------------------------------------------- */
function initWorkflowTabs() {
  const workflowSections = document.querySelectorAll('.workflow-tabs-section');
  if (!workflowSections.length) return;

  workflowSections.forEach(section => {
    const buttons = section.querySelectorAll('.workflow-tab-btn[data-workflow-tab]');
    const panels = section.querySelectorAll('.workflow-panel[data-workflow-panel]');
    if (!buttons.length || !panels.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-workflow-tab');

        buttons.forEach(b => {
          const isTarget = b === btn;
          b.classList.toggle('active', isTarget);
          b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        });

        panels.forEach(panel => {
          const isMatch = panel.getAttribute('data-workflow-panel') === targetTab;
          panel.classList.toggle('active', isMatch);
          panel.hidden = !isMatch;
        });
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Smooth Scroll for Anchor Links (Safe & Closes Mobile Nav)
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      try {
        const id = href.replace(/^#/, '');
        const targetEl = document.getElementById(id) || document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          const navLinks = document.getElementById('navLinks');
          const menuToggle = document.getElementById('menuToggle');
          if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            if (menuToggle) menuToggle.textContent = '☰';
          }
        }
      } catch (err) {
        // Graceful fallback
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Universal Mobile Menu Click-Outside & Keyboard Escape Handler
   -------------------------------------------------------------------------- */
function initMobileMenuDismiss() {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  if (!navLinks || !menuToggle) return;

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open')) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.textContent = '☰';
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.textContent = '☰';
    }
  });
}


/* --------------------------------------------------------------------------
   8. Full View Lightbox Event Handlers & Elementor Image Binding
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  // Bind WordPress Elementor gallery photos if present
  const wpImgs = document.querySelectorAll('.gallery-item-col img, .gallery-photo img');
  if (wpImgs.length) {
    wpImgs.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        const col = img.closest('.gallery-item-col');
        const h3 = col ? col.querySelector('h3') : null;
        const p = col ? col.querySelector('p') : null;
        const title = h3 ? h3.textContent : (img.alt || 'Art Homes Execution');
        const desc = p ? p.textContent : '';
        if (typeof openLightbox === 'function') {
          openLightbox(img.src, title, 'Art Homes Executed Work', desc);
        }
      });
    });
  }
});
