import "../styles/search.scss";

// COMPONENT
import OptionBox from "../components/search/OptionBox";
import CarList from "../components/search/CarList";


// Search View Styled
export default function SearchPage() {

  return (
    <section className="container-search-page">
      {/* SelectBox */}
      <OptionBox />

      {/* 차 목록 */}
      <CarList />
    </section>
  );
}
