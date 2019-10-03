import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Car } from '../shared/car.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../core/data.service';
import { CarsList } from '../shared/carsList.model';
import { Observable, Subscription } from 'rxjs';
import { CarsService } from '../core/cars.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
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
  
  editMode = false;
  editedCarIndex: number;
  editedCar: Car;
  subscriptionEdit: Subscription;

  storedCarsList: CarsList[] = [];

  constructor(private dataService: DataService, private carsService: CarsService) { }

  ngOnInit() {
    this.initForm();
    this.dataService.loadCars().subscribe();

    this.carsListObservable = this.dataService.fetchCars();
    this.carsListObservable.subscribe(
      carsList => this.carsList = carsList,
      error => this.errorMessage = error
    );    

    this.subscriptionEdit = this.carsService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedCarIndex = index;        
          this.editedCar = this.carsService.getCar(index);
          this.addCarForm .setValue({
            carBrand: this.editedCar.brand,
            carModel: this.editedCar.model,
            carModification: this.editedCar.modification,
            carYear: this.editedCar.year,
            carVin: this.editedCar.vin,
          })
        }
      );
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
    const carId = this.carId.nativeElement.className;
    const carImage = this.carImage.nativeElement.className;
    const newCar = new Car(
      carDate,
      carId, 
      value.carBrand, 
      value.carModel, 
      value.carModification,       
      value.carYear,
      value.carVin,
      carImage
    );

    if (this.editMode) {
      this.carsService.editCar(this.editedCarIndex, newCar);
      this.dataService.storeCars();
    } else {
      this.carsService.addCar(newCar);
      this.dataService.storeCars();
    }

    this.editMode = false;

    console.log(newCar);
    form.reset();
    
  }
}
