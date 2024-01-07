

# **SEMO CAR**
<br />

> ***프로젝트*** : 자동차 정보제공 웹사이트 포트폴리오
>
> ***프로젝트 분류*** : 토이 프로젝트
>
> ***팀규모*** : UXUI디자이너(1) 프론트엔드(1)
>
> ***참여분야*** : 클라이언트 개발, 프로젝트기획
>
> ***제작기간*** : 23.05.08 ~ 23.06.28

<br />

### ✈️ **배포**

> Netlify 배포  
> <https://semocar.netlify.app>

<br />
<br />
<br />
<br />
<br />


# 👨‍🔧 **기술**

![React](https://img.shields.io/badge/React-61DAFB?style=react&logo=react&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=typescript&logo=typescript&logoColor=white)
![Reactrouter](https://img.shields.io/badge/reactrouter-CA4245?style=reactrouter&logo=reactrouter&logoColor=white)
![Redux](https://img.shields.io/badge/Redux/Toolkit-764ABC?style=redux&logo=redux&logoColor=white)
![mui](https://img.shields.io/badge/mui-007FFF?style=mui&logo=mui&logoColor=white)
![styled_components](https://img.shields.io/badge/styled_components-DB7093?style=styledcomponents&logo=styledcomponents&logoColor=white)

### *왜 이 기술을 사용했는가?*  
> "학습한 내용을 바탕으로 프로젝트에 적용해보는 것이 주목적이였습니다."  
> "JavsScript -> React -> TypeScript 순으로 학습한 뒤 프로젝트를 기획하게되었으며 이후 React 라이브러리들을 학습함과 동시에 프로젝트에 계속해서 적용하였습니다."  
> "UI라이브러리 경우 기존에 BootStrap을 사용해왔지만 React를 학습한뒤 Mui에 관심이 있어 사용하게 되었습니다."  
> "CSS-in-JS(styled-components)는 Mui요소를 유연하게 다루기 위해 사용했습니다."

<br />

### *서버 개발?*
> "서버 개발 경험이 전무하여 차량데이터 같은 경우 json형식으로 직접 작성한 뒤 GitHub Gist를 사용해 데이터를 관리했습니다."

<img width='50%' src='https://user-images.githubusercontent.com/74530907/279672947-9dd3585b-d78a-4cee-95c0-4a3c11c523da.PNG' /> *( GitHub Gist / CarData.json )*



<br />
<br />
<br />
<br />
<br />

# 👪 **협업**

![Figma](https://img.shields.io/badge/figma-F24E1E?style=figma&logo=figma&logoColor=white)  
[*클릭시 피그마로 이동*](https://www.figma.com/file/cU9wY1NIxTCAtWET80BYvB/%EC%95%BC%EC%98%B9?type=design&mode=dev)

> 프로덕트 디자이너와 간단한 토이 프로젝트를 진행했습니다.  
> 피그마로 기획 및 디자인을 관리, 개인 GitHub로 프로젝트 관리하였습니다.


<br />
<br />
<br />
<br />
<br />

# 👀 **기능**
<br />
<!-- 체크박스 -->

### **✅ 체크박스**

<img width='80%' src='https://user-images.githubusercontent.com/74530907/250579327-611c017d-526a-4d60-934c-307e1e075921.gif' />

> 1차카테고리 : 브랜드  
> 2차카테고리 : 차급(Segment), 연료(FuleType)  
> 체크박스 형식의 카테고리를 설정하면 해당되는 차량만 필터링되어 보여줍니다.

> 

<br />
<br />
<br />

## **🔍 검색**

<img width='80%' src='https://user-images.githubusercontent.com/74530907/250912291-bd7c3785-1b01-4f46-8de1-9fb28ec54839.gif' />

> 차량에 이름을 검색이 가능하며 빠르게 상세페이지 링크를 제공합니다.

<br />
<br />
<br />


## **📜 상세페이지 Header**

<img width='80%' src='https://github.com/pgw6541/SEMOCAR/assets/74530907/98cdf9ef-f40e-4816-adea-aa205a5bfd60' />

> 스크롤하여 자동차이름, 이미지가 있는 단락이 화면에서 사라지면  
> 화면 최상단에 Fixed요소가 나옵니다.  

<br />
<br />
<br />

## **🖱️ 스크롤 위치 이동**

<img width='80%' src='https://github.com/pgw6541/SEMOCAR/assets/74530907/04a484d6-d759-4a8f-a474-8b3c46291ed8' />

> 상세페이지 Navigation 버튼 클릭시 해당요소가 있는 스크롤위치로 이동합니다.  
> useRef로 DOM에 접근해 해당 요소 상단으로 이동하게끔 구현했습니다.

<br />
<br />
<br />

## **🔠 등급및 제원**

<img width='80%' src='https://user-images.githubusercontent.com/74530907/250577293-015f760e-352c-4c17-b75d-bd470ab0de38.gif' />

> 1차 카테고리 : 차량의 등급(grades)  
> 2차 카테고리 : 차량의 트림(Trim)  
> 1차, 2차카테고리를 지정하면 해당 가격, 제원등을 아래단락에서 나타냅니다.

<br />
<br />
<br />

## **📲 캐러셀 슬라이드**

<img width='50%' src='https://user-images.githubusercontent.com/74530907/250577043-a3c03a91-be06-4ef0-afea-df31af017fc3.gif' /><img width='50%' src='https://user-images.githubusercontent.com/74530907/250576700-47e73051-bb43-46cf-885c-e96f9b400245.gif' />

> 메인페이지 배너, 최신 출시모델 상세페이지 차량외부, 내부에서 이미지 슬라이드를 구현하였습니다.
> Swiper 라이브러리를 사용하였습니다. <https://swiperjs.com/>

<br />
<br />



<br />
<br />
<br />
<Hr />

<br />

*디자인과 기능, 다음자동차 웹사이트를 참고하였습니다.*  
*Reference : <https://auto.daum.net/>*

<Hr />
