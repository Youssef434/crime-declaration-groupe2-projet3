import { Adresse } from './adresse';
import { Telephone } from './telephone';

export class Declarant {
  id: number;
  cin: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  email: string;
  telephone: Telephone;
  adresse: Adresse;
  constructor(
    id: number,
    cin: string,
    nom: string,
    prenom: string,
    dateNaissance: Date,
    email: string,
    telephone: Telephone,
    adresse: Adresse
  ) {
    this.id = id;
    this.cin = cin;
    this.nom = nom;
    this.prenom = prenom;
    this.dateNaissance = dateNaissance;
    this.email = email;
    this.telephone = telephone;
    this.adresse = adresse;
  }
}
