import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      keepPreviousData: true,
    }
  );

  console.log(data);

  return (
    <div>
      <h2>Planets</h2>
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
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
