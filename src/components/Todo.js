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
    const [editeditem, setEditeditem]=useState("")
    const [toggle_edit_btn, setToggle_edit_btn]=useState(false)

    useEffect(()=>{
        localStorage.setItem("mytodolist" , JSON.stringify(items))
    },[items])

    // Add Items
    const addItem = () => {
        if (!inputdata) {
            alert("Plz 🙏 give input for adding")
        } else if(inputdata && toggle_edit_btn){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === editeditem){
                        return {...curElem, item:inputdata }
                    }
                    return curElem
                })
            )
            setInputData("")
            setEditeditem(null)
            setToggle_edit_btn(false)
        } 
        
        else {
            const myNewInputData ={
                id: new Date().getTime().toString(),
                item:inputdata,
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }

    // EDIT ITEMS
    const editItem=(index)=>{
        const item_todo_edited=items.find((curElem) => {
            return curElem.id === index
        })
        setInputData(item_todo_edited.item)
        setEditeditem(index)
        setToggle_edit_btn(true)
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
                        {toggle_edit_btn?(<i className=" far fa-edit add-btn" onClick={addItem}></i>
                        ) : (<i className=" fa fa-solid fa-plus add-btn" onClick={addItem}></i>
                        
                        )}

                        

                        
                    </div>

                    {/* SHOW  all ITEMS */}
                    <div className='showItems'>
                        {items.map((curElem) => {
                            return (
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.item}</h3>
                                    <div className='todo-btn'>
                                        <i className=" far fa-edit add-btn"
                                        onClick={()=> editItem(curElem.id)}></i>
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
