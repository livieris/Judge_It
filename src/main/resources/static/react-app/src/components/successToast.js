import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
const SuccessToast = ({ show, title, body, onClose }) => {
    return (
        <div className="success-toast-overlay">
        <ToastContainer
            className="p-3"
            position="middle-center"
            style={{ zIndex: 1060, marginBottom: '55px'}}
        >
            <Toast
                onClose={onClose}
                show={show}
                delay={3000}
                bg="primary"
                autohide>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                    <small>{title}</small>
                </Toast.Header>
                <Toast.Body className={'text-white'}>{body}</Toast.Body>
            </Toast>
        </ToastContainer>
        </div>
    );
}

export default SuccessToast;