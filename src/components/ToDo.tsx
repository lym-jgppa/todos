import { useSetRecoilState, useRecoilValue } from "recoil";
import { Categories, IToDo, toDoState, categoryListState, categoryState } from "../atoms";


function ToDo({text, id, category}:IToDo){
    const setToDos = useSetRecoilState(toDoState);
    const categorylist = useRecoilValue(categoryListState);
    const currentCategory = useRecoilValue(categoryState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: {name} } = event;
        setToDos( (oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo = {text, id, category:name as any};
            return [
                ...oldToDos.slice(0,targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex+1)
            ];
        });
    };
    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setToDos( (oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            return [
                ...oldToDos.slice(0,targetIndex),
                ...oldToDos.slice(targetIndex+1)
            ];
        });
    };
    return (
        <li>
            <span>{text}</span>&nbsp;
            { categorylist.map( (category, index) => (
              ( category !== currentCategory ) ? (
                <button key={index} name={category+""} onClick={onClick}>{category+""}</button>
              ) : (null)
            ))}
            &nbsp;<button name="delete" onClick={deleteHandler}>&times;</button>
        </li>
    );
}

export default ToDo;