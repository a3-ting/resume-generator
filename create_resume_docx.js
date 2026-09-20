const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, LevelFormat,
        ImageRun, VerticalAlign } = require('docx');

const output_path = __dirname + '/谢子健-简历.docx';

// Colors - template style: dark text only
const DARK = '1a1a1a';
const GRAY = '555555';

// Font config
const fontConfig = { ascii: 'Arial', hAnsi: 'Arial', eastAsia: 'Microsoft YaHei' };

// No-border style
const noBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
};
const noCellBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
};

// Helper: section header (plain bold, no border)
function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    children: [new TextRun({ text, bold: true, size: 21, color: DARK, font: fontConfig })],
  });
}

// Helper: entry title (date + school/company + role)
function entryTitle(text) {
  return new Paragraph({
    spacing: { before: 60, after: 30 },
    children: [new TextRun({ text, size: 19, color: DARK, font: fontConfig })],
  });
}

// Helper: body paragraph with optional bold label
function bodyPara(runs) {
  return new Paragraph({
    spacing: { before: 20, after: 20 },
    children: runs.map(r => new TextRun({
      text: r.text,
      bold: r.bold || false,
      size: 19,
      color: DARK,
      font: fontConfig,
    })),
  });
}

// Helper: simple body text
function bodyText(text) {
  return new Paragraph({
    spacing: { before: 20, after: 20 },
    children: [new TextRun({ text, size: 19, color: DARK, font: fontConfig })],
  });
}

// Read photo
const photoData = fs.readFileSync(__dirname + '/photo.jpg');

// Header table: left = name/info, right = photo
const headerTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [7200, 2360],
  borders: noBorders,
  rows: [
    new TableRow({
      cantSplit: true,
      children: [
        new TableCell({
          width: { size: 7200, type: WidthType.DXA },
          borders: noCellBorders,
          verticalAlign: VerticalAlign.TOP,
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          children: [
            new Paragraph({
              spacing: { before: 0, after: 40 },
              children: [new TextRun({ text: '谢子健', bold: true, size: 36, color: DARK, font: fontConfig })],
            }),
            new Paragraph({
              spacing: { before: 0, after: 10 },
              children: [new TextRun({ text: '政治面貌：共青团员　民族：汉族', size: 18, color: DARK, font: fontConfig })],
            }),
            new Paragraph({
              spacing: { before: 0, after: 10 },
              children: [new TextRun({ text: '出生年月：2004-04　籍贯：湖南省郴州市', size: 18, color: DARK, font: fontConfig })],
            }),
            new Paragraph({
              spacing: { before: 0, after: 0 },
              children: [new TextRun({ text: '联系方式：15674082816　邮箱：xiezijianwork@126.com', size: 18, color: DARK, font: fontConfig })],
            }),
          ],
        }),
        new TableCell({
          width: { size: 2360, type: WidthType.DXA },
          borders: noCellBorders,
          verticalAlign: VerticalAlign.TOP,
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { before: 0, after: 0 },
              children: [new ImageRun({
                type: 'jpg',
                data: photoData,
                transformation: { width: 85, height: 115 },
                altText: { title: 'photo', description: '证件照', name: 'photo' },
              })],
            }),
          ],
        }),
      ],
    }),
  ],
});

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: fontConfig, size: 19 },
        paragraph: { spacing: { before: 20, after: 20 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 850, right: 850, bottom: 680, left: 850 },
      },
    },
    children: [
      // === Header ===
      headerTable,

      // === 教育经历 ===
      sectionHeader('教育经历'),
      entryTitle('2022-09 ～ 2026-06　西安工商学院　本科｜软件工程'),
      bodyText('主修课程：C语言、Java、Python、数据结构、计算机网络、数据库系统、操作系统等。'),

      // === 实习经历 ===
      sectionHeader('实习经历'),
      entryTitle('2026-01 ～ 2026-04　深圳市华加生物科技有限公司　信息化工程师（运维开发）'),
      bodyPara([
        { text: '系统测试：', bold: true },
        { text: '独立设计测试用例，使用Python脚本完成API接口测试，通过禅道管理缺陷全生命周期，主动巡检发现并提交潜在Bug。' },
      ]),
      bodyPara([
        { text: '自动化工作流：', bold: true },
        { text: '基于OCR提取PDF内容，集成通义千问与DeepSeek大模型实现订单自动识别入库，替代人工录入，工作量减少约60%。' },
      ]),
      bodyPara([
        { text: '故障排查：', bold: true },
        { text: '独立分析明道云与金蝶系统间用户订单参数传参问题，通过日志分析与代码审查定位根因并完成修复。' },
      ]),
      bodyPara([
        { text: '平台运维：', bold: true },
        { text: '负责明道云低代码平台日常运维，保障10+业务模块持续稳定运行，实习期间无重大故障。' },
      ]),
      bodyPara([
        { text: '用户支持：', bold: true },
        { text: '对接5+业务部门处理一线用户问题，输出标准化运维与测试文档，故障响应时效提升约40%，新员工上手时间缩短约50%。' },
      ]),

      // === 项目经历 ===
      sectionHeader('项目经历'),
      entryTitle('2025-04 ～ 2025-05　鸿蒙记事本应用开发与测试　核心成员'),
      bodyPara([
        { text: '项目介绍：', bold: true },
        { text: '基于HarmonyOS分布式能力开发跨设备同步记事本应用，实现笔记增删改查与搜索功能。' },
      ]),
      bodyPara([
        { text: '项目职责：', bold: true },
        { text: '使用ArkTS开发前端界面与业务逻辑，基于分布式数据管理组件实现跨设备数据同步，适配3+终端设备；独立设计10+测试用例覆盖核心功能，使用DevEco Studio排查页面卡顿与数据同步异常，提前修复多个Bug。' },
      ]),
      bodyPara([
        { text: '项目成果：', bold: true },
        { text: '获评课程优秀作品（全班仅2组）。' },
      ]),
      entryTitle('2024-09 ～ 2024-10　第八届工业信息安全技能大赛（溯源赛道）　团队核心成员'),
      bodyPara([
        { text: '项目介绍：', bold: true },
        { text: '分析系统日志及流量痕迹，定位服务器攻击源头，排查安全漏洞。' },
      ]),
      bodyPara([
        { text: '项目职责：', bold: true },
        { text: '使用Wireshark分析网络流量痕迹定位攻击源头，使用Nmap进行端口扫描与服务识别；参与渗透测试，模拟漏洞挖掘与风险防御方案设计。' },
      ]),
      bodyPara([
        { text: '项目成果：', bold: true },
        { text: '团队获溯源赛道三等奖，从30+支队伍中脱颖而出。' },
      ]),

      // === 校园经历 ===
      sectionHeader('校园经历'),
      entryTitle('2022-09 ～ 2026-06　羽毛球社团　部长'),
      bodyPara([
        { text: '日常管理：', bold: true },
        { text: '组织社团日常训练与赛事活动，统筹场地规划与人员协调分工。' },
      ]),
      bodyPara([
        { text: '团队建设：', bold: true },
        { text: '管理社团成员，策划团建活动，具备团队管理与组织协调能力。' },
      ]),

      // === 荣誉证书 ===
      sectionHeader('荣誉证书'),
      bodyText('华为人工智能初识微认证　第八届工业信息安全技能大赛溯源赛道三等奖（30+支队伍）　优秀共青团员'),

      // === 技能其他 ===
      sectionHeader('技能其他'),
      bodyPara([
        { text: '专业能力：', bold: true },
        { text: '熟练掌握等价类、边界值、场景法等测试用例设计方法，能独立完成API接口测试与全流程功能测试；熟练使用Python编写测试脚本与自动化工作流；熟练编写SQL（MySQL / SQLite / SQL Server）进行数据查询验证与问题排查。' },
      ]),
      bodyPara([
        { text: '编程语言：', bold: true },
        { text: 'Python、ArkTS、Java、C，能阅读前后端代码辅助Bug定位。' },
      ]),
      bodyPara([
        { text: '安全测试：', bold: true },
        { text: '掌握Wireshark流量分析与Nmap端口扫描，具备基础渗透测试能力。' },
      ]),
      bodyPara([
        { text: '其他工具：', bold: true },
        { text: '禅道、Postman、Tomcat部署、阿里云百炼平台配置、低代码平台运维。' },
      ]),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(output_path, buffer);
  console.log('Word created: ' + output_path);
});
