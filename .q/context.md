# Tech Blog 프로젝트 컨텍스트

## 프로젝트 개요
- GitHub Pages용 기술 블로그 사이트
- Jekyll 없이 순수 HTML/CSS/JS 사용
- GitHub Actions 워크플로우로 자동 배포

## 제약사항 및 요구사항

### 개인정보 보호
- 개인정보 또는 고유한 정보들은 동일하게 만들면 안됨
- 모든 개인정보는 플레이스홀더로 처리
- 예시: `your-email@example.com`, `your-username`, `<name>` 등

### 코딩 스타일
- 최소한의 코드만 작성 (ABSOLUTE MINIMAL)
- 불필요한 verbose 구현 금지
- 솔루션에 직접 기여하지 않는 코드 제외

### 기술 스택
- HTML5, CSS3, JavaScript (ES6+)
- GSAP 애니메이션 라이브러리
- GitHub Pages (Jekyll 없음)
- GitHub Actions 워크플로우 배포

### 디자인 요구사항
- 참고 사이트와 비슷한 스타일
- Tech blog 스러운 디자인
- 반응형 디자인 (모바일/데스크톱)
- 부드러운 스크롤 애니메이션

## 파일 구조
```
├── .github/workflows/pages.yml  # GitHub Actions 배포
├── .q/context.md               # Q CLI 컨텍스트
├── index.html                  # 메인 페이지
├── css/main.css               # 스타일시트
├── js/main.js                 # JavaScript
├── README.md                  # 프로젝트 문서
└── .nojekyll                  # Jekyll 비활성화
```

## 배포 방법
1. GitHub 저장소 생성 (`your-username.github.io`)
2. Settings > Pages > Source를 "GitHub Actions"로 설정
3. main 브랜치에 push하면 자동 배포
