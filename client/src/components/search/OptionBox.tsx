import "../../styles/search.scss";
import BrandList from "./options/BrandList";
import SegmentList from "./options/SegmentList";
import FuelTypeList from "./options/FuelTypeList";

export default function OptionBox() {

  return (
    <section className="container-select-box">
      <article className="line brand-line">
        <h2>브랜드</h2>
        <BrandList />
      </article>
      <article className="line segment-line ">
        <h2>차급</h2>
        <SegmentList />
      </article>
      <article className="line fuelType-line ">
        <h2>연료</h2>
        <FuelTypeList />
      </article>
    </section>
  );
}

