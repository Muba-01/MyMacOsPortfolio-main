import React from 'react';
import dayjs from 'dayjs';          
import { navIcons, navLinks } from '#constants';
import useWindowStore from '#store/window.js';

const Navbar = () => {

    const { openWindow } = useWindowStore();
    const [time, setTime] = React.useState(dayjs());

    React.useEffect(() => {
        const timer = setInterval(() => setTime(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

    return <nav>
        <div className="hidden md:flex">
            <img src="/images/logo.svg" alt="logo" />
            <p className="text-base md:text-lg font-bold">Mubashir's Portfolio</p>

            <ul>
                {navLinks.map(({id, name, type}) => (
                    <li key={id} onClick={() => openWindow(type)}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>

        </div>

        <div className="hidden md:hidden w-full items-center justify-between px-1">
            <time className="text-sm md:text-sm font-medium text-black">{time.format('h:mm')}</time>
            <ul className="flex items-center gap-3">
                <li>
                    <img src="/icons/wifi.svg" className="size-6" alt="wifi" />
                </li>
                <li>
                    <img src="/icons/mode.svg" className="size-6" alt="battery" />
                </li>
            </ul>
        </div>

        <div className="hidden md:flex">
            <ul>
                {navIcons.map(({id, img}) => (  
                    <li key={id}> 
                        <img src={img} className='icon-hover' alt={`icon-${id}`} />
                    </li>
                ))}
            </ul>

            <time className="text-sm md:text-base">{time.format('ddd MMM D h:mm A')}</time>
        </div>
    </nav>
        
};

        export default Navbar;