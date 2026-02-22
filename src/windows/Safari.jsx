import { WindowControls } from "#components";
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { ChevronLeft, ChevronRight, Copy, Mic, PanelLeft, Plus, Share, ShieldHalf, Search, MoveRight, BookOpen } from 'lucide-react';
import useWindowStore from '#store/window.js';
import useIsMobile from '../hooks/useIsMobile';
import { blogPosts } from '../constants';
const Safari = () => {
    const { closeWindow } = useWindowStore();
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="h-full w-full bg-gray-100 flex flex-col">
                <div id="window-header" className="max-md:mt-10 max-md:rounded-none max-md:bg-transparent max-md:border-b-0 max-md:px-4 max-md:py-3">
                    <button
                        type="button"
                        onClick={() => closeWindow('safari')}
                        className="text-blue-600 text-sm min-w-16 text-left"
                    >
                        {'< Go Back'}
                    </button>
                    <h2 className="flex-1 text-center text-black font-medium">Safari</h2>
                    <span className="min-w-16" />
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-32">
                    <div className="max-w-none pt-2">
                        <h2 className="text-3xl md:text-xl font-bold text-pink-600 mb-7">My Developer Blog</h2>

                        <div className="space-y-7">
                            {blogPosts.map(({ id, image, title, date, link}) => (
                                <div key={id} className="flex items-start gap-4">
                                    <div className="w-14 h-20 shrink-0">
                                        <img src={image} alt={title} className="w-full h-full object-cover rounded" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <p className="text-xs text-gray-500">{date}</p>
                                        <h3 className="font-semibold text-[1.05rem] leading-snug text-gray-800">{title}</h3>
                                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm flex items-center gap-2">
                                            Check out the full post
                                            <MoveRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-300 bg-gray-200/80 backdrop-blur-md px-4 py-3">
                    <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search or enter website name"
                            className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none"
                        />
                        <Mic className="w-4 h-4 text-gray-500" />
                    </div>

                    <div className="mt-3 flex items-center justify-between px-2 text-blue-600">
                        <ChevronLeft className="w-6 h-6" />
                        <ChevronRight className="w-6 h-6" />
                        <Share className="w-6 h-6" />
                        <BookOpen className="w-6 h-6" />
                        <Copy className="w-6 h-6" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>

            <div id="window-header">
                <WindowControls target="safari" />

                <PanelLeft className="ml-10 icon" />

                <div className="flex items-center gap-1 ml-5">
                    <ChevronLeft className="icon" />
                    <ChevronRight className="icon" />
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon" />
                    <div className="search">
                        <Search className="icon" />
                        <input type="text" placeholder="Search or enter website name"
                            className="flex-1" />
 
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className="icon" />
                    <Plus className="icon" />
                    <Copy className="icon" />

                </div>

            </div>

            <div className="blog">
                <h2>My Developer Blog</h2>

                <div className="space-y-8">
                    {blogPosts.map(({ id, image, title, date, link}) => (
                        <div key={id} className="blog-post">
                            <div className="col-span-2">
                            <img src={image} alt={title} />
                        </div>

                        <div className="content">
                            <p>{date}</p>
                            <h3>{title}</h3>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                check out the full post <MoveRight 
                                className="icon-hover" />
                            </a>
                    </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;