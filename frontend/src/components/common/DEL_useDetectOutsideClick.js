// import { useState, useEffect } from "react";

// export const useDetectOutsideClick = (el, initialState) => {
//   const [isActive, setIsActive] = useState(initialState);
//   console.log(
//     "frontend/components/common/useDetectOutsideClick: initialState",
//     initialState
//   );

//   useEffect(() => {
//     console.log("in useEffect: isActive:", isActive);
//     const onClick = (e) => {
//       console.log("in onClick: e:", e);
//       if (el.current !== null && !el.current.contains(e.target)) {
//         setIsActive(!isActive);
//       }
//     };

//     if (isActive) {
//       window.addEventListener("click", onClick);
//     }

//     return () => {
//       window.removeEventListener("click", onClick);
//     };
//   }, [isActive, el]);

//   console.log(
//     "frontend/components/common/useDetectOutsideClick: isActive",
//     isActive
//   );

//   return [initialState, setIsActive];
// };
