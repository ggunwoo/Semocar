import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchBrands } from "../../store/api/brandApi";
import { brandIn, brandReset } from "../../store/slice/SelectedSlice";

export default function SelectBrand() {
  const dispatch = useAppDispatch();
  const brands = useAppSelector(state => state.brandList.items);
  const status = useAppSelector(state => state.brandList.status);
  const error = useAppSelector(state => state.brandList.error);
  const selectedBrand = useAppSelector(state => state.selectedBrand);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBrands());
    }
  }, []);

  const handleBrand = (brandOBID: string, idx: number) => {
    console.log(brandOBID);
    dispatch(brandIn(brandOBID));
  };

  // console.log(brands);
  console.log(selectedBrand);

  return (
    <ul className="list brand-list">
      {brands.map((brand, i) => (
        <li
          key={brand._id}
          className={`brand-item ${selectedBrand.includes(brand._id) && "active"}`}
          onClick={() => {
            handleBrand(brand._id, i);
          }}>
          <div className="logo">
            <img className="logo-img" src={`${brand.logo_path}`} />
          </div>
          <p className="name">{brand.name}</p>
        </li>
      ))}
    </ul>
  );
}
