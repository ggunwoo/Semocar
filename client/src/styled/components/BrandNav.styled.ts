import { styled } from 'styled-components'

export const NavWrapper = styled.div`
&&& {
  width: 100%;
  height: 100px;
  background-color: #fff;
  padding-top: 20px;
  margin: 50px 0 0;
  box-sizing: border-box;
  /* border: 1px solid rgba(0,0,0,.2); */
  /* border-radius: 10px; */
}`;

export const Nav = styled.div`
&&& {
  width: 100%;
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  /* 로고버튼 */
  .logoBtn {
    width: 120px;
    height: 60px;
    &::after {
      content: '';
      display: block;
      width: 0;
      height: 4px;
      position: absolute;
      background-color: #62478f;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: all .1s;
    }
    &.clicked {
      /* border-bottom: 4px solid #62478f; */
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 4px;
        position: absolute;
        background-color: #62478f;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    & > .imgBox {
      display: none;
    }
    & > .logoName {
      display: block;
    }
    }
    &:hover > .imgBox{
      display: none;
    }
    &:hover > .logoName{
      display: block;
    }
  }
  /* 로고 이미지 */
  .imgBox {
    display: block;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  /* 브랜드이름 */
  .logoName {
    color: #000;
    font-size: 1rem;
    font-weight: bold;
    font-family: GmarketSans, NotoSans KR, sans-serif;
    margin: auto 0;
    display: none;
  }
}`;