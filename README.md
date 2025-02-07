<div align="center">

<h1>Attandance App 📒</h1>

![header](https://capsule-render.vercel.app/api?type=venom&color=auto&height=500&section=header&text=AttandanceApp&fontSize=90)

![Image](https://github.com/user-attachments/assets/d0c97d40-4c22-455f-9588-256d20b6cc68)



## <div align="center">직원들의 근태관리를 쉽게 도와주는 서비스</div>

<br />

</br>

[✨ Attendance App URL] (https://britec-attd-app.web.app/)

</div>


<br />

# ⭐️ 프로젝트 소개

회사에서 직원들의 출석을 관리하고 직원들의 급여 정산을 쉽게 할 수 있도록 도와주는 서비스입니다

실제 지인 분화사에서 적용하기 위해서 요구사항을 받아서 제작한 프로젝트입니다.

더 좋은 기능을 제공해드리기 위해서 지속적으로 리팩토링 하고 있습니다.

<br />

# ⚒️ 기술 스택

<div align="center"> 
  <img src="https://img.shields.io/badge/Typescript-5.7.3-3178C6?logo=typescript">  
  <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?logo=react">  
  <img src="https://img.shields.io/badge/Redux-4.2.1-764ABC?logo=redux">  
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.0-06B6D4?logo=tailwindcss">  
  <img src="https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite">  
  <img src="https://img.shields.io/badge/Material%20UI-5.15.3-007FFF?logo=mui">  
  <img src="https://img.shields.io/badge/Firebase-10.7.1-FFCA28?logo=firebase">  
  <img src="https://img.shields.io/badge/React%20Router%20Dom-6.21.1-CA4245?logo=react-router">  
</div>

<br/>

# 💪🏻 프로젝트 경험

### 1. 회사에 필요한 기능 직접 관리자 분께 피드백 받아 기능 추가 구현

- 회사 관리자 분께 직접 회사 근태 관리에 필요한 기능들 피드백 받아서 구현함

- 결과적으로, 회사 QR SCAN 코드 보안화 및 , 어르신들이 QR 버튼이 작아 사용하기 힘들다는 의견을 받아

  html5-qr-scanner => qr-scanner 로 라이브러리 변경해 자동으로 QR 이 실행 되고 더욱 깔끔한 디자인을 제공해 드릴 수 있도록 했습니다.

  ![Image](https://github.com/user-attachments/assets/887d5c46-8272-4124-804a-43cfe5914c14)

  ![Image](https://github.com/user-attachments/assets/fb4f3617-d029-4294-8ffb-769fe4772548)

  ​	

  - 어르신 분들이 IT 기기 사용에 익숙치 않아 사용하기 힘들어 하신다는 의견을 받아 상세한 AppGuide 페이지 제공 및 각 페이지 마다 React-Tour 를 이용해서 상세한 사용법 제공해 드려 조금이나마 쉽게 사용하실 수 있도록 도와드리고자 노력했습니다.

    [Appguide Page 제공 및 React-Tour 제공](#appguide-page-제공-및-react-tour-제공)

  - 또한 휴가 등록 및 외근 , 공휴일 야간 수당 구분 등 회사에 필요한 기능들 지속적으로 피드백받아서 구현중에 있습니다.

  <br />

### 2. 사용자가 더욱 편하게 사용할 수 있고 유지보수 하기 쉬운 코드

- 현재까지도 지속적으로 개선하고 있는 프로젝트 이고, 사용자가 더욱 편하게 사용하기 위해서 어떤 기능을 개선할 수 있을지 고민 하고 있는 프로젝트 입니다. 
- 유지보수를 하기 쉽게 하기 위해서 프로젝트를 Typescript 로 변경중에 있으며, 변경하기 쉬운 클린코드를 작성하기 위해서 지속적으로 리팩토링 하고 있습니다.
- 이미지, 데이터를 가져오는데 조금 더 자연스럽고 깔끔하게 가져오기 위해서 lazy 로딩 및, tanstack-query 도입 예정에 있습니다.

<br />





# 주요 기능 설명

## 관리자 기능

---

### [ 상세한 회사 설정 ]

![Image](https://github.com/user-attachments/assets/6d37b096-86c6-4495-acf3-53d3d849b760)

- 관리자분이 회사 페이지를 만들때 로고, 회사이름, 직책, 급여정산날짜, 주간, 야간 구분해 급여 지급할지 등등 여러 옵션들을 설정해서 회사 페이지를 좀 더 체계적으로 관리할 수 있도록 제공합니다.

<br/>

### [ 직원 리스트 조회 및 관리 ]

![Image](https://github.com/user-attachments/assets/93728a23-41f9-40b4-b09e-884c0259e240)

- 회사에 등록되어 있는 직원 리스트를 한번에 볼 수 있고 직원 각각의 정보를 수정 및 상세보기, 정산 페이지로 이동 할 수 있습니다.
- 지역을 골라 필터링해 특정 지역에 대한 관광지만을 볼 수 있습니다.

<br/>

### [ 회사 설정 및 고유 QR,ID ]

![Image](https://github.com/user-attachments/assets/453b1696-488e-41de-9ad4-4825cba3d9ac)

- 회사의 설정을 바꿀 수 있는 페이지 입니다.

- 회사 마다 고유한 QR 코드 및 ID 를 제공합니다.

- QR 을 통해 직원들의 출퇴근을 기록할 수 있는 기능 제공합니다.

- ID 를 통해서 직원이 회사에 가입시 회사를 검색할 수 있도록 도와줍니다.

  <br/>

  

### [ 직원 상세 조회 ]

![Image](https://github.com/user-attachments/assets/ed6d9bb7-4df6-4344-bdb0-fabaeccd1408)

- 달력을 통해서 직원의 근무 시간 및 근무 상세 기록을 확인 할 수 있습니다.
- 직원의 휴가 등록을 할 수 있습니다.

<br/>

### [ 직원 정산 기능 ]

![Image](https://github.com/user-attachments/assets/9285d390-1fcc-4b4c-ab12-5ec1aed31f25)

- 모달을 통해서 간편하게 기간에 직원이 근무한 시간과 급여를 정산할 수 있습니다.

<br/>





## 직원 기능

---

### [직원 정보 및 이번달 근무 시간 확인]

![Image](https://github.com/user-attachments/assets/6dffffe3-f9da-4a35-a836-ab70b87f0d23)

- 직원의 근무 형태 및 이번달 근무 시간 등 자신의 근태 기록을 한눈에 볼 수 있습니다.

<br/>

### [ 여행지 공유 및 QnA 커뮤니티 ]

<div style="flex gap-5"> 
  
</div>

![Image](https://github.com/user-attachments/assets/10aad7a8-9a28-49e8-8a9c-7d23ac351180)

![Image](https://github.com/user-attachments/assets/a685bc68-388d-4d54-b424-624568a1445b)

- 직원은 회사에서 제공하는 QR을 통해 출퇴근을 등록할 수 있습니다.
- QR은 암호화 및 복호화 과정을 통해서 보안을 높였습니다.

<br/>

### [ 직원 근무기록 확인하기 ]

![Image](https://github.com/user-attachments/assets/e0eb73cb-b5e1-4b69-a9ff-083f27b5bd7b)

![Image](https://github.com/user-attachments/assets/e05b598b-d68b-4605-af48-6916aede487f)

- 직원은 달력을 통해서 한눈에 자신의 근무 기록을 확인할 수 있습니다.
- 또한 표를 통해서 근무시간 통계를 확인할 수 있습니다.

<br/>

## 서비스 편의성 기능

---

### [ Appguide Page 제공 및 React-Tour 제공 ]

![Image](https://github.com/user-attachments/assets/15161dc4-7703-4a94-9333-262c002bbfe6)

![Image](https://github.com/user-attachments/assets/7f22790f-3a7c-472b-b90c-cc5d6291f19c)

![Image](https://github.com/user-attachments/assets/0a72f7c4-e6b7-488b-bca4-a1f012cc399d)

- 서비스 사용하시는 분들 특성상 IT 가 익숙하지 않은 분들이 많으셔서 App Guide 페이지를 따로 제공 하여 사용법을 자세히 설명 해드렸습니다.
- React-Tour 를 사용해서 각 페이지마다 사용방법을 상세하게 안내해드렸습니다.

<br />

### [ DarkMode 지원 ]

![Image](https://github.com/user-attachments/assets/b18db41b-ebe1-4afe-9f1d-715f5c9462d5)

- Tailwind DarkMode 를 사용하여 DarkMode 또한 지원해드렸습니다.

# 🏃‍♂️ 팀원 소개



## 🐙 권수혁 (FE)

- 블로그: https://velog.io/@tngur0716/posts
- 깃허브: https://github.com/kwonsuhyuk

## 😊 유제현 (FE)

- 깃허브 : https://github.com/YOOJEHYEON



<br />
