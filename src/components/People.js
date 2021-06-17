import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["people", page], () => fetchPeople(page), {
    keepPreviousData: true,
  });
  console.log(data);

  return (
    <div>
      <h2>People</h2>
      <button
        onClick={() => {
          if (data.previous) {
            setPage((old) => old - 1);
          }
        }}
      >
        Previous Page
      </button>
      <span>{page}</span>
      <button
        onClick={() => {
          if (data.next) {
            setPage((old) => old + 1);
          }
        }}
      >
        Next Page
      </button>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
