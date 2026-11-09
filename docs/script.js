(function () {
  var toggle = document.querySelector('.toc-toggle');
  var toc = document.getElementById('toc');

  if (toggle && toc) {
    function setOpen(open) {
      toc.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(!toc.classList.contains('open'));
    });

    toc.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
  }

  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (link) {
      byId[link.getAttribute('href').slice(1)] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.removeAttribute('aria-current');
        });
        var active = byId[entry.target.id];
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-35% 0px -60% 0px' });

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  var year = document.getElementById('footer-year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
