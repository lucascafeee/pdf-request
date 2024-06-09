import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './CompanyDetails.css';

const CompanyDetails = ({ companyData }) => {
    if (!companyData) {
        return null;
    }

    const renderCompanyInfo = (label, value) => (
        <Typography variant="body1">
            <strong>{label}:</strong> {value || 'N/A'}
        </Typography>
    );

    return (
        <Card className="company-data" variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Dados da Empresa
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {renderCompanyInfo('CNPJ', companyData.cnpj)}
                        {renderCompanyInfo('Nome', companyData.nome)}
                        {renderCompanyInfo('Fantasia', companyData.fantasia)}
                        {renderCompanyInfo('Natureza Jurídica', companyData.natureza_juridica)}
                        {renderCompanyInfo('Abertura', companyData.abertura)}
                        {renderCompanyInfo('Situação', companyData.situacao)}
                        {renderCompanyInfo('Data da Situação', companyData.data_situacao)}
                        {renderCompanyInfo('Motivo da Situação', companyData.motivo_situacao)}
                        {renderCompanyInfo('Tipo', companyData.tipo)}
                        {renderCompanyInfo('Porte', companyData.porte)}
                        {renderCompanyInfo('Capital Social', companyData.capital_social)}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {renderCompanyInfo('Logradouro', companyData.logradouro)}
                        {renderCompanyInfo('Número', companyData.numero)}
                        {renderCompanyInfo('Complemento', companyData.complemento)}
                        {renderCompanyInfo('Bairro', companyData.bairro)}
                        {renderCompanyInfo('Município', companyData.municipio)}
                        {renderCompanyInfo('UF', companyData.uf)}
                        {renderCompanyInfo('CEP', companyData.cep)}
                        {renderCompanyInfo('Telefone', companyData.telefone)}
                        {renderCompanyInfo('Email', companyData.email)}
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                    Atividade Principal
                </Typography>
                <Typography variant="body1">
                    {companyData.atividade_principal[0].text} ({companyData.atividade_principal[0].code})
                </Typography>
                <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                    Atividades Secundárias
                </Typography>
                {companyData.atividades_secundarias.length > 0 ? (
                    companyData.atividades_secundarias.map((atividade, index) => (
                        <Typography key={index} variant="body1">
                            {atividade.text} ({atividade.code})
                        </Typography>
                    ))
                ) : (
                    <Typography variant="body1">Nenhuma atividade secundária informada</Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default CompanyDetails;
