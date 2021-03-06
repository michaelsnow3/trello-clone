import React, { useState } from 'react';
import { connect } from 'react-redux';

import { postFetch } from '../../fetchRequests';

// import actions
import { toggleSettingsMenu, setBoardInfo } from '../../actions/boardActions';

import './EditBoard.css';

const mapStateToProps = state => {
  return {
    activeBoard: state.activeBoard.board
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoardInfo: boardId => dispatch(setBoardInfo(boardId)),
    toggleSettingsMenu: () => dispatch(toggleSettingsMenu(null, null))
  };
};

const EditBoard = ({
  boardId,
  setBoardInfo,
  toggleSettingsMenu,
  activeBoard
}) => {
  const [editBoardValue, setEditBoardValue] = useState('');

  const handleEditBoard = () => {
    if (!editBoardValue) return;
    let body = {
      boardId,
      title: editBoardValue
    };
    postFetch('/board/edit/title', body).then(() => {
      let newBoard = activeBoard;
      newBoard.title = editBoardValue;
      setBoardInfo(newBoard);
      toggleSettingsMenu();
    });
  };

  const handleTextChange = event => {
    setEditBoardValue(event.target.value);
  };

  return (
    <div className="editBoardContainer">
      <div className="editBoardInput">
        <input value={editBoardValue} onChange={handleTextChange} autoFocus />
      </div>
      <button onClick={handleEditBoard}>Edit Title</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBoard);
