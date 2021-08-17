import './UpdateStockConfirmation.css'
import { getDate, getTime } from '../../MyFunc'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UpdateStockModal from '../../components/update-stock-modal/UpdateStockModal'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

const UpdateStockConfirmation: React.FC = () => {

    const [newNote, setNewNote] = useState('');
    const { prevState, modalData, data: pokemonData } = useTypedSelector((state) => state.pokemon);
    const { resetModalData, openModal, updateData } = useActions();

    const prevStock = (prevState.stock[0] |0)
    const diff = (modalData.pcs + modalData.dozen | 0)
    const countResult = (diff + prevStock | 0)
    const uppercaseName = prevState.name.charAt(0).toUpperCase() + prevState.name.slice(1)

    const handleOpen = () => openModal()

    let filteredData: any[] = []

    const handleCancelData = () => {
        resetModalData()
    }

    const handleSubmitData = () => {
        const newData = {
            ...prevState,
            stock: [countResult, ...prevState.stock],
            date: [getDate(Date.now()), ...prevState.date],
            time: [getTime(Date.now()), ...prevState.time],
            activity: ['Update stok', ...prevState.activity],
            note: [(newNote.length > 0 ? newNote : ''), ...prevState.note],
            total: [diff, ...prevState.total]
        }
        filteredData = pokemonData.filter(f => f.name !== prevState.name)
        filteredData.push(newData)
        updateData(filteredData)
        resetModalData()
    }

    return (
        <div className="KonfirmasiUpdateStok">
            <div className="konfirmasiUpdateStokTopMobile mobile">
                <Link to={"/detail-stock/" + prevState.name}>
                    <div className="crossContainer">
                        <img src="/assets/cross.svg" alt="" onClick={handleCancelData} />
                    </div>
                </Link>
                <div className="topTitleContainer">
                    <h3 className="topTitle">{uppercaseName}</h3>
                </div>
            </div>
            {prevState && (
                <div className="konfirmasiUpdateStokBodyContainerMobile">
                    <h1 className="konfirmasiUpdateStokHeadTitle">Stock Update Confirmation</h1>
                    <p className="konfirmasiUpdateStokSelisih">Difference</p>
                    <h1 className="konfirmasiUpdateStokTotalUpdate">{diff >= 0 && "+"}{diff} pcs</h1>
                    <div className="konfirmasiUpdateStokHasilUpdateContainer">
                        <div className="konfirmasiUpdateStokHasilUpdate konfirmasiUpdateStokHasilUpdate1">
                            <p>In the system</p>
                            <h3>{prevStock} pcs</h3>
                        </div>
                        <div className="konfirmasiUpdateStokHasilUpdate konfirmasiUpdateStokHasilUpdate2">
                            <img src="/assets/arrow-right.svg" alt="" />
                        </div>
                        <div className="konfirmasiUpdateStokHasilUpdate konfirmasiUpdateStokHasilUpdate3">
                            <p>Stocks will be</p>
                            <h3>{countResult} pcs</h3>
                        </div>
                    </div>
                    <div className="konfirmasiUpdateStokDetailStokOpnameMobile mobile">
                        <h3>Stock Opname Detail</h3>
                    </div>
                    <div className="konfirmasiUpdateStokFrame">
                        <div className="konfirmasiUpdateFrameLine konfirmasiUpdateFrameLine1">
                            <div className="konfirmasiUpdateStokLine1 konfirmasiUpdateStokcol1"><p>Summary</p></div>
                            <div className="konfirmasiUpdateStokLine1 konfirmasiUpdateStokcol2"><p>Detail</p></div>
                            <div className="konfirmasiUpdateStokLine1 konfirmasiUpdateStokcol3"><p>Total</p></div>
                            <div className="konfirmasiUpdateStokLine1 konfirmasiUpdateStokcol4"><p></p></div>
                        </div>
                        <div className="konfirmasiUpdateFrameLine konfirmasiUpdateFrameLine2">
                            <div className="konfirmasiUpdateStokLine2 konfirmasiUpdateStokcol1">
                                <p>Stocks will be updated</p>
                                <p className="konfirmasiUpdateKeteranganMobile mobile">{modalData.pcs} pcs, {modalData.dozen / 12} dozen</p>
                            </div>
                            <div className="konfirmasiUpdateStokLine2 konfirmasiUpdateStokcol2"><p>{modalData.pcs | 0} pcs, {modalData.dozen / 12 | 0} dozen</p></div>
                            <div className="konfirmasiUpdateStokLine2 konfirmasiUpdateStokcol3"><p>{countResult} pcs</p></div>
                            <div className="konfirmasiUpdateStokLine2 konfirmasiUpdateStokcol4"><img className="konfirmasiUpdateStokLineEdit" src="/assets/pencil.svg" alt="" onClick={handleOpen} /></div>
                        </div>
                        <div className="konfirmasiUpdateFrameLine konfirmasiUpdateFrameLine3">
                            <div className="konfirmasiUpdateStokLine3 konfirmasiUpdateStokcol1"><p>Stock opname total result</p></div>
                            <div className="konfirmasiUpdateStokLine3 konfirmasiUpdateStokcol2"><p></p></div>
                            <div className="konfirmasiUpdateStokLine3 konfirmasiUpdateStokcol3"><p>{countResult} pcs</p></div>
                            <div className="konfirmasiUpdateStokLine3 konfirmasiUpdateStokcol4"><p></p></div>
                        </div>
                    </div>
                    <div className="konfirmasiUpdateStokCatatan">
                        <h3 className="konfirmasiUpdateStokCatatanTitle">Note</h3>
                        <form className="konfirmasiUpdateStokForm">
                            <textarea placeholder="Example: first stock update" className="konfirmasiUpdateStokCatatanTextarea" value={newNote} name="catatan" id="catatan" rows={3} onChange={e => setNewNote(e.target.value)}></textarea><br />
                            <div className="konfirmasiUpdateStokButtonContainer">
                                <Link to={"/detail-stock/" + prevState.name}>
                                    <button className="konfirmasiUpdateStokButton konfirmasiUpdateStokButtonSimpan" type="button" onClick={handleSubmitData}>Save</button>
                                </Link>
                                <Link to={"/detail-stock/" + prevState.name}>
                                    <button className="konfirmasiUpdateStokButton konfirmasiUpdateStokButtonBatal desktop" type="reset" onClick={handleCancelData}>Cancel</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <UpdateStockModal />
        </div>
    )
}

export default UpdateStockConfirmation;