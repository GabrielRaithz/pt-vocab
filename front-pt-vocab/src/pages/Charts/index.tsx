import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../../services/api';
import { Container } from './style'

interface dataProps {
    total: {
        total: number,
        totalSubstantivo: {
            total: number,
            average: number,
            totalsubstantivoFeminino: {
                total: number,
                average: number
            },
            totalSubstantivoMasculino: {
                total: number,
                average: number
            }
        },
        totalVerbo: {
            total: number,
            average: number
        },
        totalAdjetivo: {
            total: number,
            average: number,
            sufixo: {
                sufixoAnde: {
                    total: number,
                    average: number
                },
                sufixoAl: {
                    total: number,
                    average: number
                },
                sufixoAdo: {
                    total: number,
                    average: number
                },
                sufixoVel: {
                    total: number,
                    average: number
                },
                sufixoOso: {
                    total: number,
                    average: number
                }
            }
        }
    }
}

const App: React.FC = () => {

    const [data, setData] = useState<dataProps>({} as dataProps);

    useEffect(() => {
        api.get('/').then(response => {
            setData(response.data);
        });
    }, []);

    console.log('data', data);

    const state = {
        labels: ['Adjetivo', 'Verbo', 'Substantivo'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00'
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000'
                ],
                data: [
                    !!data.total && Number(data.total.totalAdjetivo.average.toFixed(2)),
                    !!data.total && Number(data.total.totalVerbo.average.toFixed(2)),
                    !!data.total && Number(data.total.totalSubstantivo.average.toFixed(2)),
                ]
            }
        ]
    }

    return (
        !!data &&
        <Container>
            <Pie
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Porcentagem categorias lingua portuguesa',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                }}
            />
        </Container>
    );
}

export default App;