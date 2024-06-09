import React, { useState } from 'react';
import Editor from '../Editor/Editor';
import CompanyDetails from '../CompanyDetails/CompanyDetails';
import ProductDialog from '../ProductDialog/ProductDialog';
import { fetchCompanyData } from '../../services/api';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import InputMask from 'react-input-mask';
import {
    TextField,
    Button,
    Container,
    Box,
    Alert,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import './PropostaEditor.css';

const PropostaEditor = () => {
    const [content, setContent] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [companyData, setCompanyData] = useState(null);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', quantity: '', price: '' });

    const handleEditorChange = (content) => {
        setContent(content);
    };

    const handleCnpjChange = (e) => {
        setCnpj(e.target.value);
    };

    const fetchAndFillCompanyData = async () => {
        setError('');
        try {
            const cleanedCnpj = cnpj.replace(/\D/g, '');
            const data = await fetchCompanyData(cleanedCnpj);
            setCompanyData(data);

            const companyTemplate = `
                <style>
                    .company-info, .product-list {
                        font-family: Arial, sans-serif;
                        margin-bottom: 20px;
                        line-height: 1.5;
                    }
                    .company-info p, .product-list li {
                        margin: 5px 0;
                    }
                    .company-info p {
                        font-size: 14px;
                    }
                    .product-list li {
                        font-size: 12px;
                        list-style-type: none;
                    }
                    .header {
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                </style>
                <div class="company-info">
                    <p class="header"><strong>Proposta para a empresa:</strong> ${data.nome}</p>
                    <p><strong>Endereço:</strong> ${data.logradouro}, ${data.numero}, ${data.bairro}, ${data.municipio} - ${data.uf}, ${data.cep}</p>
                    <p><strong>Contato:</strong> ${data.telefone}, ${data.email}</p>
                </div>
            `;

            setContent(companyTemplate);
        } catch (error) {
            console.error('Erro ao buscar dados da empresa', error);
            setError('Erro ao buscar dados da empresa');
        }
    };

    const handleGeneratePDF = async () => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('proposta.pdf');

        document.body.removeChild(tempDiv);
    };

    const handleAddProductClick = () => {
        setIsDialogOpen(true);
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleAddProduct = () => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setNewProduct({ name: '', quantity: '', price: '' });
        setIsDialogOpen(false);
    };

    const insertProductsList = () => {
        const productListHtml = products.map(product => 
            `<li>Produto: ${product.name}, Quantidade: ${product.quantity}, Preço: ${product.price}</li>`
        ).join('');
        setContent(prevContent => `${prevContent}<ul class="product-list">${productListHtml}</ul>`);
    };

    return (
        <Container maxWidth="md" className="proposta-editor">
            <Typography variant="h4" gutterBottom>
                Gerador de Propostas
            </Typography>
            <Box mb={3}>
                <InputMask
                    mask="99.999.999/9999-99"
                    value={cnpj}
                    onChange={handleCnpjChange}
                >
                    {() => <TextField
                        label="Digite o CNPJ"
                        variant="outlined"
                        fullWidth
                    />}
                </InputMask>
                <Button
                    variant="contained"
                    className="blue"
                    fullWidth
                    onClick={fetchAndFillCompanyData}
                    style={{ marginTop: '10px' }}
                >
                    Buscar Dados
                </Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            {companyData && <CompanyDetails companyData={companyData} />}
            <Box mt={3}>
                <Button
                    variant="contained"
                    className="blue"
                    fullWidth
                    onClick={handleAddProductClick}
                    style={{ marginBottom: '10px' }}
                >
                    Adicionar Produto
                </Button>
                <List>
                    {products.map((product, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={product.name}
                                secondary={`Quantidade: ${product.quantity}, Preço: ${product.price}`}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    className="blue"
                    fullWidth
                    onClick={insertProductsList}
                >
                    Inserir Lista de Produtos
                </Button>
            </Box>
            <ProductDialog
                open={isDialogOpen}
                handleClose={() => setIsDialogOpen(false)}
                handleAddProduct={handleAddProduct}
                newProduct={newProduct}
                handleProductChange={handleProductChange}
            />
            <Box id="content" mt={3}>
                <Editor content={content} handleEditorChange={handleEditorChange} />
            </Box>
            <Button
                variant="contained"
                className="green"
                fullWidth
                onClick={handleGeneratePDF}
                style={{ marginTop: '10px' }}
            >
                Gerar PDF
            </Button>
        </Container>
    );
};

export default PropostaEditor;
