import { Routes } from '@angular/router';
import { ToDotasksComponent } from './components/to-dotasks/to-dotasks.component';
import { TasktermineComponent } from './components/tasktermine/tasktermine.component';
export const routes: Routes = [
    {path: "to-dotasks",component:ToDotasksComponent },
    {path: "completedtasks",component:TasktermineComponent },
    
    
];
