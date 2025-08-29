import { useState, useEffect, useCallback } from "react"

function debounce(callBack, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callBack(value)
    }, delay)
  }
}

function App() {
  const [query, setQuery] = useState("")

  const apiUrlProva = `http://localhost:3333/products`

  const fetchJson = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [dettaglio, setDettaglio] = useState({})
  const [show, setShow] = useState(false)

  const eseguiFetch = debounce((query) => {
    console.log("eseguo la query:", query)
    const fetchApi = async () => {
      const apiUrl = `http://localhost:3333/products?search=${query}`
      const data = await fetchJson(apiUrl)
      setProducts(data)
    }
    fetchApi()
  }, 500)



  const eseguiFetchCallBack = useCallback(eseguiFetch, [])

  useEffect(() => {
    eseguiFetchCallBack(query)
    setShow(false)
  }, [query, eseguiFetchCallBack])

  const handleClick = (elem) => {
    console.log("dentro la funzione handle")
    console.log(elem)
    setShow(true)
    return (setDettaglio(elem))
  }

  console.log(dettaglio)


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
            {products.map((cur, i) => (
              <p
                key={i}
                onClick={() => handleClick(cur)}
              >{cur.name}</p>
            ))}
          </div>
          {show && <div className="dettaglio">
            <p>Nome: {dettaglio.name}</p>
            <p>Colore: {dettaglio.color} </p>
            <p>Brand:{dettaglio.brand} </p>
          </div>}

        </div>}

      </div>
    </>
  )
}

export default App
