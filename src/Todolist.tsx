import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (newTitle: string) => void;
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('');

    const addTaskHandler = () => {
        props.addTask(newTitle);
        setNewTitle('');
    }

    // const changeFilterAll = () => {
    //     props.changeFilter("all")
    // }
    // const changeFilterActive = () => {
    //     props.changeFilter("active")
    // }
    //
    // const changeFilterCompleted = () => {
    //     props.changeFilter("completed")
    // }

    const changeFilterTsar=(value:FilterValuesType)=>{
        props.changeFilter(value)
    }

    // const removeTaskHandler=(tID:string)=>{
    //     props.removeTask(tID)
    // }

    const mappedTasks=props.tasks.map(t =>
        {
            const removeTaskHandler=()=>{
                props.removeTask(t.id)
            }
            return(
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={removeTaskHandler}>x
                    </button>
                </li>
            )
        }
    )

    const onKeyDownHandler=(e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler= (event:ChangeEvent<HTMLInputElement>) => {
            setNewTitle(event.currentTarget.value);
        }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />

                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                {/*<button onClick={() => { props.changeFilter("all") }}>All</button>*/}
                {/*<button onClick={changeFilterAll}>All</button>*/}
                {/*<button onClick={()=>changeFilterTsar('all')}>All</button>*/}

                <Button starter={()=>changeFilterTsar('all')} name={'All'}/>
                <Button starter={()=>changeFilterTsar('active')} name={'Active'}/>
                <Button starter={()=>changeFilterTsar('completed')} name={'Completed'}/>
            </div>
        </div>
    );
}