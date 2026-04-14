export default async function UserProfile({ params }: any) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>
        Profile page
        <span className="p-2 rounded bg-blue-400 text-black"> {id}</span>
      </p>
    </div>
  );
}
