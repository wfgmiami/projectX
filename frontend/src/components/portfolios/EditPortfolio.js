import React, { useState } from "react";
import Modal from "../common/Modal";
import RenamePortfolio from "../portfolios/RenamePortfolio";
import DeletePortfolio from "../portfolios/DeletePortfolio";
// import PropTypes from "prop-types";

export const EditPortfolio = (
  { show, handleClose, portfolioId },
  dropdownRef
) => {
  const [isRenamePortOpen, toggleRenamePort] = useState(false);
  const [isDeletePortOpen, toggleDeletePort] = useState(false);

  const handleDelete = () => {
    handleClose();
    toggleDeletePort(true);
  };

  const handleRename = () => {
    handleClose();
    toggleRenamePort(true);
  };

  return (
    <span>
      <nav
        ref={dropdownRef}
        className={`dropdownMenu ${show ? "show" : "hide"}`}
      >
        <ul>
          <li>
            <a href="#" onClick={handleRename}>
              Rename Portfolio
            </a>
            <a href="#" onClick={handleDelete}>
              Delete Portfolio
            </a>
          </li>
        </ul>
      </nav>
      <Modal
        show={isDeletePortOpen}
        handleClose={() => toggleRenamePort(!isDeletePortOpen)}
      >
        <DeletePortfolio
          portfolioId={portfolioId}
          handleClose={() => toggleDeletePort(!isDeletePortOpen)}
        />
      </Modal>

      <Modal
        show={isRenamePortOpen}
        handleClose={() => toggleRenamePort(!isRenamePortOpen)}
      >
        <RenamePortfolio
          portfolioId={portfolioId}
          handleClose={() => toggleRenamePort(!isRenamePortOpen)}
        />
      </Modal>
    </span>
  );
};

// EditPortfolio.propTypes = {
//   show: PropTypes.func.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   portfolioId: PropTypes.string,
// };

export default React.forwardRef(EditPortfolio);
