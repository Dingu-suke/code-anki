document.addEventListener('turbolinks:load', function() {
  if (window.location.hash === '#cards/new') {
    window.location.reload(true);
  }
});