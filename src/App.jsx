import {useState, useEffect, useCallback} from "react"

function App() {
  const [query, setQuery] = useState("")
  const apiUrl = `http://localhost:3333/products?search=${query}`
  const apiUrlProva = `http://localhost:3333/products`
  
  const fetchJson = async (url) =>{
    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  const [products, setProducts] = useState([])
  

  useEffect(() => {
    const fetchApi = async () =>{
      const data = await fetchJson(apiUrl)
      setProducts(data)
    } 
    fetchApi()
  }, [query])

  console.log(`eseguo la query: ${query}`, products)
  

  return (
    <>
    <div className="inpaginazione">
      <div className="input">
        <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {query.length > 0 && <div className="card-container">
        <div className="card">
          {products.map((cur) => (
            <p>{cur.name}</p>
          ))}
        </div>
      </div>}
      
    </div>
    </>
  )
}

export default App
