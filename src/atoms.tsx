import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

export enum Categories{
    "TO_DO" = "To Do",
    "DOING" = "Doing",
    "DONE" = "Done",
}

interface ICategoryList {
    [key:number]: string
}

const { persistAtom } = recoilPersist({
    key:"toDoPersist",
    storage: localStorage,
});

export const categoryListState = atom<ICategoryList[]>({
    key: "categoryList",
    default: [Categories.TO_DO,Categories.DOING,Categories.DONE],
    effects_UNSTABLE:[persistAtom]
});

export interface IToDo{
    id: number;
    text: string;
    category: Categories | string;
}

export const categoryState = atom<string>({
    key: "category",
    default: Categories.TO_DO,
    effects_UNSTABLE:[persistAtom]
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE:[persistAtom]
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get({get}) {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});