import React from 'react';
import './LensGuide.css';

import { motion } from 'framer-motion';

const LensGuide = () => {
  const faceShapes = [
    {
      shape: "Round",
      characteristics: "Soft curves, almost equal width and height, no prominent angles.",
      recommended: "Rectangular or square lenses, Cat-Eye lenses.",
      avoid: "Round lenses or small frames that emphasize roundness."
    },
    {
      shape: "Square",
      characteristics: "Strong jawline, broad forehead, wide chin, proportionate width and length.",
      recommended: "Round or oval lenses, Butterfly lenses.",
      avoid: "Angular and boxy frames that emphasize rigidity."
    },
    {
      shape: "Oval",
      characteristics: "Longer than wide, gently curved jawline, high cheekbones.",
      recommended: "Wide lenses, Geometric lenses.",
      avoid: "Overly large frames that overwhelm the face."
    },
    {
      shape: "Heart",
      characteristics: "Wide forehead, high cheekbones, narrow chin.",
      recommended: "Bottom-heavy frames, Oval lenses, Light-colored frames.",
      avoid: "Top-heavy or overly decorative frames."
    },
    {
      shape: "Diamond",
      characteristics: "Narrow forehead and jawline, broad cheekbones.",
      recommended: "Cat-Eye or Oval lenses, Rimless lenses.",
      avoid: "Narrow frames that make cheekbones too prominent."
    },
  ];

  return (
    <div className="lens-guide-container">
      <motion.h1 
        className="guide-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Lens Selection Guide
      </motion.h1>
      <div className="face-shapes">
        {faceShapes.map((faceShape, index) => (
          <motion.div 
            key={index} 
            className="face-shape-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="shape-title">{faceShape.shape} Face Shape</h2>
            <p className="shape-characteristics"><strong>Characteristics:</strong> {faceShape.characteristics}</p>
            <p className="shape-recommendation"><strong>Recommended Lenses:</strong> {faceShape.recommended}</p>
            <p className="shape-avoid"><strong>Avoid:</strong> {faceShape.avoid}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LensGuide;
