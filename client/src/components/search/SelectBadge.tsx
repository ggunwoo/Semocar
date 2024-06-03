import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { FUELTYPE_LIST } from "../../../utils/constants";

export default function SelectBadge() {
  const selectBrand = useAppSelector(state => state.selectedBrand);
  const selectSegSize = useAppSelector(state => state.selectedSegSize);
  const selectSegBody = useAppSelector(state => state.selectedSegBody);
  const selectFuel = useAppSelector(state => state.selectedFuel);
  const brandList = useAppSelector(state => state.brandList.items);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const combineSelect = () => {
      // TODO: 브랜드, 연료 name 구하기
      const findBrand = brandList.reduce((acc, brand, idx, arr) => {
        if (selectBrand.includes(brand._id)) {
          acc.push({ name: brand.name, className: "brand-badge" });
        }
        return acc;
      }, []);

      console.log("findBrand: ", findBrand);

      const findFuel = FUELTYPE_LIST.reduce((acc, ft) => {
        if (selectFuel.includes(ft.id)) {
          acc.push({ name: ft.name, className: "fuel-badge" });
        }
        return acc;
      }, []);

      console.log("findFuel: ", findFuel);

      const choices = [
        ...findBrand,
        ...selectSegSize.map(size => ({ name: size, className: "seg-size-badge" })),
        ...selectSegBody.map(body => ({ name: body, className: "seg-body-badge" })),
        ...findFuel,
      ];
      setBadges(choices);
    };
    combineSelect();
  }, [selectBrand, selectSegSize, selectSegBody, selectFuel]);

  return (
    <ul>
      {badges.map((badge, idx) => (
        <li key={idx} className={`badge ${badge.className}`}>{badge.name}</li>
      ))}
    </ul>
  );
}
