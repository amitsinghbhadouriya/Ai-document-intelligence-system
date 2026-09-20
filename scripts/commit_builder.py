"""
Automated Git Atomic Commit Builder
Systematically generates granular, professional, and conventional git commits
across project modules to establish rich repository history.
"""

import subprocess
import sys
import os

COMMIT_MESSAGES = [
    # Initial repository and architecture
    ("chore(init): initialize git repository configuration", [".gitignore"]),
    ("docs: add initial project README with problem statement and tech stack", ["README.md"]),
    ("chore(env): add root environment variables template .env.example", [".env.example"]),
    ("chore(docker): add multi-container docker-compose specification", ["docker-compose.yml"]),
    
    # Docs
    ("docs(arch): document high-level system architecture and data flows", ["docs/architecture.md"]),
    ("docs(api): document REST API endpoints and payload specifications", ["docs/api.md"]),
    ("docs(db): document relational schema, entity relationships, and pgvector types", ["docs/database.md"]),
    ("docs(rag): document grounded RAG pipeline and citation protocols", ["docs/rag-pipeline.md"]),
    ("docs(testing): document automated testing strategy and QA levels", ["docs/testing.md"]),

    # Backend Core & Config
    ("chore(backend): create backend project directory hierarchy", ["backend/app/__init__.py"]),
    ("chore(backend): add backend requirements.txt specification", ["backend/requirements.txt"]),
    ("chore(backend): add backend environment configuration template", ["backend/.env.example"]),
    ("feat(config): implement Pydantic Settings configuration module", ["backend/app/config.py"]),
    ("feat(logging): implement structured application logging module", ["backend/app/core/logging.py", "backend/app/core/__init__.py"]),
    ("feat(db): implement declarative base for SQLAlchemy models", ["backend/app/db/base.py", "backend/app/db/__init__.py"]),
    ("feat(db): implement database session manager with SQLite and Postgres support", ["backend/app/db/database.py"]),

    # Backend Models
    ("feat(models): implement User SQLAlchemy relational model", ["backend/app/models/user.py", "backend/app/models/__init__.py"]),
    ("feat(models): implement Document and DocumentPage models", ["backend/app/models/document.py"]),
    ("feat(models): implement DocumentChunk model with embedding storage", ["backend/app/models/chunk.py"]),
    ("feat(models): implement Conversation model for chat sessions", ["backend/app/models/conversation.py"]),
    ("feat(models): implement Message and MessageCitation models", ["backend/app/models/message.py"]),

    # Backend API & Entrypoint
    ("feat(api): implement system diagnostics and health check endpoint", ["backend/app/api/health.py", "backend/app/api/__init__.py"]),
    ("feat(core): implement FastAPI application entrypoint with CORS and lifespan", ["backend/app/main.py"]),
    ("feat(docker): add Dockerfile for backend containerization", ["backend/Dockerfile"]),

    # Backend Tests
    ("test(health): implement automated pytest suite for health endpoint", ["backend/tests/test_health.py", "backend/tests/__init__.py"]),
    ("chore(backend): initialize schemas, services, and utils packages", [
        "backend/app/schemas/__init__.py",
        "backend/app/services/__init__.py",
        "backend/app/utils/__init__.py",
    ]),

    # Frontend Core & Build Config
    ("chore(frontend): add package.json with React, Vite, and Bootstrap dependencies", ["frontend/package.json"]),
    ("chore(frontend): configure Vite build server with backend API proxy", ["frontend/vite.config.js"]),
    ("feat(frontend): create HTML entrypoint with Plus Jakarta Sans typography", ["frontend/index.html"]),
    ("style(frontend): implement modern SaaS design tokens and custom CSS styling", ["frontend/src/styles/custom.css"]),
    ("feat(frontend): implement centralized Axios API client with token interceptors", ["frontend/src/services/api.js"]),
    ("feat(frontend): create glassmorphic Navbar with live health status", ["frontend/src/components/layout/Navbar.jsx"]),
    ("feat(frontend): create application Footer with project credits", ["frontend/src/components/layout/Footer.jsx"]),

    # Frontend Pages
    ("feat(frontend): implement modern landing HomePage with interactive diagnostics", ["frontend/src/pages/HomePage.jsx"]),
    ("feat(frontend): create DashboardPage placeholder for Phase 9", ["frontend/src/pages/DashboardPage.jsx"]),
    ("feat(frontend): create DocumentsPage placeholder for Phase 3", ["frontend/src/pages/DocumentsPage.jsx"]),
    ("feat(frontend): create SearchPage placeholder for Phase 6", ["frontend/src/pages/SearchPage.jsx"]),
    ("feat(frontend): create ChatPage placeholder for Phase 7", ["frontend/src/pages/ChatPage.jsx"]),
    ("feat(frontend): create ComparePage placeholder for Phase 8", ["frontend/src/pages/ComparePage.jsx"]),
    ("feat(frontend): create EvaluationPage placeholder for Phase 10", ["frontend/src/pages/EvaluationPage.jsx"]),
    ("feat(frontend): create LoginPage authentication component", ["frontend/src/pages/LoginPage.jsx"]),
    ("feat(frontend): create RegisterPage account creation component", ["frontend/src/pages/RegisterPage.jsx"]),
    ("feat(frontend): implement root App router and route definitions", ["frontend/src/App.jsx"]),
    ("feat(frontend): implement React DOM rendering entrypoint", ["frontend/src/main.jsx"]),
    ("chore(frontend): add Dockerfile and nginx configuration for frontend", ["frontend/Dockerfile", "frontend/nginx.conf"]),
    ("chore(data): initialize data and uploads tracking placeholders", ["data/.gitkeep", "uploads/.gitkeep"]),
]


def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, text=True, capture_output=True)
    return result.returncode, result.stdout.strip(), result.stderr.strip()


def main():
    print("Beginning atomic commits for Phase 1...")
    committed_count = 0

    for msg, files in COMMIT_MESSAGES:
        valid_files = [f for f in files if os.path.exists(f)]
        if not valid_files:
            continue
        
        # Stage files
        for f in valid_files:
            run_cmd(f'git add "{f}"')
        
        # Commit
        code, out, err = run_cmd(f'git commit -m "{msg}"')
        if code == 0:
            committed_count += 1
            print(f"[{committed_count}] Committed: {msg}")
        else:
            if "nothing to commit" in out or "nothing to commit" in err:
                pass
            else:
                print(f"Notice: {out} {err}")

    # Stage any remaining files
    run_cmd("git add .")
    code, out, _ = run_cmd('git commit -m "feat(phase-1): complete foundational architecture and client-server communication"')
    if code == 0:
        committed_count += 1
        print(f"[{committed_count}] Final Phase 1 commit complete.")

    print(f"\nDone! Successfully created {committed_count} initial modular commits.")


if __name__ == "__main__":
    main()
