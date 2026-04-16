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
  // 브랜드명
  // - hero의 Soliveon
  // - footer의 SOLIVEON
  // 등에 반영됨
  brandName: "Soliveon",

  // 첫 화면 큰 영문 문구(hero 문구)
  // 예:
  // "Cleans lightly, leaves less behind."
  // "A sheet that lightens the routine."
  taglineE: "Cleans lightly, leaves less behind.",

  productLine: {
    // 짧은 제품명
    // - 제품 섹션 제목 등에 사용
    name: "Dear One",

    // 전체 제품명
    // - 스토리/제품 섹션에 사용
    fullName: "Dear One: Eco-Clean Wipes"
  },

  // 스토리 섹션 이미지 경로
  // - 비워두면 기본 배경임
  // - 예: "assets/img/story-image.jpg"
  storyImageUrl: "",

  links: {
    // 구매 버튼 링크
    // - Shop Now 버튼 클릭 시 이동할 주소
    shopUrl: "https://www.tumblbug.com/soliveon"
  },

  contact: {
    // 문의 이메일
    // - Contact Email 버튼
    // - footer Email 버튼
    // - Info 영역 이메일
    // 에 모두 연결됨
    email: "soliveon1119@gmail.com",

    // 인스타 표시용 아이디
    // - 화면에 보이는 텍스트
    instagramHandle: "@soliveon_",

    // 인스타 링크
    // - 버튼 클릭 시 이동할 주소
    instagramUrl: "https://www.instagram.com/soliveon_",

    // 운영시간 텍스트
    hours: "10:00–17:00 (KST)"
  },

  business: {
    // 상호명
    company: "솔리비온(Soliveon)",

    // 사업자등록번호
    regNo: "117-42-01461",

    // 주소
    // - 비워두면 footer에 표시 x
    address: "",

    // footer 하단 크레딧 문구
    createdBy: "@created by SOLIVEON 2025"
  }
};

// DOM 선택용 짧은 헬퍼 함수
// 보통 수정 안 해도 됨
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

// 페이지 내용 주입
// CONFIG에 적은 값을 실제 HTML에 넣어주는 부분
// 운영 정보 바꿀 때는 보통 위 CONFIG만 수정하면 됨
function injectContent() {
  const brandNameEl = $("#brandName");
  const brandFootEl = $("#brandFoot");
  const taglineEEl = $("#taglineE");
  const lineNameEl = $("#lineName");
  const productLineNameEl = $("#productLineName");
  const productFullNameEl = $("#productFullName");

  // 브랜드명 / 제품명 / hero 문구 주입
  if (brandNameEl) brandNameEl.textContent = CONFIG.brandName;
  if (brandFootEl) brandFootEl.textContent = CONFIG.brandName.toUpperCase();
  if (taglineEEl) taglineEEl.textContent = CONFIG.taglineE;
  if (lineNameEl) lineNameEl.textContent = CONFIG.productLine.fullName;
  if (productLineNameEl) productLineNameEl.textContent = CONFIG.productLine.name;
  if (productFullNameEl) productFullNameEl.textContent = CONFIG.productLine.fullName;

  // 스토리 이미지 넣기
  // storyImageUrl 값이 있을 때만 반영
  const storyImage = $("#storyImage");
  if (storyImage && CONFIG.storyImageUrl) {
    storyImage.style.backgroundImage = `url("${CONFIG.storyImageUrl}")`;
  }

  // 구매 링크 넣기
  const shopLink = $("#shopLink");
  if (shopLink) {
    shopLink.href = CONFIG.links.shopUrl || "#";
  }

  // 연락처 정보
  const email = CONFIG.contact.email;
  const instaUrl = CONFIG.contact.instagramUrl;
  const instaHandle = CONFIG.contact.instagramHandle;

  // Contact 섹션 Info 목록에 이메일/인스타/운영시간 표시
  const contactInfo = $("#contactInfo");
  if (contactInfo) {
    contactInfo.innerHTML = `
      <li>Email: <a href="mailto:${email}">${email}</a></li>
      <li>Instagram: <a href="${instaUrl}" target="_blank" rel="noopener">${instaHandle}</a></li>
      <li>Business hours: ${CONFIG.contact.hours}</li>
    `;
  }

  // Contact 섹션 Email 버튼 링크
  const contactEmailBtn = $("#contactEmailBtn");
  if (contactEmailBtn) contactEmailBtn.href = `mailto:${email}`;

  // Contact 섹션 Instagram 버튼 링크
  const contactInstaBtn = $("#contactInstaBtn");
  if (contactInstaBtn) contactInstaBtn.href = instaUrl || "#";

  // Footer Email 버튼 링크
  const footerEmailLink = $("#footerEmailLink");
  if (footerEmailLink) footerEmailLink.href = `mailto:${email}`;

  // Footer Instagram 버튼 링크
  const footerInstaLink = $("#footerInstaLink");
  if (footerInstaLink) footerInstaLink.href = instaUrl || "#";

  // Footer BUSINESS INFO 영역
  const bizInfoText = $("#bizInfoText");
  if (bizInfoText) {
    const bizLines = [
      `상호: ${CONFIG.business.company || CONFIG.brandName}`,
      `사업자등록번호: ${CONFIG.business.regNo || ""}`,
      `이메일: ${email || ""}`
    ].filter(Boolean);

    // 주소가 있을 때만 footer에 추가
    if (CONFIG.business.address) {
      bizLines.push(`주소: ${CONFIG.business.address}`);
    }

    bizInfoText.innerHTML = bizLines.join("<br />");
  }

  // Footer 하단 created by 문구
  const createdByText = $("#createdByText");
  if (createdByText) {
    createdByText.textContent = CONFIG.business.createdBy || "@created by SOLIVEON 2025";
  }

  // 현재 연도 자동 표시
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

// 부드러운 섹션 이동
// 메뉴 클릭 시 해당 섹션으로 스크롤
// 보통 수정 안 해도 됨
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
// FAQ 질문 클릭 시 답변 펼침/닫힘
// 보통 수정 안 해도 됨
function bindFaqToggle() {
  $$(".faqItem").forEach((item) => {
    const q = $(".faqQ", item);
    if (!q) return;
    q.addEventListener("click", () => item.classList.toggle("open"));
  });
}

// Our Story "전체 이야기 읽기" 토글
// 버튼 클릭 시 전체 이야기 펼침/닫힘
// 보통 수정 안 해도 됨
function bindStoryToggle() {
  const openBtn = $("#toggleStoryBtn");
  const closeBtn = $("#collapseStoryBtn");
  const fullStory = $("#fullStory");

  if (!openBtn || !fullStory) return;

  const openStory = () => {
    fullStory.classList.add("open");
    openBtn.setAttribute("aria-expanded", "true");
    openBtn.textContent = "전체 이야기 접기";
    fullStory.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeStory = () => {
    fullStory.classList.remove("open");
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.textContent = "전체 이야기 읽기";
    openBtn.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  openBtn.addEventListener("click", () => {
    if (fullStory.classList.contains("open")) closeStory();
    else openStory();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeStory);
  }
}

// 스크롤 UI
// 1) hero를 지나면 floating nav 표시
// 2) 아래로 내려가면 TOP 버튼 표시
//
// [여기서 수정 가능한 것]
// - topBtn이 너무 빨리/늦게 뜨면 520 숫자 조절
// - nav가 너무 빨리/늦게 뜨면 getTriggerY 계산값 조절
function bindScrollUI() {
  const navFloat = $("#navFloat");
  const topBtn = $("#topBtn");
  const hero = $("#home");

  if (!navFloat || !topBtn || !hero) return;

  // (이거 자주확인해야함 ㅇㅅㅇ)hero 끝나는 지점 근처에서 floating nav 표시
  const getTriggerY = () => hero.offsetTop + hero.offsetHeight - 28;
  let triggerY = getTriggerY();

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;

    // floating nav 표시/숨김
    if (y > triggerY) navFloat.classList.add("show");
    else navFloat.classList.remove("show");

    // TOP 버튼 표시 기준
    // - 더 빨리 뜨게 하려면 숫자를 낮춤
    // - 더 늦게 뜨게 하려면 숫자를 높임
    if (y > 520) topBtn.classList.add("show");
    else topBtn.classList.remove("show");
  };

  window.addEventListener("resize", () => {
    triggerY = getTriggerY();
    onScroll();
  });

  window.addEventListener("scroll", onScroll, { passive: true });

  // TOP 버튼 클릭 시 맨 위로 이동
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  onScroll();
}

// 페이지 시작 시 실행
// 페이지 로드되면 내용 주입 + 이벤트 연결
// 보통 수정 안 해도 됨
document.addEventListener("DOMContentLoaded", () => {
  injectContent();
  bindSmoothScroll();
  bindFaqToggle();
  bindStoryToggle();
  bindScrollUI();
});
