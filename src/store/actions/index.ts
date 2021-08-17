import { ActionType } from '../action-types'

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

interface FetchDataSuccessAction {
    type: ActionType.FETCH_DATA_SUCCESS;
    payload: any[];
}
interface FetchDataErrorAction {
    type: ActionType.FETCH_DATA_ERROR;
    payload: string;
}

interface GetPokemonNameAction {
    type: ActionType.GET_POKEMON_NAME;
    payload: string;
}

interface OpenModalAction {
    type: ActionType.OPEN_MODAL;
    payload: boolean;
}

interface CloseModalAction {
    type: ActionType.CLOSE_MODAL;
    payload: boolean;
}

interface SetPrevStateAction {
    type: ActionType.SET_PREV_STATE;
    payload: Pokemon;
}

interface ResetPrevStateAction {
    type: ActionType.RESET_PREV_STATE;
    payload: Pokemon;
}

interface SetModalAction {
    type: ActionType.SET_MODAL;
    payload: { pcs: number; dozen: number;}
}

interface ResetModalAction {
    type: ActionType.RESET_MODAL;
    payload: { pcs: number; dozen: number;}
}

interface UpdateDataAction {
    type: ActionType.UPDATE_DATA;
    payload: any[];
}

export type Action = 
    FetchDataSuccessAction |
    FetchDataErrorAction |
    GetPokemonNameAction |
    OpenModalAction |
    CloseModalAction |
    SetPrevStateAction |
    ResetPrevStateAction |
    SetModalAction |
    ResetModalAction |
    UpdateDataAction