import React, { Component } from 'react';
import axios from 'axios';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false
    };
  }

  componentDidMount() {
    this.findAllVoitures();
  }

  findAllVoitures = () => {
    axios
      .get('http://localhost:8080/voitures')
      .then((response) => response.data)
      .then((data) => {
        this.setState({ voitures: data });
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des voitures', error);
      });
  };

  deleteVoiture = (voitureId) => {
    axios
      .delete(`http://localhost:8080/voitures/${voitureId}`)
      .then(() => {
        this.setState({
          voitures: this.state.voitures.filter((voiture) => voiture.id !== voitureId),
          show: true
        });
        setTimeout(() => this.setState({ show: false }), 3000);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la voiture', error);
      });
  };

  render() {
    const { voitures, show } = this.state;

    return (
      <Card className="border border-dark bg-dark text-white">
        <MyToast show={show} message={'Voiture supprimée avec succès.'} type={'danger'} />
        <Card.Header>
          <FontAwesomeIcon icon={faList} className="mr-2" /> Liste des Voitures
        </Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Couleur</th>
                <th>Matricule</th>
                <th>Immatricule</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {voitures.length === 0 ? (
                <tr align="center">
                  <td colSpan="7">Aucune voiture n'est disponible.</td>
                </tr>
              ) : (
                voitures.map((voiture) => (
                  <tr key={voiture.id}>
                    <td>{voiture.marque}</td>
                    <td>{voiture.modele}</td>
                    <td>{voiture.couleur}</td>
                    <td>{voiture.matricule}</td>
                    <td>{voiture.immatricule}</td>
                    <td>{voiture.prix}</td>
                    <td>
                      <ButtonGroup>
                        <Button size="sm" variant="outline-primary">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          className="ml-2"
                          onClick={() => this.deleteVoiture(voiture.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default VoitureListe;
