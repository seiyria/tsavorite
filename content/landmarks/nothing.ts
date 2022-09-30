import { Observable, of } from 'rxjs';
import { ILandmark, Landmark, ILandmarkEncounter, ILandmarkEncounterOpts } from '../interfaces';


export class Nothing extends Landmark implements ILandmark {

  // return slots, what they're filled with
  encounter({ scenarioNode }: ILandmarkEncounterOpts): Observable<ILandmarkEncounter> {
    return of({
      landmarkName: scenarioNode.name,
      landmarkDescription: scenarioNode.description,
      landmarkIcon: scenarioNode.icon,
      landmarkData: scenarioNode.landmarkData,
      slots: [],
      canLeave: true,
      choices: []
    });
  }

}
