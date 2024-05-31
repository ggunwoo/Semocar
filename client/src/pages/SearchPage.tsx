import "../styles/search.scss";

// COMPONENT
import SelectWrap from "../components/search/SelectWrap";
import CarList from "../components/search/CarList";


// Search View Styled
export default function SearchPage() {

  return (
    <section className="container-search-page">
      {/* SelectBox */}
      <SelectWrap />

      {/* 차 목록 */}
      <CarList />
    </section>
  );
}
