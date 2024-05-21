import "../../styles/components/search/car_list.scss";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import * as type from "../../types/types";
import { fetchCarList } from "../../store/slice/useCarSlice";

// COMPONENTS
import { SearchBar } from "./SearchBar";

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
  const [thumnail, setThumnail] = useState([]);
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
      dispatch(fetchCarList());
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
        const modelName = car.model;
        // 객체에 키값이 존재하지않으면 빈 배열 생성
        if (!modelMap[modelName]) {
          modelMap[modelName] = {
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
      const sortedModelList = Object.keys(modelMap).map(modelName => {
        const sortedGenerations = modelMap[modelName].generations.sort((a, b) => {
          const dateA: number = new Date(a.date.year, a.date.month - 1).getTime();
          const dateB: number = new Date(b.date.year, b.date.month - 1).getTime();
          console.log(dateA, dateB);
          return dateB - dateA;
        });

        return {
          model: modelName,
          generations: sortedGenerations,
          segment: modelMap[modelName].segment,
          fuel_types: Array.from(modelMap[modelName].fuel_types),
        };
      });

      setModelList(sortedModelList);
    };

    handleModelList();
  }, [getCars, selectBrand, selectSeg, selectFuel]);

  useEffect(() => {
    setToggleOpen(Array(modelList.length).fill(false));
    setThumnail(Array(modelList.length).fill(0));
  }, [modelList]);

  const handleToggle = idx => {
    let copyArr = [...toggleOpen];
    copyArr[idx] = !copyArr[idx];
    setToggleOpen(copyArr);
  };

  const handleThumnail = (listIdx, generIdx) => {
    console.log(listIdx, generIdx);
    let copyArr = [...thumnail];
    copyArr[listIdx] = generIdx;
    setThumnail(copyArr);
  };

  if (status == "loading") {
    return <div>Loading...!</div>;
  }

  if (status === "failed") {
    return <div>Error!</div>;
  }

  console.log("cars: ", cars);
  console.log("modelList: ", modelList);
  console.log("thumnail Number: ", thumnail);
  console.log("toggle: ", toggleOpen);

  return (
    <section className="container-car-list">
      {/* 상단 탭 */}
      <article className="list-nav">
        <div></div>
        {/* 검색 컴포넌트 */}
        <div>
          <SearchBar />
        </div>
      </article>
      {/* TODO: 목록은 model 기준으로만 구성하기 */}
      <S.CarSection className="car-list">
        {(() => {
          if (thumnail.length === 0) {
            return <div style={{ width: "100%" }}>해당되는 차량이 없습니다.</div>;
          } else {
            return modelList.map((cars, idx) => (
              <S.CarArticle key={idx}>
                <div
                  className="car_head"
                  onClick={() => {
                    navigate(`/detail/${cars.generations[thumnail[idx]].id}`);
                  }}>
                  <div className="img_wrap">
                    <img
                      src={`${cars.generations[thumnail[idx]].image_path}/model_image.png`}
                      alt={cars.generations[thumnail[idx]].name}
                    />
                  </div>
                  <span>
                    {typeof cars.generations[thumnail[idx]].brand === "string"
                      ? `${cars.generations[thumnail[idx]].brand}`
                      : `${cars.generations[thumnail[idx]].brand.name} ${cars.generations[thumnail[idx]].name}`}
                  </span>{" "}
                  <span>{cars.generations[thumnail[idx]].model_initial.toUpperCase()}</span>
                  <br />
                  <span>
                    {cars.generations[thumnail[idx]].date.year}.
                    {cars.generations[thumnail[idx]].date.month.toString().length === 1
                      ? "0" + cars.generations[thumnail[idx]].date.month
                      : cars.generations[thumnail[idx]].date.month}
                  </span>
                </div>
                {cars.generations.length != 1 ? (
                  <div
                    className="prev-button"
                    onClick={() => {
                      handleToggle(idx);
                    }}>
                    {toggleOpen[idx] ? (
                      <p
                        onClick={() => {
                          handleThumnail(idx, 0);
                        }}>
                        닫기 △
                      </p>
                    ) : (
                      <p>이전 모델 ▽</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p>이전 모델 없음</p>
                  </div>
                )}

                <div className={`prev-car ${toggleOpen[idx] ? "prev-open" : "prev-close"}`}>
                  {cars.generations.map((car, generIdx) => {
                    if (generIdx > 0) {
                      return (
                        <div
                          key={car.id}
                          onMouseOver={() => {
                            handleThumnail(idx, generIdx);
                          }}>
                          <span>
                            {car.date.year}.
                            {car.date.month.toString().length === 1 ? "0" + car.date.month : car.date.month}
                          </span>{" "}
                          {car.name} {car.model_initial.toUpperCase()}
                        </div>
                      );
                    }
                  })}
                </div>
              </S.CarArticle>
            ));
          }
        })()}
      </S.CarSection>

      {/* </div> */}
    </section>
  );
}
