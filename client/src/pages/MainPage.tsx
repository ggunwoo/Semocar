import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { useCarData } from "../../utils/useCarData";
import { FUELTYPE_LIST, SEGMENT_SIZE_LIST, SEGMENT_BODY_LIST } from "../../utils/constants";

// REDUX
import { fuelReset, brandReset } from "../store/slice/selectedSlice";
import { segAllChange, segHandle, fuelAllChange, fuelHandle } from "../store/slice/carCheck-slice";

// SWIPER CSS
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// COMPONENTS
// import BrandNav from "../components/search/SelectBrand";

// STYLED-COMPONENTS
import { MaxContainer } from "../styled/Global";
import * as S from "../styled/Main.styled";

export default function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const carData = useCarData();

  const [carImg, setCarImg] = useState(["/brand", "/detail/10210", "/brand", "/brand"]);

  /** 최신 모델로 정렬된 11개 자동차 데이터 */
  const latestCarHandler = () => {
    const latestSort = carData.sort((a, b) => {
      const aDate = parseFloat(a.date);
      const bDate = parseFloat(b.date);
      return bDate - aDate;
    });

    const latest11 = latestSort.slice(0, 11);

    return latest11;
  };
  const letestCar = latestCarHandler();

  useEffect(() => {
    console.log("reset");
  }, [dispatch]);

  return (
    <>
      {/* 메인배너 SLIDE */}
      <S.BannerWrapper
        // scrollbar={{
        //   hide:true,
        // }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}>
        {carImg.map((a, i) => (
          <SwiperSlide key={i}>
            <div className="baseBox">
              <img
                className="bannerImg"
                src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/banner/banner${i + 1}.png`}
                alt={`SLIDE${i + 1}`}
              />
              <div
                className={`bannerBtn bannerBtn_${i + 1}`}
                onClick={() => {
                  navigate(a);
                }}
              />
            </div>
            <div className="background">
              <img
                src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/banner/background/banner${
                  i + 1
                }_bg.png`}
                alt={`BACKGROUND${i + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </S.BannerWrapper>

      {/* 최신 출시 모델 */}
      <S.GradientGuide>
        <div className="gradientLine" />
        <S.Letest>
          <p className="title">최신 출시 모델</p>
          {/* SlideWrap */}
          <Swiper
            className="mySwiper carousel"
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={60}
            navigation={true}
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
            }}>
            {
              // Slides
              letestCar.map((car, index) => (
                <SwiperSlide className="slide" key={car.id}>
                  <div
                    className="carHead"
                    onClick={() => {
                      navigate(`/detail/${car.id}`);
                    }}>
                    {/* 이미지 */}
                    <div className="images">
                      <img
                        src={`https://raw.githubusercontent.com/gunw0-0/cars/main/images/cars/${car.imgUrl.toLowerCase()}.png`}
                        alt={car.imgUrl.toLowerCase()}
                      />
                    </div>
                    {/* 자동차 이름 */}
                    <p>
                      {car.brand.kr} {car.name.kr}
                    </p>
                  </div>
                  {/* 자동차 정보 */}
                  <dl className="infoBox">
                    <dt>가격</dt>
                    <dd style={{ color: "#62478f" }}>
                      {car.price.min}~{car.price.max}
                    </dd>
                    <dt>연비</dt>
                    <dd>{car.gasMileage}</dd>
                    <dt>연료 </dt>
                    <dd>
                      {car.fuelTypes.map((fuel, index) => (
                        <span style={{ marginRight: "5px" }} key={index}>
                          {fuel}
                        </span>
                      ))}
                    </dd>
                    <dt>출시일</dt>
                    <dd>{car.date}</dd>
                  </dl>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </S.Letest>
      </S.GradientGuide>
    </>
  );
}
