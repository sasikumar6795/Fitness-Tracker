import {NgModule} from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CommonModule } from '@angular/common';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule} from '@angular/fire/firestore'

@NgModule({
    declarations:[
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingComponent,
        NewTrainingComponent,
        StopTrainingComponent],
    imports:[
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFirestoreModule,],
    entryComponents:[]
})
export class TrainingModule{

}