import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="h-48 w-full flex bg-cover bg-center relative">
      <img
        src="https://cdn.pixabay.com/photo/2013/07/13/12/47/cosmic-160340_960_720.png"
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <Image src="/wordart.png" width="325" height="64" className="relative" />
      <div className="absolute bottom-0 right-0 h-16">
        <Link href="/discover">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Discover All-star Anons!
          </button>
        </Link>
        <Link href="/createprofile">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Create Profile
          </button>
        </Link>
        <Link href="/endorseaprofile">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Endorse Your Peers
          </button>
        </Link>
        <Link href="/page">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            View Your Profile
          </button>
        </Link>
        <Link href="/modifyprofile">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Modify Your Profile
          </button>
        </Link>
        <Link href="/endorsements">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            View Your Endorsements
          </button>
        </Link>
        <Link href="/page">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            About Anon-Stars
          </button>
        </Link>
      </div>
      <div className="absolute top-4 right-0 h-16">
        <ConnectButton />
      </div>
    </nav>
  );
}
