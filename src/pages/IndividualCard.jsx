import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
const IndividualCard = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:4400/products/${id}`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div className='container-fluid'>
            <h1 className='text-center'>{data.name}</h1>
        </div>
    );
}

export default IndividualCard