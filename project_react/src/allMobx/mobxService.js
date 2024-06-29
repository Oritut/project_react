import { makeObservable, observable, computed, action } from 'mobx';
const baseUrl = 'http://localhost:8787';

class ServiceData {
    services = [];

    constructor() {
        makeObservable(this, {
            services: observable,
            addServices: action,
            init: action,
            getServices: computed
        });
        this.init(); 
    }

    async init() {
        try {
            if (this.services.length === 0) {
                // this.addDefaultService(); 
                const defaultService = {
                    id: "1",
                    name: "עיצוב בלונים",
                    description: "עיצוב בלונים לכל אירוע!",
                    price: 800,
                    duration: 2,
                    img: "https://m.media-amazon.com/images/I/71qftFCxeVL._AC_UF350,350_QL80_.jpg",
                // https://m.media-amazon.com/images/I/61ZA0OLDz0L._AC_UF894,1000_QL80_.jpg
                }
                this.addServices(defaultService);
            }
            const res = await fetch(`${baseUrl}/services`);
            const data = await res.json();
            action(() => {
                // this.services.replace(data);
                this.services=data;
            })();
        } catch (error) {
            console.log("Error:", error);
        }
    }

    async addServices(service) {
        try {
            const res = await fetch(`${baseUrl}/service`, {
                method: 'POST',
                headers:  {'Content-Type' : 'application/json' },
                body: JSON.stringify(service)
            });
            console.log(res);
            if (res.status === 200) {
                const newServiceData = await res.json();
                this.services.push(newServiceData);
                console.log("Service data added successfully");
            } else {
                console.log("Error: Services data not added (status code: " + res.status + ")");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }
    get getServices() {
        this.init();
        return this.services;
    }
}

const singletonServices = new ServiceData();
export default singletonServices;
