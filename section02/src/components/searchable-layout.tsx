import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;
  // 페이지를 이동했어도 검색창에 적힌 값을 유지하기 위함.
  // query.q의 타입이 string, string[], undefined로 추론됨.
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    // 입력값이랑 현재 위치가 같을 경우 이동하지 않음.
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  // 엔터 키를 눌러도 이용할 수 있도록 함.
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요 ..."
        ></input>
        <button>검색</button>
      </div>
      {children}
    </div>
  );
}
