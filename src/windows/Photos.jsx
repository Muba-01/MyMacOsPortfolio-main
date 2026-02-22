import { Mail, Search } from 'lucide-react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls.jsx';
import useWindowStore from '#store/window';
import { gallery, photosLinks} from '#constants';
import useIsMobile from '../hooks/useIsMobile';

const Photos = () => {
    const { openWindow, closeWindow } = useWindowStore();
    const isMobile = useIsMobile();

    const openGalleryImage = (id, img) => {
        openWindow('imgfile', {
            id,
            name: 'Gallery Image',
            icon: '/images/image.png',
            kind: 'file',
            fileType: 'img',
            imageUrl: img,
        });
    };

    if (isMobile) {
        return (
            <div className="h-full w-full bg-white flex flex-col">
                <div id="window-header" className="max-md:mt-10 max-md:rounded-none max-md:bg-transparent max-md:border-b-0 max-md:px-4 max-md:py-3">
                    <button
                        type="button"
                        onClick={() => closeWindow('photos')}
                        className="text-blue-600 text-sm min-w-16 text-left"
                    >
                        {'< Go Back'}
                    </button>
                    <h2 className="flex-1 text-center text-black font-medium">All Photos</h2>
                    <span className="min-w-16" />
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-6">
                    <ul className="grid grid-cols-2 gap-3 pt-2">
                        {gallery.map(({ id, img }) => (
                            <li
                                key={id}
                                className="overflow-hidden rounded-xl h-48"
                                onClick={() => openGalleryImage(id, img)}
                            >
                                <img src={img} alt={`Gallery Image ${id}`} className="w-full h-full object-cover" />
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
            <WindowControls target="photos" />
        
        <div className='w-full flex justify-end items-center gap-3 text-gray-500'>
            <Mail className='icon' />
            <Search className='icon' />
        </div>
    </div>

    <div className='flex w-full'>
        <div className='sidebar'>
            <h2>Photos</h2>

            <ul>
                {photosLinks.map(({ id, icon, title }) => (
                    <li key={id}>
                        <img src={icon} alt={title} />
                        <p>{title}</p>
                    </li> 
                ))}
            </ul>
        </div>

        <div className='gallery'>
            <ul>
            {gallery.map(({ id, img }) => (
                <li
                    key={id}
                    onClick={() => openGalleryImage(id, img)}
                >
                    <img src={img} alt={`Gallery Image ${id}`} />
                </li>
            ))}
            </ul>
        </div>

    </div>
    </>
    );
};

const PhotosWindow = WindowWrapper(Photos, 'photos');

export default PhotosWindow;