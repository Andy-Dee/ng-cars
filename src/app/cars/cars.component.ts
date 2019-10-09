import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Car } from '../shared/car.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../core/data.service';
import { CarsList } from '../shared/carsList.model';
import { Observable, Subscription } from 'rxjs';
import { CarsService } from '../core/cars.service';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit, OnDestroy {
  addCarForm: FormGroup;  
  errorMessage: string;

  carsList: CarsList[] = [];
  carsListObservable: Observable<CarsList[]>;

  selectedCars: CarsList[] = [];
  selectedModels: CarsList[] = [];
  selectedModifications: CarsList[] = [];
  @ViewChild('carId', {static: false}) carId: ElementRef;
  @ViewChild('carImage', {static: false}) carImage: ElementRef;

  cars: Car[] = [];
  car: Car;
  
  editedCarIndex: any;
  editedCar: Car;
  subscriptionEdit: Subscription;
  subscriptionGetCars: Subscription;
  editMode = false;

  constructor(
    private dataService: DataService,
    private carsService: CarsService,
    private db: AngularFirestore 
     ) {}

  ngOnInit() {
    this.initForm();

    this.carsListObservable = this.dataService.fetchCars();
    this.carsListObservable.subscribe(
      carsList => this.carsList = carsList,
      error => this.errorMessage = error
    ); 
    
    this.subscriptionGetCars = this.carsService.getCars().subscribe(
      action => {
        this.cars = action.map(
          item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Car
          }
        )
      }
    )

    this.subscriptionEdit = this.carsService.startedEditing
      .subscribe(
        (id: any) => {
          this.editMode = true;
          this.editedCarIndex = id;   
          this.editedCar = this.getCar(id);          
          console.log(this.editedCar);
          this.addCarForm.setValue({
            carBrand: this.editedCar.brand,
            carModel: this.editedCar.model,
            carModification: this.editedCar.modification,
            carYear: this.editedCar.year,
            carVin: this.editedCar.vin,
          })
        }
      );
  }

  getCar(id: any) {    
    const carSelected = this.cars.find(car => car.id == id);
    console.log(carSelected);
    this.carsService.carChanged.next(carSelected);
    return carSelected;
  }
  
  selectBrand(car: Car) {
    const brands: CarsList[] = [];
    for (var id = 0; id < (<any>car).length; id++) {
      let carBrand = car.brand;
      brands.push(this.carsList.find(i => i.brand == carBrand));
    }
    console.log(brands);
    return brands;    
  }

  selectModel(car: Car) {
    const models: CarsList[] = [];
    for (var id = 0; id < (<any>car).length; id++) {
      let carModel = car.model;
      models.push(this.carsList.find(i => i.model == carModel));
    }
    console.log(models);
    return models;    
  }

  getBrandValue(e: any) {
    console.log(e.target.value);
    this.selectedCars = [];
    this.selectedCars = this.carsList.filter(
      cars => {
        return cars.brand === e.target.value;       
      }
    ); 
    console.log(this.selectedCars);
    return this.selectedCars;      
  }

  getModelValue(e: any) {
    console.log(e.target.value);
    this.selectedModels = this.carsList.filter(
      cars => {
        return cars.model === e.target.value;       
      }
    );

    console.log(this.selectedModels);
    return this.selectedModels;      
  }
  
  getModificationValue(e: any)  {
    console.log(e.target.value);
    this.selectedModifications = this.carsList.filter(
        cars => {
          return cars.modification === e.target.value;
        }
    );

    console.log(this.selectedModifications);
    return this.selectedModifications;      
  }

  private initForm() {
    let carBrand = '';
    let carModel = '';
    let carModification = '';
    let carYear = '';
    let carVin = '';

    this.addCarForm = new FormGroup({
      carBrand: new FormControl(carBrand, Validators.required),
      carModel: new FormControl(carModel, Validators.required),
      carModification: new FormControl(carModification, Validators.required),
      carYear: new FormControl(carYear, Validators.required),
      carVin: new FormControl(carVin, Validators.required)
    });
  }
  
  onSubmit(form: FormGroup) {
    const value = form.value;
    const carDate = formatDate(new Date(), 'yyyy.MM.dd', 'en');
    const carId = this.db.createId();
    const carImage = this.carImage.nativeElement.className;
    const newCar = new Car(
      carId,
      carDate,
      value.carBrand, 
      value.carModel, 
      value.carModification,       
      value.carYear,
      value.carVin,
      carImage
    );

    if (this.editMode) {
      this.carsService.editCar(this.editedCarIndex, newCar);
    } else {
      this.carsService.addCar(newCar);
    }

    this.editMode = false;

    console.log(newCar);
    form.reset();
    
  }

  cancelEdit() {
    this.editMode = false;
    this.addCarForm.reset();    
  }

  ngOnDestroy() {
    this.subscriptionGetCars.unsubscribe();
    this.subscriptionEdit.unsubscribe();
  }
}
