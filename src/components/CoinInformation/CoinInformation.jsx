import axios from 'axios';
import { useEffect, useState } from "react";
import "./CoinInformation.css";

export default function CoinInformation(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const coinMarketsResponse = await axios.get('https://api.upbit.com/v1/market/all');
                const coinMarkets = coinMarketsResponse.data;

                const coinMarketsToString = coinMarkets.map(e => e.market).join(',');
                const marketsResponse = await axios.get(`https://api.upbit.com/v1/ticker?markets=${coinMarketsToString}`);
                const markets = marketsResponse.data;

                setData(markets);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    });

    return (
        <section className='container'>
            {data.map(market => {
                return (
                    <div className='card'>
                        <p>{market.market} : {market.trade_price}</p>
                    </div>
                );
            }
            )
            }
        </section>
    );
}