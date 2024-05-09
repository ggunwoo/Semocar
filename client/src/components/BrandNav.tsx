import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { brandIn, brandReset } from "../store/slice/carFilter";
import { toggleHandler, toggleReset } from "../store/slice/brands";

// STYLED
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MaxContainer } from "../styled/Global";
import * as S from "../styled/components/BrandNav.styled";

import { fetchBrands } from "../store/slice/brands";

export function BrandNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(brands.status === 'idle'){
      dispatch(fetchBrands()); // Redux => Brands fetch함수 실행
    }
  }, []);

  const brands = useAppSelector((state) => state.brands);

  const toggle = useAppSelector((state) => {
    return state.toggle;
  });

  const brandHandler = (brand: string, index: number) => {
    dispatch(brandIn(brand));
    dispatch(toggleHandler(index));
  };
  const brandAll = () => {
    dispatch(brandReset());
    dispatch(toggleReset());
  };

  return (
    <S.NavWrapper>
      <MaxContainer>
        <S.Nav>
          {brands?.status === "succeeded" ? (
            brands?.items.map((brand, index) => (
              <Button
                className={`logoBtn ${toggle[index] ? "clicked" : "unclick"}`}
                key={brand.id}
                onClick={() => {
                  brandHandler(brand.name, index);
                  navigate(`/brand`);
                }}
                variant="text"
              >
                <div className="imgBox">
                  <img
                    style={{ width: "40px" }}
                    src={brand.logo_path}
                    alt={brand.english_name}
                  />
                </div>
                <p className="logoName">{brand.name}</p>
              </Button>
            ))
          ) : (
            <div>Loading...</div>
          )}
          <Button
            className="logoBtn"
            onClick={() => {
              brandAll();
              navigate(`/brand`);
            }}
          >
            <div className="imgBox">
              <MenuIcon sx={{ fontSize: "36px", color: "#333" }} />
            </div>
            <p className="logoName">전체보기</p>
          </Button>
        </S.Nav>
      </MaxContainer>
    </S.NavWrapper>
  );
}
