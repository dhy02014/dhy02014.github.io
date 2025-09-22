---
layout: post
title: "GitHub 저장소 브라우저"
date: 2025-09-23 13:51:00 +0900
categories: 개발
tags: [GitHub, JavaScript, API, Python]
---

# Python 저장소 브라우저

<div class="repo-browser">
    <div style="display: flex; gap: 20px;">
        <!-- 파일 목록 -->
        <div style="flex: 1; min-width: 300px;">
            <h3>📁 파일 목록</h3>
            <div id="file-list" style="background: #f6f8fa; padding: 16px; border-radius: 6px; max-height: 400px; overflow-y: auto;">
                <button onclick="loadFileList()" style="padding: 8px 16px; background: #0366d6; color: white; border: none; border-radius: 4px;">파일 목록 불러오기</button>
            </div>
        </div>
        
        <!-- 코드 뷰어 -->
        <div style="flex: 2;">
            <h3>📄 코드 뷰어</h3>
            <div id="code-viewer" style="background: #f6f8fa; padding: 16px; border-radius: 6px; min-height: 400px;">
                파일을 선택하면 내용이 여기에 표시됩니다.
            </div>
        </div>
    </div>
</div>

<script>
const REPO = 'dhy02014/Python';

async function loadFileList(path = '') {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '<p>로딩 중...</p>';
    
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`);
        const files = await response.json();
        
        let html = '';
        
        // 상위 폴더로 가기 버튼 (루트가 아닌 경우)
        if (path) {
            const parentPath = path.split('/').slice(0, -1).join('/');
            html += `<div onclick="loadFileList('${parentPath}')" style="cursor: pointer; padding: 8px; margin: 4px 0; background: #e1e4e8; border-radius: 4px;">📁 ..</div>`;
        }
        
        // 폴더들 먼저 표시
        files.filter(file => file.type === 'dir').forEach(file => {
            html += `<div onclick="loadFileList('${file.path}')" style="cursor: pointer; padding: 8px; margin: 4px 0; background: #fff; border: 1px solid #d0d7de; border-radius: 4px; hover: background-color: #f6f8fa;">📁 ${file.name}</div>`;
        });
        
        // 파일들 표시
        files.filter(file => file.type === 'file').forEach(file => {
            const icon = getFileIcon(file.name);
            html += `<div onclick="loadFileContent('${file.path}')" style="cursor: pointer; padding: 8px; margin: 4px 0; background: #fff; border: 1px solid #d0d7de; border-radius: 4px;">${icon} ${file.name}</div>`;
        });
        
        fileList.innerHTML = html;
        
    } catch (error) {
        fileList.innerHTML = `<p style="color: red;">오류: ${error.message}</p>`;
    }
}

async function loadFileContent(filePath) {
    const viewer = document.getElementById('code-viewer');
    viewer.innerHTML = '<p>로딩 중...</p>';
    
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`);
        const data = await response.json();
        
        if (data.size > 100000) { // 100KB 이상 파일은 제한
            viewer.innerHTML = '<p style="color: orange;">파일이 너무 큽니다. GitHub에서 직접 확인해주세요.</p>';
            return;
        }
        
        const content = atob(data.content);
        const extension = filePath.split('.').pop().toLowerCase();
        const language = getLanguage(extension);
        
        viewer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #d0d7de;">
                <strong>${filePath}</strong>
                <div>
                    <span style="font-size: 12px; color: #656d76; margin-right: 12px;">${formatFileSize(data.size)}</span>
                    <a href="https://github.com/${REPO}/blob/main/${filePath}" target="_blank" style="font-size: 12px; color: #0366d6;">GitHub에서 보기</a>
                </div>
            </div>
            <pre style="background: #ffffff; padding: 16px; border-radius: 4px; overflow-x: auto; margin: 0; max-height: 500px; overflow-y: auto;"><code class="language-${language}">${escapeHtml(content)}</code></pre>
        `;
        
    } catch (error) {
        viewer.innerHTML = `<p style="color: red;">오류: ${error.message}</p>`;
    }
}

function getFileIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const icons = {
        'py': '🐍',
        'js': '📜',
        'html': '🌐',
        'css': '🎨',
        'md': '📝',
        'json': '📋',
        'txt': '📄',
        'yml': '⚙️',
        'yaml': '⚙️',
        'xml': '📰',
        'sql': '🗃️'
    };
    return icons[extension] || '📄';
}

function getLanguage(extension) {
    const languages = {
        'py': 'python',
        'js': 'javascript',
        'html': 'html',
        'css': 'css',
        'md': 'markdown',
        'json': 'json',
        'txt': 'text',
        'yml': 'yaml',
        'yaml': 'yaml',
        'xml': 'xml',
        'sql': 'sql'
    };
    return languages[extension] || 'text';
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / (1024 * 1024)) + ' MB';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
</script>

<style>
.repo-browser div:hover {
    background-color: #f6f8fa !important;
}
</style>

## 기능 설명

이 GitHub 저장소 브라우저를 통해:

1. **파일 목록 탐색**: 폴더를 클릭하여 하위 디렉토리 탐색
2. **실시간 코드 보기**: 파일을 클릭하면 즉시 내용 표시
3. **파일 정보**: 파일 크기와 GitHub 링크 제공
4. **다양한 파일 형식 지원**: Python, JavaScript, Markdown 등

## 제약사항

- GitHub API 제한: 시간당 60회 요청
- 파일 크기 제한: 100KB 이하만 표시
- 바이너리 파일은 지원하지 않음

**"파일 목록 불러오기"** 버튼을 클릭하여 시작하세요!
