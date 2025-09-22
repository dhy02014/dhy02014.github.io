# Jekyll Tech Blog

GitHub Pages용 Jekyll 기반 기술 블로그입니다.

## 특징

- Jekyll 기반 정적 사이트 생성
- Markdown 파일 자동 렌더링
- GitHub Pages 자동 배포
- 반응형 디자인
- 태그 및 카테고리 지원

## 사용 방법

### 새 포스트 작성

`_posts/` 디렉토리에 다음 형식으로 Markdown 파일을 생성하세요:

**파일명**: `YYYY-MM-DD-title.md`

**내용**:
```markdown
---
layout: post
title: "포스트 제목"
date: YYYY-MM-DD HH:MM:SS +0900
categories: 카테고리
tags: [태그1, 태그2]
---

# 포스트 내용

Markdown으로 작성된 내용이 여기에 들어갑니다.
```

### 로컬 개발

```bash
# 의존성 설치
bundle install

# 로컬 서버 실행
bundle exec jekyll serve

# 브라우저에서 http://localhost:4000 접속
```

## 파일 구조

```
├── _config.yml          # Jekyll 설정
├── _layouts/            # 레이아웃 템플릿
│   ├── default.html     # 기본 레이아웃
│   └── post.html        # 포스트 레이아웃
├── _posts/              # 블로그 포스트 (Markdown)
├── _site/               # 생성된 정적 파일 (자동 생성)
├── css/                 # 스타일시트
├── Gemfile              # Ruby 의존성
├── index.html           # 메인 페이지
└── posts.html           # 포스트 목록 페이지
```

## 배포

1. `_posts/` 디렉토리에 Markdown 파일 추가
2. main 브랜치에 push
3. GitHub Actions가 자동으로 빌드 및 배포
4. `https://dhy02014.github.io`에서 확인

## 기술 스택

- Jekyll 3.9.x (GitHub Pages 호환)
- Kramdown (Markdown 파서)
- Rouge (코드 하이라이팅)
- GitHub Actions (자동 배포)

## 라이선스

MIT License
