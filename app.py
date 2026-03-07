# -*- coding: utf-8 -*-
"""
青岛科技大学 YKTKEMIAO 战队网站 - 主应用
运行方式: python app.py 或双击 启动网站.bat
浏览器访问: http://127.0.0.1:5001 或 http://本机IP:5001
"""
from flask import Flask, render_template, request, redirect, url_for, jsonify
import markdown
import os
import re
import uuid
import webbrowser
import threading
import json
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
SECTIONS_PATH = os.path.join(DATA_DIR, "sections.json")


def slug(s):
    """生成 URL 安全的 id：仅保留字母数字、中文、下划线"""
    if not s or not str(s).strip():
        return "id"
    s = re.sub(r"[^\w\u4e00-\u9fff-]", "_", str(s).strip())
    return (s[:40].strip("_") or "id").lower()


def _ensure_unique_id(ids, base):
    out = base
    n = 1
    while out in ids:
        out = base + "_" + str(n)
        n += 1
    return out


def load_sections():
    if os.path.isfile(SECTIONS_PATH):
        try:
            with open(SECTIONS_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    os.makedirs(DATA_DIR, exist_ok=True)
    default_path = os.path.join(os.path.dirname(__file__), "data", "sections.json")
    if os.path.isfile(default_path):
        with open(default_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def save_sections(data):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(SECTIONS_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


SECTIONS = load_sections()
if not SECTIONS:
    SECTIONS = []


def get_section(section_id):
    return next((s for s in SECTIONS if s["id"] == section_id), None)


def get_category(section, category_id):
    if not section or "categories" not in section:
        return None
    return next((c for c in section["categories"] if c["id"] == category_id), None)


def get_subject(category, subject_id):
    if not category:
        return None
    return next((s for s in category["subjects"] if s["id"] == subject_id), None)


def subject_content_path(section_id, category_id, subject_id, ext=".md"):
    return os.path.join(os.path.dirname(__file__), "content", section_id, category_id, subject_id + ext)


def read_subject_raw(section_id, category_id, subject_id):
    path = subject_content_path(section_id, category_id, subject_id)
    if os.path.isfile(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return ""


def write_subject_raw(section_id, category_id, subject_id, text):
    base = os.path.join(os.path.dirname(__file__), "content", section_id, category_id)
    os.makedirs(base, exist_ok=True)
    path = os.path.join(base, subject_id + ".md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def render_subject_content(section_id, category_id, subject_id):
    path = subject_content_path(section_id, category_id, subject_id)
    if not os.path.isfile(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()
    return markdown.markdown(raw, extensions=["extra", "codehilite", "toc"])


# 上传
UPLOAD_IMAGE_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"}
UPLOAD_VIDEO_EXT = {".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"}
UPLOAD_ALLOWED_EXT = UPLOAD_IMAGE_EXT | UPLOAD_VIDEO_EXT | {".pdf", ".doc", ".docx", ".xls", ".xlsx", ".zip", ".rar", ".txt", ".md"}


def _upload_dir(section_id, folder):
    base = os.path.join(os.path.dirname(__file__), "static", "uploads", section_id, folder.replace("..", "").strip("/"))
    return base


@app.route("/upload", methods=["POST"])
def upload_file():
    section_id = request.form.get("section_id", "").strip()
    folder = request.form.get("folder", "").strip() or "misc"
    if not section_id or not get_section(section_id):
        return jsonify({"error": "无效 section_id"}), 400
    if "file" not in request.files:
        return jsonify({"error": "没有文件"}), 400
    f = request.files["file"]
    if not f or f.filename == "":
        return jsonify({"error": "未选择文件"}), 400
    name = secure_filename(f.filename) or "file"
    ext = os.path.splitext(name)[1].lower()
    if ext not in UPLOAD_ALLOWED_EXT:
        return jsonify({"error": "不支持该文件类型"}), 400
    safe_name = f"{uuid.uuid4().hex[:8]}_{name}"
    dest_dir = _upload_dir(section_id, folder)
    os.makedirs(dest_dir, exist_ok=True)
    f.save(os.path.join(dest_dir, safe_name))
    rel = os.path.join("uploads", section_id, folder.replace("..", "").strip("/"), safe_name)
    url = "/static/" + rel.replace("\\", "/")
    if ext in UPLOAD_IMAGE_EXT:
        markdown_snippet = f"![]({url})"
    elif ext in UPLOAD_VIDEO_EXT:
        markdown_snippet = f'<video src="{url}" controls width="100%"></video>'
    else:
        markdown_snippet = f"[{name}]({url})"
    return jsonify({"url": url, "markdown": markdown_snippet, "name": name})


def _render_with_sidebar(template, **kwargs):
    kwargs.setdefault("sections", SECTIONS)
    kwargs.setdefault("static_export", False)
    kwargs.setdefault("show_manage", False)  # 仅管理员登录后设为 True
    if "current_page" not in kwargs:
        kwargs["current_page"] = None
    return render_template(template, **kwargs)


@app.route("/")
def index():
    return _render_with_sidebar("index.html", current_page="index")


@app.route("/section/<section_id>")
def section(section_id):
    section_info = get_section(section_id)
    if not section_info:
        return "页面不存在", 404
    return _render_with_sidebar("section.html", section=section_info, current_page=section_id)


@app.route("/section/<section_id>/<category_id>/<subject_id>")
def subject(section_id, category_id, subject_id):
    section_info = get_section(section_id)
    cat = get_category(section_info, category_id) if section_info else None
    subject_info = get_subject(cat, subject_id) if cat else None
    if not section_info or not cat or not subject_info:
        return "页面不存在", 404
    html = render_subject_content(section_id, category_id, subject_id)
    # 导航高亮：战队成员、退役队员、队史
    if section_id == "gallery" and subject_id == "members":
        nav_page = "members"
    elif section_id == "retired":
        nav_page = "retired"
    elif section_id == "about" and category_id == "history" and subject_id == "team":
        nav_page = "history"
    else:
        nav_page = section_id
    return _render_with_sidebar(
        "subject.html",
        section=section_info,
        category=cat,
        subject=subject_info,
        content=html,
        current_page=nav_page,
    )


@app.route("/section/<section_id>/<category_id>/<subject_id>/edit", methods=["GET", "POST"])
def edit_subject(section_id, category_id, subject_id):
    section_info = get_section(section_id)
    cat = get_category(section_info, category_id) if section_info else None
    subject_info = get_subject(cat, subject_id) if cat else None
    if not section_info or not cat or not subject_info:
        return "页面不存在", 404

    if request.method == "POST":
        text = request.form.get("content", "")
        write_subject_raw(section_id, category_id, subject_id, text)
        return redirect(url_for("subject", section_id=section_id, category_id=category_id, subject_id=subject_id))

    raw = read_subject_raw(section_id, category_id, subject_id)
    upload_folder = f"{category_id}/{subject_id}"
    return _render_with_sidebar(
        "edit_subject.html",
        section=section_info,
        category=cat,
        subject=subject_info,
        content=raw,
        upload_folder=upload_folder,
        current_page=section_id,
    )


@app.route("/manage")
def manage():
    return _render_with_sidebar("manage.html", current_page="manage")


@app.route("/api/sections", methods=["GET"])
def api_list_sections():
    return jsonify(SECTIONS)


@app.route("/api/sections", methods=["POST"])
def api_create_section():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    if not name:
        return jsonify({"error": "名称为必填"}), 400
    bid = (data.get("id") or slug(name)).strip() or slug(name)
    existing = {s["id"] for s in SECTIONS}
    bid = _ensure_unique_id(existing, bid)
    section = {
        "id": bid,
        "name": name,
        "brief": (data.get("brief") or "").strip(),
        "icon": (data.get("icon") or "📁").strip() or "📁",
        "categories": [],
    }
    SECTIONS.append(section)
    save_sections(SECTIONS)
    return jsonify(section)


@app.route("/api/sections/<section_id>", methods=["PATCH", "DELETE"])
def api_section(section_id):
    section = get_section(section_id)
    if not section:
        return jsonify({"error": "板块不存在"}), 404
    if request.method == "DELETE":
        SECTIONS[:] = [s for s in SECTIONS if s["id"] != section_id]
        save_sections(SECTIONS)
        return jsonify({"ok": True})
    data = request.get_json() or {}
    if data.get("name") is not None:
        section["name"] = (data["name"] or "").strip() or section["name"]
    if data.get("brief") is not None:
        section["brief"] = (data.get("brief") or "").strip()
    if data.get("icon") is not None:
        section["icon"] = (data.get("icon") or "").strip() or "📁"
    save_sections(SECTIONS)
    return jsonify(section)


@app.route("/api/sections/<section_id>/categories", methods=["POST"])
def api_create_category(section_id):
    section = get_section(section_id)
    if not section:
        return jsonify({"error": "板块不存在"}), 404
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    if not name:
        return jsonify({"error": "名称为必填"}), 400
    cid = (data.get("id") or slug(name)).strip() or slug(name)
    existing = {c["id"] for c in section.get("categories", [])}
    cid = _ensure_unique_id(existing, cid)
    cat = {"id": cid, "name": name, "subjects": []}
    section.setdefault("categories", []).append(cat)
    save_sections(SECTIONS)
    return jsonify(cat)


@app.route("/api/sections/<section_id>/categories/<category_id>", methods=["PATCH", "DELETE"])
def api_category(section_id, category_id):
    section = get_section(section_id)
    if not section:
        return jsonify({"error": "板块不存在"}), 404
    cats = section.get("categories", [])
    cat = next((c for c in cats if c["id"] == category_id), None)
    if not cat:
        return jsonify({"error": "分类不存在"}), 404
    if request.method == "DELETE":
        section["categories"] = [c for c in cats if c["id"] != category_id]
        save_sections(SECTIONS)
        return jsonify({"ok": True})
    data = request.get_json() or {}
    if data.get("name") is not None:
        cat["name"] = (data["name"] or "").strip() or cat["name"]
    if data.get("id") is not None and data.get("id") != category_id:
        new_id = (data["id"] or "").strip()
        if new_id and new_id not in {c["id"] for c in cats}:
            cat["id"] = new_id
    save_sections(SECTIONS)
    return jsonify(cat)


@app.route("/api/sections/<section_id>/categories/<category_id>/subjects", methods=["POST"])
def api_create_subject(section_id, category_id):
    section = get_section(section_id)
    cat = get_category(section, category_id) if section else None
    if not section or not cat:
        return jsonify({"error": "板块或分类不存在"}), 404
    data = request.get_json() or {}
    name = (data.get("name") or "").strip()
    if not name:
        return jsonify({"error": "名称为必填"}), 400
    sid = (data.get("id") or slug(name)).strip() or slug(name)
    existing = {s["id"] for s in cat.get("subjects", [])}
    sid = _ensure_unique_id(existing, sid)
    subj = {"id": sid, "name": name}
    cat.setdefault("subjects", []).append(subj)
    save_sections(SECTIONS)
    return jsonify(subj)


@app.route("/api/sections/<section_id>/categories/<category_id>/subjects/<subject_id>", methods=["PATCH", "DELETE"])
def api_subject(section_id, category_id, subject_id):
    section = get_section(section_id)
    cat = get_category(section, category_id) if section else None
    subj = get_subject(cat, subject_id) if cat else None
    if not section or not cat or not subj:
        return jsonify({"error": "学科不存在"}), 404
    if request.method == "DELETE":
        cat["subjects"] = [s for s in cat["subjects"] if s["id"] != subject_id]
        save_sections(SECTIONS)
        return jsonify({"ok": True})
    data = request.get_json() or {}
    if data.get("name") is not None:
        subj["name"] = (data["name"] or "").strip() or subj["name"]
    if data.get("id") is not None and data.get("id") != subject_id:
        new_id = (data["id"] or "").strip()
        if new_id and new_id not in {s["id"] for s in cat["subjects"]}:
            subj["id"] = new_id
    save_sections(SECTIONS)
    return jsonify(subj)


_PORT = 5001


def _open_browser():
    import time
    time.sleep(1.5)
    webbrowser.open("http://127.0.0.1:%s" % _PORT)


if __name__ == "__main__":
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        threading.Thread(target=_open_browser, daemon=True).start()
    app.run(host="0.0.0.0", port=_PORT, debug=True)
