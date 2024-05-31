import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useCarData } from "../../utils/useCarData";
import { SwiperSlide } from "swiper/react";
import * as type from "../types/types";
import { fetchCar } from "../store/api/carApi";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { imageUrl } from "../api/getCarData";
import { unmount } from "../store/slice/useCarSlice";

// STYLED
import { MaxContainer } from "../styled/Global";
import * as S from "../styled/Detail.styled";

// SWIPER
import { FreeMode, Navigation, Thumbs } from "swiper";
import type { Swiper } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/scss/thumbs";
// import "swiper/scss/navigation";
import { fetchBrands } from "../store/api/brandApi";

export default function DetailPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // const carData = useCarData();
  // const carBrand = useAppSelector(state => state.brandList.items);
  // const searchCar = carData.find(e => e.id === Number(id));

  // useEffect(() => {
  //   dispatch(fetchBrands()); // Redux => Brands fetch함수 실행
  // }, []);

  // const minPrice = searchCar?.price.min?.toLocaleString("ko-KR");
  // const maxPrice = searchCar?.price.max?.toLocaleString("ko-KR");

  // const OverlapBrand = carBrand.find(e => e.english_name === searchCar?.brand.en);

  const [exThumbs, setExThumbs] = useState<Swiper | null>(null);
  const [inThumbs, setInThumbs] = useState<Swiper | null>(null);

  const infoRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);

  const [tabFixed, setTabFixed] = useState(false);
  const [ClickCheck, setClickCheck] = useState([true, false, false]);
  const [targetClick, setTargetClick] = useState([infoRef, photoRef, commentRef]);

  // // 해당 차량 사진 개수 배열로 변환한 변수
  const [viewPhoto, setViewPhoto] = useState([true, false]);

  // // -- 임시로 5개 고정
  const exteriorArr = new Array(5).fill(1).map((item, index) => (item = item + index));
  const interiorArr = new Array(5).fill(1).map((item, index) => (item = item + index));

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
      if (scrollY > 600 && scrollY < 1000) {
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
  const viewChange = (index: number) => {
    const copyArr = [...viewPhoto];
    copyArr.fill(false);
    copyArr[index] = !copyArr[index];
    setViewPhoto(copyArr);
  };

  const car = useAppSelector(state => state.car.item);
  const status = useAppSelector(state => state.car.status);
  const error = useAppSelector(state => state.car.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCar(id));
    }
    return () => {
      dispatch(unmount());
    };
  }, [id, dispatch]);

  const [selectGrade, segSelectGrade] = useState("1");
  const [selectTrim, segSelectTrim] = useState("1");

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>페이지를 불러오지 못했습니다.</div>;
  }
  if (!car) {
    return <div>Car Data가 없습니다.</div>;
  }
  const grade = car.grades ? car.grades.find(grade => grade.id === selectGrade) : [];
  const trim = grade.trims ? grade.trims.find(trim => trim.id === selectTrim) : grade;

  console.log(car);
  console.log(grade);
  console.log(trim);

  if (status === "succeeded" && typeof car.brand !== "string") {
    // if (false) {
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
                <p>가격정보없음</p>
                <S.StyledChip className="first" label={`${car.segment}`} variant="outlined" />
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
                    // targetMove(targetClick[index]);
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
                      // targetMove(targetClick[index]);
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
          <S.ChartWrapper>
            <div className="infoWrap" id="grade">
              <S.SelectWrapper>
                {/* 등급 Grade */}
                <dl>
                  <dt>등급</dt>
                  <dd>
                    {car.grades.map((grade, idx) => (
                      <div
                        key={idx}
                        className={`selectBtn grade ${grade.id === selectGrade ? "clicked" : null}`}
                        onClick={() => {
                          segSelectGrade(grade.id);
                          segSelectTrim("1");
                        }}>
                        {grade.name}
                      </div>
                    ))}
                  </dd>
                </dl>

                {/* 트림 Trim */}
                <dl>
                  <dt>트림</dt>
                  <dd>
                    {grade.trims.map((trim, index) => (
                      <div
                        key={trim.name}
                        className={`selectBtn ${trim.id === selectTrim ? "clicked" : null} trim`}
                        onClick={() => {
                          segSelectTrim(trim.id);
                        }}>
                        {trim.name}
                      </div>
                    ))}
                  </dd>
                </dl>
              </S.SelectWrapper>

              {/* 가격 price */}
              <S.PriceDl>
                <dt>가격</dt>
                <dd>
                  <p>
                    {trim.price.toLocaleString("ko-KR")} <span>만원</span>
                  </p>
                </dd>
              </S.PriceDl>

              {/* 제원 SPAC */}
              <S.SpacDl>
                <dt>제원</dt>
                <div style={{ position: "absolute", bottom: "0" }}></div>
                {/* 가솔린, 디젤, LPG */}
                {trim.field === "ICE" && (
                  <dd>
                    {/* OPTION chart 1LINE */}
                    <S.ChartDl>
                      <dt>연료</dt>
                      <dd>{trim.fuel_type}</dd>
                      <dt>엔진형식</dt>
                      <dd>{trim.engine}</dd>
                      <dt>배기량</dt>
                      <dd>{trim.displacement}</dd>
                      <dt>변속기</dt>
                      <dd>
                        {trim.trans_mission.gear} {trim.trans_mission.type}
                      </dd>
                      <dt>구동방식</dt>
                      <dd>{trim.driving_system}</dd>
                      <dt>최고출력</dt>
                      <dd>{trim.power}</dd>
                      <dt>최대토크</dt>
                      <dd>{trim.torque.toFixed(1)}</dd>
                    </S.ChartDl>
                    {/* OPTION 2LINE */}
                    <S.ChartDl>
                      <dt>복합연비</dt>
                      <dd>{trim.gas_mileage.toFixed(1)}</dd>
                      <dt>도심연비</dt>
                      <dd>{trim.urban_gas_mileage.toFixed(1)}km/l</dd>
                      <dt>고속도로연비</dt>
                      <dd>{trim.highway_gas_mileage.toFixed(1)}km/l</dd>
                      <dt>연비등급</dt>
                      <dd>{trim.low_emission}</dd>
                      <dt>공차중량</dt>
                      <dd>{trim.vehicle_weight}kg</dd>
                    </S.ChartDl>
                    {/* OPTION 3LINE */}
                    <S.ChartDl>
                      <dt>앞타이어규격</dt>
                      <dd>
                        {trim.front_tire.width} {trim.front_tire.flatness}R {trim.front_tire.inch}
                      </dd>
                      <dt>뒷타이어규격</dt>
                      <dd>
                        {trim.rear_tire.width} {trim.rear_tire.flatness}R {trim.rear_tire.inch}
                      </dd>
                      <dt>전륜브레이크</dt>
                      <dd>{trim.front_suspension}</dd>
                      <dt>후륜브레이크</dt>
                      <dd>{trim.rear_suspension}</dd>
                      <dt>전륜서스펜션</dt>
                      <dd>{trim.front_brake}</dd>
                      <dt>후륜서스펜션</dt>
                      <dd>{trim.rear_brake}</dd>
                      <dt>탑승정원</dt>
                      <dd>{trim.capacity}</dd>
                    </S.ChartDl>
                  </dd>
                )}

                {/* 하이브리드 */}
                {trim.field === "HEV" && (
                  <dd>
                    {/* OPTION 1LINE */}
                    <S.ChartDl>
                      <dt>연료</dt>
                      <dd>{trim.fuelType}</dd>
                      <dt>엔진형식</dt>
                      <dd>{trim.engine}</dd>
                      <dt>배기량</dt>
                      <dd>{trim.displacement}</dd>
                      <dt>변속기</dt>
                      <dd>{trim.transMission}</dd>
                      <dt>구동방식</dt>
                      <dd>{trim.drivingSystem}</dd>
                      <dt>최고출력</dt>
                      <dd>{trim.power}</dd>
                      <dt>최대토크</dt>
                      <dd>{trim.torque}</dd>
                    </S.ChartDl>

                    {/* OPTION 2LINE */}
                    <S.ChartDl>
                      <dt>연비등급</dt>
                      <dd>{trim.ratingGasMileage}</dd>
                      <dt>복합연비</dt>
                      <dd>{trim.complexGasMileage}</dd>
                      <dt>도심연비</dt>
                      <dd>{trim.urbanGasMileage}</dd>
                      <dt>고속도로연비</dt>
                      <dd>{trim.highwayGasMileage}</dd>
                      <dt>저공해등급</dt>
                      <dd>{trim.lowEmission}</dd>
                      <dt>모터출력</dt>
                      <dd>{trim.motorPower}</dd>
                      <dt>모터토크</dt>
                      <dd>{trim.motorTorque}</dd>
                      <dt>배터리타입</dt>
                      <dd>{trim.batteryType}</dd>
                      <dt>배터리용량</dt>
                      <dd>{trim.batteryVolume}</dd>
                    </S.ChartDl>

                    {/* OPTION 3LINE */}
                    <S.ChartDl>
                      <dt>자율주행 레벨</dt>
                      <dd>{trim.autoLevel}</dd>
                      <dt>공차중량</dt>
                      <dd>{trim.vehicleWeight}</dd>
                      <dt>앞타이어규격</dt>
                      <dd>{trim.frontTire}</dd>
                      <dt>뒷타이어규격</dt>
                      <dd>{trim.rearTire}</dd>
                      <dt>전륜브레이크</dt>
                      <dd>{trim.frontSuspension}</dd>
                      <dt>후륜브레이크</dt>
                      <dd>{trim.rearSuspension}</dd>
                      <dt>전륜서스펜션</dt>
                      <dd>{trim.frontBrake}</dd>
                      <dt>후륜서스펜션</dt>
                      <dd>{trim.rearBrake}</dd>
                      <dt>탑승정원</dt>
                      <dd>{trim.capacity}</dd>
                    </S.ChartDl>
                  </dd>
                )}

                {/* 전기 */}
                {trim.field === "EV" && (
                  <dd>
                    {/* OPTION 1LINE */}
                    <S.ChartDl>
                      <dt>연료</dt>
                      <dd>{trim.fuelType}</dd>

                      <dt>모터출력</dt>
                      <dd>{trim.motorPower}</dd>
                      <dt>모터토크</dt>
                      <dd>{trim.motorTorque}</dd>
                      <dt>구동방식</dt>
                      <dd>{trim.drivingSystem}</dd>
                      <dt>배터리종류</dt>
                      <dd>{trim.batteryType}</dd>
                      <dt>배터리용량</dt>
                      <dd>{trim.batteryVolume}</dd>
                    </S.ChartDl>

                    {/* OPTION 2LINE */}
                    <S.ChartDl>
                      <dt>연비</dt>
                      <dd>{trim.complexGasMileage}</dd>
                      <dt>저공해등급</dt>
                      <dd>{trim.lowEmission}</dd>
                      <dt>충전방식</dt>
                      <dd>{trim.charging}</dd>
                      <dt>충전시간(급속)</dt>
                      <dd>{trim.chargingQuick}</dd>
                      <dt>충전시간(완속)</dt>
                      <dd>{trim.chargingSlow}</dd>
                      <dt>자율주행 레벨</dt>
                      <dd>{trim.autoLevel}</dd>
                      <dt>공차중량</dt>
                      <dd>{trim.vehicleWeight}</dd>
                    </S.ChartDl>

                    {/* OPTION 3LINE */}
                    <S.ChartDl>
                      <dt>앞타이어규격</dt>
                      <dd>{trim.frontTire}</dd>
                      <dt>뒷타이어규격</dt>
                      <dd>{trim.rearTire}</dd>
                      <dt>전륜브레이크</dt>
                      <dd>{trim.frontSuspension}</dd>
                      <dt>후륜브레이크</dt>
                      <dd>{trim.rearSuspension}</dd>
                      <dt>전륜서스펜션</dt>
                      <dd>{trim.frontBrake}</dd>
                      <dt>후륜서스펜션</dt>
                      <dd>{trim.rearBrake}</dd>
                      <dt>탑승정원</dt>
                      <dd>{trim.capacity}</dd>
                    </S.ChartDl>
                  </dd>
                )}
              </S.SpacDl>

              {/* 차량 사이즈이미지 */}
              <S.SizeBox>
                {/* 차량 앞면 이미지 */}
                <div className="size_img front">
                  <span className="wrap_thumb">
                    <img className="sizeimg" src={`${imageUrl}/size_info/suv/img_suv_front.png`} alt="SUVFrontImage" />
                  </span>
                  <span className="wrap_size track">
                    <span className="txt">
                      윤거전
                      <span> {trim.track}</span>
                    </span>
                    <span className="line"></span>
                  </span>
                  <span className="wrap_size weight">
                    <span className="txt">
                      전폭
                      <span> {trim.weight}</span>
                    </span>
                    <span className="line"></span>
                  </span>
                </div>
                {/* 차량 옆면 이미지 */}
                <div className="size_img side">
                  <span className="wrap_thumb">
                    <img className="sizeimg" src={`${imageUrl}/size_info/suv/img_suv_side.png`} alt="SUVsideImage" />
                  </span>
                  <span className="wrap_size wheelbase">
                    <span className="txt">
                      축거
                      <span> {trim.wheelBase}</span>
                    </span>
                    <span className="line"></span>
                  </span>
                  <span className="wrap_size length">
                    <span className="txt">
                      전장
                      <span> {trim.length}</span>
                    </span>
                    <span className="line"></span>
                  </span>
                </div>
                {/* 차량 뒷면 이미지 */}
                <div className="size_img rear">
                  <span className="wrap_thumb">
                    <img className="sizeimg" src={`${imageUrl}/size_info/suv/img_suv_rear.png`} alt="SUVrearImage" />
                  </span>
                  <span className="wrap_size tread">
                    <span className="txt">
                      윤거후
                      <span> {trim.tread}</span>
                    </span>
                    <span className="line"></span>
                  </span>
                  <span className="wrap_size height">
                    <span className="txt">
                      전고
                      <span> {trim.height}</span>
                    </span>
                    <span className="line"></span>
                  </span>
                </div>
              </S.SizeBox>
            </div>
          </S.ChartWrapper>

          {/* 포토갤러리 스크롤이동 위치, height = section간격 */}
          <S.MoveRef height="180px" ref={photoRef}></S.MoveRef>

          {/* PHOTO GALLERY */}
          <S.SwiperWrap>
            <div className="slideHead">
              <div className="buttonGroup">
                {/* 외부버튼 */}
                <div
                  onClick={() => {
                    viewChange(0);
                  }}
                  className={`changeBtn exBtn ${viewPhoto[0] ? "active" : "inactive"}`}>
                  외부
                </div>
                {/* 외부버튼 */}

                <div
                  onClick={() => {
                    viewChange(1);
                  }}
                  className={`changeBtn inBtn ${viewPhoto[1] ? "active" : "inactive"}`}>
                  내부
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
                    <img src={`${car.image_path}/exterior/${idx}.jpg`} alt={car.english_name} />
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
                    <img src={`${car.image_path}/exterior/${idx}.jpg`} alt={car.english_name} />
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
          </S.SwiperWrap>

          {/* 댓글 스크롤이동 위치, height = section간격 */}
          <S.MoveRef height="200px" mt="150px" ref={commentRef}></S.MoveRef>
        </MaxContainer>
      </section>
    );
  } else {
    return <p>디테일</p>;
  }
}
