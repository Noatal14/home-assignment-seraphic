import React from "react";
import styled from "styled-components";
import { COLORS_PALETTE } from "../../mockData";

const COLORS_AMOUNT = COLORS_PALETTE.length

const GraphBackground = styled.div`
    width: 300px;
    height: 150px;
    background-color: #F5F5F5;
    border: 1px solid #C0C0C0;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 5px;
    padding: 5px;
    align-items: flex-end;
`;

const GraphColumn = styled.div`
    height: ${({ height }) => height};
    min-height: 5px;
    background-color: ${({ color }) => color};
    position: relative;
    display: flex;
    justify-content: center;
`;

const GraphLabel = styled.p`
    position: absolute;
    top: calc(100% + 15px);
    margin: 0;
`;

const BarGraph = ({ data }) => {
    const calculateMaxValue = () => {
        let maxValue = 0;
        data.forEach((element) => {
            if (element.value > maxValue) {
                maxValue = element.value
            }
        });
        return maxValue;
    }

    const maxValue = React.useMemo(calculateMaxValue, []);

    const calculateHeight = (value) => `${(value * 100) / maxValue}%`;
    
    return (
        <GraphBackground>
            {data.map((item, index) => (
                <GraphColumn key={index} height={calculateHeight(item.value)} color={COLORS_PALETTE[index - COLORS_AMOUNT * (Math.floor(index / COLORS_AMOUNT))]}>
                    <GraphLabel>{item.label}</GraphLabel>
                </GraphColumn>
            ))}
        </GraphBackground>
    )
}

export default BarGraph;
