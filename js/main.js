// AJAX 데이터 로딩
class DataLoader {
  static async loadPosts() {
    try {
      const response = await fetch('./data/posts.json');
      const posts = await response.json();
      this.renderPosts(posts);
    } catch (error) {
      console.error('Failed to load posts:', error);
      document.getElementById('blog-grid').innerHTML = '<div class="error">포스트를 불러올 수 없습니다.</div>';
    }
  }

  static async loadProjects() {
    try {
      const response = await fetch('./data/projects.json');
      const projects = await response.json();
      this.renderProjects(projects);
    } catch (error) {
      console.error('Failed to load projects:', error);
      document.getElementById('project-grid').innerHTML = '<div class="error">프로젝트를 불러올 수 없습니다.</div>';
    }
  }

  static renderPosts(posts) {
    const blogGrid = document.getElementById('blog-grid');
    blogGrid.innerHTML = posts.map(post => `
      <article class="blog-item" data-id="${post.id}">
        <div class="blog-img"></div>
        <div class="blog-content">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <span class="date">${post.date}</span>
        </div>
      </article>
    `).join('');
    
    // 애니메이션 재적용
    this.animateBlogItems();
  }

  static renderProjects(projects) {
    const projectGrid = document.getElementById('project-grid');
    projectGrid.innerHTML = projects.map(project => `
      <div class="project-item" data-id="${project.id}">
        <div class="project-img"></div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tech-stack">
            ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
    
    // 애니메이션 재적용
    this.animateProjectItems();
  }

  static animateBlogItems() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
    }
  }

  static animateProjectItems() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
}

// 페이지 로드 시 데이터 로딩
document.addEventListener('DOMContentLoaded', () => {
  DataLoader.loadPosts();
  DataLoader.loadProjects();
});

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
  }
}
