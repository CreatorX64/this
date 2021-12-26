import { useSession } from "next-auth/react";
import { MiniProfile } from "./MiniProfile";
import { Posts } from "./Posts";
import { Stories } from "./Stories";
import { Suggestions } from "./Suggestions";

export function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {session && (
        <section className="hidden md:col-span-1 xl:inline-grid">
          <div className="fixed">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}
