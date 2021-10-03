import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer:number;
  @Output()
  trainingExit =  new EventEmitter<void>();
  constructor(private dialog:MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
   this.onStopOrResume();
  }

  onStopOrResume()
  {
    const step =  (this.trainingService.getRunningExercises().duration/ 100) *1000;
    this.timer=setInterval ( ()=> {
      this.progress = this.progress +1;
      if(this.progress>=100)
      {
        clearInterval(this.timer);
      }
    },step)
  }

  onStop()
  {
    clearInterval(this.timer);
   const dialogRef=this.dialog.open(StopTrainingComponent, {
      data: { progress : this.progress},
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if(result)
        {
          this.trainingExit.emit();
        }
        else{
          this.onStopOrResume();
        }
      }
    )
  }



}
