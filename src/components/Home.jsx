import { locations } from '#constants';
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import useWindowStore from '#store/window.js';
import useLocationStore from '#store/location.js';
import { useEffect } from 'react';


const projects = locations.work.children ?? [];

const Home = () => {

    const { setActiveLocation } = useLocationStore();
    
    const { openWindow } = useWindowStore();
    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");



    };

    useEffect(() => {
        const instances = Draggable.create('.folder');

        return () => {
            instances.forEach((instance) => instance.kill());
        };
    }, []);

    return (<section id="home">
        <ul>
            {projects.map((project) => (
                <li key={project.id} className={clsx("group folder",
                    project.windowPosition)}
                    onClick={() => handleOpenProjectFinder(project)}
                    >
                    <img src="/images/folder.png" alt={project.name} />
                    <p className="text-xs md:text-sm">{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
    );
};

export default Home;