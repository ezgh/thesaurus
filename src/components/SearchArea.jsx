import { useState } from "react";

function SearchArea() {
  const [term, setTerm] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(event) {
    setTerm(event.target.value);
    const url = `https://thesaurusapi.fly.dev/${event.target.value}`;

    const getData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    };
    getData();
  }

  return (
    <div className="searchArea">
      <div className="bar">
        <input
          className="search"
          onChange={handleChange}
          type="text"
          placeholder="Type a word to see its synonyms"
        ></input>
      </div>
      {error && <div></div>}
      <div className="list">
        {term !== "" ? (
          <ul>
            {data && data.objects && data.objects.length > 0
              ? data.objects.map(({ key, synonyms }) => (
                  <li key={key}>
                    &nbsp; &nbsp;{synonyms.join(", ").toLowerCase()}
                  </li>
                ))
              : `the term "${term}" has no synonyms.`}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default SearchArea;
