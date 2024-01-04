import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Modal = ({ children, onClick }) => {
    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClick}> {/* 모달 외부 클릭 시 onClick 함수 호출 */}
            <div className="modal-content">
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;
