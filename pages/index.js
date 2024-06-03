import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';

const MajorList = () => {
    const [majors, setMajors] = useState([]);
    const [selectedMajorId, setSelectedMajorId] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/majors/')
            .then(response => {
                setMajors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the majors!', error);
            });
    }, []);

    const handleMajorClick = (id) => {
        if (selectedMajorId === id) {
            setSelectedMajorId(null);  // Deselect if the same major is clicked
        } else {
            setSelectedMajorId(id);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Engineering Majors</h1>
            <input
                type="text"
                placeholder="Search majors..."
                className={styles.search}
            />
            <div className={styles.majorsList}>
                {majors.map(major => (
                    <div key={major.id}>
                        <div
                            className={styles.majorName}
                            onClick={() => handleMajorClick(major.id)}
                        >
                            {major.name}
                        </div>
                        {selectedMajorId === major.id && (
                            <div className={styles.majorDetails}>
                                <h2>{major.name}</h2>
                                <p>{major.description}</p>
                                <p><strong>Average Salary:</strong> ${major.avg_salary}</p>
                                <p><strong>Most Popular Job:</strong> {major.most_popular_job}</p>
                                <p><strong>Growth Rate:</strong> {major.growth_rate}%</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className={styles.compareButton} onClick={() => window.location.href='/compare'}>Compare Majors</button>
        </div>
    );
};

export default MajorList;
