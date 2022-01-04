import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";

@NgModule({
    imports:[CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule],
    exports:[CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule]
})
export class SharedModule{

}