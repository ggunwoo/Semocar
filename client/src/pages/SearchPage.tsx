import "../styles/search.scss";

// COMPONENT
import OptionBox from "../components/search/OptionBox";
import CarList from "../components/search/CarList";
import SearchBar from "../components/search/SearchBar";

// Search View Styled
export default function SearchPage() {
  return (
    <section className="container-search-page">
      {/* SelectBox */}
      <OptionBox />
      {/* 상단 탭 */}
      <nav className="list-nav">
        <div></div>
        {/* 검색 컴포넌트 */}
        <div>
          <SearchBar />
        </div>
      </nav>

      <article className={`container-car-list`}>
        {/* 차 목록 */}
        <CarList />
      </article>
    </section>
  );
}
