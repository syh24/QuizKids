# 2023-2 서강대학교 커넥티드플랫폼이론과실제(CSE4103)<br/>4조 Project

# QuizKids
<img src="https://github.com/syh24/CSE4103/assets/48401272/7222a71d-77ee-46fc-bb44-d176627fee7b" width="600">

> QuizKids Logotype
> * Q의 모양과 말풍선(comment) 모양으로 지식 전달 목적임을 상기  
> * 안쪽은 영상 화면을 상징함과 동시에 오른쪽으로 나아가는 화살표를 통해 발전가능성을 의미  
> * 테마 색상은 횡단보도 옐로존, 스쿨존 등 영유아를 상징하는 색으로 구성하여 어플리케이션의 방향성 상징  
> `ⓒ SangWon Kang, 2023`
# 개발 개요

```
💡 Enact를 활용한 WebOS 기반의 어린이 교육 미디어플레이어
```

최근 미디어 매체, 스마트 기기의 발전으로 영유아 시기부터 무분별한 시청각 자료에 노출되는 문제가 발생한다. 이에 발달 과정에서 주의 집중력 지속 시간 감퇴나 부적절한 정보 습득이 우려되는 바이다. 

QuizKids 앱은 일반적인 미디어플레이어와 달리 영상 중간중간 화면에 나오는 오브젝트와 관련된 Quiz가 팝업되며 이를 반복적으로 풀이하고, 학습할 수 있는 수단을 제공한다. 

# 개발 계획

- 1주차: 개발환경 세팅 및 설계
- 2~3주차: 핵심 기능 개발
- 4주차: 디버깅 및 테스트 코드 작성
- 5주차: 개발 문서 작성 및 추가 기능 구현

# 기술 스택

- F/E: Enact
- B/E: Node.js, Express
- DB: MySQL
- Documentation: Swagger, Notion
- UI/UX: Figma
- Version Control: Github

# 역할 배분

| 성명 | 역할 |
| --- | --- |
| 강상원</br>[@kevink1113](https://github.com/kevink1113)| Frontend 전반 구현: 로그인/회원가입, 홈, 퀴즈 출제/풀이 화면 및 검색 기능 구현, BE와의 async 통신, 서비스 기획 |
| 고동헌</br>[@Mengoe](https://github.com/mengoe)| 실시간 시스템 자원현황 시각화, 사용자 식별 기능(프로필, 사용자 정보), 서비스 기획 |
| 서윤혁</br>[@syh24](https://github.com/syh24)| DB 전반 설계(사용자, 비디오, 퀴즈, 기록: Router, Model, etc.), API 문서 작성(Swagger), 서비스 기획 |
| 정재훈</br>[@wandosan](https://github.com/wandosan)| DB 설계, API 문서 작성 및 user input(회원가입, 로그인, etc.) 예외처리 및 서비스 기획, 컬러셋 선정 |

# 개발 내용

일반적인 학습사이트와는 달리 사용자는 Quiz를 풀이하는 학습자임과 동시에, Quiz를 제작하는 출제자가 될 수 있도록 하여  interactive한 플랫폼을 구축하고자 한다. 

<img src="https://github.com/syh24/CSE4103/assets/48401272/87c72a1d-5e1b-46c6-a691-12992d7c202a" width="700">

QuizKids 어플리케이션의 전반적인 흐름도는 위와 같다.  
이에 더해 프로젝트 필수 구현 사항인 미디어 이어보기 기능, 실시간 시스템 자원현황 시각화(CPU, Memory)를 구현하였다. 

## 로그인 / 회원가입

QuizKids 어플리케이션을 실행하면 로그인 또는 회원가입을 진행한다. 

<img src="https://github.com/syh24/CSE4103/assets/48401272/0740bd57-1fb0-4c43-9da1-5516ebc2d692" width="500">

<img src="https://github.com/syh24/CSE4103/assets/48401272/d0d49d32-cad3-4b7a-8763-9bef461ff36a" width="500">


## 홈

<img src="https://github.com/syh24/CSE4103/assets/48401272/4c42d5a7-cb83-4144-aa32-daa4e3181031" width="600">

- 동영상 썸네일과 제목들이 그리드 형태로 나열되어 있다.
- 좌측에 다른 화면으로 넘어갈 수 있는 ‘탭 사이드바’가 존재하며, 이를 통해 프로필, 검색, 기록, 설정, 시스템 사용량 화면으로 전환할 수 있다. 

- 각 행에 최신 영상, 조회수 많은 영상, 로그인한 해당 사용자가 자주 보는 계정의 영상을 리스트업한다. 

- 리모컨을 이용해 focus하면 각 썸네일이 영상 미리보기로 전환된다.
- 원하는 영상을 선택하면 차후 설명할 영상 재생: 퀴즈 풀이/출제 화면으로 진행된다. 

## 영상 재생: 퀴즈 풀이/출제

## 퀴즈 풀이

사용자가 영상을 보는 중 랜덤한 위치에서 화면에 있는 오브젝트와 관련된 문제가 출제된다.  
문제 셋은 영상 진입 시 다른 사용자들이 작성한 퀴즈 풀 중에 임의로 선택된다. 

<img src="https://github.com/syh24/CSE4103/assets/48401272/7852d4a0-8bd2-44fb-a8d1-feceb7f4c6d6" width="500">

<img src="https://github.com/syh24/CSE4103/assets/48401272/17e64bcb-394c-4d6e-88e0-796a9f2067bf" width="500">


## 퀴즈 출제

동시에 영상 재생 중 일시정지를 하여 나오는 퀴즈 출제 버튼을 눌러 퀴즈 출제를 할 수 있다. 

Quiz출제를 위해 사용자는 다음 4가지의 필수 행동을 취해야 한다. 

- Quiz 종류 선택
- 문제 입력
- 선택지 입력(최대 4개)
- 선택지 중 정답을 선택

각각의 행동은 아래와 같이 팝업뷰 내 서로 다른 단계별 페이지에서 실행하게 된다.

<img src="https://github.com/syh24/CSE4103/assets/48401272/8448283c-a71c-484a-bb6d-5675fc79e72c" width="400">
<img src="https://github.com/syh24/CSE4103/assets/48401272/8bbd711d-a8a1-442e-a193-5d2da76123a1" width="400">
<img src="https://github.com/syh24/CSE4103/assets/48401272/196261c5-8585-4f16-bbe0-8d5449ede06c" width="400">
<img src="https://github.com/syh24/CSE4103/assets/48401272/a8cc61c9-92aa-4f73-a6cc-5f31955cf9b6" width="400">

### 비속어 및 부적절한 입력 방지
사용자 참여형 플랫폼의 특성상 부적절한 문제가 등록될 수 있다. 이를 방지하기 위하여 비속어 및 금칙어 필터링 기능을 적용해 하단과 같이 부적절한 단어를 감지하며, 문제 등록 전 경고 메시지로 본인의 Quiz를 점검할 수 있도록 한다. 

<img src="https://github.com/syh24/CSE4103/assets/48401272/63dcd1e5-63a1-4116-8de6-93139fa1f2f7" width="400">
<img src="https://github.com/syh24/CSE4103/assets/48401272/c0d767b9-b5e7-4a73-9abe-da37ee02a574" width="400">

## 검색

- 검색어 미입력 시 추천 영상 리스트업
- 입력 시 자동완성(추천 검색어) 선택 옵션

<img src="https://github.com/syh24/CSE4103/assets/48401272/26ef4c9a-1f09-4258-acbc-45a8202b458a" width="500">
<img src="https://github.com/syh24/CSE4103/assets/48401272/428e3981-5d7e-4569-94e7-3924598eaf69" width="500">


## 프로필

회원가입 시 입력한 프로필 아이콘, 닉네임, 성별, 나이 변경 및 로그아웃 기능

<img src="https://github.com/syh24/CSE4103/assets/48401272/9f95fbc7-2779-49b0-a422-cf2bd11dde30" width="600">


## 기록

내가 본 동영상, 내 퀴즈 동영상을 리스트업하여 검토할 수 있다. 

<img src="https://github.com/syh24/CSE4103/assets/48401272/c73e4443-b4da-42b6-bb88-0182dc2d02d3" width="600">


## 리소스 사용량

실시간 시스템 자원현황 시각화(CPU, Memory)를 구현하였다. 

<img src="https://github.com/syh24/CSE4103/assets/48401272/6b1e5099-d033-4a56-8270-b186f9109189" width="600">

## 백엔드-프론트엔드 **간 상호작용**

백엔드와 프론트엔드간 간 상호작용하는 부분은 다음과 같다.

1. 회원가입 / 프로필 수정 / 로그인 / 로그아웃
2. 최신 영상 / 조회수 많은 영상 / 자주 보는 영상 조회
3. 검색
4. 사용자 기록 조회
5. 퀴즈 조회 / 퀴즈 생성 / 퀴즈 정답 체크

각 기능을 구현한 컴포넌트들에서 DB 조회가 필요한 이벤트가 발생할 때마다 async/await를 이용한 비동기방식으로 데이터들을 fetch하였다. fetch 시의 api는 백엔드 단에서 정의 해놓은 양식대로 호출하였고, api들은 모두 스웨거 문서에 정의돼있다. 다음 사진은 api router들이다.

<img src="https://github.com/kevink1113/static_CSE4103/blob/main/img/swagger_capture.png?raw=true" width="600">

api 호출을 실패한 경우나, 프론트엔드에서 특정 예외 케이스를 검증한 경우에는 에러 메시지를 출력하여 사용자가 올바른 동작을 수행할 수 있도록 하였다. 다음은 몇 가지 테스트 케이스들 목록이다. 

| Test Step      | Expected Result | Result Image Link |
| --- | --- | --- | 
| 아이디 입력 시 길이 제한을 만족하지 못한 경우 | 에러 메시지 “닉네임이 너무 짧습니다” 가 출력된다. | [아이디 길이 테스트케이스](https://github.com/kevink1113/static_CSE4103/blob/main/img/testcase/length_check.png?raw=true) |
| 퀴즈 선지에 비속어를 입력했을 경우 | “부적합” 에러 메시지가 출력된다. | [비속어 테스트케이스](https://github.com/kevink1113/static_CSE4103/blob/main/img/testcase/badword_check.png?raw=true) |
| 중복된 닉네임을 입력하였을 경우 | 에러 메시지 “이미 사용중인 닉네임입니다.” 가 출력된다. | [중복 테스트케이스](https://github.com/kevink1113/static_CSE4103/blob/main/img/testcase/dupl_check.png?raw=true) |
| 닉네임에 특정 특수 문자를 포함한 경우 | 에러 메시지 “/ , & , * 는 사용할 수 없습니다.” 가 출력된다. | [특수문자 테스트케이스](https://github.com/kevink1113/static_CSE4103/blob/main/img/testcase/specialChar_check.png?raw=true) |


## 프론트엔드 각 컴포넌트의 역할

 프론트엔드 구현 시 각 컴포넌트 별 하나의 기능만 수행하도록 최대한 모듈화하여 구현하였다. 다음은 각 컴포넌트에 대한 설명이다.

**1.** **App**
- 로그인 전에는 FullScreenLogin 컴포넌트를 렌더링하고, 로그인 완료 시 Panel 컴포넌트를 렌더링한다.

**2.** **FullScreenLogin**
- 로그인 폼과 회원가입 폼을 렌더링한다.

**3.** **Main**
- Enact 의 TabLayout 컴포넌트를 통해 홈, 프로필, 사용자 기록등을 탭에 띄워주고 사용자가 원하는 탭을 선택할 수 있도록 한다.

**4.** **Profile, ProfileSelection**
- 프로필 이미지, 닉네임, 나이와 성별을 수정할 수 있는 화면을 렌더링한다.

**5.** **Home**
- 최신 영상, 조회수가 많은 영상 등을 DB에서 불러와 화면에 리스트 형식으로 렌더링한다.

**6.** **Detail**
- Home화면에서 특정 비디오를 선택한 경우, 해당 비디오를 전체화면으로 출력해주고 이 비디오에 대한 퀴즈를 제출할 수 있도록 한다.

**7.** **QuizCreationOverlay, QuizSolveOverlay**
- QuizCreationOverlay는 특정 비디오에 대한 퀴즈 생성 폼을 제공하고, QuizSolveOverlay는 사용자가 특정 퀴즈를 풀었을 때 생성되는 메시지를 띄워준다.

**8.** **Search**
- 전체 비디오에 대한 검색 화면을 렌더링한다.

**9.** **History**
- 로그인 한 사용자가 시청한 동영상, 퀴즈를 낸 동영상을 DB에서 불러와 리스트 형식으로 렌더링한다.

**10.** **SystemState**
- Luna System Call을 호출하여 현재 시스템의 Cpu, Memory 사용량을 fetch하고 이를 Rendering Graph, RenderingMemoryGraph 컴포넌트의 props로 넣어준다.

**11.** **RenderingGraph, RenderingMemoryGraph**
- SystemState로부터 전달받은 Cpu, Memory 사용량을 파싱하여 차트를 렌더링한다.

# Back-End Design Architecture
<img src= "https://github.com/syh24/CSE4103/assets/64251594/9b934de7-57a5-4bf1-9aa9-3b5ab52d15ae" width="600">

- 백엔드를 디자인할 때 MVC패턴을 사용하였습니다.
- 프로젝트 규모가 크지 않고, 복잡한 business logic이나 query logic이 없어서 Service layer, Repository layer는 생략하였습니다.
  * trade-off: 구조를 파악하기 쉬워지고, 개발 시간이 단축됩니다 / 추상화 레벨이 낮아지고 확장성이 없습니다
  * 근거: 개발에서는 주어진 시간안에 개발하는 것이 가장 중요하다고 생각해서, 개발 시간을 단축할 수 있는 방향으로 설계를 했습니다. 또한 확장성에 대해서는 고객의 새로운 요구사항이나 확장을 해야하는 상황이 왔을 때 해도 늦지 않다고 생각합니다.
       미리 확장을 해놓았을 경우 비용이 많이들뿐더러 실제로 확장으로 이어지지 않을 시 손해를 볼 수도 있습니다.

# DataBase Schema
<img src= "https://github.com/syh24/CSE4103/assets/64251594/7ce2f3f8-b14d-4027-8010-82d7c9656f57" width="600">

# Back-End Test Plan
1. User
 - 회원가입에 대한 API 통신 Test
   * 유저 생성 API를 호출하였을 때 올바른 응답과 회원가입이 올바르게 되는지 테스트합니다.
 - 유저목록 조회 API 통신 Test
   * 유저 조회 API를 호출하였을 때 올바른 응답과 유저 list가 return 되는지 테스트합니다.
 - 유저 로그인 API 통신 Test
   * 유저 로그인 API를 호출하였을 때 올바른 응답과 login 되는지 테스트합니다.
 - 유저 로그아웃 API 통신 Test
   * 유저 로그아웃 API를 호출하였을 때 올바른 응답과 logout 되는지 테스트합니다.
 - 유저 정보 수정 API 통신 Test
   * 유저 정보 수정 API를 호출하였을 때 올바른 응답과 유저의 정보가 수정되는지 테스트합니다.
<img width="263" alt="image" src="https://github.com/syh24/CSE4103/assets/64251594/501b7200-a20b-47a5-aa12-61ff8b8cbeb5">

2. Video
 - 비디오 생성 API 통신 Test
    * 비디오 생성 API를 호출하였을 때 올바른 응답과 비디오가 잘 생성되었는지 테스트합니다.
 - 비디오 조회 API 통신 Test
    * 비디오 조회 API를 호출하였을 때 올바른 응답과 비디오 list가 return 되는지 테스트합니다.
<img width="272" alt="image" src="https://github.com/syh24/CSE4103/assets/64251594/baba51a9-130c-4c7e-8d69-21fe0351942d">


# Use Case 검토 및 추가 활용 방안

- 치매 노인들의 인지능력 재활  

  치매 환자들에게 친숙한 과거의 이미지와 음악을 통해 기억을 자극하는 퀴즈를 제공함으로써 노인들의 인지 기능을 자극하고 회상을 도울 수 있다. 예를 들어, 일반적인 영상 대신 과거의 유명한 장소나 인물 영상을 보여주며 이와 관련된 간단한 질문으로 노인들의 인지 기능을 자극하고 회상을 도울 수 있다.

- 교육기관에서의 맞춤형 학습 지원  

  학교나 교육 기관에서는 이 앱을 사용하여 학생들에게 개개인별 맞춤형 학습 자료를 제공할 수 있다. 이를 위해 내부 DB에 넣을 학습용 시청각 자료와 학습용 Quiz 데이터셋 확보, 그리고 개개인 맞춤을 위한 알고리즘 개발이 선행되어야 한다. 학생들은 이렇게 개조된 앱을 통해 특정 과목이나 주제에 관한 퀴즈를 풀며 학습 내용을 복습하고 이해도를 높일 수 있다.

### 비즈니스 모델

- 제휴 마케팅 및 콘텐츠 스폰서십
  
    제휴를 통해 회사 등 여러 운영 기관의 서비스/제품을 앱 내에서 홍보할 수 있다. 이러한 기관들은 앱을 통해 자신들의 프로그램을 널리 알리는 동시에 앱은 이들로부터 스폰서십이나 제휴 수익을 얻을 수 있을 것이다. 
    
- 챌린지 및 대회 주최:
  
    기업이나 브랜드가 자신들의 제품이나 서비스와 관련된 퀴즈 챌린지를 주최할 수 있도록 하여 참여를 촉진할 . 수있다. 이를 통해 브랜드 인지도 향상과 사용자 참여를 동시에 달성할 수 있으며, 챌린지 주최 기업으로부터 주최 비용을 받는다. 사용자 참여형 퀴즈 미디어 앱이라는 점에서, 사용자들의 자연스러운 참여 독려 효과를 기대할 수 있다. 
    
- 커스터마이징 및 개인화 서비스 제공:
  
    기업 교육 프로그램이나 특정 교육 기관을 위한 맞춤형 퀴즈 앱 버전을 제공한다. 이를 통해 기업 및 교육 기관은 자신들만의 특화된 콘텐츠와 브랜딩을 가미한 앱을 사용할 수 있으며, 개발 및 유지 보수에 대한 비용을 청구할 수 있다.
