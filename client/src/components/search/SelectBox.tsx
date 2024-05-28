import "../../styles/test.scss"

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {SEGMENT_LIST, FUELTYPE_LIST} from "../../../utils/constants"
import { useNavigate } from "react-router-dom";

import SelectBrand from "../search/SelectBrand"


export default function SelectBox() {
  const dispatch = useAppDispatch;
  const navigate = useNavigate();

  const brands = useAppSelector(state =>  state.brandList.items);

  return (
    <section className="container-select-box">
      <article className={`${"select-line"} brand-list`}>
        {
          brands.map((brand)=>(
            <div className="brand-item">
              <div className="logo">
                <img className="logo-img" src={`${brand.logo_path}`} />
              </div>
              <p className="name">{brand.name}</p>
            </div>
          ))
        }
      </article>
      <article className={`select-line seg-line`}></article>
      <article className={`select-line fuel-line`}></article>
    </section>
  );
}
