// 0. Dark Mode / Light Mode Toggle dengan Penyimpanan Preferensi
const themeToggleBtn = document.getElementById("syalma_theme_toggle");
const themeIcon = document.getElementById("syalma_theme_icon");

function applySyalmaTheme(isDark) {
    if (isDark) {
        document.body.classList.add("syalma_dark_mode");
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.className = "fa-solid fa-sun";
    } else {
        document.body.classList.remove("syalma_dark_mode");
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.className = "fa-solid fa-moon";
    }
}

const savedTheme = localStorage.getItem("syalma_portfolio_theme");
if (savedTheme === "dark") {
    applySyalmaTheme(true);
}

themeToggleBtn.addEventListener("click", () => {
    const willBeDark = !document.body.classList.contains("syalma_dark_mode");
    applySyalmaTheme(willBeDark);
    localStorage.setItem("syalma_portfolio_theme", willBeDark ? "dark" : "light");
});

// 1. Efek Mengetik Otomatis Interaktif (Typing Effect) Hanya untuk 2 Peran
const syalmaRoles = [
    "Junior Web Developer",
    "Informatics Student"
];
const typingRoleEl = document.getElementById("syalma_typing_role");
const roleBadgeEl = document.getElementById("syalma_role_badge");
let roleIndex = 0;
let charIndex = syalmaRoles[0].length;
let isDeleting = true;
let typingTimer = null;

function runSyalmaTyping() {
    const currentText = syalmaRoles[roleIndex];

    if (isDeleting) {
        charIndex--;
        typingRoleEl.textContent = currentText.substring(0, charIndex);
    } else {
        charIndex++;
        typingRoleEl.textContent = currentText.substring(0, charIndex);
    }

    let delay = isDeleting ? 40 : 75;

    if (!isDeleting && charIndex === currentText.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % syalmaRoles.length;
        delay = 350;
    }

    typingTimer = setTimeout(runSyalmaTyping, delay);
}

// Mulai efek mengetik setelah jeda awal agar teks pertama terbaca jelas
typingTimer = setTimeout(runSyalmaTyping, 1600);

// Interaksi klik langsung pada teks role untuk berganti antara 2 peran
roleBadgeEl.addEventListener("click", () => {
    clearTimeout(typingTimer);
    roleIndex = (roleIndex + 1) % syalmaRoles.length;
    charIndex = 0;
    isDeleting = false;
    runSyalmaTyping();
});

// 2. Parallax Tilt pada Ilustrasi Hero saat kursor bergerak
const heroVisual = document.getElementById("syalma_hero_parallax");
const heroSvgBox = document.getElementById("syalma_hero_svg_box");

heroVisual.addEventListener("mousemove", (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroSvgBox.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
});

heroVisual.addEventListener("mouseleave", () => {
    heroSvgBox.style.transform = "rotateY(0deg) rotateX(0deg)";
});

// 4. Toggle Menu Mobile (Hamburger Button)
const hamburgerBtn = document.getElementById("syalma_hamburger_btn");
const navbarMenu = document.getElementById("syalma_navbar");

hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("syalma_open");
});

document.querySelectorAll(".syalma_nav_link").forEach(link => {
    link.addEventListener("click", () => {
        navbarMenu.classList.remove("syalma_open");
    });
});

// 5. Active Link & Back-to-Top Visibility Saat Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".syalma_nav_link");
const backTopBtn = document.getElementById("syalma_back_top_btn");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 130;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("syalma_active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("syalma_active");
        }
    });

    if (window.scrollY > 350) {
        backTopBtn.classList.add("syalma_visible");
    } else {
        backTopBtn.classList.remove("syalma_visible");
    }
});

backTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 6. Filter Interaktif untuk Skills
const skillFilterBtns = document.querySelectorAll("#syalma_skill_filters .syalma_filter_btn");
const skillCards = document.querySelectorAll(".syalma_skill_card");

skillFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        skillFilterBtns.forEach(b => b.classList.remove("syalma_filter_active"));
        btn.classList.add("syalma_filter_active");

        const filter = btn.getAttribute("data-filter");
        skillCards.forEach(card => {
            const cat = card.getAttribute("data-category");
            if (filter === "all" || cat === filter) {
                card.classList.remove("syalma_hidden");
            } else {
                card.classList.add("syalma_hidden");
            }
        });
    });
});

// 8. Filter Interaktif untuk Projects
const projectFilterBtns = document.querySelectorAll("#syalma_project_filters .syalma_filter_btn");
const projectCards = document.querySelectorAll(".syalma_project_card");

projectFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        projectFilterBtns.forEach(b => b.classList.remove("syalma_filter_active"));
        btn.classList.add("syalma_filter_active");

        const filter = btn.getAttribute("data-project-filter");
        projectCards.forEach(card => {
            const cat = card.getAttribute("data-project-cat");
            if (filter === "all" || cat === filter) {
                card.classList.remove("syalma_hidden");
            } else {
                card.classList.add("syalma_hidden");
            }
        });
    });
});

// 9. Modal Detail Project & Modal Contact
function openSyalmaProjectModal(title, desc, features, tools, iconClass) {
    document.getElementById("syalma_modal_title").textContent = title;
    document.getElementById("syalma_modal_desc").textContent = desc;
    document.getElementById("syalma_modal_tools").textContent = tools;
    document.getElementById("syalma_modal_icon").className = `fa-solid ${iconClass}`;

    const featuresList = document.getElementById("syalma_modal_features_list");
    featuresList.innerHTML = "";
    const items = Array.isArray(features) ? features : [features];
    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${item}</span>`;
        featuresList.appendChild(li);
    });

    document.getElementById("syalma_project_modal").style.display = "flex";
}

function openSyalmaContactModal() {
    document.getElementById("syalma_contact_modal").style.display = "flex";
}

function closeSyalmaModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.addEventListener("click", (e) => {
    if (e.target.classList.contains("syalma_modal_overlay")) {
        e.target.style.display = "none";
    }
});

// 10. Handle Form Pesan & Toast Notifikasi
function handleSyalmaMessage(e) {
    e.preventDefault();
    const senderName = document.getElementById("syalma_sender_name").value;
    closeSyalmaModal("syalma_contact_modal");
    document.getElementById("syalma_contact_form").reset();

    const toast = document.getElementById("syalma_toast");
    document.getElementById("syalma_toast_text").textContent = `Terima kasih ${senderName}, pesanmu terkirim ke Syalma!`;
    toast.classList.add("syalma_toast_show");

    setTimeout(() => {
        toast.classList.remove("syalma_toast_show");
    }, 3500);
}