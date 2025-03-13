# 物理治疗预约系统 - 高保真原型

这是一个现代化的物理治疗预约管理系统的高保真原型，帮助患者轻松预约康复治疗，跟踪康复进度。

## 功能特点

- 预约管理：选择康复项目、治疗师、日期和时间
- 患者信息管理：基本信息、病史记录、治疗记录
- 就诊前数据收集：疼痛评估、功能障碍评估、疼痛部位标注
- SOAP记录：主观资料、客观资料、评估和计划
- 治疗历史：已完成、即将到来和已取消的预约
- 恢复进度：总体恢复进度、疼痛趋势、康复里程碑
- 就诊后反馈：总体评价、满意度评价、标签评价

## 使用说明

### 本地运行

由于浏览器的安全限制，直接打开HTML文件可能会导致内容加载失败。为了正确查看原型，请按照以下步骤操作：

#### 方法1：使用提供的Node.js服务器（推荐）

1. 确保已安装 [Node.js](https://nodejs.org/)
2. 双击 `start-server.bat` 文件启动服务器
3. 在浏览器中访问 http://localhost:3000/

#### 方法2：使用Visual Studio Code的Live Server插件

1. 安装 [Visual Studio Code](https://code.visualstudio.com/)
2. 安装 [Live Server 插件](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
3. 在VS Code中打开项目文件夹
4. 右键点击 `index.html` 文件，选择 "Open with Live Server"

#### 方法3：使用其他HTTP服务器

您也可以使用任何HTTP服务器（如Apache、Nginx等）来托管这些文件。

### 内容加载问题排查

如果遇到内容加载失败的问题，请尝试以下解决方案：

1. **确保使用HTTP服务器**：不要直接从文件系统打开HTML文件，这会导致跨域资源共享(CORS)问题。
2. **检查浏览器控制台**：按F12打开开发者工具，查看控制台中的错误信息。
3. **清除浏览器缓存**：有时候浏览器缓存可能会导致问题，尝试清除缓存或使用无痕模式。
4. **检查文件路径**：确保所有文件路径正确，特别是在不同操作系统中路径分隔符可能不同。
5. **使用测试页面**：打开 `test-loader.html` 页面，测试内容加载功能是否正常工作。

## 项目结构

```
/
├── css/                  # CSS样式文件
│   └── styles.css        # 主样式文件
├── js/                   # JavaScript文件
│   └── main.js           # 主脚本文件
├── screens/              # 屏幕HTML文件
│   ├── ios/              # iOS风格界面
│   └── android/          # Android风格界面
├── assets/               # 资源文件（图片等）
├── index.html            # 主页面
├── test.html             # 测试页面
├── test-loader.html      # 内容加载测试页面
├── server.js             # 本地HTTP服务器
├── start-server.bat      # 启动服务器的批处理文件
└── README.md             # 项目说明文件
```

## 浏览器兼容性

本原型已在以下浏览器中测试通过：

- Google Chrome (最新版)
- Mozilla Firefox (最新版)
- Microsoft Edge (最新版)
- Safari (最新版)

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome 图标
- Google Material Icons
- html2canvas (用于截图功能)

## 注意事项

- 这是一个原型系统，不包含实际的后端功能。
- 所有数据都是静态的，不会被保存。
- 截图功能需要html2canvas库支持，请确保网络连接正常。

## 项目概述

物理治疗预约系统是一个帮助患者轻松预约康复治疗、跟踪康复进度的应用。本原型展示了系统的主要功能和界面，包括：

- **首页**：展示用户基本信息、即将到来的预约、推荐治疗师和康复项目
- **预约**：选择康复项目、治疗师、日期和时间，完成预约流程
- **患者信息**：展示用户基本信息、病史记录、治疗记录和康复进度
- **就诊前数据收集**：允许患者在就诊前提交疼痛评估、功能障碍评估、疼痛部位标注等信息
- **SOAP记录**：展示医生的主观资料、客观资料、评估和计划
- **治疗历史**：展示患者的历史治疗记录，包括已完成、即将到来和已取消的预约
- **恢复进度**：展示患者的康复进展，包括总体恢复进度、疼痛趋势、康复里程碑和家庭锻炼计划
- **就诊后反馈**：允许患者对治疗体验进行评价，包括总体评价、满意度评价和治疗效果反馈

## 技术特点

- 使用纯HTML、CSS和JavaScript实现
- 采用Flex/Grid布局，确保界面美观且响应式
- 集成FontAwesome和Google Material Icons图标库
- 实现Material Design波纹效果和页面过渡动画
- 支持iOS和Material Design两种设计风格

## 文件结构

- `index.html` - 主页面，加载所有其他界面
- `screens/home.html` - 首页界面
- `screens/booking.html` - 预约界面
- `screens/patient-info.html` - 患者信息界面
- `screens/pre-visit.html` - 就诊前数据收集界面
- `screens/soap.html` - SOAP记录界面
- `screens/treatment-history.html` - 治疗历史界面
- `screens/recovery-progress.html` - 恢复进度界面
- `screens/post-visit-feedback.html` - 就诊后反馈界面
- `css/styles.css` - 统一的CSS样式
- `js/main.js` - JavaScript交互功能
- `assets/` - 存放图片等资源文件

## 如何使用

1. 直接在浏览器中打开 `index.html` 文件
2. 通过顶部导航按钮切换不同的界面
3. 体验各种交互效果和动画

## 设计参考

本原型的设计参考了以下应用：
- Apple Health
- Google Fit
- Kaia Health

## 注意事项

- 这是一个纯前端原型，不包含后端功能
- 所有数据都是静态的，不会保存用户输入
- 原型中的图片来自随机用户生成API，仅用于演示 