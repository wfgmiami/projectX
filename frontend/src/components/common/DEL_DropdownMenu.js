// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { deletePortfolio } from "../../redux/actions/portfolioActions";
// import Modal from "./Modal";
// import RenamePortfolio from "../portfolios/RenamePortfolio";

// export const DropdownMenu = (
//   { show, handleClose, portfolioId },
//   dropdownRef
// ) => {
//   const [isRenamePortOpen, toggleRenamePort] = useState(false);
//   const dispatch = useDispatch();

//   const handleDelete = () => {
//     dispatch(deletePortfolio(portfolioId));
//     handleClose();
//   };

//   const handleRename = () => {
//     handleClose();
//     toggleRenamePort(true);
//   };

//   return (
//     <span>
//       <nav
//         ref={dropdownRef}
//         className={`dropdownMenu ${show ? "show" : "hide"}`}
//       >
//         <ul>
//           <li>
//             <a href="#" onClick={handleRename}>
//               Rename Portfolio
//             </a>
//             <a href="#" onClick={handleDelete}>
//               Delete Portfolio
//             </a>
//           </li>
//         </ul>
//       </nav>
//       <Modal
//         show={isRenamePortOpen}
//         handleClose={() => toggleRenamePort(!isRenamePortOpen)}
//       >
//         <RenamePortfolio
//           portfolioId={portfolioId}
//           handleClose={() => toggleRenamePort(!isRenamePortOpen)}
//         />
//       </Modal>
//     </span>
//   );
// };

// export default React.forwardRef(DropdownMenu);
