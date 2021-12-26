import { signOut, useSession } from "next-auth/react";

export function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center mt-14 ml-10">
      <img
        className="w-16 h-16 border rounded-full p-[2px]"
        src={session?.user?.image}
        alt="User avatar"
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button onClick={signOut} className="text-sm font-semibold text-blue-400">
        Sign out
      </button>
    </div>
  );
}
