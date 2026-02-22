import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { socials } from '#constants/index.js';
import WindowControls from '#components/WindowControls.jsx';
import useWindowStore from '#store/window.js';
import useIsMobile from '../hooks/useIsMobile';



const Contact = () => {
    const { closeWindow } = useWindowStore();
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="h-full w-full bg-gray-100 flex flex-col">
                <div id="window-header" className="max-md:mt-10 max-md:rounded-none max-md:bg-transparent max-md:border-b-0 max-md:px-4 max-md:py-3">
                    <button
                        type="button"
                        onClick={() => closeWindow('contact')}
                        className="text-blue-600 text-sm min-w-16 text-left"
                    >
                        {'< Go Back'}
                    </button>
                    <h2 className="flex-1 text-center text-black font-medium">Contact</h2>
                    <span className="min-w-16" />
                </div>

                <div className="flex-1 overflow-y-auto px-7 pb-6 pt-2">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src="/images/adrian.jpg"
                            alt="Adrian"
                            className="w-18 h-18 rounded-full object-cover"
                        />
                        <h3 className="mt-5 text-3xl font-semibold text-black">Let's Connect</h3>
                        <p className="mt-4 text-[1.2rem] text-black leading-relaxed max-w-xs">
                            Got an idea? A bug to squash? Or just wanna talk tech? I&apos;m in.
                        </p>
                    </div>

                    <ul className="mt-8 flex! flex-col! items-stretch! gap-3!">
                        {socials.map(({ id, bg, link, icon, text}) => (
                            <li key={id} style={{ backgroundColor: bg }} className="w-full! rounded-xl px-4 py-3">
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={text}
                                    className="block"
                                >
                                    <img src={icon} alt={text} className="size-5 mb-3" />
                                    <p className="font-semibold text-lg text-white">{text}</p>
                                </a>
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
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
     </div>

     <div className="p-5 space-y-5">
        <img    src="/images/adrian.jpg" 
                alt="Adrian" 
                className="w-20 rounded-full" />
            <h3>Let's Connect</h3>
            <p>Got an Idea? or just want to say hi? im always here to help.</p>
            <p>muhammadmbs99x@gmail.com</p>

            <ul>
                {socials.map(({ id, bg, link, icon, text}) => (
                    <li key={id} style={{ backgroundColor: bg }}>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={text}
                    >
                        <img src={icon} alt={text} className="size-5" />
                        <p>{text}</p>
                    </a>
                    </li>
                ))}
            </ul>

    </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;