import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FUELTYPE_LIST } from "../../../utils/constants";
import { brandIn, fuelIn, segBodyIn, segSizeIn } from "../../store/slice/selectedSlice";
import { IoClose } from "react-icons/io5";

export default function SelectBadge() {
  const dispatch = useAppDispatch();
  const selectBrand = useAppSelector(state => state.selectedBrand);
  const selectSegSize = useAppSelector(state => state.selectedSegSize);
  const selectSegBody = useAppSelector(state => state.selectedSegBody);
  const selectFuel = useAppSelector(state => state.selectedFuel);
  const brandList = useAppSelector(state => state.brandList.items);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const combineSelect = () => {
      // TODO: 브랜드, 연료 name 구하기
      // if(){}
      const findBrand = brandList.reduce((acc, brand, idx, arr) => {
        if (selectBrand.includes(brand._id)) {
          acc.push({ id: brand._id, name: brand.name, className: "brand-badge" });
        }
        return acc;
      }, []);

      const findFuel = FUELTYPE_LIST.reduce((acc, ft) => {
        if (selectFuel.includes(ft.id)) {
          acc.push({ id: ft.id, name: ft.name, className: "fuel-badge" });
        }
        return acc;
      }, []);

      const choices = [
        ...findBrand,
        ...selectSegSize.map(size => ({ id: size, name: size, className: "seg-size-badge" })),
        ...selectSegBody.map(body => ({ id: body, name: body, className: "seg-body-badge" })),
        ...findFuel,
      ];
      setBadges(choices);
    };
    combineSelect();
  }, [selectBrand, selectSegSize, selectSegBody, selectFuel]);

  const handleRemove = (badge, cn) => {
    if (cn === "brand-badge") return dispatch(brandIn(badge));
    if (cn === "seg-size-badge") return dispatch(segSizeIn(badge));
    if (cn === "seg-body-badge") return dispatch(segBodyIn(badge));
    if (cn === "fuel-badge") return dispatch(fuelIn(badge));
    console.log("삭제 실패");
  };

  console.log(badges);

  return (
    <ul>
      {badges.map((badge, idx) => (
        <li key={idx} className={`badge ${badge.className}`}>
          <span>{badge.name}&nbsp;</span>
          <span onClick={() => handleRemove(badge.id, badge.className)}><IoClose /></span>
        </li>
      ))}
    </ul>
  );
}
