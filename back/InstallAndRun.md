* 우분투 OS 기준 (윈도우10 상의 WSL에 Ubuntu 20.04 설치하여 실행. WSL상의 우분투는 설치 후 아래 진행)

```
*소스코드 다운로드(저장소 클론): git clone https://kdt-gitlab.elice.io/ai_track/class_03/ai_project/team4/project-template.git

*프로젝트 폴더명 변경(선택) : mv project-template AiPrj(원하는 이름으로)
* 프로젝트 폴더로 이동: cd  AiPrj
* 원하는 브랜치로 변경(보통 develop로 하시면됨): git checkout develop
  - 뭔가 안될땐 브랜치를 바꾸고 해야 하는 경우 있음

*파이썬 가상환경 생성: python -m venv venvAi  (프로젝트 루트나 루트 상위폴더 등 원하는 곳에 생성)
*가상환경 실행/진입: source ./venvAi/bin/activate
(각자 사용하는 IDE(VSCode, PyCharm)에 맞게 가상환경 지정)

*pip 최신 버전 업그레이드: python -m pip install --upgrade pipgit

*필요 파이썬 패키지(장고 등) 설치:
  - cd back
  - pip3 install -r requirements.txt (가상환경 진입한 상태에서 해야 함.)


* 서버 구동 확인: 
  cd back
  python manage.py runserver
* http://localhost:8000 로 접속 확인 후 서버 종료 : Ctrl + C

* model 수정시 관련:
  python manage.py makemigrations
  python manage.py migrate --run-syncdb
  python manage.py createsuperuser
  
* 초기 db 생성: python manage.py (db.sqlite3 파일 생성 - 장고 기본 초기 DB)
* 초기 관리자 생성: python manage.py createsuperuser
 - id / pw : admin / 1q..

* python manage.py runserver 명령으로 서버 구동후 localhost:8000/admin 으로 접속하여 Django admin 페이지에서 User, Product에 +(더하기버튼)눌러 아무 적당한 값들을 입력하여 데이터들 디비에 입력.

* 서버에서 전달하는 데이터 확인 방법: 웹 브라우저나 포스트맨에서 아래 api 주소로 확인하면됨.
 localhost:8000/api/product/ 또는 localhost:8000/api/user 에 접속하여 추가한 데이터들이 JSON 형식으로 잘 리턴되는지 확인

* 혹시 안된다면 아래 DB 모델 관련 마이그레이션 명령어들 실행 후 python manage.py runserver 명령으로 서버 구동해 볼 것.
* DB/모델 추가/변경시 새 마이그레션을 생성:
  python manage.py makemigrations
  python manage.py migrate


```