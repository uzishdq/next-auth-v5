import { auth, signOut } from "@/auth";

export default async function Setting() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">signOut</button>
      </form>
    </div>
  );
}
