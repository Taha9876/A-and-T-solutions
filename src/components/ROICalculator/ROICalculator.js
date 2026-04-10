'use client';

import { useState, useMemo } from 'react';
import styles from './ROICalculator.module.css';

export default function ROICalculator() {
    const [calls, setCalls] = useState(500);
    const [agentCost, setAgentCost] = useState(2500);

    const stats = useMemo(() => {
        const monthlySavings = (calls * 5) + (agentCost * 0.4); // Simplified logic
        const annualSavings = monthlySavings * 12;
        const efficiencyGain = 85;

        return {
            monthly: Math.round(monthlySavings).toLocaleString(),
            annual: Math.round(annualSavings).toLocaleString(),
            efficiency: efficiencyGain
        };
    }, [calls, agentCost]);

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="label color-shift-text">ROI Optimizer</span>
                    <h2 className={styles.title}>Calculate Your <span className="gradient-text">Efficiency Gains.</span></h2>
                    <p className={styles.desc}>Quantify the impact of A&T Solutions on your bottom line. Move the sliders to see immediate architectural value.</p>
                </div>

                <div className={styles.calculator}>
                    <div className={styles.inputs}>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputHeader}>
                                <label>Monthly Call Volume</label>
                                <span className={styles.value}>{calls}</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="5000"
                                step="100"
                                value={calls}
                                onChange={(e) => setCalls(Number(e.target.value))}
                                className={styles.slider}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.inputHeader}>
                                <label>Avg. Monthly Agent Cost ($)</label>
                                <span className={styles.value}>${agentCost}</span>
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max="10000"
                                step="500"
                                value={agentCost}
                                onChange={(e) => setAgentCost(Number(e.target.value))}
                                className={styles.slider}
                            />
                        </div>
                    </div>

                    <div className={styles.results}>
                        <div className={styles.resCard}>
                            <div className={styles.resLabel}>Annual Projected Savings</div>
                            <div className={styles.resValue}>${stats.annual}</div>
                            <div className={styles.resNote}>*Estimated based on current deployment metrics</div>
                        </div>

                        <div className={styles.resGrid}>
                            <div className={styles.resSmall}>
                                <div className={styles.smallLabel}>Monthly Gain</div>
                                <div className={styles.smallValue}>${stats.monthly}</div>
                            </div>
                            <div className={styles.resSmall}>
                                <div className={styles.smallLabel}>Efficiency Boost</div>
                                <div className={styles.smallValue}>{stats.efficiency}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
