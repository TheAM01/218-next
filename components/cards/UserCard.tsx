// props

import type { User } from "@/types/user";

export default function UserCard({ user }: { user: User }) {
    return (
        <article className="p-2 border border-rose-300 bg-rose-50 rounded-md ">
            <div className="text-gray-500 text-sm flex gap-2">
                <span>{user.id}</span>
                <span>{user.username}</span>
                <span>{user.email}</span>
            </div>
            <h3 className="text-2xl font-semibold text-rose-500">
                {user.name}
            </h3>
            <div className="flex justify-between text-gray-400">
                <span className="font-semibold">Phone</span>
                <span className="">{user.phone}</span>
            </div>
            <div className="flex justify-between text-gray-400">
                <span className="font-semibold">Website</span>
                <span className="">{user.website}</span>
            </div>
        </article>
    )
}