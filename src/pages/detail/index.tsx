import {useEffect, useState} from 'react'

import styles from './detail.module.css'
import { useFetcher, useParams } from 'react-router-dom'

export function Detail(){
    const { cripto } = useParams()

    useFetcher(() => {
        function getData
    })
    return(
        <div>
            <h1>Página Home {cripto}</h1>
        </div>
    )
}