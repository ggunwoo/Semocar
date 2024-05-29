import "../../styles/test.scss";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { SEGMENT_LIST, FUELTYPE_LIST } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

import SelectBrand from "../search/SelectBrand";

export default function SelectBox() {
  const dispatch = useAppDispatch;
  const navigate = useNavigate();

  const brands = useAppSelector(state => state.brandList.items);

  return (
    <section className="container-select-box">
      <article className="select-line">
        <h2>브랜드</h2>
        <ul className="list brand-list">
          {brands.map(brand => (
            <li className="brand-item">
              <div className="logo">
                <img className="logo-img" src={`${brand.logo_path}`} />
              </div>
              <p className="name">{brand.name}</p>
            </li>
          ))}
        </ul>
      </article>
      <article className="select-line ">
        <h2>차급</h2>
        <ul className="list seg-list">
          {SEGMENT_LIST.map((segment, idx) => (
            <li key={idx}>
              <p>{segment}</p>
            </li>
          ))}
        </ul>
      </article>
      <article className="select-line ">
        <h2>연료</h2>
        <ul className="list fuel-list">
          {FUELTYPE_LIST.map(ft => (
            <li key={ft.id}>{ft.name}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
