---
layout: post
title: "GitHub 저장소 코드 뷰어"
date: 2025-09-23 13:50:00 +0900
categories: 개발
tags: [GitHub, JavaScript, API]
---

# GitHub 저장소 코드 불러오기

<div class="github-repo-viewer">
    <input type="text" id="file-path" placeholder="파일 경로 입력 (예: main.py)" style="width: 300px; padding: 8px; margin: 10px 0;">
    <button onclick="loadCode()" style="padding: 8px 16px; background: #0366d6; color: white; border: none; border-radius: 4px;">코드 불러오기</button>
    
    <div id="code-container" style="margin-top: 20px;"></div>
</div>

<script>
async function loadCode() {
    const filePath = document.getElementById('file-path').value;
    const container = document.getElementById('code-container');
    
    if (!filePath) {
        container.innerHTML = '<p style="color: red;">파일 경로를 입력해주세요.</p>';
        return;
    }
    
    container.innerHTML = '<p>로딩 중...</p>';
    
    try {
        const response = await fetch(`https://api.github.com/repos/dhy02014/Python/contents/${filePath}`);
        
        if (!response.ok) {
            throw new Error('파일을 찾을 수 없습니다.');
        }
        
        const data = await response.json();
        const content = atob(data.content);
        
        // 파일 확장자에 따른 언어 감지
        const extension = filePath.split('.').pop().toLowerCase();
        const language = getLanguage(extension);
        
        container.innerHTML = `
            <div style="background: #f6f8fa; padding: 16px; border-radius: 6px; border: 1px solid #d0d7de;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #d0d7de;">
                    <strong>${filePath}</strong>
                    <span style="font-size: 12px; color: #656d76;">${data.size} bytes</span>
                </div>
                <pre style="background: #ffffff; padding: 16px; border-radius: 4px; overflow-x: auto; margin: 0;"><code class="language-${language}">${escapeHtml(content)}</code></pre>
            </div>
        `;
        
        // 코드 하이라이팅 적용 (Prism.js 사용 시)
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
        
    } catch (error) {
        container.innerHTML = `<p style="color: red;">오류: ${error.message}</p>`;
    }
}

function getLanguage(extension) {
    const languages = {
        'py': 'python',
        'js': 'javascript',
        'html': 'html',
        'css': 'css',
        'java': 'java',
        'cpp': 'cpp',
        'c': 'c',
        'md': 'markdown',
        'json': 'json',
        'xml': 'xml',
        'sql': 'sql'
    };
    return languages[extension] || 'text';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 페이지 로드 시 예시 파일 로드
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('file-path').value = 'README.md';
});
</script>

## 사용 방법

1. 위의 입력창에 Python 저장소의 파일 경로를 입력하세요
2. "코드 불러오기" 버튼을 클릭하세요
3. 해당 파일의 내용이 아래에 표시됩니다

## 예시 파일들
- `README.md`
- `main.py`
- `requirements.txt`

이 기능을 통해 GitHub 저장소의 코드를 실시간으로 불러와 블로그에서 확인할 수 있습니다.
