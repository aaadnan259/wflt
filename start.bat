@echo off
cd /d "c:\Users\aaadn\Downloads\Projects\wflt"
echo Starting local server at http://localhost:8000
python -m http.server 8000
pause
