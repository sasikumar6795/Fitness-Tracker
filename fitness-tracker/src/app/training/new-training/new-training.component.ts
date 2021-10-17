import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  
  exercises:Observable<any>;
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.exercises=this.db.collection('availableExercises').valueChanges();
  }

  newTraining(form: NgForm)
  {
    // i need to pass id of this exercise, for that we need a form
    //form.value.exercise exercise was the name used in html mat select near ngmodel
    console.log("full form",form);
    console.log("full value",form.value);
    console.log("exercise",form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }

}
