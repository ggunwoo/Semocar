import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styled/Detail.styled";
import { MaxContainer } from "../../styled/Global";
import { useAppSelector } from "../../store/hooks";

export default function HeadBox({ minPrice, maxPrice, targetClick }) {
  const car = useAppSelector(state => state.car.item);
  const navigate = useNavigate();

  const [ClickCheck, setClickCheck] = useState([true, false, false]);
  const [tabFixed, setTabFixed] = useState(false);

  // .targetBtn 클릭시 설정값 스크롤 위치로 이동하는 이벤트로직
  const targetMove = (target: any) => {
    if (target.current) {
      target.current.scrollIntoView({ block: "start" });
    }
  };

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

  return (
    <>
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
      <article className={`target-nav ${tabFixed ? "fixed" : "unfixed"}`}>
        <div className="wrap">
          <div className="buttons">
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

          <div className="title-group">
            <div className="brand">
              <img src={`${car.brand.logo_path}`} alt={car.brand.english_name} />
              {/* <span className="brand">{car.brand.name}</span> */}
            </div>
            <span className="name">
              {car.name}&nbsp;{car.model_initial.toUpperCase()}
            </span>
          </div>

          <div className="nav">
            <div onClick={() => navigate("/")}>홈</div>
            <div>로그인</div>
          </div>
        </div>
      </article>
    </>
  );
}
