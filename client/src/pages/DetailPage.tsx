import "../styles/detail.scss";

import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useCarData } from "../../utils/useCarData";

import * as type from "../types/types";
import { fetchCar } from "../store/api/carApi";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { unmount } from "../store/slice/useCarSlice";

// COMPONENTS
import ModelInfo from "../components/detail/ModelInfo";
import PhotoCarousel from "../components/detail/PhotoCarousel";

// STYLED
import { MaxContainer } from "../styled/Global";
import * as S from "../styled/Detail.styled";
// import { fetchBrands } from "../store/api/brandApi";

export default function DetailPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const infoRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);

  const [tabFixed, setTabFixed] = useState(false);
  const [ClickCheck, setClickCheck] = useState([true, false, false]);
  const [targetClick, setTargetClick] = useState([infoRef, photoRef, commentRef]);

  const car = useAppSelector(state => state.car.item);
  const status = useAppSelector(state => state.car.status);
  const error = useAppSelector(state => state.car.error);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    if (status === "succeeded") {
      const getMinMaxPrice = car => {
        let minPrice = Number.MAX_SAFE_INTEGER;
        let maxPrice = Number.MIN_SAFE_INTEGER;

        car.grades.forEach(grade => {
          grade.trims.forEach(trim => {
            if (trim.price < minPrice) {
              minPrice = trim.price;
            }
            if (trim.price > maxPrice) {
              maxPrice = trim.price;
            }
          });
        });

        // minPrice와 maxPrice가 초기값 그대로라면(Trim이 없는 경우) 0으로 설정
        if (minPrice === Number.MAX_SAFE_INTEGER) minPrice = 0;
        if (maxPrice === Number.MIN_SAFE_INTEGER) maxPrice = 0;

        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
      };

      getMinMaxPrice(car);
    }
  }, [car]);

  console.log("minPrice: ", minPrice);
  console.log("maxPrice: ", maxPrice);

  // // Mount
  useEffect(() => {
    // 페이지 접근시 최상단으로 이동
    window.scrollTo(0, 0);
  }, []);
  // 스크롤 핸들
  useEffect(() => {
    const handleScroll = () => {
      const targetElement = document.getElementById("grade");
      const scrollY = window.scrollY;

      // 탭네비 화면에서 사라지면 Fixed 로직
      if (targetElement) {
        const { top } = targetElement.getBoundingClientRect();
        if (top <= window.innerHeight * 0.25) {
          // 특정 위치에 도달했을 때 실행할 로직
          setTabFixed(true);
        } else if (top > window.innerHeight * 0.25) {
          setTabFixed(false);
        }
      }

      // 스크롤위치에 도달할때마다 targetBtn active 변경
      if (scrollY > 500 && scrollY < 1000) {
        setClickCheck([true, false, false]);
      }
      if (scrollY > 1300 && scrollY < 1800) {
        setClickCheck([false, true, false]);
      }
      if (scrollY > 2200 && scrollY < 2800) {
        setClickCheck([false, false, true]);
      }
    };
    // 스크롤할때마다 handleScroll을 실행하는데... 이건 수정필요
    window.addEventListener("scroll", handleScroll);

    return () => {
      setTimeout(() => {
        window.removeEventListener("scroll", handleScroll);
        setTabFixed(false);
      }, 1000);
    };
  }, []);
  // .targetBtn 클릭시 설정값 스크롤 위치로 이동하는 이벤트로직
  const targetMove = (target: any) => {
    if (target.current) {
      target.current.scrollIntoView({ block: "start" });
    }
  };
  // Photo 외관, 내관버튼 클릭시 해당 사진슬라이드 보여주는 로직

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCar(id));
    }
    return () => {
      // 페이지 이탈 시 car 데이터 초기화
      dispatch(unmount());
    };
  }, [id, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>페이지를 불러오지 못했습니다.</div>;
  }
  if (!car) {
    return <div>Car Data가 없습니다.</div>;
  }

  // console.log(car);

  if (status === "succeeded") {
    return (
      <section style={{ background: "#FFF" }}>
        <S.HeadBox>
          <MaxContainer>
            <div className="headWrapper">
              <div className="infoBox">
                <p className="brand">
                  <img src={car.brand.logo_path} alt={car.brand.english_name} />
                  <span>{car.brand.name}</span>
                </p>
                <p className="name">{car.name}</p>
                <p className="price">
                  {minPrice + maxPrice != 0 &&
                    minPrice.toLocaleString("ko-KR") + "~" + maxPrice.toLocaleString("ko-KR") + "만원"}
                </p>
                <S.StyledChip className="first" label={`${car.segment.size}${car.segment.body}`} variant="outlined" />
                {car.fuel_types.map((fuel, idx) => (
                  <S.StyledChip key={idx} label={`${fuel.name}`} variant="outlined" />
                ))}
                {/* <S.StyledChip label={`${searchCar.gasMileage}`} variant="outlined" /> */}
              </div>

              <div className="image">
                <img src={`${car.image_path}/model_image.png`} alt={car.english_name} />
              </div>
            </div>
          </MaxContainer>
        </S.HeadBox>

        {/* 해당 스크롤위치로 이동하는기능 인터페이스 */}
        <S.TartgetNav>
          <MaxContainer>
            <div className="btnGroup">
              {/* 스크롤탭 */}
              {["등급별 제원", "포토"].map((item, index) => (
                <S.TargetBtn
                  key={index}
                  className={`targetBtn ${ClickCheck[index] ? "clicked" : "unclick"}`}
                  onClick={() => {
                    targetMove(targetClick[index]);
                  }}>
                  <p>{item}</p>
                </S.TargetBtn>
              ))}
            </div>
          </MaxContainer>
        </S.TartgetNav>

        {/* TargetNav가 화면에서 사라졌을 때 보여줄 섹션 */}
        <S.FixedBox className={`${tabFixed ? "fixed" : "unfixed"}`}>
          <div className="wrap">
            <div className="featureBox">
              <div className="titleGroup">
                <div className="brand">
                  <img src={`${car.brand.logo_path}`} alt={car.brand.english_name} />
                  <span className="brand">{car.brand.name}</span>
                </div>
                <p className="name">{car.name}</p>
              </div>
              <div className="btnGroup">
                {["등급별 제원", "포토"].map((item, index) => (
                  <S.TargetBtn
                    key={index}
                    className={`targetBtn ${ClickCheck[index] ? "clicked" : "unclick"}`}
                    onClick={() => {
                      targetMove(targetClick[index]);
                    }}>
                    <p>{item}</p>
                  </S.TargetBtn>
                ))}
              </div>
            </div>
            <div className="imgBax">
              <img src={`${car.image_path}/model_image.png`} alt={car.english_name} />
            </div>
          </div>
        </S.FixedBox>

        {/* 차량정보 스크롤이동 위치, height = section간격 */}
        <S.MoveRef height="150px" ref={infoRef}></S.MoveRef>

        <MaxContainer>
          {/* 차량정보 적어놓은 표 */}
          <ModelInfo />

          {/* 포토갤러리 스크롤이동 위치, height = section간격 */}
          <S.MoveRef height="180px" ref={photoRef}></S.MoveRef>

          {/* PHOTO GALLERY */}
          <S.SwiperWrap>
            <PhotoCarousel />
          </S.SwiperWrap>

          <S.MoveRef height="200px" ref={commentRef}></S.MoveRef>

          {/* 댓글 스크롤이동 위치, height = section간격 */}
          {/* 댓글 */}
          <article className={`comment-list`}>
            <div className="blank"></div>
          </article>
        </MaxContainer>
      </section>
    );
  } else {
    return <p>디테일</p>;
  }
}
