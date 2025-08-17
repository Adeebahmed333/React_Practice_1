import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
const Cards = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('http://localhost:4400/products');
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("This is the Error:", error);
            }
        }
        getData();
    }, []);
    return (
        <div className='container-fluid'>
            <h1 className='text-center m-3'> This is our card component</h1>
            {data.length > 0 ? (
                <div className='row'>
                    {data.map((item, index) => (
                        <div className='col-md-3'>
                            <div key={index} className='card'>
                                <img className='card-img-top' src='./download.jpg' alt='img' />
                                <div className='card-header'>
                                    <h3 className='card-title text-center'>{item.name}</h3>
                                </div>
                                <div className='card-body'>
                                    <div className='card-text' style={{ fontWeight: 'bold' }}>
                                        Brand: {item.brand}
                                    </div>
                                    <div className='card-text' style={{ fontWeight: 'bold' }}>
                                        Price: {item.price}
                                    </div>
                                    <div className='card-text' style={{ fontWeight: 'bold' }}>
                                        In Stock: {item.inStock ? "True" : "False"}
                                    </div>
                                    <div className='card-text' style={{ fontWeight: 'bold' }}>
                                        Ratings: {item.ratings}
                                    </div>
                                    <div className='card-text' style={{ fontWeight: "bold" }}>Tags:</div>
                                    {item.tags.map((tag, index) => (
                                        <li key={index}>{tag}</li>
                                    ))}
                                </div>
                                <div className='card-footer'>
                                 <Link className='btn btn-success' to={`/cards/${item.id}`} >Explore</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1 className='text-center'>No Data Found!!!</h1>
            )}

        </div>
    )
}

export default Cards