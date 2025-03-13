// 物理治疗预约系统 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，初始化应用...');
    initializePlatformToggle();
    initializeContentLoading();
    setupEventListeners();
    setupNavigationButtons();
});

// 初始化平台切换功能
function initializePlatformToggle() {
    const iosButton = document.getElementById('ios-toggle');
    const androidButton = document.getElementById('android-toggle');
    const iosDevices = document.querySelectorAll('.device-ios');
    const androidDevices = document.querySelectorAll('.device-android');

    if (iosButton && androidButton) {
        iosButton.addEventListener('click', function() {
            iosButton.classList.add('active');
            androidButton.classList.remove('active');
            
            iosDevices.forEach(device => {
                device.style.display = 'block';
            });
            
            androidDevices.forEach(device => {
                device.style.display = 'none';
            });
        });

        androidButton.addEventListener('click', function() {
            androidButton.classList.add('active');
            iosButton.classList.remove('active');
            
            androidDevices.forEach(device => {
                device.style.display = 'block';
            });
            
            iosDevices.forEach(device => {
                device.style.display = 'none';
            });
        });
    }
}

// 初始化内容加载
function initializeContentLoading() {
    console.log('初始化内容加载...');
    const contentContainers = document.querySelectorAll('[data-content-src]');
    console.log(`找到 ${contentContainers.length} 个需要加载内容的容器`);
    
    contentContainers.forEach((container, index) => {
        const contentSrc = container.getAttribute('data-content-src');
        if (contentSrc) {
            console.log(`[${index + 1}/${contentContainers.length}] 加载内容: ${contentSrc}`);
            loadContent(container, contentSrc);
        }
    });
}

// 加载内容到容器
function loadContent(container, src) {
    // 显示加载状态
    container.innerHTML = '<div class="loading"></div>';
    console.log(`开始加载: ${src}`);
    
    // 使用相对路径，确保在不同环境下都能正确加载
    const absoluteSrc = new URL(src, window.location.href).href;
    console.log(`绝对路径: ${absoluteSrc}`);
    
    // 添加时间戳防止缓存
    const cacheBustSrc = `${absoluteSrc}${absoluteSrc.includes('?') ? '&' : '?'}_t=${new Date().getTime()}`;
    
    fetch(cacheBustSrc, {
        method: 'GET',
        mode: 'same-origin', // 确保同源请求
        cache: 'no-cache',   // 不使用缓存
        credentials: 'same-origin',
        headers: {
            'Accept': 'text/html',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => {
        console.log(`响应状态: ${response.status} ${response.statusText}`);
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        try {
            console.log(`成功获取内容，长度: ${html.length} 字符`);
            
            // 检查HTML内容是否为空
            if (!html.trim()) {
                throw new Error('获取的内容为空');
            }
            
            // 提取body内容
            const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            if (bodyContent && bodyContent[1]) {
                console.log('成功提取body内容');
                container.innerHTML = bodyContent[1];
            } else {
                console.log('无法提取body内容，使用完整HTML');
                container.innerHTML = html; // 如果无法提取body，则使用整个HTML
            }
            
            // 执行新加载内容中的脚本
            const scripts = container.querySelectorAll('script');
            console.log(`找到 ${scripts.length} 个脚本需要执行`);
            
            scripts.forEach((script, index) => {
                const newScript = document.createElement('script');
                
                if (script.src) {
                    console.log(`执行外部脚本: ${script.src}`);
                    newScript.src = script.src;
                } else {
                    console.log(`执行内联脚本 #${index + 1}`);
                    newScript.textContent = script.textContent;
                }
                
                document.head.appendChild(newScript);
                document.head.removeChild(newScript);
            });
            
            // 为新加载的内容设置事件监听器
            setupDynamicEventListeners(container);
            console.log(`内容加载完成: ${src}`);
        } catch (error) {
            console.error(`解析内容失败: ${error.message}`, error);
            container.innerHTML = `<div class="error-message">
                <p>解析内容失败: ${error.message}</p>
                <p>请求的文件: ${src}</p>
                <button onclick="retryLoad(this, '${src}')" class="ios-button" style="margin-top: 10px; width: auto; display: inline-block;">重试加载</button>
            </div>`;
        }
    })
    .catch(error => {
        console.error(`加载内容失败: ${error.message}`, error);
        container.innerHTML = `<div class="error-message">
            <p>加载内容失败: ${error.message}</p>
            <p>请求的文件: ${src}</p>
            <p>请检查文件路径是否正确，以及文件是否存在。</p>
            <button onclick="retryLoad(this, '${src}')" class="ios-button" style="margin-top: 10px; width: auto; display: inline-block;">重试加载</button>
        </div>`;
    });
}

// 重试加载内容
function retryLoad(button, src) {
    console.log(`重试加载: ${src}`);
    const container = button.closest('[data-content-src]') || button.closest('.phone-content');
    if (container) {
        loadContent(container, src);
    } else {
        console.error('无法找到内容容器');
        alert('重试失败：无法找到内容容器');
    }
}

// 设置导航按钮
function setupNavigationButtons() {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.prototype-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加active类到当前按钮
            this.classList.add('active');
            
            // 隐藏所有部分
            sections.forEach(section => section.style.display = 'none');
            
            // 显示对应部分
            const targetPage = this.getAttribute('data-page');
            document.getElementById(`${targetPage}-section`).style.display = 'block';
            
            // 滚动到顶部
            window.scrollTo(0, 0);
        });
    });
    
    // 处理平台切换按钮点击
    const platformButtons = document.querySelectorAll('.platform-button');
    
    platformButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取当前部分
            const section = this.closest('.prototype-section');
            
            // 移除当前部分中所有平台按钮的active类
            section.querySelectorAll('.platform-button').forEach(btn => btn.classList.remove('active'));
            
            // 添加active类到当前按钮
            this.classList.add('active');
            
            // 获取目标平台
            const targetPlatform = this.getAttribute('data-platform');
            
            // 隐藏当前部分中所有平台内容
            section.querySelectorAll('.platform-content').forEach(content => content.classList.remove('active'));
            
            // 显示目标平台内容
            const currentPage = section.id.replace('-section', '');
            document.getElementById(`${currentPage}-${targetPlatform}`).classList.add('active');
        });
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 为表单提交添加事件监听
    document.addEventListener('submit', function(event) {
        const form = event.target;
        if (form.classList.contains('prevent-default')) {
            event.preventDefault();
            showSuccessMessage(form);
        }
    });
    
    // 为标签页切换添加事件监听
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.tabs-container');
            
            if (tabContainer) {
                const allTabs = tabContainer.querySelectorAll('.tab-content');
                const allButtons = tabContainer.querySelectorAll('.tab-button');
                
                allTabs.forEach(tab => tab.classList.remove('active'));
                allButtons.forEach(btn => btn.classList.remove('active'));
                
                document.getElementById(tabId).classList.add('active');
                this.classList.add('active');
            }
        });
    });
}

// 为动态加载的内容设置事件监听器
function setupDynamicEventListeners(container) {
    // 为动态加载的表单设置提交事件
    const forms = container.querySelectorAll('form.prevent-default');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            showSuccessMessage(form);
        });
    });
    
    // 为动态加载的标签页设置切换事件
    const tabButtons = container.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.tabs-container');
            
            if (tabContainer) {
                const allTabs = tabContainer.querySelectorAll('.tab-content');
                const allButtons = tabContainer.querySelectorAll('.tab-button');
                
                allTabs.forEach(tab => tab.classList.remove('active'));
                allButtons.forEach(btn => btn.classList.remove('active'));
                
                const targetTab = document.getElementById(tabId);
                if (targetTab) {
                    targetTab.classList.add('active');
                    this.classList.add('active');
                }
            }
        });
    });
    
    // 为Material Design按钮添加波纹效果
    const mdButtons = container.querySelectorAll('.material-button');
    mdButtons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // 为下载按钮添加事件监听
    const downloadButtons = container.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                captureScreenshot(targetElement);
            }
        });
    });
}

// 显示成功消息
function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '操作成功完成！';
    
    form.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.classList.add('fade-out');
        setTimeout(() => {
            form.removeChild(successMessage);
        }, 500);
    }, 2000);
}

// 创建波纹效果
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - (button.getBoundingClientRect().left + radius)}px`;
    ripple.style.top = `${event.clientY - (button.getBoundingClientRect().top + radius)}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        button.removeChild(existingRipple);
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple && ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// 截取屏幕截图
function captureScreenshot(element) {
    if (typeof html2canvas !== 'undefined') {
        html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `physiou-screenshot-${new Date().getTime()}.png`;
            link.click();
        });
    } else {
        alert('截图功能需要html2canvas库支持，请确保已加载该库。');
    }
}

// 添加html2canvas库
function loadHtml2Canvas() {
    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = function() {
            console.log('html2canvas库加载成功');
            const downloadButtons = document.querySelectorAll('.download-button');
            downloadButtons.forEach(button => {
                button.disabled = false;
            });
        };
        
        script.onerror = function() {
            console.error('html2canvas库加载失败');
            alert('截图功能加载失败，请检查网络连接。');
        };
    }
}

// 全局错误处理
window.onerror = function(message, source, lineno, colno, error) {
    console.error('全局错误:', message, 'at', source, lineno, colno, error);
    return false;
};

// 加载html2canvas库
loadHtml2Canvas(); 