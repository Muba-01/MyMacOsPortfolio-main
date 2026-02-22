import { Search } from "lucide-react";
import React, { useMemo, useState } from 'react';
import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';
import { locations } from '#constants/index.js';
import useLocationStore from '#store/location.js';
import clsx from 'clsx';
import useWindowStore from '#store/window.js';
import useIsMobile from '../hooks/useIsMobile';

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow, closeWindow } = useWindowStore();
    const isMobile = useIsMobile();
    const mobileRoot = useMemo(() => ({
        id: 'mobile-root',
        name: 'Portfolio',
        kind: 'folder',
        children: [
            {
                id: 'mobile-work',
                name: 'Work',
                icon: '/images/folder.png',
                kind: 'folder',
                children: locations.work?.children ?? [],
            },
            {
                id: 'mobile-about',
                name: 'About me',
                icon: '/images/folder.png',
                kind: 'folder',
                children: locations.about?.children ?? [],
            },
            {
                id: 'mobile-resume',
                name: 'Resume',
                icon: '/images/folder.png',
                kind: 'folder',
                children: locations.resume?.children ?? [],
            },
            {
                id: 'mobile-trash',
                name: 'Trash',
                icon: '/images/folder.png',
                kind: 'folder',
                children: locations.trash?.children ?? [],
            },
        ],
    }), []);
    const [mobilePath, setMobilePath] = useState([mobileRoot]);
    const currentMobileFolder = mobilePath[mobilePath.length - 1];


const openItem = (item) => {

    if (item.fileType === 'pdf') return openWindow('resume');
    if (item.kind === 'folder') return setActiveLocation(item);
    if(['fig', 'url'].includes(item.fileType) && item.href)
        return window.open(item.href, '_blank');

        openWindow(`${item.fileType}${item.kind}`, item);



};
    const openMobileItem = (item) => {
        if (item.kind === 'folder') {
            setMobilePath((prev) => [...prev, item]);
            return;
        }

        if (item.fileType === 'pdf') return openWindow('resume');
        if(['fig', 'url'].includes(item.fileType) && item.href) {
            window.open(item.href, '_blank');
            return;
        }

        openWindow(`${item.fileType}${item.kind}`, item);
    };

    const goBackMobile = () => {
        if (mobilePath.length <= 1) {
            closeWindow('finder');
            return;
        }
        setMobilePath((prev) => prev.slice(0, -1));
    };

    const renderList = (name, items) => (

        <div>
            <h3>{name}</h3>


            <ul>{items.map((item) => (
                <li key={item.id} onClick={() => setActiveLocation(item)}
                    className={clsx(item.id === activeLocation.id ? 'active' : 'not-active')}>
                    <img src={item.icon} className="w-4" alt={item.name} />
                    <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
            ))}
            </ul>
        </div>
    );

    if (isMobile) {
        return (
            <div className="h-full w-full bg-white flex flex-col">
                <div id="window-header" className="max-md:mt-10 max-md:rounded-none max-md:bg-transparent max-md:px-4 max-md:py-3">
                    <button
                        type="button"
                        onClick={goBackMobile}
                        className="text-blue-600 text-sm min-w-16 text-left"
                    >
                        {'< Go Back'}
                    </button>
                    <h2 className="flex-1 text-center text-black font-medium">{currentMobileFolder?.name || 'Portfolio'}</h2>
                    <span className="min-w-16" />
                </div>

                <div className="flex-1 px-4 pb-4 overflow-y-auto">
                    <ul className="grid grid-cols-3 gap-x-4 gap-y-6 pt-2">
                        {(currentMobileFolder?.children ?? []).map((item) => (
                            <li
                                key={item.id}
                                className="flex flex-col items-center"
                                onClick={() => openMobileItem(item)}
                            >
                                <img src={item.icon} alt={item.name} className="size-14 object-contain" />
                                <p className="mt-2 text-xs text-center font-medium text-gray-800 wrap-break-word w-full">{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <Search className="icon" />

            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">

                    {renderList("Favorites", Object.values(locations))}
                    {renderList("My Projects", locations.work.children)}
                </div>

                <ul className="content">
                {activeLocation.children.map((item) => (
                    <li 
                        key={item.id}
                        className={item.position}
                        onClick={() => openItem(item)}>
                    
                    <img src={item.icon} alt={item.name} />
                    <p>{item.name}</p>
                        
                    </li>
                ))}
            </ul>

            </div>

            
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;