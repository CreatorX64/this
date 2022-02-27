import Link from "next/link";
import { useUserContext } from "../context/user";
import { supabase } from "../utils/supabase";

export async function getStaticProps() {
  const { data: lessons } = await supabase.from("lessons").select("*");

  return {
    props: {
      lessons
    }
  };
}

export default function HomePage({ lessons }) {
  const { user } = useUserContext();
  console.log({ user });

  return (
    <div className="mx-auto my-16 w-full max-w-3xl px-2">
      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="mb-4 flex h-40 rounded p-8 text-xl shadow">
            {lesson.title}
          </a>
        </Link>
      ))}
    </div>
  );
}
