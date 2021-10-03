import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

export class TrainingService {
    exerciseChanged =  new Subject<Exercise>();
    private availableExercise: Exercise[] =[
        { id: 'Crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'Touch Toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'Side Lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'Burpees', name: 'Burpees', duration: 60, calories: 8 }
    ]

    private runningExercise:Exercise;

    public startExercise(selectedId: string)
    {
        this.runningExercise=this.availableExercise.find(
            ex => {
                ex.id===selectedId;
            }
        )
        this.exerciseChanged.next({...this.runningExercise});
    }

    public getAvailableServices()
    {
        return this.availableExercise.slice();
    }

    public getRunningExercises()
    {
        return {...this.runningExercise};
    }
}