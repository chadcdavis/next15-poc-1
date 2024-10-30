import Image from "next/image";

import { Footprints } from "lucide-react";

import { getPostsForLast24Hours } from "@/db/queries/select";

type PostWithUserName = {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  userName: string | null;
};

export default async function Home() {
  const posts: PostWithUserName[] = await getPostsForLast24Hours();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-bangers)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="">
          <h2 className="text-xl font-bold">Recent Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="mt-4">
                <h3 className="text-lg font-semibold">
                  {post.title} by {post.userName ?? "Unknown"}
                </h3>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Footprints size={24} />
      </footer>
    </div>

  );
}
