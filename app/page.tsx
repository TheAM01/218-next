import { User } from "@/types/user";


async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default async function HomePage() {

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    await wait(5000);
    throw new Error("page was manually crashed!")
    const users: User[] = await res.json();

    return (
        <main>
            <div>
                {users.map((u) => (
                    <div key={u.id}>{u.name}</div>
                ))}
            </div>
        </main>
    );
}
