import {NgModule} from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { FormsModule} from '@angular/forms';
import { AngularFirestoreModule} from '@angular/fire/firestore'
import { SharedModule } from '../shared-UI/shared-module';

@NgModule({
    declarations:[
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingComponent,
        NewTrainingComponent,
        StopTrainingComponent],
    imports:[
        FormsModule,
        AngularFirestoreModule,
        SharedModule
        ],
    entryComponents:[]
})
export class TrainingModule{

}