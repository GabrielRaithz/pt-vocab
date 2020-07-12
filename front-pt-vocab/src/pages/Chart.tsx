import React from "react";
import { VictoryPie } from "victory";
import { Container } from './style'

const PieChart = () => {
    return (
        <Container>
            <VictoryPie
                colorScale={["navy", "cyan", "gold"]}
                data={[
                    { x: "Substantivo", y: 66.67 },
                    { x: "Verbo", y: 11.32 },
                    { x: "Adjetivo", y: 22.00 }
                ]}
            />
        </Container>
    )
};

export default PieChart;