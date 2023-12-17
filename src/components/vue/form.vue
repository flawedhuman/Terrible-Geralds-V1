<template>
    <div v-if="!isFormSubmitted" class="items">
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="name" />
        </div>
        <div>
            <label for="emailPhone">Email or Phone Number</label>
            <input type="text" name="emailPhone" id="emailPhone" v-model="emailPhone" />
        </div>
        <div>
            <label for="date">Event Date</label>
            <input type="date" name="date" id="date" v-model="date" />
        </div>
        <div>
            <label for="location">Event Location</label>
            <input type="text" name="location" id="location" v-model="location" />
        </div>
        <div>
            <label for="count">Estimated Guest Count</label>
            <input type="text" name="count" id="count" v-model="count" />
        </div>
        <div>
            <label for="message">Additional Info</label>
            <textarea id="message" name="message" rows="6" v-model="message"></textarea>
        </div>
        <span>{{error}}</span>
        <button class="btn btn-primary" @click="submit">Submit</button>
    </div>
    <div v-if="isFormSubmitted">
        <h1>Thank you for submitting the form</h1>
    </div>
</template>

<script>

export default {
    data() {
        return {
            name: "",
            emailPhone: "",
            date: "",
            location: "",
            count: "",
            message: "",
            error: "",
            isFormSubmitted: false
        };
    },
    methods: {

        submit() {
            if (this.name == "" || this.emailPhone == "" || this.date == "" || this.location == "" || this.count == "" || this.message == "") {
                this.error = "Please fill all the fields";
                return;
            } else {
                this.error = "";
            }

            const formData = new FormData();        
            formData.append("name", this.name);
            formData.append("emailPhone", this.emailPhone);
            formData.append("date", this.date);
            formData.append("location", this.location);
            formData.append("count", this.count);
            formData.append("message", this.message);

            fetch("https://getform.io/f/64e182fc-b375-4a84-8da2-0b9ab51b2abe", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            })
            .then(response => this.isFormSubmitted = true)
            .catch(error => console.log(error))
            },
    },
}
</script>
<style>
    .items {
        padding-inline: 1rem;
        display: flex;
        min-width: 600px;
        flex-direction: column;
        gap: 1.25rem;       
    }

    @media (max-width: 700px) {
    
        .items {
            min-width: 350px;
            max-width: 550px;
        }

    }

    .items label {
        margin-bottom: 0.5rem;
        display: block;
        font-family: 'Bobby Jones Soft Regular', 'League Spartan', Arial, Helvetica, sans-serif;
        font-size: 2rem;
    }

    .items input, .items textarea {
        padding: 0.5rem;
        width: 100%;
        border-radius: 0.5rem;
        border: 2px #000 solid;
        outline: none;
        font-size: 1.2rem;
    }

    .items .btn.btn-primary {
        margin-top: 0;
        border-color: #000;
        font-size: 2em;
        font-family: 'Bobby Jones Soft Regular', 'League Spartan', Arial, Helvetica, sans-serif;
    }
</style>