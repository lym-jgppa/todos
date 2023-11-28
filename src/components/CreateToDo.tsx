import { useSetRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { toDoState, categoryState } from "../atoms"

interface IForm{
    todo: string;
}

function CreateToDo(){
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({todo}:IForm) => {
    setToDos( (oldToDos) => [{text:todo, id: Date.now(), category}, ...oldToDos]);
    setValue("todo", "");
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input 
        {
          ...register("todo", {required:"Please write a To Do"})
        }
        placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateToDo;