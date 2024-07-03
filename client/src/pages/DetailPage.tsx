import "../styles/detail.scss";

import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useCarData } from "../../utils/useCarData";

import * as type from "../types/types";
import { fetchCar } from "../store/api/carApi";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { unmount } from "../store/slice/useCarSlice";

// COMPONENTS
import HeadBox from "../components/detail/HeadBox";
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
        <HeadBox minPrice={minPrice} maxPrice={maxPrice} targetClick={targetClick} />

        {/* 차량정보 스크롤이동 위치, height = section간격 */}
        <S.MoveRef height="150px" ref={infoRef}></S.MoveRef>
        {/* ------------------------------------------- */}

        <MaxContainer>
          
          {/* 차량정보 */}
          <ModelInfo />

          {/* 포토갤러리 스크롤이동 위치, height = section간격 */}
          <S.MoveRef height="180px" ref={photoRef}></S.MoveRef>

          {/* PHOTO GALLERY */}
          <S.SwiperWrap>
            <PhotoCarousel />
          </S.SwiperWrap>

          {/* 댓글 스크롤이동 위치, height = section간격 */}
          <S.MoveRef height="200px" ref={commentRef}></S.MoveRef>
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
