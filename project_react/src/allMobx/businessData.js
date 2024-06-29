import { makeObservable, observable, computed, action, runInAction, toJS } from 'mobx';

const url = "http://localhost:8787";

class DataBusiness {
    cntId = 1;
    businessData = {
        id: "",
        name: "",
        address: "",
        phone: "",
        owner: "",
        logo: "",
        description: "",
    };

    constructor() {
        makeObservable(this, {
            businessData: observable,
            initList: action,
            getBusiness: computed,
            addBusiness: action,
        });
        this.initList();
    }

    async initList() {
        try {
            const res = await fetch(`${url}/businessData`);
            if (!res.ok) {
                console.log(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            runInAction(() => {
                if (data != null && Object.keys(data).length !== 0) {
                    this.businessData = data;
                } else {
                    this.businessData = {
                        id: "555",
                        name: "בלונים זה אנחנו",
                        address: "תל אביב: אבן גבירול 25",
                        phone: "052-8976541",
                        owner: "Dan Cohen",
                        logo: "https://balloons-r-us.co.il/wp-content/uploads/2016/10/balloons-r-us-logo.png",
                        description: "the best balloons",
                        email: "ballon@gmail.com"
                    };
                }
            });
        } catch (error) {
            console.log('Error fetch business data:', error);
        }
    }
    get getBusiness() {
        return this.businessData;
    }

    async addBusiness(business) {
        try {
            const res = await fetch(`${url}/businessData`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(business)
            });
            this.businessData = { ...business };

        } catch (err) {
            console.log(err);
        }
    }
}

const businessStore = new DataBusiness();
export default businessStore;
