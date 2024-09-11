import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const queryString = router.query.q;
  const { q } = router.query;

  return (
    <h1>
      서치 {q} {queryString}
    </h1>
  );
}
