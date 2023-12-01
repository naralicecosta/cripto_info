import {FormEvent, useEffect, useState} from 'react'
import styles from './home.module.css'
import  { BiSearch }  from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

//https://sujeitoprogramador.com/api-cripto/?key=67f9141787211428

interface CoinProps{
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string
    formatedPrice: string;
    formatedMarket: string;
    numberDelta: number;

}
interface DataProps{
    coins: CoinProps[];
}
export function Home(){
    const [coins, setCoins] = useState<CoinProps[]>([])//mostrando que é uma lista e não um objeto
    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        // criando função e chamando para ser executada
         function getData(){
            //fazendo uma requisição
            fetch('https://sujeitoprogramador.com/api-cripto/?key=67f9141787211428&pref=BRL')
                .then(response => response.json())
                .then((data: DataProps)=>{
                    const coinsData = data.coins.slice(0, 15); //limitando em 15 moedas
                    
                    const price = Intl.NumberFormat("pt-BR",{
                        style: "currency",
                        currency: 'BRL'
                    })

                    const formatResult = coinsData.map((item) => {
                        const formated = {
                            ...item,
                            formatedPrice: price.format(Number(item.price)),
                            formatedMarket: price.format(Number(item.market_cap)),
                            numberDelta: parseFloat(item.delta_24h.replace(",", ".")) // onde for virgula, colocar ponto
                        }
                        return formated
                    })
                    setCoins(formatResult)
                })
        }
        getData();
     }, [])

     function handleSearch(e: FormEvent){
            e.preventDefault()
            if(inputValue === "")return;
            navigate(`/detail${inputValue}`)
     }


    return(
    <>
        {/**area principal do nosso site */}
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSearch}>
                <input placeholder="Digite o simbolo da moeda: BTC..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">
                    <BiSearch size={30} color="#fff" />
                </button>
                <button>
                    
                </button>
            </form>

            <table>
                <thead> {/*cabeãlho */}
                    <tr> {/**linha */}
                        <th scope='col'>Moeda</th> {/**coluna */}
                        <th scope='col'>valor mercado</th>
                        <th scope='col'>preço</th>
                        <th scope='col'>Volume</th>
                    </tr>
                </thead>

                <tbody id='tbody'>
                    
                    {/**renderizando a lista */}
                    {coins.map(coin => (
                        <tr key={coin.name} className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                                <span>{coin.name}</span> | {coin.symbol}
                            </Link>
                        </td>

                        <td className={styles.tdLabel} data-label="Mercado">
                            {coin.formatedMarket}
                        </td>

                        <td className={styles.tdLabel} data-label="Preço">
                            {coin.formatedPrice}
                        </td>

                        <td className={coin.numberDelta  >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume"> {/**verificação se o numero for maior que 0 ficar verde e se for menor fica vermelho */}
                            <span>{coin.delta_24h}</span>
                        </td>
                    </tr>

                    ))}
                </tbody>
            </table>

        </main>
    </>
    )
}