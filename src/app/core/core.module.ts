import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    providers: [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
    ],
    exports: [],
})

export class CoreModule {}