import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Flowable, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register CJK font
font_paths = [
    "C:/Windows/Fonts/msyh.ttc",
    "C:/Windows/Fonts/simsun.ttc",
]
cjk_font = None
for fp in font_paths:
    if os.path.exists(fp):
        pdfmetrics.registerFont(TTFont("CJKFont", fp, subfontIndex=0))
        cjk_font = "CJKFont"
        break

if not cjk_font:
    print("ERROR: No CJK font found")
    exit(1)

# Colors - template style: dark text, no accent colors
DARK = HexColor('#1a1a1a')
GRAY = HexColor('#555555')

# Page setup
script_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(script_dir, "谢子健-简历.pdf")
doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=15*mm,
    rightMargin=15*mm,
    topMargin=15*mm,
    bottomMargin=12*mm,
)

content_width = A4[0] - 30*mm

# Styles - matching 李晓芸 template: clean, no color, no dividers
name_style = ParagraphStyle('Name', fontName=cjk_font, fontSize=18, leading=22,
    textColor=DARK, alignment=TA_LEFT, spaceAfter=4, wordWrap='CJK')

info_style = ParagraphStyle('Info', fontName=cjk_font, fontSize=9, leading=14,
    textColor=DARK, alignment=TA_LEFT, spaceAfter=1, wordWrap='CJK')

section_header_style = ParagraphStyle('SectionHeader', fontName=cjk_font, fontSize=10.5, leading=14,
    textColor=DARK, spaceBefore=8, spaceAfter=3, wordWrap='CJK', fontWeight='bold')

entry_title_style = ParagraphStyle('EntryTitle', fontName=cjk_font, fontSize=9.5, leading=13,
    textColor=DARK, spaceBefore=4, spaceAfter=2, wordWrap='CJK')

body_style = ParagraphStyle('Body', fontName=cjk_font, fontSize=9.5, leading=13.5,
    textColor=DARK, spaceBefore=1, spaceAfter=1, wordWrap='CJK', leftIndent=0)

sub_label_style = ParagraphStyle('SubLabel', fontName=cjk_font, fontSize=9.5, leading=13.5,
    textColor=DARK, spaceBefore=1, spaceAfter=1, wordWrap='CJK', leftIndent=0)


story = []

# === Header with photo ===
photo_path = os.path.join(script_dir, "photo.jpg")
photo_img = Image(photo_path, width=22*mm, height=30*mm)

header_left = [
    Paragraph("谢子健", name_style),
    Paragraph("政治面貌：共青团员　民族：汉族", info_style),
    Paragraph("出生年月：2004-04　籍贯：湖南省郴州市", info_style),
    Paragraph("联系方式：15674082816　邮箱：xiezijianwork@126.com", info_style),
]

header_table = Table([[
    header_left,
    photo_img,
]], colWidths=[content_width - 25*mm, 25*mm])
header_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ALIGN', (1,0), (1,0), 'RIGHT'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
]))
story.append(header_table)

# === 教育经历 ===
story.append(Paragraph("教育经历", section_header_style))
story.append(Paragraph("2022-09 ～ 2026-06　西安工商学院　本科｜软件工程", entry_title_style))
story.append(Paragraph("主修课程：C语言、Java、Python、数据结构、计算机网络、数据库系统、操作系统等。", body_style))

# === 实习经历 ===
story.append(Paragraph("实习经历", section_header_style))
story.append(Paragraph("2026-01 ～ 2026-04　深圳市华加生物科技有限公司　信息化工程师（运维开发）", entry_title_style))
internship_items = [
    "系统测试：独立设计测试用例，使用Python脚本完成API接口测试，通过禅道管理缺陷全生命周期，主动巡检发现并提交潜在Bug。",
    "自动化工作流：基于OCR提取PDF内容，集成通义千问与DeepSeek大模型实现订单自动识别入库，替代人工录入，工作量减少约60%。",
    "故障排查：独立分析明道云与金蝶系统间用户订单参数传参问题，通过日志分析与代码审查定位根因并完成修复。",
    "平台运维：负责明道云低代码平台日常运维，保障10+业务模块持续稳定运行，实习期间无重大故障。",
    "用户支持：对接5+业务部门处理一线用户问题，输出标准化运维与测试文档，故障响应时效提升约40%，新员工上手时间缩短约50%。",
]
for item in internship_items:
    story.append(Paragraph(item, body_style))

# === 项目经历 ===
story.append(Paragraph("项目经历", section_header_style))

story.append(Paragraph("2025-04 ～ 2025-05　鸿蒙记事本应用开发与测试　核心成员", entry_title_style))
story.append(Paragraph("项目介绍：基于HarmonyOS分布式能力开发跨设备同步记事本应用，实现笔记增删改查与搜索功能。", body_style))
story.append(Paragraph("项目职责：使用ArkTS开发前端界面与业务逻辑，基于分布式数据管理组件实现跨设备数据同步，适配3+终端设备；独立设计10+测试用例覆盖核心功能，使用DevEco Studio排查页面卡顿与数据同步异常，提前修复多个Bug。", body_style))
story.append(Paragraph("项目成果：获评课程优秀作品（全班仅2组）。", body_style))

story.append(Paragraph("2024-09 ～ 2024-10　第八届工业信息安全技能大赛（溯源赛道）　团队核心成员", entry_title_style))
story.append(Paragraph("项目介绍：分析系统日志及流量痕迹，定位服务器攻击源头，排查安全漏洞。", body_style))
story.append(Paragraph("项目职责：使用Wireshark分析网络流量痕迹定位攻击源头，使用Nmap进行端口扫描与服务识别；参与渗透测试，模拟漏洞挖掘与风险防御方案设计。", body_style))
story.append(Paragraph("项目成果：团队获溯源赛道三等奖，从30+支队伍中脱颖而出。", body_style))

# === 校园经历 ===
story.append(Paragraph("校园经历", section_header_style))
story.append(Paragraph("2022-09 ～ 2026-06　羽毛球社团　部长", entry_title_style))
story.append(Paragraph("日常管理：组织社团日常训练与赛事活动，统筹场地规划与人员协调分工。", body_style))
story.append(Paragraph("团队建设：管理社团成员，策划团建活动，具备团队管理与组织协调能力。", body_style))

# === 荣誉证书 ===
story.append(Paragraph("荣誉证书", section_header_style))
story.append(Paragraph("华为人工智能初识微认证　第八届工业信息安全技能大赛溯源赛道三等奖（30+支队伍）　优秀共青团员", body_style))

# === 技能其他 ===
story.append(Paragraph("技能其他", section_header_style))
story.append(Paragraph("专业能力：熟练掌握等价类、边界值、场景法等测试用例设计方法，能独立完成API接口测试与全流程功能测试；熟练使用Python编写测试脚本与自动化工作流；熟练编写SQL（MySQL / SQLite / SQL Server）进行数据查询验证与问题排查。", body_style))
story.append(Paragraph("编程语言：Python、ArkTS、Java、C，能阅读前后端代码辅助Bug定位。", body_style))
story.append(Paragraph("安全测试：掌握Wireshark流量分析与Nmap端口扫描，具备基础渗透测试能力。", body_style))
story.append(Paragraph("其他工具：禅道、Postman、Tomcat部署、阿里云百炼平台配置、低代码平台运维。", body_style))

doc.build(story)
print(f"PDF created: {output_path}")
