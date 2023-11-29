import React from 'react'
import styles from './home.module.css'
import  { BiSearch }  from 'react-icons/bi'

import { Link } from 'react-router-dom'


export function Home(){
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