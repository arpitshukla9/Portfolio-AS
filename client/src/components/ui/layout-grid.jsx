"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutGrid = ({ cards = [] }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (card) => {
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto relative">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          onClick={() => handleClick(card)}
          className={cn(
            "relative h-80 w-full rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
            selected?.id === card.id && "z-50 ring-4 ring-blue-500"
          )}
          layoutId={`card-${card.id}`}
        >
          {selected?.id === card.id && <SelectedCard selected={selected} />}
          <ImageComponent card={card} />
        </motion.div>
      ))}

      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.4 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="100%"
      width="100%"
      className="object-cover object-center w-full h-full"
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-6 z-20">
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="text-white text-lg font-semibold"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};

export default LayoutGrid;
