import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
@Injectable()
export class TrainingService {
    exerciseChanged =  new Subject<Exercise>();
    exercisesChanged =  new Subject<Exercise[]>();
    private availableExercise: Exercise[] =[]
    private runningExercise:Exercise;
    private exercise:Exercise[]=[];

    constructor(private db: AngularFirestore){};

    public startExercise(selectedId: string)
    {
        this.runningExercise=this.availableExercise.find(
            (ex) => 
                ex.id===selectedId
        );
        this.exerciseChanged.next({...this.runningExercise});
    }

    public completedExercises()
    {
        this.exercise.push({...this.runningExercise,date: new Date(),state:'Completed'})
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }

    public cancelExercise(progress:number)
    {
        this.exercise.push({...this.runningExercise,
            duration: this.runningExercise.duration * (progress/100),
            calories: this.runningExercise.duration * (progress/100),
            date: new Date(),
            state:"Cancelled"})
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }

    public fetchAvailableServices()
    {
        this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(map(docArray => {
             return docArray.map(doc => {
                     return {
                             id: doc.payload.doc.id,
                             name: doc.payload.doc.data()['name'],
                             duration: doc.payload.doc.data()['duration'],
                             calories: doc.payload.doc.data()['calories']
                            }           })
                        })
            )
        .subscribe((exercises:Exercise[]) => {
            this.availableExercise=exercises;
            this.exercisesChanged.next([...this.availableExercise]);
        })
    }

    public getRunningExercises()
    {
        return {...this.runningExercise};
    }

    public getCompletedOrCancelledExercise()
    {
        return this.exercise.slice();
    }
}