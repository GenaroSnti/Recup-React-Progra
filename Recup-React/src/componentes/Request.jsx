import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Request({ Ref }) {
const [fakeSt, setFakeSt] = useState([]);
const [json, setjson] = useState([]);

const getFKS = () => {
    setFakeSt([]);
    axios
    .get(`https://fakestoreapi.com/products/category/jewelery?limit=${Ref}`)
    .then((res) => (Ref < 0 || Ref === 0 ? 0 : setFakeSt(res.data)))
    .catch((err) => console.error("Error al obtener productos:", err));
};


    useEffect(() => {
        axios.get("http://localhost:3000/productos").then((res) => setjson(res.data));
    },[]) 

const check = () => {
    const jsonIds = json.map((product) => product.id);

    const newProducts = fakeSt.filter(
    (product) => jsonIds.indexOf(product.id) === -1
    );

    Upload(newProducts);      
};

const Upload = (products) => {
    products.map((product) =>
    axios
        .post("http://localhost:3000/productos", product)
        .then((res) => {
        console.log("Producto añadido:", res.data);
        setjson((prevJson) => [...prevJson, product]);
        })
    );
};
const deleteProduct = (id) => {
    axios
        .delete(`http://localhost:3000/productos/${id}`)
        .then((res) => {
            console.log("Producto eliminado:", id);
            setjson((prevJson) => prevJson.filter((product) => product.id !== id));
        })
        .catch((err) => console.error("Error al eliminar producto:", err));
};

console.log(json);


return (
<>
    <button onClick={getFKS}>Pedir productos</button>
    <ul>
        <h3>Productos obtenidos:</h3>
        {fakeSt.map((product) => (
        <li key={product.id}>
            <p>{product.title}</p>
            <img src={product.image} alt={product.title} />
            <button onClick={deleteProduct}>Eliminar</button>
        </li>
        ))}
    </ul>
    <button onClick={check}>Guardar productos</button>
    </>
);
}
export default Request;
