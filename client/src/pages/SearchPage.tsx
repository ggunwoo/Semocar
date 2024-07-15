import "../styles/search.scss";

// COMPONENT
import OptionBox from "../components/search/OptionBox";
import CarList from "../components/search/CarList";
import SearchBar from "../components/search/SearchBar";
import SelectBadge from "../components/search/SelectBadge";

// Search View Styled
export default function SearchPage() {
  return (
    <section className="container-search-page">
      {/* SelectBox */}
      <OptionBox />
      {/* 상단 탭 */}
      <aside className="aside">
        <article className="badge-list">
          {/* <SelectBadge /> */}
        </article>
        {/* 검색 컴포넌트 */}
        <article className="search-bar">
          <SearchBar />
        </article>
      </aside>

      <article className={`container-car-list`}>
        {/* 차 목록 */}
        <CarList />
      </article>
    </section>
  );
}
