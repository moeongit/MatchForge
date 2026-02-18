@echo off
where docker >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Docker is required to run mvnw.cmd in this repository.
  exit /b 1
)

docker run --rm ^
  -v "%cd%:/workspace" ^
  -w /workspace ^
  maven:3.9.9-eclipse-temurin-21 ^
  mvn %*
