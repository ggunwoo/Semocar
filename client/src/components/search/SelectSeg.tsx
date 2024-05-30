import { SEGMENT_IDS, SEGMENT_LIST } from "../../../utils/constants";

export default function SelectSegment() {
  return (
    <ul className="list seg-list">
      {SEGMENT_LIST.map((segment, idx) => (
        <li key={SEGMENT_IDS[segment]}>
          <p>{segment}</p>
        </li>
      ))}
    </ul>
  );
}
