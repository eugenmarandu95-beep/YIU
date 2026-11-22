# MAI BRAIN — Tools and environment
## Essential first stack
| Purpose | Proposed tools | Selection rule |
|---|---|---|
| Language/runtime | Python 3.11+, venv or uv | Reproducible isolated environment |
| Version control | Git, private remote optional | No data/secrets in public history |
| Terminal UI | Typer + Rich | Typed commands, explicit progress/errors |
| Model inference | Ollama OR llama.cpp | Choose one local runtime first |
| Neural training | PyTorch | Only when needed for adapters/predictors |
| Model access/training | transformers, tokenizers, safetensors; optional PEFT | License-checked pinned model revision |
| Knowledge search | SQLite FTS5 + sentence-transformers + FAISS | Simple local hybrid baseline |
| Structured memory/tasks | Python sqlite3 | Transactions, migrations, backups |
| Validation | Pydantic | Reject malformed tool arguments |
| Numerical work | NumPy, SciPy, pandas, scikit-learn | Reproducible metrics and baselines |
| Tests | pytest | Unit, integration, security and regression |
| Configuration | TOML/JSON via standard library | Secrets separate from configuration |
| Logs | logging + structured JSON | Redact personal data and credentials |

## Document support
pypdf for text PDF; python-docx for Word; openpyxl for spreadsheets; python-pptx for slides; standard JSON for notebooks. Optional PyMuPDF/pdfplumber for layout extraction if licensed/compatible, OCRmyPDF + Tesseract for scanned PDFs. Each extractor must preserve source references and report unsupported/corrupt files. Do not silently skip tables/images/formulas.

## Optional, add only for a tested requirement
FastAPI + uvicorn for an API; Streamlit for a demo; Qdrant instead of FAISS when persistent filtered vector search is needed; MLflow for experiment tracking; Docker/Podman for deployment; faster-whisper for speech; browser automation only in an isolated profile with an allowlist. Hosted embedding/LLM/telemetry services are off by default. Sandboxing needs resource and network isolation, not merely a different working directory.

## Hardware discovery before model selection
Collect OS, CPU, RAM, GPU model/VRAM, free disk and connectivity. A historical Colab T4 is not evidence of the owner's current local hardware. Use nvidia-smi if NVIDIA tools are installed. Model weights approximately require parameter_count * bits_per_weight / 8 bytes before runtime overhead, KV cache, context, batch size and concurrency. CPU/RAM offload may reduce speed. Benchmark real memory peaks and tokens/sec; do not guarantee a model fits based on parameter count alone.

## Setup sketch — commands to run later, not executed here
```bash
python -m venv .venv
# Linux/macOS:
source .venv/bin/activate
# Windows PowerShell alternative: .venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install typer rich pydantic numpy scipy pandas scikit-learn pytest
python -m pip install sentence-transformers faiss-cpu pypdf python-docx openpyxl python-pptx
```
Install PyTorch using its official selector for the actual OS/accelerator. Install one inference runtime from its official documentation. GPU FAISS, CUDA and quantized model backends require platform-specific compatibility checks. The above packages are a starting environment, not a tested end-to-end MAI application. No model auto-download is authorized by this package.

## Reproducibility and ownership checklist
After a successful smoke test, lock exact dependency versions; record Python/OS/GPU/backend/model hash, model license and tokenizer revision. Run dependency/security scans, inspect optional telemetry, keep a software bill of materials and license notices, and confirm commercial rights for each exact model/dataset. Do not assume 'open-weight' means unrestricted ownership.

## Operational tooling
Use OS keychain or a secret manager; encrypted disk/backups for private data; least-privilege file access; git tags and offline recovery copies. Back up source files and SQLite with consistent transactions. Test restore before relying on the system. No permanent internet requirement after permitted model downloads and local indexing, but weather/search/news tools need connectivity and freshness indicators.

## Proposed CLI — specification, not working commands
mai doctor; mai ingest PATH --dry-run; mai index; mai ask QUESTION --sources; mai task list; mai task next; mai review-claims; mai simulate NAME; mai evaluate; mai checkpoint; mai restore.

## Public technical references
https://pytorch.org/get-started/locally/
https://huggingface.co/docs/transformers/
https://huggingface.co/docs/peft/
https://docs.ollama.com/
https://github.com/ggml-org/llama.cpp
https://www.sbert.net/
https://github.com/facebookresearch/faiss
https://docs.python.org/3/library/sqlite3.html
https://docs.pydantic.dev/
https://docs.pytest.org/
https://www.nist.gov/itl/ai-risk-management-framework
Check current compatibility and licenses at build time; these references are not a dependency lockfile.
