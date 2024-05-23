import "../../styles/components/admin.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchCarAllList, fetchCar } from "../../store/api/carApi";
import { useState, useEffect } from "react";
import CarEditForm from "./CarEditForm";

export default function CarListPage() {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(state => state.carList.items);
  const status = useAppSelector(state => state.carList.status);
  const error = useAppSelector(state => state.carList.error);

  const [editingCarIds, setEditingCarIds] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCarAllList());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>{error}</div>;
  }

  const handleEditClick = carId => {
    setEditingCarIds(prev => ({ ...prev, [carId]: true }));
  };
  const onCancelEdit = carId => {
    setEditingCarIds(prev => ({ ...prev, [carId]: false }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO : CarEditForm에 있는 수정된 carData가 차량 데이터 수정
    // 엔드포인트 : "/cars/:id", HTTP 요청 : put
  };

  return (
    <section>
      <h1>자동차 리스트</h1>
      <ul>
        {cars.map((car, i) => (
          <li key={car.id}>
            {/* <form> */}
            <article className="top_article">
              <span>{car.name}</span>
              {!editingCarIds[car.id] ? (
                <button onClick={() => handleEditClick(car.id)}>보기</button>
              ) : (
                <>
                  {/* <button>저장</button> */}
                  <button type="button" onClick={() => onCancelEdit(car.id)}>
                    닫기
                  </button>
                </>
              )}
              {/* <button>down</button> */}
            </article>
            {editingCarIds[car.id] ? (
              <CarEditForm carId={car.id} />
            ) : (
              <div></div>
            )}
            {/* </form> */}
          </li>
        ))}
      </ul>
    </section>
  );
}
