import { ActionType } from '../action-types'
import { Action } from '../actions'

type Pokemon = {
    name: string;
    stock: number[];
    date: string[];
    time: string[];
    activity: string[];
    note: string[];
    total: number[]
}

interface PokemonState {
    data: any[];
    dataError: string | null;
    pokemonName: string;
    prevState: Pokemon;
    modalData: {
        pcs: number;
        dozen: number;
    };
    isModalOpen: boolean;
}

const initialState = {
    data: [],
    dataError: null,
    pokemonName: '',
    prevState: {
        name: '',
        stock: [],
        date: [],
        time: [],
        activity: [],
        note: [],
        total: []
    },
    modalData: {
        pcs: 0,
        dozen: 0
    },
    isModalOpen: false
}

const reducer = (
    state: PokemonState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionType.FETCH_DATA_SUCCESS:
            return { ...state, data: action.payload }
        case ActionType.FETCH_DATA_ERROR:
            return { ...state, dataError: action.payload }
        case ActionType.GET_POKEMON_NAME:
            return { ...state, pokemonName: action.payload }
        case ActionType.OPEN_MODAL:
            return { ...state, isModalOpen: action.payload }
        case ActionType.CLOSE_MODAL:
            return { ...state, isModalOpen: action.payload }
        case ActionType.SET_PREV_STATE:
            return { ...state, prevState: action.payload }
        case ActionType.RESET_PREV_STATE:
            return { ...state, prevState: action.payload }
        case ActionType.SET_MODAL:
            return { ...state, modalData:
                {
                    pcs: state.modalData.pcs + action.payload.pcs,
                    dozen: state.modalData.dozen + action.payload.dozen
                }
            }
        case ActionType.RESET_MODAL:
            return { ...state, modalData: action.payload }
        case ActionType.UPDATE_DATA:
            return { ...state, data: action.payload }
        default:
            return state;
    }
}

export default reducer;