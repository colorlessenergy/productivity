import Image from 'next/image';

const Nav = () => {
    return (
        <nav className="flex justify-content-between align-items-center py-1">
            <div className="font-size-3 font-weight-bold">
                productivity
            </div>

            <div>
                <div className="d-none">
                    <Image
                        src="/icons/sun.svg"
                        alt="sun icon"
                        height={ 24 }
                        width={ 24 } />
                </div>

                <Image
                    src="/icons/moon.svg"
                    alt="moon icon"
                    height={ 24 }
                    width={ 24 } />
            </div>
        </nav>
    );
}

export default Nav;