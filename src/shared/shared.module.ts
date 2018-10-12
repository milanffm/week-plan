import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WeekPipe} from './pipes/week.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        WeekPipe
    ],
    exports: [
        WeekPipe
    ]
})
export class SharedModule {
}
