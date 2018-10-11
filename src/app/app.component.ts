import {Component, ChangeDetectorRef} from '@angular/core';
import {
    CdkDragDrop,
    moveItemInArray,
    CdkDrag,
    CdkDrop,
    transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    items = ['Zero', 'One', 'Two', 'Three'];

    items2 = ['Zero', 'One', 'Two', 'Three'];
    items3 = [];

    constructor(private cdr: ChangeDetectorRef) {
    }

    onDrop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }

    isAllowed = (drag?: CdkDrag, drop?: CdkDrop) => {
        return false;
    };

    addToList(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
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
}
