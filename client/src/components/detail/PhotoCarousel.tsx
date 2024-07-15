import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import * as S from "../../styled/Detail.styled";

// SWIPER
import { SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import type { Swiper } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";

export default function PhotoCarousel() {
  const car = useAppSelector(state => state.car.item);
  // // 해당 차량 사진 개수 배열로 변환한 변수
  const [viewPhoto, setViewPhoto] = useState([true, false]);
  const [exThumbs, setExThumbs] = useState<Swiper | null>(null);
  const [inThumbs, setInThumbs] = useState<Swiper | null>(null);

  const [imageErr, setImageErr] = useState(false);

  // // -- 임시로 5개 고정
  const exteriorArr = new Array(5).fill(1).map((item, index) => (item = item + index));
  const interiorArr = new Array(5).fill(1).map((item, index) => (item = item + index));

  const viewChange = (index: number) => {
    const copyArr = [...viewPhoto];
    copyArr.fill(false);
    copyArr[index] = !copyArr[index];
    setViewPhoto(copyArr);
  };

  if (imageErr) {
    return <p>사진 정보없음</p>;
  }

  return (
    <>
      <div className="slideHead">
        <div className="buttonGroup">
          {/* 외부버튼 */}
          <div
            onClick={() => {
              viewChange(0);
            }}
            className={`changeBtn exBtn ${viewPhoto[0] ? "active" : "inactive"}`}>
            외관
          </div>
          {/* 외부버튼 */}

          <div
            onClick={() => {
              viewChange(1);
            }}
            className={`changeBtn inBtn ${viewPhoto[1] ? "active" : "inactive"}`}>
            실내
          </div>
        </div>
      </div>
      <div style={{ position: "relative", top: "50%" }}></div>

      {/* 외부 */}
      <div className={`slides exterior ${viewPhoto[0] ? "block" : "none"}`}>
        <S.MainSwiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: exThumbs }}
          modules={[FreeMode, Navigation, Thumbs]}>
          {exteriorArr.map((number, idx) => (
            <SwiperSlide key={number}>
              <img
                src={`${car.image_path}/exterior/${idx}.jpg`}
                alt={car.english_name}
                onError={() => setImageErr(true)}
              />
            </SwiperSlide>
          ))}
        </S.MainSwiper>
        <S.ThumbsSwiper
          onSwiper={setExThumbs}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}>
          {/* ThumbsSwiper */}
          {exteriorArr.map((number, idx) => (
            <SwiperSlide key={number}>
              <img
                src={`${car.image_path}/exterior/${idx}.jpg`}
                alt={car.english_name}
                onError={() => setImageErr(true)}
              />
            </SwiperSlide>
          ))}
        </S.ThumbsSwiper>
      </div>

      {/* 내부 */}
      <div className={`slides interior ${viewPhoto[1] ? "block" : "none"}`}>
        <S.MainSwiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: inThumbs }}
          modules={[FreeMode, Navigation, Thumbs]}>
          {interiorArr.map((number, idx) => (
            <SwiperSlide key={number}>
              <img src={`${car.image_path}/interior/${idx}.jpg`} alt={car.english_name} />
            </SwiperSlide>
          ))}
        </S.MainSwiper>
        <S.ThumbsSwiper
          onSwiper={setInThumbs}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}>
          {/* ThumbsSwiper */}
          {interiorArr.map((number, idx) => (
            <SwiperSlide key={number}>
              <img src={`${car.image_path}/interior/${idx}.jpg`} alt={car.english_name} />
            </SwiperSlide>
          ))}
        </S.ThumbsSwiper>
      </div>
    </>
  );
}
