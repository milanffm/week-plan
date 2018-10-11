import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter,
    CdkDragExit, CdkDragStart, CdkDrop, CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    tasksItems = [
        'Item 0',
        'Item 1',
        'Item 2',
        'Item 3',
    ];
    mondayItems = {
        first: ['item monday'],
        second: ['second'],
    };
    tuesdayItems = [];
    wednesdayItems = [];
    thursdayItems = [];
    fridayItems = [];
    saturdayItems = [];
    sundayItems = [];

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
        }
    }

        entered(event: CdkDragEnter<string[]>) {
        console.log('Entered', event.item.data);
    }

    exited(event: CdkDragExit<string[]>) {
        console.log('Exited', event.item.data);
    }

    specialUseCase( drag?: CdkDrag, drop?: CdkDrop) {

        console.log(drop);
        if (drop.data.length < 1) {
            console.log('Cant drop you because there arent enough items in Active');
            return false;
        }

        // const allowedItems = ['Item 5', 'Item 6', 'Item 7', 'Item 2'];
        // if (allowedItems.indexOf(drag.data) === -1) {
        //    console.log('Cant drop you because only Item 2, 5, 6 and 7 are allowed here');
        //    return false;
        // }

        return true;
    }
}
