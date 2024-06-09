import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import './ProductDialog.css';

const ProductDialog = ({ open, handleClose, handleAddProduct, newProduct, handleProductChange }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adicionar Produto</DialogTitle>
            <DialogContent className="dialog-content">
                <TextField
                    label="Nome do Produto"
                    name="name"
                    value={newProduct.name}
                    onChange={handleProductChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Quantidade"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleProductChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Preço"
                    name="price"
                    value={newProduct.price}
                    onChange={handleProductChange}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleAddProduct} color="primary">
                    Adicionar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
