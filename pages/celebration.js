import Link from 'next/link';
import Image from 'next/image';

import Nav from '../shared/components/Nav';

export default function Celebration () {
    return (
        <div className="container">
            <Nav />

            <div className="text-center">
                <h1 className="mb-1 font-size-4">
                    yay you did it!
                </h1>

                <p className="mb-1 font-size-2">
                    you finished all your tasks 😎
                </p>

                <Image
                    src="/assets/gifs/elmo.webp"
                    alt="celebration gif"
                    height={ 360 }
                    width={ 480 } />

                <div className="flex justify-content-between mt-1">
                    <Link href="/app">
                        <a className="button background-color-green color-black">
                            return to tasks
                        </a>
                    </Link>

                    <button className="button background-color-yellow">
                        create new tasks
                    </button>
                </div>
            </div>
        </div>
    );
}