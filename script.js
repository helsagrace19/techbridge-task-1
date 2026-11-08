(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var toggleText = toggle ? toggle.querySelector(".nav-toggle__text") : null;
  var nav = document.getElementById("primary-nav");
  var header = document.querySelector(".site-header");
  var backdrop = document.querySelector(".nav-backdrop");

  if (!toggle || !nav) {
    return;
  }

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);

    if (toggleText) {
      toggleText.textContent = open ? "Close" : "Menu";
    }

    if (backdrop) {
      backdrop.classList.toggle("is-open", open);
      backdrop.setAttribute("aria-hidden", String(!open));
    }
  }

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  toggle.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (isOpen() && header && !header.contains(event.target)) {
      setOpen(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980 && isOpen()) {
      setOpen(false);
    }
  });
})();
