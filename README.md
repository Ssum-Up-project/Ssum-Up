<h1 align="center">
  <img width="500" src="doc/logo_red.png">
</h1>

<h3 align="center">앨리스 AI 트랙 - 자연어 처리 4팀 Natural fish: SSumUP</h3>

<p align="center">
  📰
  <a href="##서비스 소개">서비스 소개</a> • 
  <a href="##팀원">팀원</a> • 
  <a href="##기술 스택">기술 스택</a> •
  <a href="##프로젝트 구성도">프로젝트 구성도</a> 
</p>
</br>

## 💁서비스 소개
**💡 영어라서, 혹은 원하는 정보가 한눈에 보이지 않아서 불편했던 유튜브, 좀 더 쉽고 편하게 원하는 정보에 접근할 순 없을까?**
<br />
<details>
  <summary>기능 소개</summary>
  <div markdown="1">
    
**Wall Street Journal**의 경제 정보부터 **The Verge**를 통해 보는 최신 테크뉴스까지, 
    
영어로 된 좋은 채널이 잔뜩 있다는 말에 영어공부도 할 겸 구독은 눌러놨지만, 정작 영어 자막 만으로는 끝까지 집중해서 보기 너무 힘들지 않나요? 
    
15분이나 되는 영상을 끝까지 봤지만, 정작 알고 싶었던 내용은 영상에 포함되어 있지 않아서 시간이 아까웠던 적이 있나요?  
    
분명 뭔가 알고 싶은게 있어서 영상을 보기 시작했는데, 집중력을 잃고 딴짓으로 새버려서 시간을 한참이나 낭비했던 경험, 있나요?
    
**유튜브를 더 효율적으로 이용하실수 있게, 영어로 된 영상의 자막에서 핵심만 간추린 요약문을 보여드릴게요.**
    
  </div>
</details>
<details>
  <summary>타겟유저 (페르소나)</summary>
  <div markdown="1">
<img width="200" src="doc/Untitled.png">
    
**☝IT기업에서 일하는 개발자 김토끼씨**
    
- 항상 새로운 트렌드와 뉴스를 업데이트하려고 노력한다
- 트렌드에 민감한 직군에 종사하는 사람답게 이런저런 새로운 IT기기, 시사, 경제 이슈 등에 관심이 많아 유튜브로 여러가지 키워드를 검색해보는 취미가 있다
- 한국어로 된 영상과 달리 영어만 제공되는 영상을 볼때면 집중력이 흐트러져, 자꾸 다른 흥미거리를 클릭하다보면 어느새 사라져버린 시간에 가슴을 치곤 한다
- 정보를 찾기위해 검색했을 때 빨리 스키밍할 수 있는 글이 아니라 10분씩 공들여서 봐야하는 유튜브만 나올 때, 그 비효율이 싫어서 누군가 세줄로 요약해줬으면 좋겠다고 자주 생각한다
- 그에게 유튜브 자막은 때론 귀중한 영어공부 소스! 그런데 어떤 영상들은 자막에 마침표 등의 온점 처리가 전혀 되어있지 않아 공부할 때 활용하기 아쉽다
  
  </div>
</details>

<details>
  <summary>기능 정의 </summary>
  <div markdown="1">
    
### 핵심 기능
1. 한글 자막이 없는 유튜브 영어 영상의 링크를 입력하면 해당 영상의 자막을 자연어 처리를 활용, 핵심만 요약해 간략하게 제공
2. 요약된 자막의 한국어 번역을 제공
3. 해당 영상의 원본 영어 자막을 제공
    - 자동생성자막만 제공되는 경우, 단순히 긁어온 자막 원문을 제공하는 것이 아니라 자연어 처리 모델을 이용해 punctuation restoration으로 개선된 퀄리티의 자막으로 제공
    
### 부가 기능
1. 추후 다시 보고싶은 영상과 자막을 mylist에 저장, 복수의 재생목록을 만들어 구분해서 저장해둘 수 있음 (회원가입과 로그인 필수)
2. 최근 검색해본 영상 목록(history)을 볼 수 있음 (회원가입과 로그인 필요)
  
  </div>
</details>
<br />


## 👥팀원
|  이름  |   역할    |                                                                                        개발 내용                                                                                        |
| :----: | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 이상지|  팀장/프론트엔드  |와이어프레임 작성<br />UI/UX 디자인 및 레이아웃<br />네비게이션, 푸터 구현<br /> 인트로, 홈, 메인 팀페이지 구현 <br />반응형 웹페이지 구현<br />프론트엔드 배포|
| 박나은 | Front-end|로그인 권한 제어 기능 구현<br />My Summary 페이지 구현<br />main 페이지 save 버튼 기능(카테고리 선택) 구현<br />로그인, 회원가입 기능 구현<br />리엑트 플레이어 임베딩 및 활용<br />main 페이지 초반 작업  |
| 김승수 |   Back-end/Front-end  |데이터베이스 설계 및 관리<br />자막을 가져오고 이후 요약자막과 번역자막을 생성하여 db에 저장하는 api 개발<br />사용자들의 검색기록, 저장하고 싶은 영상을 담을 수 있도록 api 개발<br />파트간 협업을 위해 swagger api 문서 작성<br />프론트엔드에서 백엔드와 통신 연결 구현 및 디버깅
| 박진화 |   Back-end     | 프로젝트 초기 세팅(깃랩, 장고, 설치 실행 가이드 문서 작성 등)<br />swagger(API Doc&Test) 적용<br />회원가입, 로그인, 로그아웃 api 개발 <br />주요기능(요약ai) 탑재를 위한 장고 백엔드 서버 구현<br />mylist api 개발<br /> DBMS 변경(sqlite3 ⇒ mariaDB) 및 테스트<br />배포를 위한 VM 설정 및 배포|
| 유가연 |   AI     | 서비스 기획 요구 사항에 맞는 문서 요약 모델 리서치<br />모델 테스트를 위한 깃 브랜치 생성 및 모델 업로드<br />문서 요약 모델 성능 평가 지표 정리<br />모델 별 성능 평가를 위한 테스트 및 아웃풋 정리|
| 이슬아 |   AI/기획     | 기획, 발표, 프로젝트 진행 전반의 leading role<br />기능 명세서, 플로우차트, 와이어프레임 등의 기획 문서 작성, 기술설명서 작성<br />스크럼 진행 및 전체 개발일정 관리<br />최종 요약 모델 선정을 위한 복수의 NLP 모델 테스트<br />성능 개선을 위한 데이터 전처리 process 구현<br />rpunct 도입을 통한 AI 성능 향상|
<br />

## ⚒️기술 스택

### Front-end   
 `React`  `MUI (Material-UI)` , `React-Slick`, `React-Player` , `JavaScript` , `HTML5` , `CSS`

### Back-end
`Python` , `django` , `django REST framework`,`Flask` ,`MariaDB` ,`Docker/Docker-Compose` , `Gunicorn`, `MS Azure VM`,`Gitlab CI`

### AI
`Python` , `Anaconda` , `Jupyter Notebook` , `Google Colab` , `TensorFlow` , `Pytorch` , `Numpy` , `Pandas` , `huggingface/transformers` 

### 버전 관리
- Source Code Management: `GitLab`
- Communication tool : `Discord`
- Project Archiving : `Notion`

</br>


## 📂프로젝트 구성도

### 유저 플로우차트(User Flowchart)
<img width="700" src="doc/Untitled 1.png">

### <a href="https://www.figma.com/file/HnOy4eAziwhjipKYeNNtiF/SSumUP_wireframe?node-id=0%3A1">와이어프레임(Wireframe)</a>
![image](https://user-images.githubusercontent.com/57740138/159652726-7caf5856-8f00-4f8b-96c8-89d78ae9b678.png)

### 아키텍처(Architecture)
<img width="700" src="doc/Untitled 3.png">

### ERD 
<img width="700" src="doc/Untitled 4.png">



