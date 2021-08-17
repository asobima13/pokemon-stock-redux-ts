import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
// import { useSelector, RootStateOrAny } from 'react-redux'
import { Action } from '../actions'
import { getTime } from '../../MyFunc'

type Pokemon = {
    name: string;
    stock: number[];
    date: string[];
    time: string[];
    activity: string[];
    note: string[];
    total: number[]
}

type Modal = {
    pcs: number;
    dozen: number;
}

type PokemonData = {
    name: string;
    stock: number[];
    date: string[];
    time: string[];
    activity: string[];
    note: string[];
    total: number[]
}[]

export const fetchData = () => {

    const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/?limit=1118'
    let pokemonData: PokemonData = [];

    return async (dispatch: Dispatch<Action>) => {

        try {
            const { data } = await axios.get(pokeAPI)

            await data.results.map((res: Pokemon) => 
                pokemonData.push({
                    name: res.name,
                    stock: [0],
                    date: ['Jul 15 2021'],
                    time: [getTime(Date.now())],
                    activity: ['First stock'],
                    note: ['First stock'],
                    total: [0]
                })
            )

            dispatch({
                type: ActionType.FETCH_DATA_SUCCESS,
                payload: pokemonData
            })
        } catch (err) {
            
            dispatch({
                type: ActionType.FETCH_DATA_ERROR,
                payload: err.message     
            })   
            console.error(err)
        }
    }

}

export const getPokemonName = (term: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_POKEMON_NAME,
            payload: term
        })
    }
}

export const openModal = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.OPEN_MODAL,
            payload: true
        })
    }
}

export const closeModal = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CLOSE_MODAL,
            payload: false
        })
    }
}

export const setPrevState = (term: Pokemon) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_PREV_STATE,
            payload: term
        })
    }
}

export const resetPrevState = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.RESET_PREV_STATE,
            payload: { name: '', stock: [], date: [], time: [], activity: [], note: [], total: [] }
        })
    }
}

export const setModalData = (term: Modal) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_MODAL,
            payload: term
        })
    }
}

export const resetModalData = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.RESET_MODAL,
            payload: {pcs: 0, dozen: 0}
        })
    }
}

export const updateData = (term: PokemonData) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_DATA,
            payload: term
        })
    }
}