import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Patients extends Component {
  componentDidMount() {
    const { getAllPatients } = this.props;

    getAllPatients();
  }
  render() {
    const { isFetchingPatients, patients, match } = this.props;
    return (
      <div>
        <h2>This is the Patients page</h2>
        <ul>
          {!isFetchingPatients &&
            patients.map(patient => (
              <li key={patient.id}>
                <Link to={`${match.url}/${patient.id}`}>
                  {`${patient.firstName} ${patient.surName}`}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
