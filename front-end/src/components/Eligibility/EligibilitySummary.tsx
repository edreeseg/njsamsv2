import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Active client should never be undefined when this component is rendered.
function EligibilitySummary(props: { activeClient: { dependents: number, salary: number } }) {
    // Poverty level, index == # of dependents
    let { dependents, salary } = props.activeClient;
    const povertyLevel: number[] = [NaN, 12490, 16910, 21330, 25750, 30170, 34590, 39010, 43430];
    const [level, setLevel] = useState(NaN);
    useEffect(() => {
        let tempLevel = povertyLevel[dependents] || povertyLevel[povertyLevel.length - 1];
        if (dependents >= povertyLevel.length) {
            const difference: number = dependents - povertyLevel.length - 1;
            for (let i = 0; i < difference; i++) {
                tempLevel += 4420;
            }
        }
        setLevel(tempLevel);
    }, []);
    if (!level) {
        return null;
    }
    return (
        <div>
            {/* If client is below 350% of Federal Poverty Line */}
            {level * 3.5 >= salary
                ? <p>Client qualifies</p>
                : <p>Client does not qualify</p>}
        </div>
    );
}

const mapStateToProps = (state: { activeClient: { dependents: number, salary: number } }) => {
    return {
        activeClient: state.activeClient,
    };
}

export default connect(mapStateToProps, {})(EligibilitySummary);