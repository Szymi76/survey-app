import React, { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Checkbox, InputWithLabel } from "../components/Elements";

// const StateComponet = () => {
//   const [tags, setTags] = useState<string[]>(["siema"]);

//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleAdd = () => {
//     const newTag = inputRef.current?.value;

//     if (!newTag) return;

//     setTags(tags => [...tags, newTag]);
//   };

//   return (
//     <div className="border">
//       <input type={"text"} ref={inputRef} className="border" />
//       <button onClick={handleAdd} className="border">
//         Dodaj
//       </button>
//       {tags.map((tag, index) => (
//         <p key={"tag" + index}>{tag}</p>
//       ))}
//     </div>
//   );
// };

// const Sandbox = () => {
//   const [checked, setChecked] = useState(false);
//   const [selected, setSelected] = useState(false);
//   const [value, setValue] = useState("");

//   const [count, setCount] = useState(1);

//   const inputWithLabelRef = useRef<HTMLInputElement>(null);

//   console.log("RE-RENDER");

//   return (
//     <div className="p-10 flex flex-col gap-5 w-min">
//       {/* button */}
//       <button className="btn bg-indigo-700">Przycisk</button>
//       {/* input */}
//       <input
//         type={"text"}
//         placeholder="Wiek tutaj..."
//         className="input border-indigo-700"
//       />
//       {/* textarea */}
//       <textarea className="textarea border-indigo-700" placeholder="Opis tutaj..." />
//       {/* button rounded */}
//       <button className="btn bg-indigo-700 btn-rounded">Przycisk</button>
//       {/* button outlined */}
//       <button
//         className={`btn btn-outlined ${selected ? "selected" : ""}`}
//         onClick={() => setSelected(selected => !selected)}
//       >
//         Przycisk
//       </button>
//       {/* input checkmark */}
//       <Checkbox
//         checked={checked}
//         label={checked ? "Zaznaczone" : "Nie zaznaczone"}
//         onClick={() => setChecked(checked => !checked)}
//       />
//       {/* input with label */}
//       <div className="input-with-row">
//         <label>Adres URL</label>
//         <input type={"text"} ref={inputWithLabelRef} />
//       </div>
//       {/* input with button */}
//       <div className="input-with-button">
//         <input type={"text"} placeholder="Element" />
//         <button>Dodaj</button>
//       </div>

//       {Array(count)
//         .fill(0)
//         .map((comp, index) => (
//           <StateComponet key={"komp" + index} />
//         ))}

//       <button onClick={() => setCount(count => count + 1)}>+</button>
//     </div>
//   );
// };

// import React from 'react';
// import { useHookstate, State } from "@hookstate/core";

// interface Task {
//   name: string;
//   priority?: number;
// }

// export const Sandbox = () => {
//   const state: State<Task[]> = useHookstate([{ name: "First Task" }] as Task[]);

//   useEffect(() => {
//     console.log(state);
//   }, [state]);

//   return (
//     <div className="mt-20">
//       {state.map((taskState: State<Task>, taskIndex) => (
//         <TaskEditor key={taskIndex} taskState={taskState} />
//       ))}
//       <button onClick={() => state.merge([{ name: "Untitled" }])}>Add task</button>
//     </div>
//   );
// };

// function TaskEditor(props: { taskState: State<Task> }) {
//   const taskState = props.taskState;
//   return (
//     <p>
//       <input
//         value={taskState.name.get()}
//         onChange={e => taskState.name.set(e.target.value)}
//       />
//     </p>
//   );
// }

// export default Sandbox;
