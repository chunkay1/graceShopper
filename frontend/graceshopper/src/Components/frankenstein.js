const [data, setData] = useState([])

const populateData = (apiData) => {
  setData(prevData => [...prevData, ...apiData]); // just in case I need the internals of the array. You can also map the array here to only store the counts
  // if you do not need api data, you can just retrieve the keys, which are the indices of the array
  // setData(prevData => [...prevData, ...apiData.keys()]);
}

return (
  <div>
    <div>{data.length}</div> {/* we already know count from array length */}
    <div>{data.map((item, idx) => (
      <div className="charlie">{idx + 1}</div> {/* render index to get count */}
    ))}</div> 
  </div>
);

const numberOfItems = (quantity) => {
  setNumberOfItems(prevData => [...prevData, ...quantity])
}