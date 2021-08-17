import './StockPokemon.css';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Link } from 'react-router-dom';

type PokemonDataProps = {
    name: string;
    stock: number[];
    date: string[];
    time: string[];
    activity: string[];
    note: string[];
    total: number[]
}[]

type PokemonProps = {
    name: string;
    stock: number[];
    date: string[];
    time: string[];
    activity: string[];
    note: string[];
    total: number[]
}

const StockPokemon: React.FC = () => {

    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState<PokemonDataProps>()
    const { data: pokemonData } = useTypedSelector((state) => state.pokemon)
        
    useEffect(() => {
        let searchResult = pokemonData && pokemonData.filter((f: PokemonProps) => f.name.toLowerCase().includes(searchValue.toLowerCase()))
        setData(searchResult)
    }, [searchValue, pokemonData]);

    return (
        <div className="StockPokemon">

            <div className="head">
                <h1 className="headTitle">{"Stock Pok\u00E9mon"}</h1>
            </div>
            <div className="search">
                <img className="searchIcon" src="./assets/search.svg" alt="" />
                <input className="searchInput" type="text" placeholder={'Search Pok\u00E9mon'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <div className="frame">
                <div className="frameList">
                    <div className="frameListItem">
                        <h3 className="frameListItemHead">Name</h3>
                        <h3 className="frameListItemHead">Stock</h3>
                    </div>
                    <hr className="listHr listHrHead" />
                </div>
                {
                    data && data.sort((a,b) => a.name.localeCompare( b.name)).map((datum, index) => (
                        index < 10 && (
                            <div className="frameList" key={index}>
                                <div className="frameListItem">
                                    <Link to={"/detail-stock/"+datum.name}>
                                        <h3 className="frameListItemNama">{datum.name.charAt(0).toUpperCase() + datum.name.slice(1)}</h3>
                                    </Link>
                                    <h3>{datum.stock[0]} pcs</h3>
                                </div>
                                <hr className="listHr" />
                            </div>
                        )
                    ))
                }
                
            </div>
        </div>
    )
}

export default StockPokemon;