import { useNavigate } from "react-router-dom";

// STYLED
import { Logo } from "../styled/Global";
import * as S from "../styled/components/Footer.styled";

export function Footer(): JSX.Element {
  const navigate = useNavigate();

  return (
    <S.FooterCtn>
      <div className="infoWrap">
        <Logo fontSize="32px">SEMO CAR</Logo>
        <div className="btnGroup">
          <S.FooterBtn
            onClick={() => {
              navigate("/");
            }}>
            Home
          </S.FooterBtn>
          <S.FooterBtn
            onClick={() => {
              window.open("https://github.com/ggunwoo/Semocar");
            }}>
            GitHub
          </S.FooterBtn>
          <S.FooterBtn
            onClick={() => {
              window.open("https://gunw.notion.site/2d7b43752d4140dc953fb5c5b5b36eec?pvs=4");
            }}>
            Notion
          </S.FooterBtn>
          <S.FooterBtn
            onClick={() => {
              navigate("https://ggunwoo.github.io/");
            }}>
            Blog
          </S.FooterBtn>
        </div>
      </div>
      <S.Copyright>
        <p className="text">Copyright &copy; 2023-2024 ggunwoo portfolio.</p>
      </S.Copyright>
    </S.FooterCtn>
  );
}
