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

export function CarView() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Cars Data
  const getCars: type.CarType[] = useAppSelector(state => state.carList.items);
  const [cars, setCars] = useState([]);
  const [modelList, setModelList] = useState<{ model: string; generations: type.CarType[] }[]>([]);
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
      const modelMap: { [Key: string]: type.CarType[] } = {};

      getCars.forEach(car => {
        const modelName = car.model;
        if (!modelMap[modelName]) {
          modelMap[modelName] = [];
        }
        modelMap[modelName].push(car);
      });

      const sortedModelList = Object.keys(modelMap).map(modelName => {
        const sortedGenerations = modelMap[modelName].sort((a, b) => {
          const dateA: number = new Date(a.date.year, a.date.month - 1).getTime();
          const dateB: number = new Date(b.date.year, b.date.month - 1).getTime();
          console.log(dateA, dateB);
          return dateB - dateA;
        });
        return {
          model: modelName,
          generations: sortedGenerations,
        };
      });

      setModelList(sortedModelList);
    };

    const handleCarfilter = () => {
      let copyCars = [...getCars];
      setCars(copyCars);
    };

    handleModelList();
    handleCarfilter();
  }, [getCars]);

  console.log(cars);

  console.log(modelList);

  if (status == "loading") {
    return <div>Loading...!</div>;
  }

  if (status === "failed") {
    return <div>Error!</div>;
  }

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
      <S.CarSection>
        {(() => {
          if (cars.length === 0) {
            return <div style={{ width: "100%" }}>해당되는 차량이 없습니다.</div>;
          } else {
            return modelList.map((cars, index) => (
              <S.CarArticle key={index}>
                <div
                  className="car_head"
                  onClick={() => {
                    navigate(`/detail/${cars.generations[0].id}`);
                  }}>
                  <div className="img_wrap">
                    <img
                      loading="lazy"
                      src={`${cars.generations[0].image_path}/model_image.png`}
                      alt={cars.generations[0].name}
                    />
                  </div>
                  <span>
                    {typeof cars.generations[0].brand === "string"
                      ? `${cars.generations[0].brand}`
                      : `${cars.generations[0].brand.name} ${cars.generations[0].name}`}
                  </span>
                  {" "}
                  <span>{cars.generations[0].model_initial.toUpperCase()}</span>
                  <br />
                  <span>
                    {cars.generations[0].date.year}.
                    {cars.generations[0].date.month.toString().length === 1
                      ? "0" + cars.generations[0].date.month
                      : cars.generations[0].date.month}
                  </span>
                </div>
                <div className="prev-button">이전 세대 모델 ▽</div>
                <div className="prev-car">
                  {cars.generations.map((car, idx, arr) => {
                    if (idx > 0) {
                      return (
                        <div key={car.id}>
                          <span>
                            {car.date.year}.
                            {car.date.month.toString().length === 1 ? "0" + car.date.month : car.date.month}
                          </span>
                          {" "}
                          {car.name}
                          {" "}
                          {car.model_initial.toUpperCase()}
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
