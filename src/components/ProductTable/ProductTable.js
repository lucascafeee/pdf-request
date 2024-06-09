import React from 'react';
import './ProductTable.css';

const ProductTable = ({ products }) => {
    if (products.length === 0) {
        return null;
    }

    return (
        <table className="product-table">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
