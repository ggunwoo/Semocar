import * as S from "../../styled/Detail.styled";
import { imageUrl } from "../../../utils/constants";

export default function SizeBox({trim}) {
  return (
    <S.SizeBox>
      {/* 차량 앞면 이미지 */}
      <div className="size_img front">
        <span className="wrap_thumb">
          <img className="sizeimg" src={`${imageUrl}/size_info/suv/img_suv_front.png`} alt="SUVFrontImage" />
        </span>
        <span className="wrap_size track">
          <span className="txt">
            윤거전
            <span> {trim?.track}</span>
          </span>
          <span className="line"></span>
        </span>
        <span className="wrap_size weight">
          <span className="txt">
            전폭
            <span> {trim?.weight}</span>
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
            <span> {trim?.wheelBase}</span>
          </span>
          <span className="line"></span>
        </span>
        <span className="wrap_size length">
          <span className="txt">
            전장
            <span> {trim?.length}</span>
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
            <span> {trim?.tread}</span>
          </span>
          <span className="line"></span>
        </span>
        <span className="wrap_size height">
          <span className="txt">
            전고
            <span> {trim?.height}</span>
          </span>
          <span className="line"></span>
        </span>
      </div>
    </S.SizeBox>
  );
}
