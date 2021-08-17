import './DetailStock.css'
import { useParams } from 'react-router'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions'
import UpdateStockModal from '../../components/update-stock-modal/UpdateStockModal'

type PokemonProps = {
    name: string;
    stock: number[];
    date: string[];
    time: string[];
    activity: string[];
    note: string[];
    total: number[]
}

const DetailStock: React.FC = () => {

    const { data: pokemonData } = useTypedSelector((state) => state.pokemon)
    const { openModal, setPrevState } = useActions();
    
    const { pokemonName } = useParams<{pokemonName?:string}>()
    const [data, setData] = useState<PokemonProps | null>()

    useEffect(() => {
        const datum = pokemonData.filter(f => f.name === pokemonName)
        setData(datum[0])
    }, [pokemonData, pokemonName])

    const prevStateData = data && {
        name: data.name,
        stock: data.stock,
        date: data.date,
        time: data.time,
        activity: data.activity,
        note: data.note,
        total: data.total
    }

    const handleUpdateStock = () => {
        openModal()
        prevStateData && setPrevState(prevStateData)
    }

    return (
        <div className="DetailStock">
            <div className="detailStockTop">
                <div className="detailStockLeft">
                    <div className="detailStockBack">
                        <Link to="/">
                            <div className="arrowContainer">
                                <img src="/assets/arrow-left.svg" alt="" />
                            </div>
                        </Link>
                        <Link to="/">
                            <div className="backTitleContainer">
                                <h3 className="backTitle">{"Stock Pok\u00E9mon"}</h3>
                            </div>
                        </Link>
                    </div>
                    <div className="detailStockPageTitle">
                        <h1>{pokemonName && pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
                    </div>
                </div>
                <div className="detailStockRight">
                    <button className="updateStokButton" type="button" onClick={handleUpdateStock}>Update stock</button>
                </div>
            </div>
            <div className="detailStockBottom">
                <div className="sisaStokContainer">
                    <h5 className="sisaStokTitle">Stock left</h5>
                    <h4 className="sisaStokTotal">{data && data.stock[0]} pcs</h4>
                </div>
                <div className="riwayatStokContainer">
                    <h3 className="riwayatStokTitle">Stock history</h3>
                    <h5 className="riwayatStokKeterangan">Stock in pcs</h5>
                </div>
                <div className="frame2">
                    <div className="frameListItem2">
                        <div className="frameListItemLeft2">
                            <div className="frameListItemHead2">
                                <p>Date</p>
                            </div>
                            <div className="frameListItemHead2">
                                <p>Activity</p>
                            </div>
                            <div className="frameListItemHead2">
                                <p>Note</p>
                            </div>
                        </div>
                        <div className="frameListItemRight2">
                            <div className="frameListItemHead2 frameListItemJmlh">
                                <p>Total</p>
                            </div>
                            <div className="frameListItemHead2 frameListItemStok">
                                <p>Stock</p>
                            </div>
                        </div>
                    </div>
                    {
                        data && data.time.map((d, i) => (
                            <div style={{ width: "100%" }} key={i}>
                                <div className="frameListItem2Body">
                                    <div className="frameListMobileLeft">
                                        {data.date[i] !== data.date[i - 1] &&
                                            (<div className="frameListHeadMobile2 mobile">
                                                <div className="frameListHeadLeftMobile2">
                                                    <p className="frameListHeadItemMobile mobile">{data.date[i]}</p>
                                                </div>
                                                <div className="frameListHeadMiddleMobile2">
                                                    <p className="frameListJmlh2Mobile frameListHeadItemMobile mobile">Total</p>
                                                </div>
                                                <div className="frameListHeadRightMobile2">
                                                    <p className="frameListStok2Mobile frameListHeadItemMobile mobile">Stock</p>
                                                </div>
                                            </div>)
                                        }
                                        <div className="frameListItemBodyMobile">
                                            <div className="frameListItemLeft2">
                                                <div className="frameListItemBody2 waktuTanggal2">
                                                    <p className="tanggal2 desktop">{data.date[i]}</p>
                                                    <p className="komaWaktuTanggal2">,&nbsp;</p>
                                                    <p className="waktu2">{d}</p>
                                                </div>
                                                <div className="frameListItemBody2">
                                                    <p className="frameListItemItemKegiatan2">{data.activity[i]}</p>
                                                </div>
                                                <div className="frameListItemBody2">
                                                    <p>{data.note[i]}</p>
                                                </div>
                                            </div>
                                            <div className="frameListItemRight2Mobile mobile">
                                                <div className="frameListItemBody2Mobile frameListItemJmlhMobile">
                                                    <p style={Number(data.total[i]) > 0 ? { color: "#219653" } : Number(data.total[i]) < 0 ? { color: 'red' } : { color: "#333" }}>{Number(data.total[i]) > 0 && "+"}{data.total[i]}</p>
                                                </div>
                                                <div className="frameListItemBody2Mobile frameListItemStokMobile">
                                                    <p>{data.stock[i]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="frameListItemRight2 desktop">
                                        <div className="frameListItemBody2 frameListItemJmlh">
                                            <p style={Number(data.total[i]) > 0 ? { color: "#219653" } : Number(data.total[i]) < 0 ? { color: 'red' } : { color: "#333" }}>{Number(data.total[i]) > 0 && "+"}{data.total[i]}</p>
                                        </div>
                                        <div className="frameListItemBody2 frameListItemStok">
                                            <p>{data.stock[i]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
            <UpdateStockModal />
        </div>
    )
}

export default DetailStock;