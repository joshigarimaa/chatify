// import React from 'react'

// const BorderAnimtedContainer = ({children}) => {
//   return (
//     <div className='w-full h-full [background:linear-gradient(45deg #172033 theme(colors.slate.800)_50% #172033) _padding-box conic-gradient(from_var(--border-angle) theme(colors.slate.600/.48)_80% _theme(colors.cyan.500)_86% border border-transparent animate-border flex overflow-hidden'>{children}</div>
//   )
// }

// export default BorderAnimtedContainer

import React from "react";

const BorderAnimatedContainer = ({ children }) => {
  return (
    <div
      className="w-full h-full border border-transparent animate-border flex overflow-hidden
      [background:
        linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,
        conic-gradient(from_var(--border-angle),theme(colors.slate.600/0.48)_80%,theme(colors.cyan.500)_86%)_border-box
      ]"
    >
      {children}
    </div>
  );
};

export default BorderAnimatedContainer;






//https://cruip-tutorials.vercel.app/animated-gradient-border/
