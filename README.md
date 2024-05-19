# QAGPT
Nhóm 6:

Thành viên:
1. Hà Như Ý - 22022636
2. Nguyễn Mạnh Cường - 22022516
3. Đoàn Nhật Bình - 22022543

Link báo cáo, video demo: https://drive.google.com/drive/folders/1ziOA_4f7i7DeET9gP46tL1EAwqmVHYAH?usp=sharing

<img src='MainPage3.png' width='600px'/>

## Overview
"QaGPT" is an innovative tool designed to streamline the process of generating questions and answers for educational content. By leveraging information about courses, lessons, and learning objectives, QaGPT automates the creation of comprehensive question sets that align closely with the material being taught.

## Features
- Automatic Question Generation: QAGPT automatically generates a variety of questions based on inputted course, lesson, and learning objectives.
- Aligned with Learning Objectives: Questions are designed to closely align with the learning objectives of the course or lesson, ensuring relevance and effectiveness.
- Accessible Interface: With an intuitive user interface, QaGPT is easy to navigate and use, making it accessible to educators with varying levels of technical expertise.

## Running it locally
After cloning this repo, you can run it locally by following these steps:

1. Install [Wasp](https://wasp-lang.dev) by running `curl -sSL https://get.wasp-lang.dev/installer.sh | sh` in your terminal.
2. Create a `.env.server` file in the root of the project
3. Copy the `env.server.example` file contents to `.env.server` and fill in your API keys
4. Make sure you have a Database connected and running. Here are two quick options:
  - run `wasp start db` from the project root. You need to have Docker installed (if not, on MacOS run `brew install docker-machine docker` and start the Docker app). This will start a Postgres database and configure it for you. No need to do anything else!
  - or provision a Postgres database on [Railway](https://railway.app), go to settings and copy the connection url. Paste it as DATABASE_URL=<your-postgres-connection-url> into your env.server file.
5. Run `wasp db migrate-dev`
6. Run `wasp start`
7. Go to `localhost:3000` in your browser (your NodeJS server will be running on port `3001`)
8. install the [Wasp extension for VSCode](https://marketplace.visualstudio.com/items?itemName=wasp-lang.wasp) for the best DX
