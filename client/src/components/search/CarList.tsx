import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import * as type from "../../types/types";
import { fetchCarList } from "../../store/api/carApi";

// COMPONENTS
import SearchBar from "./SearchBar";
import Spinner from "../Spinner"

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
    <article className={`container-car-list`}>
      {/* 상단 탭 */}
      <nav className="list-nav">
        <div></div>
        {/* 검색 컴포넌트 */}
        <div>
          <SearchBar />
        </div>
      </nav>
      {/* TODO: 목록은 model 기준으로만 구성하기 */}
      <ul className={`car-list grid-rows-4 ${status === "loading" && "list-reloading"}`}>
        {status === "loading" && (
          <Spinner />
        )}
        {cars.length === 0 ? (
          <div className="car-empty" style={{ width: "100%" }}>
            해당되는 차량이 없습니다.
          </div>
        ) : (
          cars.map((car, idx) => (
            <li key={idx} className={`car-items`}>
              {car.generations[selectModel[idx]] && (
                <>
                  <div
                    className="car-info"
                    onClick={() => {
                      navigate(`/detail/${car.generations[selectModel[idx]].id}`);
                    }}>
                    <div className="car-image">
                      <img src={`${car.generations[selectModel[idx]].image_path}/model_image.png`} alt={car.name} />
                    </div>
                    <span>{car.name}</span>
                  </div>
                  {/* --toggle 버튼 */}
                  <div
                    className="model-list-toggle-button"
                    onClick={() => {
                      toggle(idx);
                    }}>
                    <p>
                      <span>{car.generations[selectModel[idx]].date.year}&nbsp;</span>
                      <span>{car.generations[selectModel[idx]].name.toUpperCase()}&nbsp;</span>
                      <span>{car.generations[selectModel[idx]].model_initial.toUpperCase()}&nbsp;</span>
                      {toggleOpen[idx] ? <span>▲</span> : <span>▼</span>}
                    </p>
                  </div>

                  <div className={`car-model-list ${toggleOpen[idx] ? "model-list-open" : "model-list-close"}`}>
                    {car.generations.map((car, generIdx) => {
                      return (
                        <div key={car.id} className={` ${selectModel[idx] === generIdx ? "focus" : "unfocus"}`}>
                          <span>{car.date.year}&nbsp;</span>
                          <span>
                            {car.name}&nbsp;{car.model_initial.toUpperCase()}&nbsp;
                          </span>
                          {/* <span>{generIdx}</span> */}
                          <button
                            onClick={() => {
                              handleselectModel(idx, generIdx);
                            }}>
                            선택
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
      {/* <TestList /> */}
    </article>
  );
}
