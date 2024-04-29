import { useState } from "react";
import verifyPassword from "../api/adminVerify";
import { Link, Outlet } from "react-router-dom";

export default function AdminPage(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  // const [isVerified, setIsVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const result = await verifyPassword(password);
      setIsVerified(result.verified);
      console.log(result.verified);

      if (result.verified) {
        alert("비밀번호 확인되었습니다.");
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      alert("비밀번호 검증 중 오류 발생" + error);
    }
  };

  if (!isVerified) {
    return (
      <section className="grid gap-4 place-content-center text-center h-48">
        <h1>비밀번호 입력</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="ring-2 block mb-4"
            type="text"
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 변경 핸들
            value={password}
          />
          <button type="submit" className="w-8 h-2 ml-4">
            전송
          </button>
        </form>
      </section>
    );
  }
  return (
    <section>
      <h1 className="m-4">Admin pages 접속</h1>
      <nav className="flax justify-evenly mx-8 h-24">
      <Link to="create-brand" className="mr-4 hover:text-sky-400">브랜드 DB 생성</Link>
      <Link to="create-car" className="hover:text-sky-400">자동차 DB 생성</Link>
      </nav>
      <Outlet />
    </section>
  );
}
