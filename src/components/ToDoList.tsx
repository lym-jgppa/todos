import React, { useState } from "react";
import CreateToDo from "./CreateToDo"
import ToDo from "./ToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, toDoSelector, categoryState, categoryListState } from "../atoms";
import styled from "styled-components";

const Wrapper = styled.div`
  margin:20px auto;
  max-width: 400px;
  h1{
    text-align:center;
    font-size:24px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom:40px;
  select {
    margin-bottom: 20px;
  }
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  li{
    padding: 20px 0;
  }
  li:nth-child(2n){
    
  }
`;

function ToDoList() {
  const [categorylist, setCategoryList] = useRecoilState(categoryListState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => { 
    setCategory( event.currentTarget.value as any);
  }
  const categoryDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetIndex = categorylist.indexOf(category);
    setCategoryList( (oldCategoryList) => [
      ...oldCategoryList.slice(0,targetIndex),
      ...oldCategoryList.slice(targetIndex+1)
    ])
  }
  return (
    <Wrapper>
      <h1>To Dos</h1>
      <SelectWrapper>
        <h2>Categories</h2>
        <select value={category} onInput={onInput}>
          {categorylist.map( (a_category, index) =>
            <option key={index} value={a_category+""}>{a_category+""}</option>
          )}
        </select>
        <h2>Add ToDo</h2>
        <CreateToDo />
      </SelectWrapper>
      
      {
        ( toDos.length > 0 ) ? (
          <>
            <h2> {category}({toDos.length}) </h2>
            <hr />
          </>
        ) : ( <h2>Category '{category}' is empty.</h2> )
      }
      <ListWrapper>
      {
        toDos?.map((toDo)=>(
          <ToDo key={toDo.id} {...toDo} />
        ))
      }
      </ListWrapper>
    </Wrapper>
  );
}

export default ToDoList;