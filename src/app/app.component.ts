import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter,
    CdkDragExit, CdkDragStart, CdkDrop, CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

import { Plugins } from '@capacitor/core';

const { Keyboard } = Plugins;
const { Device } = Plugins;

import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    DATA = 'data';
    selectedColor = 'yellow';
    public currentDate: Date = new Date();

    data = {
        tasksItems: [],
        weekOne: {
            week: moment(this.currentDate).week(),
            mondayItems: [],
            tuesdayItems: [],
            wednesdayItems: [],
            thursdayItems: [],
            fridayItems: [],
            saturdayItems: [],
            sundayItems: []
        },
        weekTwo: {
            week: moment(this.currentDate).week() + 1,
            mondayItems: [],
            tuesdayItems: [],
            wednesdayItems: [],
            thursdayItems: [],
            fridayItems: [],
            saturdayItems: [],
            sundayItems: []
        },
        weekThree: {
            week: moment(this.currentDate).week() + 2,
            mondayItems: [],
            tuesdayItems: [],
            wednesdayItems: [],
            thursdayItems: [],
            fridayItems: [],
            saturdayItems: [],
            sundayItems: []
        },
        trashItems: [],
    };

    constructor(
    ) {
        if (this.getFromLocalStorage()) {
            this.data = JSON.parse(this.getFromLocalStorage());
        }
    }

    ngOnInit() {
        this.initData();
        console.log(moment(this.currentDate).week());
    }

    initData() {
       // if (this.data.weekOne.week < moment(this.currentDate).week()) {
       //     this.data.weekThree = this.data.weekTwo;
       //     this.data.weekTwo = this.data.weekOne;
       //     this.data.tasksItems.push(this.data.weekOne.mondayItems, this.data.weekOne.tuesdayItems, this.data.weekOne.wednesdayItems, this.data.weekOne.thursdayItems, this.data.weekOne.fridayItems,  this.data.weekOne.saturdayItems, this.data.weekOne.sundayItems);
       //     this.data.weekOne = {
       //         week: moment(this.currentDate).week(),
       //         mondayItems: [],
       //         tuesdayItems: [],
       //         wednesdayItems: [],
       //         thursdayItems: [],
       //         fridayItems: [],
       //         saturdayItems: [],
       //         sundayItems: []
       //     };
       // }
       // this.saveToLocalStorage();
    }

    public async addItem(todo: string, color: string) {
        const info =  await Device.getInfo();
        if (info.platform === 'android' && info.platform === 'ios') {
            Keyboard.hide();
        }
        console.log('CLICK', info.platform);
        if (!todo) {
            return;
        }
        this.data.tasksItems.push({ title: todo, color: color});
        // this.data.weekOne.week = 40;
        this.saveToLocalStorage();
    }


    dropped(event: CdkDragDrop<string[]>) {
        console.log(event);
        if (event.item.data === 'Try to move me') {
            console.log('this isnt happening today');
            return;
        }

        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data, event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            this.saveToLocalStorage();
        }
    }

    entered(event: CdkDragEnter<string[]>) {
        console.log('Entered', event.item.data);
    }

    exited(event: CdkDragExit<string[]>) {
        console.log('Exited', event.item.data);
    }

    saveToLocalStorage() {
        this.data.trashItems = [];
        return localStorage.setItem(this.DATA, JSON.stringify(this.data));
    }

    getFromLocalStorage(){
        return localStorage.getItem(this.DATA);
    }

    onSelectChange($event){
        this.selectedColor = $event.target.value;
    }
}
