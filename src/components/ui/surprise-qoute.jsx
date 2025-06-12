import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import Confetti from 'react-confetti';
import Typewriter from 'typewriter-effect';

const SurpriseModal = () => {
 const [showModal, setShowModal] = useState(false);
 const [quote, setQuote] = useState(null);
 const [loading, setLoading] = useState(false);
 const [showConfetti, setShowConfetti] = useState(false);
 const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

 const fetchQuote = async () => {
   setLoading(true);
   setQuote(null);
   try {
     const res = await fetch('https://api.quotable.io/random');
     const data = await res.json();
     setQuote({ content: data.content, author: data.author });
   } catch (err) {
    
     setQuote({ content: "Couldn't fetch motivation 😞 Try again!", author: "System" });
   } finally {
     setLoading(false);
   }
 };

 const handleClick = () => {
   setShowModal(true);
   setShowConfetti(true);
   fetchQuote();
 };

 const closeModal = () => {
   setShowModal(false);
   setShowConfetti(false);
 };

 useEffect(() => {
   if (showModal) {
     const interval = setInterval(() => {
       fetchQuote();
     }, 15000);

     return () => clearInterval(interval);
   }
 }, [showModal]);

 useEffect(() => {
   const handleResize = () => {
     setWindowSize({ width: window.innerWidth, height: window.innerHeight });
   };

   window.addEventListener('resize', handleResize);
   return () => window.removeEventListener('resize', handleResize);
 }, []);

 return (
   <div className="text-center">
     <button
       onClick={handleClick}
       className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
     >
       <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
       <span>Click Me for a Surprise </span>
     </button>

     <AnimatePresence>
       {showModal && (
         <>
           <motion.div
             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <motion.div
               className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-2 mt-80 relative"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
             >
               <button
                 onClick={closeModal}
                 className="absolute top-2 right-2 text-gray-500 hover:text-red-500 p-1"
                 aria-label="Close modal"
               >
                 <X className="w-5 h-5 sm:w-6 sm:h-6" />
               </button>

               <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Your Motivation</h2>
               {loading ? (
                 <div className="flex flex-col items-center justify-center py-4 min-h-[100px]">
                   <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                   <p className="text-gray-500 text-sm sm:text-base">Loading inspiration...</p>
                 </div>
               ) : (
                 <div className="text-center min-h-[100px] flex items-center justify-center">
                   {quote && (
                     <Typewriter
                       options={{
                         strings: [`${quote.content} — ${quote.author}`],
                         autoStart: true,
                         loop: true,
                         delay: 30,
                         wrapperClassName: 'text-sm sm:text-base md:text-lg',
                         cursorClassName: 'text-sm sm:text-base'
                       }}
                     />
                   )}
                 </div>
               )}
             </motion.div>

             {showConfetti && (
               <Confetti
                 width={windowSize.width}
                 height={windowSize.height}
                 numberOfPieces={windowSize.width < 768 ? 100 : 150}
                 recycle={false}
                 gravity={windowSize.width < 768 ? 0.3 : 0.2}
               />
             )}
           </motion.div>
         </>
       )}
     </AnimatePresence>
   </div>
 );
};

export default SurpriseModal;