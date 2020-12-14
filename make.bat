@echo off
setlocal enabledelayedexpansion
chcp 65001

set filename=data\\contents.json
set count=0

for /F %%i in ('dir /B .\\md\\*.md ^| find /c /v ""') do @set lines=%%i

echo [ > %filename%
for /f "usebackq" %%i in (`dir /B .\\md\\*.md`) do (
    set /a count=count+1

    if !count!==%lines% (
        echo 	"./md/%%i" >> %filename%
    ) else (
        echo 	"./md/%%i", >> %filename%
    )

)

echo ] >> %filename%