<script>
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = Array.prototype.slice
    .call(document.querySelectorAll(".navbar .nav-link"))
    .filter(function (link) {
      return link.hash && link.hash.length > 1;
    });

  if (!navLinks.length) {
    return;
  }

  var sections = navLinks
    .map(function (link) {
      var target = document.querySelector(link.hash);
      if (!target) {
        return null;
      }
      return { link: link, target: target, hash: link.hash };
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  function setActive(hash) {
    sections.forEach(function (item) {
      item.link.classList.toggle("active", item.hash === hash);
      if (item.hash === hash) {
        item.link.setAttribute("aria-current", "page");
      } else {
        item.link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveOnScroll() {
    var header = document.getElementById("quarto-header");
    var headerOffset = header ? header.offsetHeight : 80;
    var position = window.scrollY + headerOffset + 16;
    var current = sections[0].hash;

    sections.forEach(function (item) {
      if (item.target.offsetTop <= position) {
        current = item.hash;
      }
    });

    setActive(current);
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setActive(link.hash);
    });
  });

  window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
  window.addEventListener("resize", updateActiveOnScroll);
  updateActiveOnScroll();
});
</script>
