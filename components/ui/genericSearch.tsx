'use client'
import React, { useState } from 'react';
import SearchResultsModal from '@/components/ui/searchResults';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"



const SearchPage = () => {
  const [selectedOption, setSelectedOption] = useState('title');
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const formattedInputValue = inputValue.replace(/\s+/g, '+');
      const response = await fetch(
        `https://openlibrary.org/search.json?${selectedOption}=${formattedInputValue}`
      );
      const data = await response.json();
      setSearchResults(data.docs);
      console.log(data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
        <TabsContent value="general-search">
            <div className='max-h-[900px]'>
      <Card>
        <CardHeader>
          <CardTitle>Generic Search</CardTitle>
          <CardDescription>
            We will be searching for generic books. You will receive an extensive list of books based on the search criteria.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <section className="py-4 overflow-hidden">
            <div className="container px-4 mx-auto max-h-[900px]">
              <div className="p-6 bg-white border rounded-xl">
                <div className="flex flex-wrap justify-between -m-2">
                  <div className="w-full sm:w-1/2 p-2">
                    <h3 className="font-heading text-sm font-semibold">Search for a generic book description...</h3>
                  </div>
                  <div className="w-full sm:w-1/2 p-2">
                    <div className="sm:max-w-md ml-auto overflow-hidden border border-neutral-200 rounded-lg focus-within:border-neutral-600">
                      <div className="flex flex-wrap sm:flex-nowrap sm:divide-x divide-neutral-200">
                        <div className="w-full sm:w-auto">
                          <div className="relative h-full">
                            <select className="appearance-none py-2 pl-3.5 pr-10 text-sm text-neutral-500 font-medium w-full h-full bg-light outline-none cursor-pointer" onChange={handleOptionChange}>
                              <option value="title">Title</option>
                              <option value="subject">Subject</option>
                              <option value="place">Place</option>
                              <option value="person">Person</option>
                              <option value="language">Language</option>
                              <option value="publisher">Publisher</option>
                            </select>
                            <svg className="absolute top-1/2 right-4 transform -translate-y-1/2" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.6673 9L8.00065 13.6667L3.33398 9" stroke="#495460" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="w-full sm:flex-1">
                          <input className="py-3 px-3.5 text-sm w-full h-full hover:bg-gray-50 outline-none placeholder-neutral-400" id="inputsInput3-1" type="text" placeholder="Enter the information pertaining to the search" onChange={handleInputChange} />
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
          <Button onClick={handleSearch}>Search</Button>
        </CardFooter>
        <div className="flex items-center justify-center w-full max-h-[900px] p-10">
        <SearchResultsModal searchResults={searchResults} />
      </div>
        
      </Card>
      </div>
    </TabsContent>
  );}


export default SearchPage;

