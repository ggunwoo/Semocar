import "../../styles/components/search/car_list.scss";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import * as type from "../../types/types";
import { fetchCarAllList } from "../../store/api/carApi";

// COMPONENTS
import { SearchBar } from "./SearchBar";
import TestList from "./testList";

// STYLED
import { MaxContainer } from "../../styled/Global";
import * as S from "../../styled/components/CarView.styled";

// TYPE
interface ModelListType {
  model: string;
  segment: string;
  fuel_types: { name: string; id: string }[];
  generations: type.CarType[];
}

export function CarList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Cars Data
  const getCars: type.CarType[] = useAppSelector(state => state.carList.items);
  const [cars, setCars] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [seletModel, setSeletModel] = useState([]);
  const [toggleOpen, setToggleOpen] = useState([]);
  const status = useAppSelector(state => state.carList.status);
  const error = useAppSelector(state => state.carList.error);

  // Select State
  const selectBrand = useAppSelector(state => state.selectedBrand);
  const selectSeg = useAppSelector(state => state.selectedSeg);
  const selectFuel = useAppSelector(state => state.selectedFuel);
  // cars, selectedBrand, selectedSeg, selectedFuel

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCarAllList());
    }
  }, []);

  useEffect(() => {
    // TODO: getCars를 selected된 데이터에 의거하여 필터링하기

    // TODO: model별로 나뉘어서 목록 생성, 목록은 모델에 따른 세대별 모델로 구성
    // 예: avante모델에 더뉴 아반떼 CN7, 아반떼 CN7, 아반떼 AD 등등
    // 목록 순서는 출시일(yyyy.mm) 기준 가장 최신출시 모델순으로 정렬
    // 가장 최신 모델(목록(배열)의 가장 첫 모델)을 default값으로
    // default값을 가지고 카드형식에 목록에 썸네일 정보 표시 후
    // 드롭 다운 형식으로 이전 세대 모델 선택가능, 선택 시 썸네일 정보 변경
    const handleModelList = () => {
      const modelMap = {};

      getCars.forEach(car => {
        const modelName = car.model.english_name;
        // 객체에 키값이 존재하지않으면 빈 배열 생성
        if (!modelMap[modelName]) {
          modelMap[modelName] = {
            name: car.model.name,
            generations: [],
            segment: car.segment,
            fuel_types: new Set(),
          };
        }
        // 배열에 객체 추가
        modelMap[modelName].generations.push(car);
        car.fuel_types.forEach(fuel => modelMap[modelName].fuel_types.add(fuel.name));
      });
      // 세대별 차량을 배열 형식으로 오름차순 저장(generations)
      const createModelMap = Object.keys(modelMap).map(modelName => {
        const sortedGenerations = modelMap[modelName].generations.sort((a, b) => {
          const dateA: number = new Date(a.date.year, a.date.month - 1).getTime();
          const dateB: number = new Date(b.date.year, b.date.month - 1).getTime();
          return dateB - dateA;
        });

        console.log(modelMap);

        return {
          model: modelName,
          name: modelMap[modelName].name,
          generations: sortedGenerations,
          segment: modelMap[modelName].segment,
          fuel_types: Array.from(modelMap[modelName].fuel_types),
        };
      });

      setModelList(createModelMap);
    };

    handleModelList();
  }, [getCars, selectBrand, selectSeg, selectFuel]);

  useEffect(() => {
    setToggleOpen(Array(modelList.length).fill(false));
    setSeletModel(Array(modelList.length).fill(0));
  }, [modelList]);

  // --자동차 이미지 비동기 호출
  useEffect(() => {}, []);

  // TODO: model-list 열고 닫기, 다른거 열면 그 외 전부 닫히고, 다시누르면 그거만 닫히기
  const toggle = idx => {
    setToggleOpen(prev => {
      let clearArr;
      if (prev[idx]) {
        // 한번 더 눌러서(true) 닫을 때
        clearArr = Array(modelList.length).fill(false);
      } else {
        // 다른거 열려고 할 때 and 처음 열 때 false값이
        clearArr = Array(modelList.length).fill(false);
        clearArr[idx] = true;
      }
      return clearArr;
    });
  };

  const handleSeletModel = (listIdx, generIdx) => {
    console.log(listIdx, generIdx);
    let copyArr = [...seletModel];
    copyArr[listIdx] = generIdx;
    setSeletModel(copyArr);
  };

  if (status == "loading") {
    return <div>Loading...!</div>;
  }

  if (status === "failed") {
    return <div>Error!</div>;
  }

  // console.log("cars: ", cars);
  // console.log("modelList: ", modelList);
  // console.log("seletModel Number: ", seletModel);
  console.log("toggle: ", toggleOpen);

  return (
    <section className="container-car-list">
      {/* 상단 탭 */}
      <nav className="list-nav">
        <div></div>
        {/* 검색 컴포넌트 */}
        <div>
          <SearchBar />
        </div>
      </nav>
      {/* TODO: 목록은 model 기준으로만 구성하기 */}
      <ul className={`car-list grid-rows-4`}>
        {(() => {
          if (seletModel.length === 0) {
            return (
              <div className="car-empty" style={{ width: "100%" }}>
                해당되는 차량이 없습니다.
              </div>
            );
          } else {
            return modelList.map((model, idx) => (
              <li key={idx} className="car-items">
                <div
                  className="car-info"
                  onClick={() => {
                    navigate(`/detail/${model.generations[seletModel[idx]].id}`);
                  }}>
                  <div className="car-image">
                    <img src={`${model.generations[seletModel[idx]].image_path}/model_image.png`} alt={model.name} />
                  </div>
                  <span>{model.name.toUpperCase()}</span>
                </div>
                {/* --toggle 버튼 */}
                <div
                  className="model-list-toggle-button"
                  onClick={() => {
                    toggle(idx);
                  }}>
                  <p>
                    <span>{model.generations[seletModel[idx]].date.year}&nbsp;</span>
                    <span>{model.generations[seletModel[idx]].name.toUpperCase()}&nbsp;</span>
                    <span>{model.generations[seletModel[idx]].model_initial.toUpperCase()}&nbsp;</span>
                    {toggleOpen[idx] ? <span>▲</span> : <span>▼</span>}
                  </p>
                </div>

                <div className={`car-model-list ${toggleOpen[idx] ? "model-list-open" : "model-list-close"}`}>
                  {model.generations.map((car, generIdx) => {
                    return (
                      <div key={car.id} className={` ${seletModel[idx] === generIdx ? "focus" : "unfocus"}`}>
                        <span>{car.date.year}&nbsp;</span>
                        <span>
                          {car.name}&nbsp;{car.model_initial.toUpperCase()}&nbsp;
                        </span>
                        <span>{generIdx}</span>
                        <button
                          onClick={() => {
                            handleSeletModel(idx, generIdx);
                          }}>
                          선택
                        </button>
                      </div>
                    );
                  })}
                </div>
              </li>
            ));
          }
        })()}
      </ul>

      {/* <TestList /> */}
    </section>
  );
}
