---
layout: post
title: "Jekyll 블로그 설정 완료"
date: 2025-09-22 18:15:00 +0900
categories: [개발]
tags: [jekyll, github-pages, blog, setup]
author: "개발자"
excerpt: "GitHub Pages에서 Markdown 파일을 자동으로 렌더링하는 Jekyll 블로그 설정 과정과 주요 변경사항을 소개합니다."
---

# Jekyll 블로그 설정 완료

GitHub Pages에서 Markdown 파일을 자동으로 렌더링하는 Jekyll 블로그가 성공적으로 설정되었습니다! 🎉

## 주요 변경사항

### 1. Jekyll 설치 및 설정

- **Ruby 3.4.6 설치** (Homebrew 사용)
- **Jekyll 및 GitHub Pages gem 설치**
- `_config.yml` 설정 파일 생성

### 2. 디렉토리 구조 변경

```
├── _config.yml          # Jekyll 설정
├── _layouts/            # 레이아웃 템플릿
│   ├── default.html     # 기본 레이아웃
│   └── post.html        # 포스트 레이아웃
├── _posts/              # 블로그 포스트 (Markdown)
├── _site/               # 생성된 정적 파일
├── css/                 # 스타일시트
├── Gemfile              # Ruby 의존성
└── index.html           # 메인 페이지
```

### 3. 자동화된 워크플로우

- **GitHub Actions**를 통한 자동 빌드 및 배포
- Jekyll 전용 워크플로우 설정

## 사용법

이제 `_posts/` 디렉토리에 다음 형식으로 Markdown 파일을 추가하면 자동으로 블로그 포스트가 생성됩니다:

```markdown
---
layout: post
title: "포스트 제목"
date: YYYY-MM-DD HH:MM:SS +0900
categories: [카테고리]
tags: [태그1, 태그2]
author: "작성자명"
excerpt: "포스트 요약"
---

# 포스트 내용

Markdown으로 작성된 내용이 여기에 들어갑니다.
```

## 파일명 규칙

포스트 파일명은 다음 형식을 따라야 합니다:

> `YYYY-MM-DD-title.md`

**예시:** `2025-09-22-my-first-post.md`

## 로컬 테스트

로컬에서 사이트를 테스트하려면:

```bash
# 의존성 설치
bundle install

# 로컬 서버 실행
bundle exec jekyll serve

# 브라우저에서 확인
open http://localhost:4000
```

## 주요 기능

- ✅ **자동 배포**: GitHub에 push하면 자동으로 사이트 업데이트
- ✅ **마크다운 지원**: `.md` 파일로 쉽게 포스트 작성
- ✅ **코드 하이라이팅**: 다양한 언어의 코드 블록 지원
- ✅ **반응형 디자인**: 모바일과 데스크톱 모두 지원
- ✅ **태그 및 카테고리**: 포스트 분류 및 검색 기능

이제 Markdown 파일만 추가하면 자동으로 예쁜 블로그 포스트가 생성됩니다! 🚀
