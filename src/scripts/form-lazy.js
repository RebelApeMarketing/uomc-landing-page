// src/scripts/form-lazy.js
(function(){
  const idle = (cb) => (window.requestIdleCallback || ((c)=>setTimeout(c,1)))(cb);

  idle(function(){
    const target = document.getElementById('inline-RbWFyQ3lqf6TzO98SV1y');
    if(!(target instanceof HTMLElement)) return;

    const load = () => {
      if(document.getElementById('ghl-form-embed')) return;
      const s = document.createElement('script');
      s.id = 'ghl-form-embed';
      s.src = 'https://link.therebelape.com/js/form_embed.js';
      s.defer = true;
      document.body.appendChild(s);
    };

    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if(e.isIntersecting){ load(); io.disconnect(); } });
      }, { rootMargin: '600px 0px' });
      io.observe(target);
    } else {
      if(document.readyState === 'complete') load();
      else window.addEventListener('load', load, { passive: true });
    }
  });
})();