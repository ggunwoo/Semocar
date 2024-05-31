import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { FUELTYPE_LIST } from "../../../../utils/constants";
import { fuelIn } from "../../../store/slice/selectedSlice";

export default function FuelTypeList() {
  const dispatch = useAppDispatch();
  const ftList = useAppSelector(state => state.selectedFuel);

  console.log(ftList);

  return (
    <ul>
      {FUELTYPE_LIST.map(ft => (
        <li
          key={ft.id}
          onClick={() => dispatch(fuelIn(ft.id))}
          className={`${ftList.includes(ft.id) && "active"}`}>
          <p>{ft.name}</p>
        </li>
      ))}
    </ul>
  );
}
