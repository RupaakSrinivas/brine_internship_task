import { useUser } from "../context";

export default function Navbar() {
  const { user } = useUser();
  const { name, email, profilePic } = user || {};

  return (
    <div className="fixed flex justify-between w-full h-[64px] px-4 border-b items-center">
      <div className="ml-4 text-2xl font-bold">E-Commerce Website</div>
      <div className="flex items-center">
        <img
          className="h-10 w-10 rounded-full"
          src={profilePic}
          alt="Profile Pic"
        />
        <div className="ml-2">
          <div className="text-sm font-medium text-gray-700">{name}</div>
          <div className="text-xs font-medium text-gray-500">{email}</div>
        </div>
      </div>
    </div>
  );
}
