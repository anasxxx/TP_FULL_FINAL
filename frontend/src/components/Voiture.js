import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import api from '../api';

class Voiture extends Component {
  initialState = {
    marque: '',
    modele: '',
    couleur: '',
    matricule: '',
    immatricule: '',
    prix: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      toastMessage: '',
      toastType: 'success',
      ...this.initialState
    };
  }

  voitureChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitVoiture = (event) => {
    event.preventDefault();
    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      matricule: this.state.matricule,
      immatricule: this.state.immatricule,
      prix: parseInt(this.state.prix, 10),
      proprietaireId: 1
    };

    api
      .post('/voitures', voiture)
      .then((response) => {
        if (response.data != null) {
          this.setState({ ...this.initialState }, () =>
            this.showToast('Voiture enregistrée avec succès.', 'success')
          );
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la sauvegarde de la voiture', error);
        this.showToast("Erreur lors de l'enregistrement de la voiture.", 'danger');
      });
  };

  resetVoiture = () => {
    this.setState(this.initialState);
  };

  showToast = (message, type = 'success') => {
    this.setState({ show: true, toastMessage: message, toastType: type });
    setTimeout(() => this.setState({ show: false }), 3000);
  };

  render() {
    const { marque, modele, couleur, matricule, immatricule, prix, show, toastMessage, toastType } = this.state;

    return (
      <Card className="border border-dark bg-dark text-white">
        <MyToast show={show} message={toastMessage} type={toastType} />
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
          Ajouter une Voiture
        </Card.Header>
        <Form onSubmit={this.submitVoiture} onReset={this.resetVoiture} id="VoitureFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="marque"
                  value={marque}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez la marque"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridModele">
                <Form.Label>Modèle</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="modele"
                  value={modele}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez le modèle"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCouleur">
                <Form.Label>Couleur</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="couleur"
                  value={couleur}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez la couleur"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMatricule">
                <Form.Label>Matricule</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="matricule"
                  value={matricule}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez le matricule"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridImmatricule">
                <Form.Label>Immatricule</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="immatricule"
                  value={immatricule}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez l'immatricule"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPrix">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="number"
                  name="prix"
                  value={prix}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez le prix"
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: 'right' }}>
            <Button size="sm" variant="success" type="submit" className="mr-2">
              <FontAwesomeIcon icon={faSave} className="mr-1" /> Sauvegarder
            </Button>
            <Button size="sm" variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} className="mr-1" /> Réinitialiser
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}

export default Voiture;
