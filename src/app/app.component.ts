import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter,
    CdkDragExit, CdkDragStart, CdkDrop, CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    DATA = 'data';
    data = {
        tasksItems: [
            {title: 'item 0'},
            {title: 'item 1'},
            {title: 'item 2'},
            {title: 'item 3'},
        ],
        weekOne: {
            mondayItems: [],
            tuesdayItems: [],
            wednesdayItems: [],
            thursdayItems: [],
            fridayItems: [],
            saturdayItems: [],
            sundayItems: []
        },
        weekTwo: {
            mondayItems: [],
            tuesdayItems: [],
            wednesdayItems: [],
            thursdayItems: [],
            fridayItems: [],
            saturdayItems: [],
            sundayItems: []
        },
        weekThree: {
            mondayItems: [],
            tuesdayItems: [],
            wednesdayItems: [],
            thursdayItems: [],
            fridayItems: [],
            saturdayItems: [],
            sundayItems: []
        }
    };

    constructor(){
        if (this.getFromLocalStorage()) {
            this.data = JSON.parse(this.getFromLocalStorage());
        }
    }

    ngAfterViewInit() {}

    addItem(todo: string) {
        this.data.tasksItems.push({ title: todo});
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

    saveToLocalStorage(){
        return localStorage.setItem(this.DATA, JSON.stringify(this.data));
    }

    getFromLocalStorage(){
        return localStorage.getItem(this.DATA);
    }
}
