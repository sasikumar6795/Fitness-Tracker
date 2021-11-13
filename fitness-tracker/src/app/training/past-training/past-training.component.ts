import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource=new MatTableDataSource<Exercise>();
  finishedExerciseSubscription:Subscription;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private trainingService:TrainingService) { }
  
  

  ngOnInit(): void {
    this.finishedExerciseSubscription=this.trainingService.finishedExercisesChanged.subscribe(
      (exericses: Exercise[]) => {
        console.log("past training",this.dataSource);
        this.dataSource.data=exericses;
      }
    )
    this.trainingService.fetchCompletedOrCancelledExercise();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort=this.sort;
  }

  dofilter(filter:string)
  {
    this.dataSource.filter=filter.trim().toLowerCase();
    
  }

  ngOnDestroy(): void {
   this.finishedExerciseSubscription.unsubscribe();
  }

}
