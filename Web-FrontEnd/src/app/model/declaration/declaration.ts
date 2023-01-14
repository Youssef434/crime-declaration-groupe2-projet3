import { Localisation } from './localisation';

export class Declaration {
  id: number;
  titre: string;
  description: string;
  localisation: Localisation;
  piecesJointes: string;
  declarant: string;
  declarationInstant: Date;

  constructor(
    id: number,
    titre: string,
    description: string,
    localisation: Localisation,
    piecesJointes: string,
    declarant: string,
    declarationInstant: Date
  ) {
    this.id = id;
    this.titre = titre;
    this.description = description;
    this.localisation = localisation;
    this.piecesJointes = piecesJointes;
    this.declarant = declarant;
    this.declarationInstant = declarationInstant;
  }
}
