import data from "./data.json";

export function doSearch(query, page) {
  const metadata = { exectionTime: 0, searchResults: 0 };
  const results = [];
  
  if (query) {
    const start = performance.now();
    let results = data.filter(({ title }) => title.toLowerCase().startsWith(query.toLocaleLowerCase()));
    const end = performance.now();
    
    metadata.exectionTime = end - start;
    metadata.searchResults = results.length;
    
    // get results only for the current page
    const upperLimit = page*10
    results = results.slice(upperLimit-10, upperLimit);
    
    return { results, metadata };
  }
  
  return { results, metadata };
}