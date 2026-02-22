import React from 'react';
import dayjs from 'dayjs';

const MobileNotch = () => {
  const [time, setTime] = React.useState(dayjs());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="md:hidden pointer-events-none fixed top-2 left-0 right-0 z-50 px-4">
      <div className="relative flex items-center justify-between">
        <time className="text-base font-semibold text-black">{time.format('h:mm A')}</time>

        <div className="absolute left-1/2 top-0 h-9 w-44 -translate-x-1/2 rounded-full bg-black shadow-lg" aria-hidden="true" />

        <ul className="flex items-center gap-2.5">
          <li>
            <img src="/icons/wifi.svg" className="size-6" alt="wifi" />
          </li>
          <li>
            <img src="/icons/mode.svg" className="size-6" alt="battery" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MobileNotch;