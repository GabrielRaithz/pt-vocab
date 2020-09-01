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
                    '#992200',
                    '#fcb000',
                    '#1e5403'
                ],
                hoverBackgroundColor: [
                    '#420e01',
                    '#966f00',
                    '#0b1f01'
                ],
                data: [
                    !!data.total && format(data.total.totalAdjetivo.average),
                    !!data.total && format(data.total.totalVerbo.average),
                    !!data.total && format(data.total.totalSubstantivo.average),
                ]
            }
        ]
    }

    function format(num: number): number {
        return parseFloat(num.toFixed(2));
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