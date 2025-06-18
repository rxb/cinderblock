/**
 * Drag-and-drop reorderable list component using react-dnd.
 * Enables users to reorder items by dragging them to new positions.
 * 
 * Reorderable provides drag-and-drop functionality for list items using
 * react-dnd. It handles the complex drag detection, hover calculations,
 * and reordering logic. Items can be dragged vertically to new positions
 * with smooth visual feedback and performance optimizations.
 * 
 * Platform Support:
 * - Web: Full support using HTML5 drag-and-drop backend
 * - React Native: Requires react-dnd-react-native-backend (not included)
 * 
 * Dependencies:
 * - react-dnd
 * - react-dnd-html5-backend (for web)
 * - DndProvider must wrap the component tree
 * 
 * @param {Object} props - Component props
 * @param {string|number} props.id - Unique identifier for the item
 * @param {number} props.index - Current position index of the item
 * @param {Function} props.moveItem - Callback to handle item reordering
 * @param {React.ReactNode} props.children - Content to make draggable
 * 
 * @example
 * // Basic reorderable todo list
 * function TodoList() {
 *   const [todos, setTodos] = useState([
 *     { id: '1', text: 'Learn React', completed: false },
 *     { id: '2', text: 'Build an app', completed: false },
 *     { id: '3', text: 'Deploy to production', completed: false }
 *   ]);
 * 
 *   const moveItem = useCallback((dragIndex, hoverIndex) => {
 *     const dragItem = todos[dragIndex];
 *     const newTodos = [...todos];
 *     newTodos.splice(dragIndex, 1);
 *     newTodos.splice(hoverIndex, 0, dragItem);
 *     setTodos(newTodos);
 *   }, [todos]);
 * 
 *   return (
 *     <DndProvider backend={HTML5Backend}>
 *       <Section>
 *         <Chunk><Text type="title">Reorderable Todo List</Text></Chunk>
 *         
 *         {todos.map((todo, index) => (
 *           <Reorderable
 *             key={todo.id}
 *             id={todo.id}
 *             index={index}
 *             moveItem={moveItem}
 *           >
 *             <Chunk>
 *               <Card>
 *                 <Section>
 *                   <Flex direction="row" align="center">
 *                     <FlexItem>
 *                       <Icon shape="Menu" color="gray" />
 *                     </FlexItem>
 *                     <FlexItem grow>
 *                       <Text>{todo.text}</Text>
 *                     </FlexItem>
 *                     <FlexItem shrink>
 *                       <CheckBox
 *                         value={todo.completed}
 *                         onChange={(completed) => updateTodo(todo.id, { completed })}
 *                       />
 *                     </FlexItem>
 *                   </Flex>
 *                 </Section>
 *               </Card>
 *             </Chunk>
 *           </Reorderable>
 *         ))}
 *       </Section>
 *     </DndProvider>
 *   );
 * }
 * 
 * @example
 * // Reorderable image gallery
 * function ImageGallery() {
 *   const [images, setImages] = useState([
 *     { id: 'img1', url: '/photo1.jpg', title: 'Sunset' },
 *     { id: 'img2', url: '/photo2.jpg', title: 'Mountain' },
 *     { id: 'img3', url: '/photo3.jpg', title: 'Ocean' }
 *   ]);
 * 
 *   const moveImage = useCallback((dragIndex, hoverIndex) => {
 *     const dragImage = images[dragIndex];
 *     const newImages = [...images];
 *     newImages.splice(dragIndex, 1);
 *     newImages.splice(hoverIndex, 0, dragImage);
 *     setImages(newImages);
 *   }, [images]);
 * 
 *   return (
 *     <DndProvider backend={HTML5Backend}>
 *       <Section>
 *         <Chunk><Text type="title">Drag to Reorder Gallery</Text></Chunk>
 *         
 *         <Flex direction="row" wrap>
 *           {images.map((image, index) => (
 *             <Reorderable
 *               key={image.id}
 *               id={image.id}
 *               index={index}
 *               moveItem={moveImage}
 *             >
 *               <FlexItem basis="33%">
 *                 <Card style={{ margin: 8, cursor: 'move' }}>
 *                   <ImageRatio
 *                     image={image.url}
 *                     imageHeight={{ small: 120, medium: 150 }}
 *                   />
 *                   <Section>
 *                     <Chunk><Text align="center">{image.title}</Text></Chunk>
 *                   </Section>
 *                 </Card>
 *               </FlexItem>
 *             </Reorderable>
 *           ))}
 *         </Flex>
 *       </Section>
 *     </DndProvider>
 *   );
 * }
 * 
 * @example
 * // Reorderable navigation menu
 * function EditableNavigation() {
 *   const [navItems, setNavItems] = useState([
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'about', label: 'About', href: '/about' },
 *     { id: 'services', label: 'Services', href: '/services' },
 *     { id: 'contact', label: 'Contact', href: '/contact' }
 *   ]);
 * 
 *   const moveNavItem = useCallback((dragIndex, hoverIndex) => {
 *     const dragItem = navItems[dragIndex];
 *     const newNavItems = [...navItems];
 *     newNavItems.splice(dragIndex, 1);
 *     newNavItems.splice(hoverIndex, 0, dragItem);
 *     setNavItems(newNavItems);
 *   }, [navItems]);
 * 
 *   const saveOrder = () => {
 *     // Save the new order to your API
 *     api.updateNavigationOrder(navItems.map(item => item.id));
 *   };
 * 
 *   return (
 *     <DndProvider backend={HTML5Backend}>
 *       <Section>
 *         <Chunk>
 *           <Flex direction="row" align="center">
 *             <FlexItem grow>
 *               <Text type="title">Edit Navigation Order</Text>
 *             </FlexItem>
 *             <FlexItem shrink>
 *               <Button onPress={saveOrder}>Save Order</Button>
 *             </FlexItem>
 *           </Flex>
 *         </Chunk>
 *         
 *         {navItems.map((item, index) => (
 *           <Reorderable
 *             key={item.id}
 *             id={item.id}
 *             index={index}
 *             moveItem={moveNavItem}
 *           >
 *             <Chunk>
 *               <Card>
 *                 <Section>
 *                   <Flex direction="row" align="center">
 *                     <FlexItem shrink>
 *                       <Icon shape="GripVertical" color="gray" />
 *                     </FlexItem>
 *                     <FlexItem grow>
 *                       <Text>{item.label}</Text>
 *                       <Text color="hint" size="small">{item.href}</Text>
 *                     </FlexItem>
 *                     <FlexItem shrink>
 *                       <Button type="secondary" size="small">
 *                         Edit
 *                       </Button>
 *                     </FlexItem>
 *                   </Flex>
 *                 </Section>
 *               </Card>
 *             </Chunk>
 *           </Reorderable>
 *         ))}
 *       </Section>
 *     </DndProvider>
 *   );
 * }
 */

// REORDERABLE
// this only works on web, at the moment
// it would need a new react-dnd "backend" for react native
// people have talked about making one in the issues so see if one exists before trying to make your own
// https://github.com/Nedomas/react-dnd-react-native-backend
/*

// EXAMPLE USE

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend' 

const moveItem = useCallback((dragIndex, hoverIndex) => {
   const dragItem = items[dragIndex];
   const newItems = [...items];
   newItems.splice(dragIndex, 1);
   newItems.splice(hoverIndex, 0, dragItem);
   setItems(newItems);
}, [items]);

<DndProvider backend={HTML5Backend}>
   {items.map((item, i) => (
      <Reorderable key={item.id} index={i} id={item.id} moveItem={moveItem}>
         <Card>
            <Sectionless>
               <Chunk>
               <Text>{item.text}</Text>
               </Chunk>
            </Sectionless>
         </Card>
      </Reorderable>
   ))}
</DndProvider>

*/

import React, {Fragment, useState, useCallback, useRef, useContext} from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
   REORDERABLE: 'reorderable',
}

const Reorderable = ({ id, children, index, moveItem }) => {
   const ref = useRef(null);
   const [, drop] = useDrop({
       accept: ItemTypes.REORDERABLE,
       hover(item, monitor) {
           if (!ref.current) {
               return;
           }
           const dragIndex = item.index;
           const hoverIndex = index;
           // Don't replace items with themselves
           if (dragIndex === hoverIndex) {
               return;
           }
           // Determine rectangle on screen
           const hoverBoundingRect = ref.current?.getBoundingClientRect();
           // Get vertical middle
           const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
           // Determine mouse position
           const clientOffset = monitor.getClientOffset();
           // Get pixels to the top
           const hoverClientY = clientOffset.y - hoverBoundingRect.top;
           // Only perform the move when the mouse has crossed half of the items height
           // When dragging downwards, only move when the cursor is below 50%
           // When dragging upwards, only move when the cursor is above 50%
           // Dragging downwards
           if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
               return;
           }
           // Dragging upwards
           if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
               return;
           }
           // Time to actually perform the action
           moveItem(dragIndex, hoverIndex);
           // Note: we're mutating the monitor item here!
           // Generally it's better to avoid mutations,
           // but it's good here for the sake of performance
           // to avoid expensive index searches.
           item.index = hoverIndex;
       },
   });

   const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.REORDERABLE,
      item: { id, index },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
   });

   const opacity = isDragging ? 0 : 1;
   drag(drop(ref));
   return (<div ref={ref} style={{opacity}}>
      {children} 
   </div>);
};

export default Reorderable;