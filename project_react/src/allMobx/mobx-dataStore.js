import { makeObservable, observable, computed, action, runInAction } from 'mobx';
const baseUrl = 'http://localhost:8787';
class AppointmentStore {
    meets = [];
    constructor() {
        makeObservable(this, {
            meets: observable,
            addMeet: action,
            init: action,
            getMeets: computed
        });
    }

    async init() {
        try {
            const res = await fetch(`${baseUrl}/appointments`);
            if (res.status === 200) {
                const data = await res.json();
                runInAction(() => {
                    this.meets = data;
                });
                console.log("Appointments fetched successfully");
            } else {
                console.log("Error: Appointments not fetched (status code: " + res.status + ")");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    async addMeet(appointment) {
        try {
            const res = await fetch(`${baseUrl}/appointment`, {
                method: 'POST',
                body: JSON.stringify(appointment),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 200) {
                const newAppointment = await res.json();
                runInAction(() => {
                    this.meets.push({ ...appointment, id: newAppointment.id });
                    // alert("good😀")

                });
                console.log("Appointment added successfully");
            } else {
                // alert("the appointment not added😭")
                console.log("Error: Appointment not added (status code: " + res.status + ")");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    get getMeets() {
        return this.meets.slice().sort((objA, objB) => new Date(objB.dateTime) - new Date(objA.dateTime));
    }
}

const singleton = new AppointmentStore();
export default singleton;
