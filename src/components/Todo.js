import React, { useEffect, useState } from 'react'
import "./style.css"

const getLocalStoragedata=()=>{
    const lists=localStorage.getItem("mytodolist")

    if(lists){
        return JSON.parse(lists)
    }else{
        return []
    }
}
const Todo = () => {
    const [inputdata, setInputData] = useState("")
    const [items, setItems] = useState(getLocalStoragedata())

    useEffect(()=>{
        localStorage.setItem("mytodolist" , JSON.stringify(items))
    },[items])

    // Add Items
    const addItem = () => {
        if (!inputdata) {
            alert("Plz 🙏 give input for adding")
        } else {
            const myNewInputData ={
                id: new Date().getTime().toString(),
                item:inputdata,
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }

    // Delete Items
    const deleteItem= (index) =>{
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index

        })
        setItems(updatedItems)

    }

    // Delete All Items
    const removeAll=()=>{
        setItems([])
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='./image/todo.svg' alt='todo logo' />
                        <figcaption> Add Your List Here ✌️</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text"
                            placeholder='✍️ Add Item'
                            className='form-control'
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}
                        />

                        <i className=" fa fa-solid fa-plus add-btn" onClick={addItem}></i>
                    </div>

                    {/* SHOW  all ITEMS */}
                    <div className='showItems'>
                        {items.map((curElem) => {
                            return (
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.item}</h3>
                                    <div className='todo-btn'>
                                        <i className=" far fa-edit add-btn"></i>
                                        <i className=" far fa-trash-alt add-btn" 
                                        onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>

                            )

                        })}

                    </div>



                    {/* REMOVE ALL BUTTONS */}
                    <div className='showItems'>
                        <button className='btn effect04 ' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span className='checklist'>CHECK List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
