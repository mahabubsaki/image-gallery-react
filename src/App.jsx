import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';



const App = () => {
  const [imgs, setImgs] = useState([
    'https://i.ibb.co/NjLqnbP/image-1.jpg',
    'https://i.ibb.co/rs3PXn4/image-2.jpg',
    'https://i.ibb.co/N76DkdX/image-3.jpg',
    'https://i.ibb.co/vZqrVXR/image-4.jpg',
    'https://i.ibb.co/68p7rhN/image-5.jpg',
    'https://i.ibb.co/dkp6NTs/image-6.jpg',
    'https://i.ibb.co/8sMW04x/image-7.jpg',
    'https://i.ibb.co/CQCYRb1/image-8.jpg',
    'https://i.ibb.co/hgR51KZ/image-9.jpg',
    'https://i.ibb.co/9hT8FpT/image-10.jpg',
    'https://i.ibb.co/TBv367b/image-11.jpg'
  ]);
  const fileRef = useRef();
  const [selected, setSelected] = useState([]);
  const onDragEnd = (result) => {
    const { destination } = result;
    if (!destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const updatedImgs = [...imgs];
    let temp = updatedImgs[sourceIndex];
    updatedImgs[sourceIndex] = updatedImgs[destinationIndex];
    updatedImgs[destinationIndex] = temp;
    setImgs(updatedImgs);

  };
  const [hover, setHover] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const tempImg = URL.createObjectURL(file);

      fileRef.current.value = null;
      setImgs(p => [...p, tempImg]);
    }
  };
  const handleDelete = (selected, imgs) => {
    selected.forEach(i => {
      imgs.splice(i, 1);
    });

    setImgs(imgs);
    setSelected([]);
  };
  console.log(selected);
  return (
    <main className='max-w-7xl mx-auto py-5'>
      {selected.length > 0 ? <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold '>{selected.length} Files Selected</h1>
        <p className='text-red-500 font-bold text-lg cursor-pointer' onClick={() => handleDelete(selected, imgs)}>Delete</p>
      </div> : <h1 className='text-2xl font-bold '>Gallery</h1>}

      <hr className='border border-zinc-400 my-4' />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid-container'>
          {imgs.map((img, index) => <Droppable isDropDisabled={selected.length > 0} key={index} droppableId={`drop-image-${index}`}  >
            {(provided) => (

              <div
                className='grid-item  rounded-lg overflow-hidden  border-zinc-400 relative'
                ref={provided.innerRef}
                {...provided.droppableProps}


              >

                <Draggable draggableId={`drah-image-${index}`} isDragDisabled={selected.length > 0} shouldRespectForcePress index={index}>
                  {(provided, snapshot) => (
                    <>

                      <div

                        className='absolute inset-0 border transition-transform transform filter brightness-100 hover:brightness-75 rounded-lg group  border-zinc-400'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(null)}
                      >

                        <img alt="" draggable="false" src={img} className={`w-full select-none transition-transform transform group-hover:scale-[1.14] ${selected.includes(index) && 'brightness-90 blur-[1px] scale-[1.25]'} duration-300 filter brightness-100 hover:brightness-75 z-[1]  h-full rounded-lg object-cover border  border-zinc-400`} />

                        <Checkbox isChecked={selected.includes(index)} colorScheme='green' onChange={(e) => {
                          if (e.target.checked) {
                            setSelected(p => [...p, index]);
                          } else {
                            setSelected(p => p.filter(i => i !== index));
                          }
                        }} size={'lg'} border={'cyan'} hidden={(hover !== index && !selected.includes(index)) || snapshot.isDragging} className='absolute  top-[-84%] z-[2000] -left-[32%]'></Checkbox>

                      </div>


                    </>
                  )}
                </Draggable>

                {index === 0 ? <div className='h-[430px] border rounded-lg  border-zinc-400'>

                </div> : <div className='grid-item border rounded-lg  border-zinc-400'>

                </div>}

                {provided.placeholder}
              </div>
            )}
          </Droppable>)}
          <div onClick={() => fileRef.current.click()} className='grid-item rounded-lg border cursor-pointer border-zinc-400 border-dashed bg-gray-100 flex justify-center items-center gap-5 flex-col'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
            <p className='text-xl font-semibold'>Add Images</p>
            <input onChange={handleFileChange} type="file" className='w-0 h-0' ref={fileRef} />
          </div>
        </div>

      </DragDropContext>

    </main >
  );
};

export default App;