import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { brandIn, brandReset } from "../../store/slice/carFilter";
import { toggleHandler, toggleReset } from "../../store/slice/useBrandListSlice";

import { VscClearAll } from "react-icons/vsc";

// STYLED
import { Button, useAutocomplete } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MaxContainer } from "../../styled/Global";
import * as S from "../../styled/components/BrandNav.styled";

import { fetchBrands } from "../../store/api/brandApi";

export default function SearchBrand() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const brands = useAppSelector(state => state.brandList.items);
  const status = useAppSelector(state => state.brandList.status); // idle, loading, secceeded, faild
  const error = useAppSelector(state => state.brandList.error);
  const selectBrand = useAppSelector(state => state.selectedBrand);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBrands()); // Redux => Brands fetch함수 실행
    }
  }, []);

  const brandHandler = (brand: string, index: number) => {
    dispatch(brandIn(brand));
    dispatch(toggleHandler(index));
  };
  const brandAll = () => {
    dispatch(brandReset());
    dispatch(toggleReset());
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    // <S.NavWrapper>
    <article className="container-select-brand">
      <S.Nav>
        {brands.map((brand, index) => (
          <Button
            className={`logoBtn ${selectBrand.includes(brand.id) ? "clicked" : "unclick"}`}
            key={brand.id}
            onClick={() => {
              brandHandler(brand.id, index);
              // navigate(`/brand`);
            }}
            variant="text">
            <div className="imgBox">
              <img style={{ width: "40px" }} src={brand.logo_path} alt={brand.english_name} />
            </div>
            <p className="logoName">{brand.name}</p>
          </Button>
        ))}
        <Button
          className="logoBtn"
          onClick={() => {
            brandAll();
            navigate(`/`);
          }}>
          <div className="imgBox">
            <VscClearAll style={{ color: "black", fontSize: "32px" }} />
          </div>
          <p className="logoName">선택해제</p>
        </Button>
      </S.Nav>
      {/* </S.NavWrapper> */}
    </article>
  );
}
