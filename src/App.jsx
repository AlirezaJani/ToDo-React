import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex , seteditIndex] =useState(false);

  const handleORaddTask = () => {
    
    if (!input.trim()) return;

    if(editIndex!==false){
      const update = [...tasks]
      update[editIndex].text = input
      setTasks(update);
      seteditIndex(false)
    }else{
      setTasks([...tasks , {text:input , done : false}])

    }
    setInput(''); 
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // حذف تسک با ایندکس مشخص
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done; // تغییر وضعیت انجام شده/نشده
    setTasks(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleORaddTask(); 
    }
  };
  const myEdit = (index)=>{
    setInput(tasks[index].text)
    seteditIndex(index)
    setTimeout(() => {
      document.getElementById('todo-input')?.focus();
    }, 0);
  }

 



  return (
    <main className='w-full h-screen bg-slate-200 flex justify-center items-center pt-2 overflow-x-hidden px-2 '>
      <section className='flex flex-col justify-start items-center bg-white p-4 w-full max-w-4xl h-5/6 rounded-lg shadow-lg overflow-y-auto'>
        <h1 className='text-2xl font-bold italic mb-4 text-center sm:text-left'>ToDo List</h1>

        {/* Input section */}
        <div className='flex flex-col sm:flex-row w-full gap-4 lg:gap-0 sm:w-10/12 justify-center items-center mb-4'>
          <input
            id="todo-input"
            className='w-full sm:w-10/12 h-10 font-semibold bg-white rounded-2xl lg:rounded-r-none border border-gray-400 px-3'
            type="text"
            placeholder="Add a new task"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleORaddTask} // اضافه کردن تسک
            className='w-full sm:w-2/12 h-10 flex justify-center items-center cursor-pointer rounded-2xl sm:rounded-r-2xl sm:rounded-l-none bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2'>
            {editIndex !==false ? 'Update' : 'Add'}
          </button>
        </div>

        {/* Table */}
        <div className='w-full overflow-x-hidden'>
          <table className='w-full min-w-[320px] sm:min-w-[600px] table-auto'>
            <thead>
              <tr className='*:border *:border-gray-400 text-sm bg-gray-200'>
                <th className='p-1'>
                  <input type="checkbox" checked />
                </th>
                <th className='p-1'>No.</th>
                <th className='px-4'>Todo item</th>
                <th className='p-1'>Status</th>
                <th className='px-5'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => (
                <tr    key={index} className='bg-gray-100 w-full min-w-[320px] border sm:min-w-[600px] table-auto border-b-gray-400 text-[15px] font-medium hover:bg-gray-200 transition-all duration-200'>
                  <td  className='p-1 mx-auto'>
                    <input
                      className='mx-auto'
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleDone(index)} // تغییر وضعیت انجام شده
                    />
                    
                  </td>
                  <td onClick={() => toggleDone(index)} className={`p-1 text-center text-gray-500 font-light  ${task.done ? ' text-green-500 ' : ''}`} >{index + 1}</td>

                  <td onClick={() => toggleDone(index)} className='px-4 max-w-[200px]'>
                    <p
                      className={`text-gray-800 ${task.done ? 'line-through text-slate-400 ' : ''}`}
                      style={{
                        maxHeight: '80px',
                        overflowY: 'auto',
                      }}
                    >
                      {task.text}
                    </p>
                  </td>

                  <td onClick={() => toggleDone(index)}  className='px-2 text-gray-500 text-center font-light whitespace-nowrap'>
                    {task.done ? 'Completed' : 'In progress'}
                  </td>

                  <td className='p-0 h-full'>
                    <div className='flex flex-row h-full'>
                      <button
                        onClick={() => handleDelete(index)} // حذف تسک
                        className='w-1/2 h-[40px] bg-red-600 text-white hover:bg-red-700 transition-all text-sm flex justify-center items-center'>
                        Delete
                      </button>
                      <button onClick={()=>myEdit(index)}  className='w-1/2 h-[40px] bg-blue-500 text-white hover:bg-blue-600 transition-all text-sm flex justify-center items-center'>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
