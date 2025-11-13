import { TriviaHeader } from "@/components/organism/Trivia/TriviaHeader";
import { TriviaSection } from "@/components/organism/Trivia/TriviaSection";
import { Main } from "@/components/template/layout/Main";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams; // ✅ esto sí se puede await
  const pageParam = params.page;     // ✅ ahora ya puedes usar .page normalmente
  console.log('esto cuanta veces ejecuta ')
  const currentPage = Array.isArray(pageParam)
    ? parseInt(pageParam[0], 10)
    : parseInt(pageParam ?? '1', 10);

  return (
    <Main id="TudotIA" className="grow flex flex-col gap-5">
      <TriviaHeader page={currentPage}/>
      <TriviaSection page={currentPage} />
    </Main>
  );
}
