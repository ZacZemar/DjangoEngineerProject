import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Compare = () => {
  const [majors, setMajors] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([
    'Computer Science',
    'Civil Engineering',
    'Electrical Engineering',
  ]);

  useEffect(() => {
    const fetchMajors = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/majors/');
      setMajors(response.data);
    };
    fetchMajors();
  }, []);

  const handleSelectChange = (index, event) => {
    const newSelectedMajors = [...selectedMajors];
    newSelectedMajors[index] = event.target.value;
    setSelectedMajors(newSelectedMajors);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Compare Majors</h2>
      <div style={styles.compareContainer}>
        {selectedMajors.map((majorName, index) => {
          const major = majors.find((m) => m.name === majorName);
          return (
            <div key={index} style={styles.majorColumn}>
              <select
                value={majorName}
                onChange={(e) => handleSelectChange(index, e)}
                style={styles.select}
              >
                {majors.map((major) => (
                  <option key={major.id} value={major.name}>
                    {major.name}
                  </option>
                ))}
              </select>
              {major && (
                <div style={styles.majorDetails}>
                  <h3 style={styles.majorName}>{major.name}</h3>
                  <p>{major.description}</p>
                  <p>
                    <strong>Average Salary:</strong> ${major.avg_salary}
                  </p>
                  <p>
                    <strong>Most Popular Job:</strong> {major.most_popular_job}
                  </p>
                  <p>
                    <strong>Growth Rate:</strong> {major.growth_rate}%
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#222',  // Darker color for better visibility
  },
  compareContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  majorColumn: {
    flex: '1',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  majorDetails: {
    textAlign: 'left',
    color: '#333',  // Darker color for better visibility
  },
  majorName: {
    color: '#000',  // Even darker color for major name
  },
};

export default Compare;
