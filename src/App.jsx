import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import React from 'react';

import { Dock, Home, Navbar, Welcome } from '#components';
import MobileBottomNav from '#components/MobileBottomNav.jsx';
import MobileHomeApps from '#components/MobileHomeApps.jsx';
import MobileNotch from '#components/MobileNotch.jsx';
import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Photos } from '#windows/index.js';


gsap.registerPlugin(Draggable);
const App = () => {
  return (
 <main>
   <MobileNotch />
    <Navbar />
    <Welcome />
    <MobileHomeApps />
    <Dock />
    <MobileBottomNav />

    <Terminal />
    <Safari />
    <Resume />
    <Finder />
    <Text />
    <Image />
    <Contact />
    <Photos />
    <Home />
 </main> 
  );}; 

export default App;