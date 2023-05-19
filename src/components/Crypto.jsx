import { useState, useEffect } from "react";
import axios from "axios";

const Crypto = () => {

    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`;

    const showCrypto = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(url, config);
            setCrypto(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        showCrypto();
    }, []);

    //mostrar crypto con estilos de bootstrap responsive
    const showCryptoTable = () => {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Rank</th>
                        <th scope="col">Name</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Price</th>
                        <th scope="col">Price Change</th>
                        <th scope="col">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {crypto
                        .filter((val) => {
                            if (search === "") {
                                return val;
                            } else if (
                                val.name.toLowerCase().includes(search.toLowerCase()) ||
                                val.symbol.toLowerCase().includes(search.toLowerCase()) ||
                                val.market_cap_rank.toString().includes(search)
                            ) {
                                return val;
                            }
                        })
                        .map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <img
                                            src={val.image}
                                            alt={val.name}
                                            style={{ width: "30px" }}
                                        />
                                    </td>
                                    <td>{val.market_cap_rank}</td>
                                    <td>{val.name}</td>
                                    <td>{val.symbol}</td>
                                    <td>${val.current_price}</td>
                                    <td
                                        className={
                                            val.price_change_percentage_24h < 0
                                                ? "text-danger"
                                                : "text-success"
                                        }
                                    >
                                        {val.price_change_percentage_24h}%
                                    </td>
                                    <td>${val.market_cap}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        );
    };
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center mt-5 mb-3">Crypto Market</h1>
                    <div className="form-group">
                        <label>Search Crypto Currency for Name or Symbol</label>
                        <br /><br />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {showCryptoTable()}
                </div>
            </div>
        </div>
    );
};

export default Crypto;
