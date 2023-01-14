export class Adresse {
  id: number;
  rue: string;
  ville: string;
  etat: string;
  codePostal: string;

  constructor(
    id: number,
    rue: string,
    ville: string,
    etat: string,
    codePostal: string
  ) {
    this.id = id;
    this.rue = rue;
    this.ville = ville;
    this.etat = etat;
    this.codePostal = codePostal;
  }
}
