import {useEffect, useState} from 'react'
import styles from './home.module.css'
import  { BiSearch }  from 'react-icons/bi'
import { Link } from 'react-router-dom'

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

}
interface DataProps{
    coins: CoinProps[];
}
export function Home(){
    const [coins, setCoins] = useState<CoinProps[]>([])//mostrando que é uma lista e não um objeto
    console.log(coins)

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
                        }

                        return formated
                    })
                    setCoins(formatResult)

                })
            

        }
        getData();
     }, [])
    return(
    <>
        {/**area principal do nosso site */}
        <main className={styles.container}>
            <form className={styles.form}>
                <input placeholder="Digite o simbolo da moeda: BTC..." 
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
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <Link className={styles.link} to='/detail/btc'>
                                <span>Bitcoin</span> |BTC
                            </Link>
                        </td>

                        <td className={styles.tdLabel} data-label="Mercado">
                            R$ 1212
                        </td>

                        <td className={styles.tdLabel} data-label="Preço">
                            R$ 40.962
                        </td>

                        <td className={styles.tdProfit} data-label="Volume">
                            <span>-5.3</span>
                        </td>
                    </tr>

                </tbody>
            </table>

        </main>
    </>
    )
}