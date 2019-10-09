import { Injectable } from "@angular/core";
import { Car } from '../shared/car.model';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as firebase  from 'firebase/app';

@Injectable()

export class CarsService {
    private carsCollection: AngularFirestoreCollection<Car>;
    private carDoc: AngularFirestoreDocument<Car>;
    userId: string;
    cars$: Observable<Car[]>;
    cars: Car[] = [];
    carChanged = new Subject<Car>();
    startedEditing = new Subject<any>();    

    constructor(
        public db: AngularFirestore,
        public afAuth: AngularFireAuth,
        public authService: AuthService
    ) {
        this.afAuth.authState.subscribe(
            user => {
                if (user) {
                    this.userId = user.uid;
                }
            }
        )

        this.carsCollection = db.collection<Car>('store-cars-' + this.userId);
        this.cars$ = db.collection('store-cars-' + this.userId)
                      .snapshotChanges()
                      .pipe(
                        map(
                          actions => {
                            return actions.map(
                              a => {
                                const data = a.payload.doc.data() as Car;
                                const id = a.payload.doc.id;
                                return {id, ...data}
                              }
                            )
                          }
                        )
                      )
    }

    getCars() {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId);
        return this.db.collection('store-cars-' + userId).snapshotChanges()
    }

    addCar(car: Car) {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId);
        this.db.collection<Car>('store-cars-' + this.userId)
            .doc(car.id)
            .set({
                id: car.id, 
                date: car.date,
                brand: car.brand, 
                model: car.model,
                modification: car.modification,
                model_image_path: car.model_image_path,
                year: car.year,
                vin: car.vin
            })
            .then(
                () => console.log('Car added')
            )
            .catch(
                (error) => console.log(error)
            )
    } 

    editCar(id: any, car: Car) {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId);
        this.carDoc = this.db.doc<Car>('store-cars-' + userId + '/' + id);
        this.carDoc.update({
            id: id,
            date: car.date,
            brand: car.brand, 
            model: car.model,
            modification: car.modification,
            model_image_path: car.model_image_path,
            year: car.year,
            vin: car.vin
        });
        console.log(car);
    }

    deleteCar(id: any) {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId);
        this.carDoc = this.db.doc<Car>('store-cars-' + userId + '/' + id);
        this.carDoc.delete();
    }
    
}
