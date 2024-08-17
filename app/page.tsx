import Image from 'next/image';
import Footer from './components/Footer';
import Link from 'next/link';
import { GAMEMODES } from './lib/constants';
import Bg from './components/Bg';

export default function Home() {
    return (
        <div className="grid grid-rows-[1fr_auto] place-items-center w-full min-h-[100dvh] ">
            <Bg />
            <main className="flex items-center justify-around flex-col lg:flex-row w-full h-full z-10">
                {GAMEMODES.map((game, index) => {
                    return (
                        <section
                            className="grid sm:grid-cols-[auto_auto] grid-cols-[auto] p-6 lg:grid-cols-1 lg:grid-rows-[auto_1fr_auto] place-items-center gap-2 sm:gap-12 lg:gap-4 text-center"
                            key={index}
                        >
                            <picture className="h-96 flex items-center justify-center">
                                <Image
                                    src={game.image}
                                    alt={game.name}
                                    width={300}
                                    height={300}
                                />
                            </picture>
                            <div className="gap-2 flex items-center flex-col">
                                <h1 className="font-bold text-2xl">
                                    {game.name}
                                </h1>
                                <h3 className="text-zinc-400">
                                    {game.description}
                                </h3>
                                <Link href={game.link} className="w-full">
                                    <button className="lg:hidden block mt-4 px-4 py-2 rounded-md  w-full bg-blue-500 hover:bg-blue-400 transition-all duration-300">
                                        Play
                                    </button>
                                </Link>
                            </div>

                            <Link href={game.link} className="w-full">
                                <button className="lg:block hidden px-4 py-2 rounded-md w-full bg-blue-500 hover:bg-blue-400 transition-all duration-300">
                                    Play
                                </button>
                            </Link>
                        </section>
                    );
                })}
            </main>

            <Footer />
        </div>
    );
}
