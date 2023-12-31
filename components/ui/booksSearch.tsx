  'use client'
  import React, { useState,useEffect } from 'react';
  import { Modal,Table } from 'react-bootstrap';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs';
  import BookCard from '@/components/ui/displayCard';
  import  SearchResultsModal from '@/components/ui/SearchResultsModal';
  import axios from 'axios';


  interface Book {
    title: string;
    authors: { name: string }[];
    publisher: string[];
    publish_date: string[];
    description: string;
    key: string;
  }

  const BooksSearch = () => {
    const [selectedOption, setSelectedOption] = useState('works');
    const [inputValue, setInputValue] = useState('');
    const [fetchedData, setFetchedData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

   const handleSearch = async () => {
            try {
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=${selectedOption}:${inputValue}&jscmd=details&format=json`);
        console.log(response.data);
        setFetchedData(response.data[`${selectedOption}:${inputValue}`]); // Assuming response.data is an array or object
      } catch (error) {
        console.log(error);
      }
    };
 
// Add this useEffect to see the updated fetchedData value
useEffect(() => {
  console.log('Fetched Data:', fetchedData);
}, [fetchedData]);



  return (
    <TabsContent value="books">
      <Card>
        <CardHeader>
          <CardTitle>Books</CardTitle>
          <CardDescription>
            We can search for books here. We will be searching for specific
            books. You will recieve an extensive dossier of information of the
            books specified. We can search it using ISBN or OLID Numbers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <section className="py-4 overflow-hidden">
            <div className="container px-4 mx-auto">
              <div className="p-6 bg-white border rounded-xl">
                <div className="flex flex-wrap justify-between -m-2">
                  <div className="w-full sm:w-1/2 p-2">
                    <h3 className="font-heading text-sm font-semibold">
                      Search for a specific book
                    </h3>
                  </div>
                  <div className="w-full sm:w-1/2 p-2">
                    <div className="sm:max-w-md ml-auto overflow-hidden border border-neutral-200 rounded-lg focus-within:border-neutral-600">
                      <div className="flex flex-wrap sm:flex-nowrap sm:divide-x divide-neutral-200">
                        <div className="w-full sm:w-auto">
                          <div className="relative h-full">
                            <select
                              className="appearance-none py-2 pl-3.5 pr-10 text-sm text-neutral-500 font-medium w-full h-full bg-light outline-none cursor-pointer"
                              onChange={handleOptionChange}
                            >
                              <option value="works">Works</option>
                              <option value="edition">Edition</option>
                              <option value="isbn">ISBN</option>
                              <option value="books">Books</option>
                            </select>
                            <svg
                              className="absolute top-1/2 right-4 transform -translate-y-1/2"
                              width="16"
                              height="22"
                              viewBox="0 0 16 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.6673 9L8.00065 13.6667L3.33398 9"
                                stroke="#495460"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-full sm:flex-1">
                          <input
                            className="py-3 px-3.5 text-sm w-full h-full hover:bg-gray-50 outline-none placeholder-neutral-400"
                            id="inputsInput3-1"
                            type="text"
                            placeholder="Enter the information pertaining to the search"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
        <CardFooter>
          <Button onClick={() => {
            handleSearch();
            setShowModal(true);
          }}>Search</Button>
        </CardFooter>
      </Card>

 
<SearchResultsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        fetchedData={fetchedData}
      />
      </TabsContent>
    );
  };

  export default BooksSearch;
