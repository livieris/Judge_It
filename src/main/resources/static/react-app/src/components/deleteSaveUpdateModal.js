import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
/**
 * 
 * @param {*} param0 
 * @returns
 * 
 * Need to add the below inside the last div, write a function called getModalContent to fill any specific data you need.
 *      <DeleteSaveUpdateModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        title={getModalContent("title")}
        body={getModalContent("body")}
        bttnText={getModalContent('bttnText')}
        onConfirm={handleConfirmDelete}
      />
 */
const DeleteSaveUpdateModal = ({ show, onHide, title, body, bttnText, onConfirm }) => {
    const confirmAndClose = () => {
        onConfirm();
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{body}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={confirmAndClose}>{bttnText}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteSaveUpdateModal;