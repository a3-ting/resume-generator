# Resume Generator

简历生成工具，支持导出为 Word (.docx) 和 PDF 两种格式。

## 功能特性

- **Word 导出**：使用 `docx` 库生成专业排版简历
- **PDF 导出**：使用 `reportlab` 库生成 PDF 格式简历
- **图片支持**：简历中可嵌入个人照片
- **自定义模板**：支持颜色、字体、布局的灵活配置

## 技术栈

| 项目 | 技术 |
|------|------|
| Word 生成 | Node.js + docx |
| PDF 生成 | Python + reportlab |
| 字体 | Arial / Microsoft YaHei |

## 安装

### Word 版本 (Node.js)
```bash
npm install
```

### PDF 版本 (Python)
```bash
pip install reportlab
```

## 使用方法

### 生成 Word 简历
```bash
node create_resume_docx.js
```

### 生成 PDF 简历
```bash
python create_resume_pdf.py
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `create_resume_docx.js` | Node.js 版简历生成脚本 |
| `create_resume_pdf.py` | Python 版简历生成脚本 |
| `package.json` | Node.js 依赖配置 |

## 依赖

- Node.js 16+
- Python 3.8+
- `docx` npm 包
- `reportlab` Python 包

## 许可证

MIT
