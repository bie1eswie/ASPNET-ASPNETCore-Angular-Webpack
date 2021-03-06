import { FoodDataService } from './../../../core/data-services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, OnInit, NgZone } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { Observable } from 'rxjs/Observable';
import { CpuValueService } from '../../../core/services/cpuValue.service';
import { PlatformInformationProvider } from '../../../core/services/platformInformation.provider';
import './home.component.css';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    randomFood: FoodItem[] = [];
    allFood: Observable<FoodItem[]>;
    isWorking = false;
    percentage: any;

    constructor(private foodDataService: FoodDataService,
        private notificationService: AbstractNotificationService,
        private cpuValueService: CpuValueService,
        private ngZone: NgZone,
        public platformInformationProvider: PlatformInformationProvider) {

        cpuValueService.onNewCpuValue.subscribe((cpuValue: number) => {
            ngZone.run(() => {
                this.percentage = cpuValue;
            });
        });
    }

    ngOnInit() {
        this.getFood();
        this.getRandomMeal();
    }

    updateFood() {
        this.getRandomMeal();
    }

    private getFood() {
        this.allFood = this.foodDataService.GetAllFood();
    }

    private getRandomMeal() {
        this.isWorking = true;
        this.foodDataService
            .GetRandomMeal()
            .subscribe((response: FoodItem[]) => {

                // Starter
                // Main
                // Dessert

                if (!response) {
                    this.notificationService.showNotification(MessageType.Info, 'Oh Snap...', 'No food found...');
                    return;
                }

                this.randomFood = response;
                this.notificationService.showNotification(MessageType.Success, 'Oh hey...', 'Food Loaded');
            },
            (error: any) => {
                console.log(error)
                this.notificationService.showNotification(MessageType.Error, 'Uh oh...', 'There was an Error');
            },
            () => this.isWorking = false);
    }

}
