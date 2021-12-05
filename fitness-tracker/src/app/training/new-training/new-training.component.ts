import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared-UI/UIService';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  
  exercises:Exercise[];
  private exerciseSubscription:Subscription;
  private loadingSubscription:Subscription;
  isLoading=true;
  constructor(private trainingService: TrainingService, private uiService:UIService) { }
 
  ngOnInit(): void {
    this.loadingSubscription=this.uiService.isLoadingChanged.subscribe(
      isloading => {
        this.isLoading=isloading;
      }
    );
    this.exerciseSubscription=this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises=exercises;
      }
    );
    this.trainingService.fetchAvailableServices();
  }
  // ngOnInit(): void {
  //   this.db.collection('availableExercises').snapshotChanges().subscribe(
      
  //     result =>{
  //       for(let res of result)
  //       {
  //         console.log(res.payload.doc.data());
  //       }
  //     } 
  //   );
  // }

  newTraining(form: NgForm)
  {
    // i need to pass id of this exercise, for that we need a form
    //form.value.exercise exercise was the name used in html mat select near ngmodel
    console.log("full form",form);
    console.log("full value",form.value);
    console.log("exercise",form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }


}
  

