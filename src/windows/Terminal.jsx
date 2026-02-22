import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { techStack } from '#constants';
import { Check } from 'lucide-react';
import { Flag } from 'lucide-react';
import WindowControls from '#components/WindowControls.jsx';
import useWindowStore from '#store/window.js';
import useIsMobile from '../hooks/useIsMobile';

const Terminal = () => {
    const { closeWindow } = useWindowStore();
    const isMobile = useIsMobile();

  return (
  <> 
        {isMobile ? (
            <div id="window-header" className="max-md:mt-10 max-md:rounded-none max-md:bg-transparent max-md:px-4 max-md:py-3">
                <button type="button" onClick={() => closeWindow('terminal')} className="text-blue-600 text-sm min-w-16 text-left">
                    &lt; Go Back
                </button>
                <h2 className="flex-1 text-center text-black font-medium">Terminal</h2>
                <span className="min-w-16" />
            </div>
        ) : (
            <div id="window-header">
                    <WindowControls target="terminal" />
                    <h2>Tech Stack</h2>
            </div>
        )}

        <div className='techstack max-md:p-4 max-md:pt-2'>
                <p className='max-md:text-base'>
            <span className='font-bold'>@mubashir %</span>
             show tech stack
        </p>

                <div className='label max-md:hidden'>
            <p className='w-32'>Category</p>
            <p>Technologies</p>
        </div>

                <ul className='content max-md:space-y-4 max-md:border-y-0 max-md:py-4 max-md:my-4'>
            { techStack.map(({ category, items }) => (
                                <li key={category} className='flex items-center max-md:flex-col max-md:items-start max-md:gap-1'>
                                        <div className='flex items-center'>
                                            <Check className='check' size={20} />
                                            <h3 className='max-md:w-auto max-md:ms-2'>{category}</h3>
                                        </div>
                                        <ul className='max-md:block max-md:ps-6 max-md:space-y-1'>
                        { items.map((item, i) => (
                                                        <li key={i} className='max-md:block'>
                                {item}
                                                                {!isMobile && i < items.length - 1 ? ',' : ''}
                                </li>
                        )) }
                    </ul>
                </li>
            )) }
        </ul>

                        <div className='footnote max-md:hidden'>
                <p>
                    <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
                </p>

                <p className='text-black'>
                    <Flag size={15} fill='black' />
                    Render time: 6.7ms
                </p>

            </div>

    </div>
 </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;