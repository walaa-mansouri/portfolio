(function () {
      var supported = ['en', 'fr', 'ar'];
      var stored = null;
      try { stored = localStorage.getItem('wm_lang'); } catch (e) { }

      var browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);

      var lang = supported.indexOf(stored) !== -1
        ? stored
        : (supported.indexOf(browserLang) !== -1 ? browserLang : 'en');

      window.location.replace('/' + lang + '/');
    })();
