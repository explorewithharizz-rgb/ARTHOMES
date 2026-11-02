// Art Homes - Smooth Luxury Scroll, Text Reveal & Number Counter Animations
document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-triggered reveal animations
  const targets = document.querySelectorAll(
    '.reveal-text, .section-header, .feature-card, .step-card, .offer-card, .pillar-card, .compact-contact-layout, .share-box, .cta-banner, .gallery-card, .spotlight-card, .process-card, .founder-quote-box, .compact-action-row, .time-step, .standard-box, .about-lead-grid, .timeline-grid, .standards-grid, .myna-reward-pills-bar, .contact-card'
  );

  if (targets.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
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

  // 2. Animated Metric Counters (Count up smoothly from 0)
  initMetricCounters();
});

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
    const duration = 1900; // 1.9 seconds smooth count-up
    let startTime = null;

    el.textContent = `${prefix}0${suffix}`;

    function animate(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // easeOutCubic deceleration
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

  const metricsContainer = document.querySelector('.hero-metrics');
  if (!metricsContainer) return;

  if ('IntersectionObserver' in window) {
    let triggered = false;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          // Small delay matching the hero metrics entrance fade
          setTimeout(() => {
            counterElements.forEach(runCounter);
          }, 200);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
    observer.observe(metricsContainer);
  } else {
    setTimeout(() => {
      counterElements.forEach(runCounter);
    }, 200);
  }
}
