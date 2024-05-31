import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { SEGMENT_SIZE_LIST, SEGMENT_BODY_LIST, SEGMENT_SIZE_IDS, SEGMENT_BODY_IDS } from "../../../utils/constants";
import { segSizeIn, segSizeReset, segBodyIn, segBodyReset } from "../../store/slice/SelectedSlice";

export default function SelectSegment() {
  const dispatch = useAppDispatch();
  const sizeList = useAppSelector(state => state.selectedSegSize);
  const bodyList = useAppSelector(state => state.selectedSegBody);

  console.log(sizeList)
  console.log(bodyList)

  const updateSize = size => {
    dispatch(segSizeIn(size));
  };
  const updateBody = body => {
    dispatch(segBodyIn(body));
  };

  return (
    <>
      <ul className="list seg-list">
        {SEGMENT_SIZE_LIST.map((size, idx) => (
          <li
            key={SEGMENT_SIZE_IDS[size]}
            onClick={() => updateSize(size)}
            className={`seg-item ${sizeList.includes(size) && "active"}`}>
            <p>{size}</p>
          </li>
        ))}
      </ul>
      <ul className="list seg-list">
        {SEGMENT_BODY_LIST.map((body, idx) => (
          <li
            key={SEGMENT_BODY_IDS[body]}
            onClick={() => updateBody(body)}
            className={`seg-item ${bodyList.includes(body) && "active"}`}>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
