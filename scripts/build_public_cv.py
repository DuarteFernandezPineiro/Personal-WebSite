"""Build the sanitized public resume used by the portfolio."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "CV_Duarte_Fernandez_Pineiro_Publico.pdf"
PUBLIC = ROOT / "apps" / "web" / "public" / OUTPUT.name
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
PUBLIC.parent.mkdir(parents=True, exist_ok=True)

INK = HexColor("#061923")
TIDE = HexColor("#08A89A")
PAPER = HexColor("#F4F6F0")
MUTED = HexColor("#52676A")
LINE = HexColor("#C7D1CC")
PANEL = HexColor("#DDF4EB")

pdfmetrics.registerFont(TTFont("DuarteSans", "C:/Windows/Fonts/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DuarteSansBold", "C:/Windows/Fonts/DejaVuSans-Bold.ttf"))

W, H = A4
LEFT, RIGHT = 52, W - 52
canvas = Canvas(str(OUTPUT), pagesize=A4)


def paragraph(text, x, top, width, *, size=8.2, leading=11.8, color=INK, bold=False):
    style = ParagraphStyle("p", fontName="DuarteSansBold" if bold else "DuarteSans", fontSize=size, leading=leading, textColor=color)
    item = Paragraph(text, style)
    _, height = item.wrap(width, 500)
    item.drawOn(canvas, x, top - height)
    return top - height


def section(title, y):
    canvas.setFont("DuarteSansBold", 7.8)
    canvas.setFillColor(TIDE)
    canvas.drawString(LEFT, y, title.upper())
    return y - 17


def entry(title, meta, body, y):
    canvas.setFont("DuarteSansBold", 9.7)
    canvas.setFillColor(INK)
    canvas.drawString(LEFT, y, title)
    canvas.setFont("DuarteSans", 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT, y - 13, meta.upper())
    y = paragraph(body, LEFT, y - 21, RIGHT - LEFT, size=7.9, leading=10.8)
    return y - 8


def page_base(page_number):
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.line(LEFT, 31, RIGHT, 31)
    canvas.setFont("DuarteSans", 6.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT, 19, "DUARTE FERNÁNDEZ PIÑEIRO  ·  PUBLIC PROFESSIONAL CV")
    canvas.drawRightString(RIGHT, 19, f"{page_number:02d}")


page_base(1)
canvas.setFont("DuarteSans", 25)
canvas.setFillColor(INK)
canvas.drawString(LEFT, 782, "Duarte Fernández")
canvas.drawString(LEFT, 752, "Piñeiro")
canvas.setFont("DuarteSans", 9.5)
canvas.setFillColor(TIDE)
canvas.drawString(LEFT, 730, "ARTIFICIAL INTELLIGENCE ENGINEER")

canvas.setFont("DuarteSansBold", 17)
canvas.setFillColor(INK)
canvas.drawRightString(RIGHT, 782, "109")
canvas.setFont("DuarteSans", 6.5)
canvas.drawRightString(RIGHT, 766, "documents in thesis")
canvas.setFont("DuarteSansBold", 17)
canvas.drawRightString(RIGHT, 738, "2,913")
canvas.setFont("DuarteSans", 6.5)
canvas.drawRightString(RIGHT, 722, "traceable chunks")

y = paragraph("Applied AI engineer focused on GenAI, hybrid retrieval, NLP and reliable software delivery. I turn ambiguous problems into testable systems, combining research discipline with product judgement and clear communication.", LEFT, 694, RIGHT - LEFT, size=9, leading=13, color=MUTED)
y = paragraph("Santiago de Compostela, Galicia  ·  dfernandezpineiro@gmail.com  ·  linkedin.com/in/dfernandezpineiro  ·  github.com/DuarteFernandezPineiro", LEFT, y - 9, RIGHT - LEFT, size=6.9, leading=9, color=MUTED)
y = section("Selected work", y - 17)
y = entry("Hybrid enterprise RAG system", "Thesis · GenAI / RAG · 2026", "Designed and validated an evidence-grounded assistant over 109 documents and 2,913 traceable chunks. Combined semantic and lexical retrieval, reranking, citations, abstention and automated evaluation across 57 tests.", y)
y = entry("TwinPhoto", "Computer vision · Product prototype · 2026", "Built a duplicate and near-duplicate image workflow around perceptual and visual similarity, focusing on explainable grouping, usable review flows and local-first processing.", y)
y = entry("Bitcoin decision classifier", "NLP / Machine learning · Deployed · 2026", "Developed an end-to-end text classification product that transforms market narratives into structured signals, including preprocessing, inference, confidence-aware presentation and a deployed interactive experience.", y)
y = entry("Professional profile assistant", "GenAI / FastAPI · Deployed · 2026", "Created a public streaming assistant grounded in controlled professional documentation. Includes server-side sessions, queueing, rate limits, privacy sanitisation, partial-response handling and an automated regression suite.", y)
y = section("Experience", y - 3)
y = entry("AI and Data Analytics Internship", "AHORA Enterprise · Santiago de Compostela · 2026", "Evolved a RAG solution over real documentation, automated processes, worked with Power BI and researched efficient alternatives for LLM-based solutions. Public detail is intentionally generalised to protect confidentiality.", y)
y = section("Education", y - 1)
y = entry("Degree in Artificial Intelligence", "ESEI · University of Vigo · 2022-2026", "Machine learning, NLP, information retrieval, computer vision, data, distributed systems, software and symbolic AI. Final degree project centred on a hybrid RAG architecture.", y)
y = section("Technical foundation", y - 1)

table_top, table_bottom = y + 4, y - 58
column_width = (RIGHT - LEFT) / 3
canvas.setStrokeColor(LINE)
canvas.rect(LEFT, table_bottom, RIGHT - LEFT, table_top - table_bottom, fill=0, stroke=1)
for index in (1, 2):
    canvas.line(LEFT + column_width * index, table_bottom, LEFT + column_width * index, table_top)
technical = [
    ("AI & retrieval", "Python · OpenAI API · RAG · embeddings · reranking · NLP · scikit-learn · computer vision"),
    ("Engineering", "FastAPI · TypeScript · React · Next.js · Git · testing · API design · Docker"),
    ("Data & delivery", "SQL · data pipelines · evaluation · observability · deployment · product thinking"),
]
for index, (title, body) in enumerate(technical):
    x = LEFT + column_width * index + 7
    canvas.setFont("DuarteSansBold", 8.5)
    canvas.setFillColor(INK)
    canvas.drawString(x, table_top - 15, title)
    paragraph(body, x, table_top - 26, column_width - 14, size=6.5, leading=8.6, color=MUTED)
canvas.showPage()

page_base(2)
y = section("Languages & additional profile", 785)
y = entry("Spanish · English B2 · French DELF B1", "Languages", "Professional communication in Spanish and English, with certified French. Five years of professional music studies complement a long-term practice of discipline, listening and performance.", y)
y = entry("Sport, outdoors and rhythm", "Athletics · Cycling · Surf · Hiking · Music", "Endurance and outdoor disciplines shape a calm, consistent approach to difficult work: train the fundamentals, read the conditions and improve through feedback.", y)
y = section("Further project range", y - 3)

project_rows = [
    ("NLP & retrieval", "Text mining, BPE and Skip-gram, information retrieval and semantic web systems using RDF, SPARQL and Jena."),
    ("Vision & perception", "Computer vision foundations, deep-learning perception, video analysis, depth estimation, 3D scenes and perception for action."),
    ("Search & systems", "Rubik's Cube state search, Connect Four with MiniMax and alpha-beta pruning, reactive systems and multi-agent exploration."),
]
for title, body in project_rows:
    canvas.setStrokeColor(LINE)
    canvas.line(LEFT, y + 6, RIGHT, y + 6)
    canvas.setFont("DuarteSansBold", 9)
    canvas.setFillColor(INK)
    canvas.drawString(LEFT, y - 8, title)
    paragraph(body, LEFT + 128, y + 1, RIGHT - LEFT - 128, size=7.7, leading=10.8)
    y -= 47

y = section("What I bring", y + 3)
qualities = [
    ("01", "Systems thinking", "I connect models, retrieval, interfaces, evaluation and operational constraints into one coherent product."),
    ("02", "Evidence over theatre", "I document decisions, measure behaviour and distinguish verified outcomes from promising experiments."),
    ("03", "Fast, responsible learning", "I move comfortably between research and implementation while protecting privacy, reliability and user trust."),
]
for number, title, body in qualities:
    canvas.setStrokeColor(LINE)
    canvas.line(LEFT, y + 5, RIGHT, y + 5)
    canvas.setFont("DuarteSansBold", 17)
    canvas.setFillColor(INK)
    canvas.drawString(LEFT + 20, y - 14, number)
    paragraph(
        title,
        LEFT + 76,
        y + 4,
        118,
        size=8.7,
        leading=10.5,
        color=INK,
        bold=True,
    )
    paragraph(body, LEFT + 210, y + 4, RIGHT - LEFT - 210, size=7.7, leading=10.8)
    y -= 58

canvas.setFillColor(PANEL)
canvas.rect(LEFT - 6, y - 74, RIGHT - LEFT + 12, 74, fill=1, stroke=0)
paragraph("Open to applied AI, GenAI, RAG and NLP opportunities where technical depth, clear product judgement and dependable delivery matter.", LEFT, y - 14, RIGHT - LEFT, size=12, leading=16, color=INK)
canvas.save()
PUBLIC.write_bytes(OUTPUT.read_bytes())
print(OUTPUT)
