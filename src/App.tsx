import React, { useState } from 'react';
import dayjs from 'dayjs';

import LogItem from './components/LogItem';
import { Log, FormErrors } from './types';

function App() {
  const DATE_FORMAT = 'YYYY-MM-D hh:mm A';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({
    title: '',
    price: '',
  });

  const [logs, setLogs] = useState<Log[]>([
    {
      id: 1,
      title: 'Coffee',
      description: 'Small latte',
      price: 5,
      timestamp: dayjs().format(DATE_FORMAT),
    },
    {
      id: 2,
      title: 'Phone',
      description: 'Pixel 6',
      price: 300,
      timestamp: dayjs().subtract(1, 'days').format(DATE_FORMAT),
    },
  ]);

  const validateInputs = (): boolean => {
    if (!title) setErrors((currentErrors) => ({ ...currentErrors, title: 'Title is required' }));
    if (!price) setErrors((currentErrors) => ({ ...currentErrors, price: 'Price is required' }));

    return !!title && !!price;
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (!validateInputs()) return;

    const lastId: number = logs.length ? logs[logs.length - 1].id + 1 : 1;

    const newLog: Log = {
      id: lastId,
      title,
      description,
      price,
      timestamp: dayjs().format(DATE_FORMAT),
    };

    setLogs([...logs, newLog]);

    setErrors({ title: '', price: '' });

    setTitle('');
    setDescription('');
    setPrice(0);
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="p-12">
        <div className="flex flex-col items-center justify-center gap-12">
          <h1 className="text-3xl font-bold text-white">Expenses Log</h1>

          <div className="grid w-full grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-1">
              <div className="rounded-lg border border-white p-6 ">
                <h1 className="mb-6 text-2xl font-bold text-white">Create New Log</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <fieldset>
                    <label htmlFor="title">
                      <span className="block font-medium text-white">Title</span>
                      <input
                        type="title"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Insert Title"
                      />
                      {errors.title && <span className="mt-1 text-sm text-red-500">{errors.title}</span>}
                    </label>
                  </fieldset>

                  <fieldset>
                    <label htmlFor="description">
                      <span className="block font-medium text-white">Description</span>
                      <textarea
                        rows={4}
                        name="description"
                        id="description"
                        placeholder="Insert description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className=" mt-2 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </label>
                  </fieldset>

                  <fieldset>
                    <label htmlFor="price">
                      <span className="block font-medium text-white">Price</span>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                        className=" mt-2 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Insert Price"
                      />
                      {errors.price && <span className="mt-1 text-sm text-red-500">{errors.price}</span>}
                    </label>
                  </fieldset>

                  <button type="submit" className="mt-2 w-full rounded-md bg-blue-800 p-2 hover:bg-blue-700">
                    <span className="text-lg font-bold text-white">Submit</span>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-span-3 md:col-span-2">
              <div className="flex flex-col gap-6">
                {logs.map((log) => (
                  <LogItem
                    key={log.id}
                    id={log.id}
                    title={log.title}
                    description={log.description}
                    price={log.price}
                    timestamp={log.timestamp}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
