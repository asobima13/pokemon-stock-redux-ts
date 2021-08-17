import './UpdateStockModal.css'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface modalProps {
    pcs: number;
    dozen: number;
}

const UpdateStockModal: React.FC = () => {
    
    const [modal, setModal] = useState<modalProps>({
        pcs: 0,
        dozen: 0
    })
    const { isModalOpen, pokemonName } = useTypedSelector((state) => state.pokemon)
    const { closeModal, setModalData, resetModalData } = useActions();

    const styles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px'
        },
        overlay: {
            backgroundColor: 'rgba(51, 51, 51, 0.5)'
        }
    }

    const handleSubmit = () => {
        closeModal();
        setModalData(modal);
    }

    const handleClose = () => {
        closeModal();
        resetModalData()
    }

    return (
        <div className="UpdateStokModal">
            <Modal
                isOpen={isModalOpen}
                // onRequestClose={closeModal}
                contentLabel="Update Stok Modal"
                style={styles}
                ariaHideApp={false}
            >
                <div className="modalContentWrapper">
                    <h3 className="modalHeadTitle">Update stcok</h3>
                    <p>Please put total items in your shelf</p>
                    <p className="modalSubheaderTitle">to the form below.</p>
                    <form>
                        <div className="modalContentContainer">
                            <p className="modalContent modalContent1 modalContentHead">Unit Type</p>
                            <p className="modalContent modalContent2 modalContentHead">Total</p>
                            <p className="modalContent modalContent3 modalContentHead">Stock</p>
                        </div>
                        <div className="modalContentContainer">
                            <p className="modalContent modalContent1">Pcs</p>
                            <div className="modalContentInputContainer modalContent2">
                                <span>1 x </span><input type="number" value={modal.pcs | 0} onChange={(e) => setModal({...modal, pcs: e.target.valueAsNumber}) } className="modalContentInput" /><span> =</span>
                            </div>
                            <p className="modalContent modalContent3">{modal.pcs | 0}</p>
                        </div>
                        <div className="modalContentContainer">
                            <p className="modalContent modalContent1">dozen</p>
                            <div className="modalContentInputContainer modalContent2">
                                <span>12 x </span><input type="number" value={modal.dozen / 12 | 0} onChange={(e) => setModal({...modal, dozen: e.target.valueAsNumber * 12}) } className="modalContentInput" /><span> =</span>
                            </div>
                            <p className="modalContent modalContent3">{modal.dozen | 0}</p>
                        </div>
                        <div className="modalContentTotal">
                            <p className="modalContent modalContentBold">Total stock <span>(in pcs)</span></p>
                            <p className="modalContent modalContentBold">{modal.pcs + modal.dozen | 0}</p>
                        </div>
                        <div className="modalButtons">
                            <Link to={"/update-stock-confirmation/" + pokemonName}>
                                <button className="modalButton modalButtonSimpan" type="submit" onClick={handleSubmit}>Save</button>
                            </Link>
                            <button className="modalButton modalButtonBatal" type="reset" onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default UpdateStockModal;