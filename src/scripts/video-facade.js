// src/scripts/video-facade.js
(function(){
  /** @type {NodeListOf<HTMLElement>} */
  const facades = document.querySelectorAll('.video-facade');

  function preconnect(href){
    if (document.querySelector(`link[rel=preconnect][href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'preconnect'; l.href = href; l.crossOrigin = '';
    document.head.appendChild(l);
  }

  if ('IntersectionObserver' in window && facades.length) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach((e)=>{
        if (e.isIntersecting) {
          preconnect('https://iframe.mediadelivery.net');
          preconnect('https://assets.mediadelivery.net');
          io.disconnect();
        }
      });
    }, { rootMargin: '800px 0px' });
    io.observe(facades[0]);
  }

  facades.forEach((el) => {
    const poster = el.getAttribute('data-poster');
    if (poster) el.style.setProperty('--vf-poster', `url("${poster}")`);

    const activate = () => {
      if (el.dataset.loaded) return;
      const base = el.getAttribute('data-src') || '';
      const join = base.includes('?') ? '&' : '?';
      const src = `${base}${join}autoplay=true`;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = el.getAttribute('aria-label') || 'Video';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'border:0; position:absolute; inset:0; width:100%; height:100%; border-radius:5px;';
      el.classList.add('is-playing');
      el.innerHTML = '';
      el.appendChild(iframe);
      el.dataset.loaded = 'true';
    };

    el.addEventListener('click', activate, { passive:true });
    el.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } }, { passive:false });
  });
})();