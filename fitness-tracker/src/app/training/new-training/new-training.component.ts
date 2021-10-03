import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  
  exercises:Exercise[]=[];
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercises=this.trainingService.getAvailableServices();
  }

  newTraining(form: NgForm)
  {
    // i need to pass id of this exercise, for that we need a form
    //form.value.exercise exercise was the name used in html mat select near ngmodel
    this.trainingService.startExercise(form.value.exercise);
  }

}
