import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { toDoState, categoryState, categoryListState } from "../atoms"
import styled from "styled-components";

interface IForm{
    todo: string,
    custom_category: string,
}

const FormWrapper = styled.div`
    form {
        display:flex;
        justify-content: space-between;
        flex-direction:row;
        gap:10px;
        input {
            width:100%;
        }
    }
`;

function CreateToDo(){
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categorylist, setCategoryList] = useRecoilState(categoryListState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({todo, custom_category}:IForm) => {
    const temporary_category = ( custom_category && custom_category !== '') ? custom_category : category;
    setToDos( (oldToDos) => [{text:todo, id: Date.now(), category: temporary_category}, ...oldToDos]);
    if( custom_category && custom_category !== ''){
        if( categorylist.indexOf(custom_category) === -1 ){
            setCategoryList ( (oldCategories) => [...oldCategories, custom_category] );
        }
        setCategory( custom_category );
    }
    setValue("custom_category", "");
    setValue("todo", "");
  }
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("custom_category")} placeholder="Write a new category" />
        <input {...register("todo", {required:"Please write a To Do"})} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </FormWrapper>
  );
}

export default CreateToDo;