import React, { useState, useEffect } from 'react'
import '../to-do/style.css'


const getLocalData = () => {
    const lists = localStorage.getItem("myTodos");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputdata, setInputdata] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButtton, setToggleButton] = useState(false);

    const addItems = () => {
        if (!inputdata) {
            alert("Please add the item in the input..")
        }else if(inputdata && toggleButtton){
            setItems(
                items.map((curElement) => {
                    if(curElement.id === isEditItem){
                        return { ...curElement, name : inputdata}
                    }
                    return curElement;
                })
            )
            setInputdata([]);
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime(),
                name: inputdata
            };
            setItems([...items, myNewInputData]);
            setInputdata('');
        }
    };

    const editItem = (index) => {
        const item_todo_edited = items.find((curElement) => {
            return curElement.id === index;
        })
        setInputdata(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElement) => {
            return curElement.id !== index;
        });
        setItems(updatedItems);
    };

    const removeAll = () => {
        setItems([]);
    };

    useEffect(() => {
        localStorage.setItem("myTodos", JSON.stringify(items));
    }, [items]);

    const handleKeyPress = (event) =>{
        if (event.key === 'Enter'){
            addItems();
        }
    }




    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="../images/todo.svg" alt="todologo" />
                        <figcaption>Add your TODO list 💗</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="Add your Item here💕" className='form-control' value={inputdata} onChange={(event) => setInputdata(event.target.value)} 
                        onKeyDown={handleKeyPress}/>
                        {toggleButtton ? <i className="far fa-edit add-btn" onClick={addItems}></i> : <i className="fa fa-plus add-btn" onClick={addItems}></i>}
                       
                    </div>
                    <div className='showItems'>
                        {
                            items.map((curElement) => {
                                return (
                                    <div className="eachItem" key={curElement.id}>
                                        <h3>{curElement.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(curElement.id)}></i>
                                            <i className="fas fa-trash-alt add-btn" onClick={() => deleteItem(curElement.id)}></i>
                                        </div>
                                    </div>)
                            })
                        }

                    </div>
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeAll}>
                            <span>Checklist</span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Todo;
