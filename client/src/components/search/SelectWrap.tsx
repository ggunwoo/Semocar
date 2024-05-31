import "../../styles/search.scss";
import SelectBrand from "./SelectBrand";
import SelectSeg from "./SelectSeg";
import SelectFuel from "./SelectFuel";

export default function SelectWrap() {

  return (
    <section className="container-select-box">
      <article className="select-line">
        <h2>브랜드</h2>
        <SelectBrand />
      </article>
      <article className="select-line ">
        <h2>차급</h2>
        <SelectSeg />
      </article>
      <article className="select-line ">
        <h2>연료</h2>
        <SelectFuel />
      </article>
    </section>
  );
}

