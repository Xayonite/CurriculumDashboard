from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from analytics import analyze_excel
import shutil
import os

app = FastAPI()

@app.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze_excel(temp_path)

    # Clean temp file
    os.remove(temp_path)

    # Don't return image paths, just summary + links
    return JSONResponse(content={
        "well_covered": result["well_covered"],
        "low_coverage": result["low_coverage"],
        "gaps": result["gaps"],
        "ratio_of_focus": result["ratio_of_focus"],
        "bar_chart_url": "/plot/bar",
        "line_chart_url": "/plot/line"
    })


@app.get("/plot/bar")
async def get_bar_chart():
    return FileResponse("static/bar_chart.png", media_type="image/png")


@app.get("/plot/line")
async def get_line_chart():
    return FileResponse("static/line_chart.png", media_type="image/png")


@app.get("/")
def root():
    return {"message": "Upload your Excel file to /analyze/"}
