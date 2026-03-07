@echo off
chcp 65001 >nul
title 青岛科技大学 YKTKEMIAO 战队网站
cd /d "%~dp0"

echo 当前目录: %CD%
echo.
echo 正在启动战队网站，请稍候...
echo 启动成功后请在浏览器打开: http://127.0.0.1:5001
echo 关闭本窗口或按 Ctrl+C 可停止网站。
echo.

python --version
if errorlevel 1 (
    echo [错误] 未找到 Python，请先安装 Python 并勾选 "Add to PATH"。
    pause
    exit /b 1
)

python app.py
if errorlevel 1 (
    echo.
    echo [错误] 网站启动失败，请把上面红色/白色报错内容截图或复制发给开发者。
)

pause
