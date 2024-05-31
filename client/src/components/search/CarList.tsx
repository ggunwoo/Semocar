import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import * as type from "../../types/types";
import { fetchCarList } from "../../store/api/carApi";

// COMPONENTS
import SearchBar from "./SearchBar";
import Spinner from "../Spinner";
import { Generator } from "webpack";

export default function CarList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Select State
  const selectBrand = useAppSelector(state => state.selectedBrand);
  const selectSegSize = useAppSelector(state => state.selectedSegSize);
  const selectSegBody = useAppSelector(state => state.selectedSegBody);
  const selectFuel = useAppSelector(state => state.selectedFuel);
  // Cars Data
  const cars: type.ModelListType[] = useAppSelector(state => state.carList.items);
  const status = useAppSelector(state => state.carList.status);
  const error = useAppSelector(state => state.carList.error);

  const [selectModel, setSelectModel] = useState([]);
  const [toggleOpen, setToggleOpen] = useState([]);

  const carListStyle = useAppSelector(state => state.carListStyle);

  useEffect(() => {
    dispatch(fetchCarList({ selectBrand, selectSegSize, selectSegBody, selectFuel }));
  }, [selectBrand, selectSegSize, selectSegBody, selectFuel, dispatch]);

  useEffect(() => {
    setToggleOpen(Array(cars.length).fill(false));
    setSelectModel(Array(cars.length).fill(0));
  }, [cars]);

  // TODO: model-list 열고 닫기, 다른거 열면 그 외 전부 닫히고, 다시누르면 그거만 닫히기
  const toggle = (idx: number) => {
    setToggleOpen(prev => {
      const clearArr = Array(cars.length).fill(false);
      clearArr[idx] = !prev[idx];
      return clearArr;
    });
  };

  const handleselectModel = (listIdx, generIdx) => {
    let copyArr = [...selectModel];
    copyArr[listIdx] = generIdx;
    setSelectModel(copyArr);
  };

  if (status === "failed") {
    return <div>Error!</div>;
  }

  // console.log("cars: ", cars);

  return (
    <ul className={`car-list grid-rows-${carListStyle} ${status === "loading" && "list-reloading"}`}>
      {/* TODO: 목록은 model 기준으로만 구성하기 */}
      {status === "loading" && <Spinner />}
      {cars.length === 0 ? (
        <div className="car-empty" style={{ width: "100%" }}>
          해당되는 차량이 없습니다.
        </div>
      ) : (
        cars.map((car, idx) => (
          // 차량
          <li key={idx} className={`car`}>
            {car.generations[selectModel[idx]] && (
              <section className="card">
                {/* 모델명 */}
                <article className="head">
                  <img
                    width="40px"
                    height="auto"
                    src={`${car.generations[selectModel[idx]].brand.logo_path}`}
                    alt={car.generations[selectModel[idx]].name}></img>
                  <p className="model-name">{car.name.toUpperCase()}</p>
                </article>
                {/* 이미지 */}
                <figure className="img-wrap">
                  <img
                    width="250px"
                    height="auto"
                    src={`${car.generations[selectModel[idx]].image_path}/model_image.png`}
                    alt={car.name}
                    onClick={()=>(navigate(`detail/${car.generations[selectModel[idx]].id}`))}
                  />
                </figure>
                {/* 선택된 세대 모델 이름 및 정보 */}
                <article className="select-model">
                  <div
                    className="model"
                    onClick={() => {
                      toggle(idx);
                    }}>
                    <div className="name">
                      <span>{car.generations[selectModel[idx]].date.year}&nbsp;</span>
                      <span>{car.generations[selectModel[idx]].name.toUpperCase()}&nbsp;</span>
                      <span>{car.generations[selectModel[idx]].model_initial.toUpperCase()}&nbsp;</span>
                    </div>
                    <div className="arrow">{toggleOpen[idx] ? <span>▲</span> : <span>▼</span>}</div>
                  </div>
                  <div className={`gener ${toggleOpen[idx] ? "model-list-open" : "model-list-close"}`}>
                    {car.generations.map((model, generIdx) => (
                      <div className={`gener-item ${selectModel[generIdx] === generIdx && "seleted"}`}>
                        <span className="year">{model.date.year}&nbsp;</span>
                        <span className="name">{model.name.toUpperCase()}&nbsp;</span>
                        <span className="initial">{model.model_initial.toUpperCase()}&nbsp;</span>
                        <button
                          onClick={() => {
                            handleselectModel(idx, generIdx);
                          }}>
                          선택
                        </button>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="simple-info">
                  <p>
                    {car.generations[selectModel[idx]].segment.size}
                    {car.generations[selectModel[idx]].segment.body}
                  </p>
                  <p>
                    {car.generations[selectModel[idx]].fuel_types.map((ft, idx, arr) =>
                      idx === arr.length - 1 ? ft.name : ft.name + ", "
                    )}
                  </p>
                </article>
                {/* 상세정보 보러가기 버튼 */}
                <button>상세정보</button>
              </section>
            )}
          </li>
        ))
      )}
    </ul>
  );
}
