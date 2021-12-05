import { Exercise } from "./exercise.model";
import { Subject, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { UIService } from "../shared-UI/UIService";
@Injectable()
export class TrainingService {
    exerciseChanged =  new Subject<Exercise>();
    exercisesChanged =  new Subject<Exercise[]>();
    finishedExercisesChanged =  new Subject<Exercise[]>();
    private availableExercise: Exercise[] =[]
    private runningExercise:Exercise;
    private fbSubs:Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService:UIService){};

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
        this.addDataToDb({...this.runningExercise,date: new Date(),state:'Completed'})
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }

    public cancelExercise(progress:number)
    {
        this.addDataToDb({...this.runningExercise,
            duration: this.runningExercise.duration * (progress/100),
            calories: this.runningExercise.duration * (progress/100),
            date: new Date(),
            state:"Cancelled"})
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }

    public fetchAvailableServices()
    {
        this.uiService.isLoadingChanged.next(true);
        this.fbSubs.push(this.db
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
            this.uiService.isLoadingChanged.next(false);
            this.availableExercise=exercises;
            this.exercisesChanged.next([...this.availableExercise]);
        }));
    }

    public getRunningExercises()
    {
        return {...this.runningExercise};
    }

    public fetchCompletedOrCancelledExercise()
    {
       this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe(
        (exercises:Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
        }
       ));
    }

    private addDataToDb(exercise:Exercise)
    {
        this.db.collection('finishedExercises').add(exercise).catch(console.log);
    }

    cancelSubscription()
    {
        this.fbSubs.forEach(subs => {
            subs.unsubscribe();
        }
        )
    }
}