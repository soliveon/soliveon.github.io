// =========================================================
// Soliveon Main Script
// ---------------------------------------------------------
// 이 파일에서 주로 수정할 수있는것들 ㅇㅅㅇ
// 1) 브랜드명 / 첫 화면 영문 카피
// 2) 제품명
// 3) 스토리 이미지 경로
// 4) 구매 링크
// 5) 이메일 / 인스타 / 운영시간
// 6) 사업자 정보
//
// !이 파일에서 수정하지 않는것들
// - 로고 파일 경로 / 파비콘 = index.html
// - 색상 / 폰트 크기 / 여백 / 버튼 디자인 = styles.css
// =========================================================

// 브랜드/운영 정보 설정
const CONFIG = {
  brandName: "Soliveon",

  taglineE: "Cleans lightly, leaves less behind.",

  productLine: {
    name: "Dear One",
    fullName: "Dear One: Eco-Clean Wipes"
  },

  // 스토리 섹션 이미지 경로
  storyImageUrl: "./assets/img/story.png",

  links: {
    shopUrl: "https://www.tumblbug.com/soliveon"
  },

  contact: {
    email: "soliveon1119@gmail.com",
    instagramHandle: "@soliveon_",
    instagramUrl: "https://www.instagram.com/soliveon_",
    hours: "10:00–17:00 (KST)"
  },

  business: {
    company: "솔리비온(Soliveon)",
    regNo: "117-42-01461",
    address: "",
    createdBy: "@created by SOLIVEON 2025"
  }
};

// DOM 선택용 짧은 헬퍼 함수
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

// 페이지 내용 주입
function injectContent() {
  const brandNameEl = $("#brandName");
  const brandFootEl = $("#brandFoot");
  const taglineEEl = $("#taglineE");
  const lineNameEl = $("#lineName");
  const productLineNameEl = $("#productLineName");
  const productFullNameEl = $("#productFullName");

  if (brandNameEl) brandNameEl.textContent = CONFIG.brandName;
  if (brandFootEl) brandFootEl.textContent = CONFIG.brandName.toUpperCase();
  if (taglineEEl) taglineEEl.textContent = CONFIG.taglineE;
  if (lineNameEl) lineNameEl.textContent = CONFIG.productLine.fullName;
  if (productLineNameEl) productLineNameEl.textContent = CONFIG.productLine.name;
  if (productFullNameEl) productFullNameEl.textContent = CONFIG.productLine.fullName;

  const storyImage = $("#storyImage");
  if (storyImage && CONFIG.storyImageUrl) {
    storyImage.style.backgroundImage = `url("${CONFIG.storyImageUrl}")`;
  }

  const shopLink = $("#shopLink");
  if (shopLink) {
    shopLink.href = CONFIG.links.shopUrl || "#";
  }

  const email = CONFIG.contact.email;
  const instaUrl = CONFIG.contact.instagramUrl;
  const instaHandle = CONFIG.contact.instagramHandle;

  const contactInfo = $("#contactInfo");
  if (contactInfo) {
    contactInfo.innerHTML = `
      <li>Email: <a href="mailto:${email}">${email}</a></li>
      <li>Instagram: <a href="${instaUrl}" target="_blank" rel="noopener">${instaHandle}</a></li>
      <li>Business hours: ${CONFIG.contact.hours}</li>
    `;
  }

  const contactEmailBtn = $("#contactEmailBtn");
  if (contactEmailBtn) contactEmailBtn.href = `mailto:${email}`;

  const contactInstaBtn = $("#contactInstaBtn");
  if (contactInstaBtn) contactInstaBtn.href = instaUrl || "#";

  const footerEmailLink = $("#footerEmailLink");
  if (footerEmailLink) footerEmailLink.href = `mailto:${email}`;

  const footerInstaLink = $("#footerInstaLink");
  if (footerInstaLink) footerInstaLink.href = instaUrl || "#";

  const bizInfoText = $("#bizInfoText");
  if (bizInfoText) {
    const bizLines = [
      `상호: ${CONFIG.business.company || CONFIG.brandName}`,
      `사업자등록번호: ${CONFIG.business.regNo || ""}`,
      `이메일: ${email || ""}`
    ].filter(Boolean);

    if (CONFIG.business.address) {
      bizLines.push(`주소: ${CONFIG.business.address}`);
    }

    bizInfoText.innerHTML = bizLines.join("<br />");
  }

  const createdByText = $("#createdByText");
  if (createdByText) {
    createdByText.textContent = CONFIG.business.createdBy || "@created by SOLIVEON 2025";
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

// 부드러운 섹션 이동
function bindSmoothScroll() {
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = $(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// FAQ 열고 닫기
function bindFaqToggle() {
  $$(".faqItem").forEach((item) => {
    const q = $(".faqQ", item);
    if (!q) return;

    q.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}

// Our Story 전체 이야기 토글
function bindStoryToggle() {
  const openBtn = $("#toggleStoryBtn");
  const closeBtn = $("#collapseStoryBtn");
  const fullStory = $("#fullStory");

  if (!openBtn || !fullStory) return;

  const openStory = () => {
    fullStory.classList.add("open");
    openBtn.setAttribute("aria-expanded", "true");
    openBtn.textContent = "전체 이야기 접기";

    requestAnimationFrame(() => {
      fullStory.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const closeStory = () => {
    fullStory.classList.remove("open");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.textContent = "전체 이야기 읽기";

    requestAnimationFrame(() => {
      openBtn.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  openBtn.addEventListener("click", () => {
    if (fullStory.classList.contains("open")) {
      closeStory();
    } else {
      openStory();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeStory);
  }
}

// Dear One 상세 탭 전환
function bindProductTabs() {
  const tabs = $$(".detailTab");
  const panels = $$(".detailPanel");

  if (!tabs.length || !panels.length) return;

  const activateTab = (targetId) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === targetId;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const panelKey = panel.dataset.panel;
      const isActive = panelKey === targetId;

      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tab);
    });
  });

  const initialActiveTab =
    tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];

  if (initialActiveTab) {
    activateTab(initialActiveTab.dataset.tab);
  }
}

// 스크롤 UI
function bindScrollUI() {
  const navFloat = $("#navFloat");
  const topBtn = $("#topBtn");
  const hero = $("#home");

  if (!navFloat || !topBtn || !hero) return;

  const getTriggerY = () => hero.offsetTop + hero.offsetHeight - 28;
  let triggerY = getTriggerY();

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;

    if (y > triggerY) navFloat.classList.add("show");
    else navFloat.classList.remove("show");

    if (y > 520) topBtn.classList.add("show");
    else topBtn.classList.remove("show");
  };

  window.addEventListener("resize", () => {
    triggerY = getTriggerY();
    onScroll();
  });

  window.addEventListener("scroll", onScroll, { passive: true });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  onScroll();
}

// 페이지 시작 시 실행
document.addEventListener("DOMContentLoaded", () => {
  injectContent();
  bindSmoothScroll();
  bindFaqToggle();
  bindStoryToggle();
  bindProductTabs();
  bindScrollUI();
});
