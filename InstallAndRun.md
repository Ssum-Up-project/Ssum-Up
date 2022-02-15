* 우분투 OS 기준 (윈도우10 상의 WSL에 Ubuntu 20.04 설치하여 실행. WSL상의 우분투는 설치 후 아래 진행)

```
*파이썬 가상환결 생성: python -m venv venvAi
*가상환경 실행/진입: source ./venvAi/bin/activate
(각자 사용하는 IDE(VSCode, PyCharm)에 맞게 가상환경 지정)

*장고 설치:(가상환경 진입한 상태에서) pip3 install django
*pip 최신 버전 업그레이드: python -m pip install --upgrade pip

*소스코드 다운로드(저장소 클론): git clone https://kdt-gitlab.elice.io/ai_track/class_03/ai_project/team4/project-template.git

*프로젝트 폴더명 변경(선택) : mv project-template AiPrj(원하는 이름으로)
* cd  AiPrj
* 서버 구동: python manage.py runserver
* 초기 db 생성: python manage.py (db.sqlite3 파일 생성 - 장고 기본 초기 DB)

* 초기 관리자 생성: python manage.py createsuperuser
 - id / pw : admin / 1q..


```