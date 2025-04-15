import { createClient } from "@/prismicio";
import Link from "next/link";
import Image from "next/image";

export default async function Footer() {
    const client = createClient();
    const home = await client.getSingle("home");
    return <footer className="bg-realTeal mt-10 py-6 flex flex-row justify-center items-center">
            <p className="text-white text-center">
                <small>
                    {home.data.meta_title} &copy; {new Date().getFullYear()} 
                    <span className="hidden sm:inline text-white px-2">|</span>
                    <br className="block sm:hidden" />
                    <span>
                        <Link href={"https://albioncircus.com/"}>
                            Site by Albion Circus
                            <Image
                                src="/albionCircusWhite.svg"
                                alt="Albion Circus"
                                width={18}
                                height={18}
                                quality={100}
                                className="inline-block ml-1 mt-0 sm:-mt-1"
                            />
                        </Link>
                    </span>
                </small>
           </p>
    </footer>;
}