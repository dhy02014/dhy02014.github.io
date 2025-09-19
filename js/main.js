// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 헤더 스크롤 효과
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// 활성 메뉴 표시
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const menuLinks = document.querySelectorAll('.menu a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// 모바일 메뉴 토글
const menuToggle = document.querySelector('.menu-toggle');
const mMenu = document.querySelector('.m-menu');

if (menuToggle && mMenu) {
  menuToggle.addEventListener('click', () => {
    mMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// GSAP 애니메이션 (GSAP이 로드된 경우에만)
if (typeof gsap !== 'undefined') {
  // 페이지 로드 시 애니메이션
  gsap.from('.home__txt h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
  });

  gsap.from('.home__txt p', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: 'power2.out'
  });

  // 스크롤 트리거 애니메이션
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // 섹션별 애니메이션
    gsap.utils.toArray('section').forEach(section => {
      gsap.from(section.querySelector('.title'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
      });
    });

    // 블로그 아이템 애니메이션
    gsap.utils.toArray('.blog-item').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: index * 0.2,
        ease: 'power2.out'
      });
    });

    // 프로젝트 아이템 애니메이션
    gsap.utils.toArray('.project-item').forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        delay: index * 0.3,
        ease: 'power2.out'
      });
    });
  }
}
