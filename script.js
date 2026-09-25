/* ========================================================= DOM ========================================================= */ const header =
  document.getElementById("header");
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const year = document.getElementById("year");
/* ========================================================= YEAR ========================================================= */ if (
  year
) {
  year.textContent = new Date().getFullYear();
}
/* ========================================================= MOBILE MENU ========================================================= */ if (
  menuBtn &&
  nav
) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    const spans = menuBtn.querySelectorAll("span");
    if (nav.classList.contains("open")) {
      spans[0].style.transform = "translateY(5px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-5px) rotate(-45deg)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      const spans = menuBtn.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    });
  });
}
/* ========================================================= HEADER SCROLL ========================================================= */ function handleHeaderScroll() {
  if (window.scrollY > 40) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
  if (window.scrollY > 500) {
    backToTop?.classList.add("show");
  } else {
    backToTop?.classList.remove("show");
  }
}
window.addEventListener("scroll", handleHeaderScroll);
handleHeaderScroll();
/* ========================================================= BACK TO TOP ========================================================= */ if (
  backToTop
) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
/* ========================================================= ACTIVE NAVIGATION ========================================================= */ const sections =
  document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
function updateActiveNav() {
  let currentSection = "home";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();
/* ========================================================= FAQ ========================================================= */ const faqItems =
  document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  if (!question || !answer) return;
  if (item.classList.contains("active")) {
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
      const otherAnswer = otherItem.querySelector(".faq-answer");
      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }
    });
    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
/* ========================================================= SCROLL REVEAL ========================================================= */ const revealElements =
  document.querySelectorAll(
    ".quick-card, .feature-item, .product-card, .service-card, .process-step, .about-card, .faq-item",
  );
revealElements.forEach((element) => {
  element.classList.add("reveal");
});
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealElements.forEach((element) => {
  revealObserver.observe(element);
});
/* ========================================================= STAGGER ANIMATION ========================================================= */ const staggerGroups =
  [
    ".quick-grid .quick-card",
    ".product-grid .product-card",
    ".services-grid .service-card",
    ".process-grid .process-step",
  ];
staggerGroups.forEach((selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.08}s`;
  });
});
/* ========================================================= CONTACT FORM -> WHATSAPP ========================================================= */ if (
  contactForm
) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const requestType = document.getElementById("requestType")?.value || "";
    const acType = document.getElementById("acType")?.value || "غير محدد";
    const district =
      document.getElementById("district")?.value.trim() || "غير محدد";
    const message =
      document.getElementById("message")?.value.trim() ||
      "لا توجد تفاصيل إضافية";
    if (!name || !phone || !requestType) {
      alert("من فضلك املأ الاسم ورقم الجوال ونوع الطلب.");
      return;
    }
    const whatsappNumber = "966503553413";
    const text = `السلام عليكم 👋 أرغب في التواصل بخصوص المكيفات المستعملة. الاسم: ${name} رقم الجوال: ${phone} نوع الطلب: ${requestType} نوع المكيف: ${acType} الحي / المنطقة: ${district} التفاصيل: ${message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, "_blank");
  });
}
/* ========================================================= SMOOTH ANCHOR SCROLL ========================================================= */ document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const headerHeight = header?.offsetHeight || 70;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    });
  });
/* ========================================================= FORM REQUEST SHORTCUTS ========================================================= */ document
  .querySelectorAll('a[href="#buy"]')
  .forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        const requestType = document.getElementById("requestType");
        if (requestType) {
          requestType.value = "أريد بيع مكيف";
        }
      }, 400);
    });
  });
document.querySelectorAll('a[href="#sell"]').forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      const requestType = document.getElementById("requestType");
      if (requestType) {
        requestType.value = "أريد شراء مكيف";
      }
    }, 400);
  });
});
/* ========================================================= PHONE INPUT ========================================================= */ const phoneInput =
  document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^\d+]/g, "");
  });
}
/* ========================================================= PARALLAX HERO VISUAL ========================================================= */ const heroVisual =
  document.querySelector(".hero-visual");
if (heroVisual && window.innerWidth > 900) {
  window.addEventListener("mousemove", (event) => {
    const x = (window.innerWidth / 2 - event.clientX) / 80;
    const y = (window.innerHeight / 2 - event.clientY) / 80;
    heroVisual.style.transform = `translate(${x}px, ${y}px)`;
  });
}
/* ========================================================= RESIZE FAQ ========================================================= */ window.addEventListener(
  "resize",
  () => {
    document
      .querySelectorAll(".faq-item.active .faq-answer")
      .forEach((answer) => {
        answer.style.maxHeight = answer.scrollHeight + "px";
      });
  },
);
