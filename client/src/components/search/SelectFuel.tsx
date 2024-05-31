import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { FUELTYPE_LIST } from "../../../utils/constants";
import { fuelIn } from "../../store/slice/selectedSlice";

export default function SelectSegment() {
  const dispatch = useAppDispatch();
  const ftList = useAppSelector(state => state.selectedFuel);

  console.log(ftList);

  return (
    <ul className="list fuel-list">
      {FUELTYPE_LIST.map(ft => (
        <li
          key={ft.id}
          onClick={() => dispatch(fuelIn(ft.id))}
          className={`item fuel-item ${ftList.includes(ft.id) && "active"}`}>
          <span>{ft.name}</span>
        </li>
      ))}
    </ul>
  );
}
