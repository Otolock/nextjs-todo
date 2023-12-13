'use client'
import { useEffect, useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';


export default function Home() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load todos from localStorage when the component mounts
    if (!isLoaded) {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
      setIsLoaded(true);
    }

    // Save todos to localStorage when there's a change
    // Skip the first render (when todos are loaded from localStorage)
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Create a Todo when the modal is completed
  function createTodo(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);

    const title = data.get("title");
    const description = data.get("description");

    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    event.target.reset();
    setOpen(false);
  }

  // Toggles a todo as completed and sets the completion date.
  function onToggleCompleted(todoId) {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
          completionDate: !todo.completed ? new Date().toISOString() : null
        };
      }
      return todo;
    }));
  }

  // Deletes a single todo from the todos array
  function onDeleteTodo(todoId) {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }

  return (
    open ? (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => (setOpen(false))}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        New Todo
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={createTodo} className="relative">
                          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                            <label htmlFor="title" className="sr-only">
                              Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                              placeholder="Title"
                              required={true}
                            />
                            <label htmlFor="description" className="sr-only">
                              Description
                            </label>
                            <textarea
                              rows={2}
                              name="description"
                              id="description"
                              className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Write a description..."
                              defaultValue={''}
                            />

                            {/* Spacer element to match the height of the toolbar */}
                            <div aria-hidden="true">
                              <div className="py-2">
                                <div className="h-9" />
                              </div>
                              <div className="h-px" />
                              <div className="py-2">
                                <div className="py-px">
                                  <div className="h-9" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="absolute inset-x-px bottom-0">
                            <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                              <div className="flex-shrink-0">
                                <button
                                  type="submit"
                                  className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                >
                                  Create
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    ) : (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Todos</h1>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  onClick={() => setOpen(true)}
                >
                  Create new todo
                </button>
              </div>
            </div>
          </div>
            {!isLoaded ? (
              <div className="flex items-center justify-center h-full py-4">
                Loading...
              </div>
          ) : todos && todos.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onToggleCompleted(todo.id)}
                      className="mr-2 h-5 w-5"
                    />
                    <div>
                      <h2 className="text-base font-semibold">{todo.title}</h2>
                      <p className="text-sm tracking-tight leading-tight text-gray-600">{todo.description}</p>
                      {todo.completed && todo.completionDate && (
                        <p className="text-sm text-gray-500">
                          Completed on: {new Date(todo.completionDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <button onClick={() => onDeleteTodo(todo.id)}>
                    <TrashIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center pt-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No todos</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new todo.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  New Todo
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    )
  )
}