import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { SEGMENT_SIZE_LIST, SEGMENT_BODY_LIST, SEGMENT_SIZE_IDS, SEGMENT_BODY_IDS } from "../../../utils/constants";
import { segSizeIn, segSizeReset, segBodyIn, segBodyReset } from "../../store/slice/selectedSlice";

export default function SelectSegment() {
  const dispatch = useAppDispatch();
  const sizeList = useAppSelector(state => state.selectedSegSize);
  const bodyList = useAppSelector(state => state.selectedSegBody);

  console.log(sizeList);
  console.log(bodyList);

  return (
    <ul className="list seg-list">
      <div>
        {SEGMENT_SIZE_LIST.map((size, idx) => (
          <li
            key={SEGMENT_SIZE_IDS[size]}
            onClick={() => dispatch(segSizeIn(size))}
            className={`item seg-item ${sizeList.includes(size) && "active"}`}>
            <p>{size}</p>
          </li>
        ))}
      </div>
      <div>
        {SEGMENT_BODY_LIST.map((body, idx) => (
          <li
            key={SEGMENT_BODY_IDS[body]}
            onClick={() => dispatch(segBodyIn(body))}
            className={`item seg-item ${bodyList.includes(body) && "active"}`}>
            <p>{body}</p>
          </li>
        ))}
      </div>
    </ul>
  );
}
