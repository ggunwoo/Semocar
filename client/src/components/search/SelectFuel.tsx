import { FUELTYPE_LIST } from "../../../utils/constants";

export default function SelectSegment() {
  return (
    <ul className="list fuel-list">
      {FUELTYPE_LIST.map(ft => (
        <li key={ft.id}>
          <span>{ft.name}</span>
        </li>
      ))}
    </ul>
  );
}
